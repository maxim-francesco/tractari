import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const keyParam = request.nextUrl.searchParams.get('key');
    const reportKey = process.env.ADS_REPORT_KEY;

    if (!reportKey || keyParam !== reportKey) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }

    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
      return NextResponse.json({ error: 'no database configured' });
    }

    const sql = neon(dbUrl);

    // 1. Totals
    const totalsRes = await sql`
      SELECT 
        COUNT(*)::int as clicks,
        COUNT(DISTINCT ip)::int as distinct_ips,
        COUNT(DISTINCT click_id)::int as distinct_click_ids,
        MIN(ts) as first_ts,
        MAX(ts) as last_ts
      FROM ads_clicks
    `;
    
    const totals = totalsRes[0] || {
      clicks: 0,
      distinct_ips: 0,
      distinct_click_ids: 0,
      first_ts: null,
      last_ts: null
    };

    // 2. By IP (top 50)
    const byIp = await sql`
      SELECT 
        ip,
        COUNT(*)::int as clicks,
        MIN(ts) as first_ts,
        MAX(ts) as last_ts,
        string_agg(DISTINCT COALESCE(country, 'unknown'), ', ') as countries,
        MAX(user_agent) as sample_ua
      FROM ads_clicks
      GROUP BY ip
      ORDER BY clicks DESC
      LIMIT 50
    `;

    // 3. By Country
    const byCountry = await sql`
      SELECT 
        COALESCE(country, 'unknown') as country,
        COUNT(*)::int as clicks
      FROM ads_clicks
      GROUP BY country
      ORDER BY clicks DESC
    `;

    // 4. Last 100 raw rows
    const last100 = await sql`
      SELECT 
        id,
        ts,
        click_id,
        click_id_type,
        ip,
        user_agent,
        landing_path,
        referer,
        country,
        region,
        city
      FROM ads_clicks
      ORDER BY ts DESC
      LIMIT 100
    `;

    return NextResponse.json({
      totals,
      by_ip: byIp,
      by_country: byCountry,
      last_100: last100
    });
  } catch (error: any) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Error in ads-clicks-report route:', error);
    }
    return NextResponse.json({ error: error?.message || 'internal server error' }, { status: 500 });
  }
}
