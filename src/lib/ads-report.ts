// Pure helpers for /api/ads-clicks-report (no imports, so tests can load this file directly).

// Networks owned by Google (ARIN/RIPE registry, checked 2026-11-13). Requests from them
// carry an ad click id but are Chrome prefetches or Google's own fetches, not visitors,
// so they are kept out of the repeat-clicker list.
const GOOGLE_NETWORKS: { cidr: string; label: string }[] = [
  { cidr: '162.120.184.0/21', label: 'Chrome private prefetch proxy' },
  { cidr: '72.14.192.0/18', label: 'Google' },
  { cidr: '66.249.64.0/19', label: 'Google' },
  { cidr: '193.186.4.0/24', label: 'Google Ireland' },
];

function ipv4ToInt(ip: string): number | null {
  const parts = ip.split('.');
  if (parts.length !== 4) return null;
  let value = 0;
  for (const part of parts) {
    if (!/^\d{1,3}$/.test(part)) return null;
    const octet = Number(part);
    if (octet > 255) return null;
    value = value * 256 + octet;
  }
  return value;
}

// Label of the Google network an IPv4 address belongs to, or null.
export function googleNetworkLabel(ip: string): string | null {
  const address = ipv4ToInt(ip);
  if (address === null) return null;
  for (const { cidr, label } of GOOGLE_NETWORKS) {
    const [base, bits] = cidr.split('/');
    const size = 2 ** (32 - Number(bits));
    const start = ipv4ToInt(base) as number;
    if (address >= start && address < start + size) return label;
  }
  return null;
}

// Repeat-clicker threshold: distinct ad click ids from one IP in the range. Default 3.
export function parseMinClicks(value: string | null): number {
  const parsed = Number.parseInt(value ?? '', 10);
  if (!Number.isFinite(parsed)) return 3;
  return Math.min(Math.max(parsed, 2), 1000);
}

// Explicit IP filter for the CSV export (`ip=a,b`). Anything that is not an IP is dropped.
export function parseIpList(value: string | null): string[] {
  if (!value) return [];
  return value
    .split(',')
    .map((item) => item.trim())
    .filter((item) => /^[0-9a-fA-F:.]{3,45}$/.test(item))
    .slice(0, 50);
}

function csvCell(value: unknown): string {
  if (value === null || value === undefined) return '';
  let text = value instanceof Date ? value.toISOString() : String(value);
  // A leading = + - @ would run as a formula when the file is opened in a spreadsheet.
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

// RFC 4180 CSV with a UTF-8 BOM, so Excel reads Romanian city names correctly.
export function toCsv(columns: string[], rows: Record<string, unknown>[]): string {
  const lines = [columns.join(','), ...rows.map((row) => columns.map((column) => csvCell(row[column])).join(','))];
  return `﻿${lines.join('\r\n')}\r\n`;
}

// ---- Browser signatures -------------------------------------------------------------
// Click fraud through VPNs shows up as one browser signature (exact user agent) spread
// over many IPs, often outside the targeted country and in bursts. Grouping by IP misses it.

export type ClickRow = {
  ts: string | Date;
  click_id: string | null;
  ip: string | null;
  user_agent: string | null;
  country: string | null;
};

export type SignatureSummary = {
  user_agent: string;
  browser: string;
  logged_requests: number;
  distinct_click_ids: number;
  distinct_ips: number;
  first_ts: string;
  last_ts: string;
  countries: string;
  outside_home_requests: number;
  bursts: number;
  flags: string[];
};

const BURST_WINDOW_MS = 15 * 60 * 1000;
const BURST_MIN_CLICK_IDS = 3;

const BROWSER_NAMES: Record<string, string> = {
  OPR: 'Opera', Edg: 'Edge', EdgA: 'Edge', SamsungBrowser: 'Samsung Internet', Firefox: 'Firefox',
  FxiOS: 'Firefox', CriOS: 'Chrome', Chrome: 'Chrome', Version: 'Safari',
};

// Short, human-readable name. The reduced Chrome user agent ("Android 10; K") is shared by
// every Chrome user on Android, so the name is a hint, never proof of one person.
export function browserName(userAgent: string): string {
  const os = /iPhone|iPad/.test(userAgent) ? 'iOS'
    : /Android/.test(userAgent) ? 'Android'
    : /Windows/.test(userAgent) ? 'Windows'
    : /Macintosh/.test(userAgent) ? 'macOS'
    : /Linux/.test(userAgent) ? 'Linux' : 'other';
  const match = userAgent.match(/(OPR|EdgA?|SamsungBrowser|Firefox|FxiOS|CriOS)\/(\d+)/)
    ?? userAgent.match(/(Chrome)\/(\d+)/)
    ?? userAgent.match(/(Version)\/(\d+)/);
  return match ? `${BROWSER_NAMES[match[1]]} ${match[2]} / ${os}` : `unknown / ${os}`;
}

// Non-overlapping 15-minute windows that contain at least 3 distinct click ids.
function countBursts(sorted: { time: number; clickId: string }[]): number {
  let bursts = 0;
  let i = 0;
  while (i < sorted.length) {
    const ids = new Set<string>();
    let j = i;
    while (j < sorted.length && sorted[j].time - sorted[i].time <= BURST_WINDOW_MS) {
      ids.add(sorted[j].clickId);
      j++;
    }
    if (ids.size >= BURST_MIN_CLICK_IDS) {
      bursts++;
      i = j;
    } else {
      i++;
    }
  }
  return bursts;
}

// One summary per exact user agent, Google networks left out, most click ids first.
// A signature is flagged only when it is spread over several IPs AND shows a second sign
// (traffic from outside the home country, or bursts); many IPs alone is normal for a
// common phone browser.
export function summarizeSignatures(
  rows: ClickRow[],
  options: { homeCountry?: string; minIps?: number; minClicks?: number } = {},
): SignatureSummary[] {
  const homeCountry = options.homeCountry ?? 'RO';
  const minIps = options.minIps ?? 3;
  const minClicks = options.minClicks ?? 3;
  const groups = new Map<string, ClickRow[]>();
  for (const row of rows) {
    if (!row.user_agent || !row.ip || googleNetworkLabel(row.ip)) continue;
    const group = groups.get(row.user_agent);
    if (group) group.push(row);
    else groups.set(row.user_agent, [row]);
  }

  const summaries: SignatureSummary[] = [];
  for (const [userAgent, group] of groups) {
    const events = group
      .map((row) => ({ time: new Date(row.ts).getTime(), clickId: row.click_id ?? '' }))
      .filter((event) => Number.isFinite(event.time))
      .sort((a, b) => a.time - b.time);
    if (events.length === 0) continue;
    const countryCounts = new Map<string, number>();
    for (const row of group) {
      const country = row.country || 'unknown';
      countryCounts.set(country, (countryCounts.get(country) ?? 0) + 1);
    }
    const outside = group.filter((row) => row.country && row.country !== homeCountry).length;
    const distinctIps = new Set(group.map((row) => row.ip)).size;
    const distinctClickIds = new Set(group.map((row) => row.click_id)).size;
    const bursts = countBursts(events);

    const flags: string[] = [];
    if (distinctIps >= minIps && distinctClickIds >= minClicks) {
      if (outside > 0) flags.push(`${outside} requests from outside ${homeCountry}`);
      if (bursts > 0) flags.push(`${bursts} burst${bursts === 1 ? '' : 's'} of ${BURST_MIN_CLICK_IDS}+ click ids in 15 min`);
    }

    summaries.push({
      user_agent: userAgent,
      browser: browserName(userAgent),
      logged_requests: group.length,
      distinct_click_ids: distinctClickIds,
      distinct_ips: distinctIps,
      first_ts: new Date(events[0].time).toISOString(),
      last_ts: new Date(events[events.length - 1].time).toISOString(),
      countries: [...countryCounts.entries()].sort((a, b) => b[1] - a[1]).map(([c, n]) => `${c}=${n}`).join(', '),
      outside_home_requests: outside,
      bursts,
      flags,
    });
  }
  return summaries.sort((a, b) => b.distinct_click_ids - a.distinct_click_ids || b.logged_requests - a.logged_requests);
}
