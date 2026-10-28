import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';
import { timingSafeEqual } from 'node:crypto';

export const dynamic = 'force-dynamic';

// Rows in ads_clicks are server-logged landing requests carrying gclid/gbraid/wbraid,
// deduplicated per browser for 30 min. They are NOT billed Google Ads clicks, sessions or people.
const TIME_ZONE = 'Europe/Bucharest';
const DEFAULT_DAYS = 7;
const MAX_DAYS = 400;

function unauthorized() {
  return NextResponse.json(
    { error: 'unauthorized' },
    { status: 401, headers: { 'WWW-Authenticate': 'Basic realm="ads-report", charset="UTF-8"', 'Cache-Control': 'no-store' } }
  );
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

// Accepted credentials: `?key=`, `Authorization: Bearer <key>`, `X-API-Key: <key>`, or
// HTTP Basic (any user name, password = ADS_REPORT_KEY; the browser prompts, no secret in the URL).
function providedKey(request: NextRequest): string | null {
  const header = request.headers.get('authorization') || '';
  if (/^Basic\s+/i.test(header)) {
    try {
      const decoded = Buffer.from(header.replace(/^Basic\s+/i, ''), 'base64').toString('utf8');
      return decoded.slice(decoded.indexOf(':') + 1);
    } catch {
      return null;
    }
  }
  const bearer = /^Bearer\s+/i.test(header) ? header.replace(/^Bearer\s+/i, '') : null;
  return request.nextUrl.searchParams.get('key') || bearer || request.headers.get('x-api-key');
}

function isAuthorized(request: NextRequest, reportKey: string): boolean {
  const key = providedKey(request);
  return Boolean(key) && safeEqual(key as string, reportKey);
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

// Calendar dates (YYYY-MM-DD) interpreted in Europe/Bucharest; `to` is inclusive.
function parseRange(params: URLSearchParams): { from: string; to: string } | null {
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: TIME_ZONE }).format(new Date());
  const to = params.get('to') || today;
  let from = params.get('from');
  if (!from) {
    const d = new Date(`${to}T00:00:00Z`);
    d.setUTCDate(d.getUTCDate() - (DEFAULT_DAYS - 1));
    from = d.toISOString().slice(0, 10);
  }
  if (!DATE_RE.test(from) || !DATE_RE.test(to)) return null;
  const days = (Date.parse(to) - Date.parse(from)) / 86_400_000;
  if (!Number.isFinite(days) || days < 0 || days > MAX_DAYS) return null;
  return { from, to };
}

export async function GET(request: NextRequest) {
  const reportKey = process.env.ADS_REPORT_KEY;
  if (!reportKey || !isAuthorized(request, reportKey)) {
    return unauthorized();
  }

  const range = parseRange(request.nextUrl.searchParams);
  if (!range) {
    return NextResponse.json({ error: 'invalid range: use from/to as YYYY-MM-DD, max 400 days' }, { status: 400 });
  }

  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    return NextResponse.json({ error: 'no database configured' }, { status: 503 });
  }

  try {
    const sql = neon(dbUrl);
    const { from, to } = range;
    // Local-date bounds converted to timestamps in the business time zone.
    const where = sql`ts >= (${from}::date)::timestamp AT TIME ZONE ${TIME_ZONE}
      AND ts < ((${to}::date + 1)::timestamp AT TIME ZONE ${TIME_ZONE})`;

    const [totals] = await sql`
      SELECT
        COUNT(*)::int AS logged_requests,
        COUNT(DISTINCT click_id)::int AS distinct_click_ids,
        COUNT(DISTINCT ip)::int AS distinct_ips,
        MIN(ts) AS first_ts,
        MAX(ts) AS last_ts
      FROM ads_clicks
      WHERE ${where}
    `;

    const byDay = await sql`
      SELECT
        to_char(ts AT TIME ZONE ${TIME_ZONE}, 'YYYY-MM-DD') AS day,
        COUNT(*)::int AS logged_requests,
        COUNT(DISTINCT click_id)::int AS distinct_click_ids,
        COUNT(DISTINCT ip)::int AS distinct_ips
      FROM ads_clicks
      WHERE ${where}
      GROUP BY 1
      ORDER BY 1
    `;

    const byHour = await sql`
      SELECT
        EXTRACT(HOUR FROM ts AT TIME ZONE ${TIME_ZONE})::int AS hour_local,
        COUNT(*)::int AS logged_requests
      FROM ads_clicks
      WHERE ${where}
      GROUP BY 1
      ORDER BY 1
    `;

    const byIp = await sql`
      SELECT
        ip,
        COUNT(*)::int AS logged_requests,
        COUNT(DISTINCT click_id)::int AS distinct_click_ids,
        MIN(ts) AS first_ts,
        MAX(ts) AS last_ts,
        string_agg(DISTINCT COALESCE(country, 'unknown'), ', ') AS countries,
        MAX(user_agent) AS sample_ua
      FROM ads_clicks
      WHERE ${where}
      GROUP BY ip
      ORDER BY logged_requests DESC
      LIMIT 50
    `;

    const byCountry = await sql`
      SELECT
        COALESCE(country, 'unknown') AS country,
        COALESCE(region, 'unknown') AS region,
        COUNT(*)::int AS logged_requests
      FROM ads_clicks
      WHERE ${where}
      GROUP BY 1, 2
      ORDER BY logged_requests DESC
    `;

    const byClickIdType = await sql`
      SELECT click_id_type, COUNT(*)::int AS logged_requests
      FROM ads_clicks
      WHERE ${where}
      GROUP BY 1
      ORDER BY 2 DESC
    `;

    const last100 = await sql`
      SELECT id, ts, click_id, click_id_type, ip, user_agent, landing_path, referer, country, region, city
      FROM ads_clicks
      WHERE ${where}
      ORDER BY ts DESC
      LIMIT 100
    `;

    return NextResponse.json(
      {
        range: { from, to, time_zone: TIME_ZONE, to_inclusive: true },
        note: 'logged_requests = landing requests with an ad click id, deduplicated per browser for 30 min. Not billed clicks, sessions or people. Compare with Google Ads click and invalid-click reports for the same dates and account time zone.',
        totals,
        by_day: byDay,
        by_hour_local: byHour,
        by_ip: byIp,
        by_country_region: byCountry,
        by_click_id_type: byClickIdType,
        last_100: last100,
      },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Error in ads-clicks-report route:', error);
    } else {
      console.error('ads_clicks_report_failed');
    }
    return NextResponse.json({ error: 'internal server error' }, { status: 500 });
  }
}
