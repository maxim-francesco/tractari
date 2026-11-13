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
