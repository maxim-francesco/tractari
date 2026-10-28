import { neon } from '@neondatabase/serverless';

export interface AdsClickRecord {
  click_id: string;
  click_id_type: 'gclid' | 'gbraid' | 'wbraid';
  ip?: string;
  user_agent?: string;
  landing_path?: string;
  referer?: string;
  country?: string;
  region?: string;
  city?: string;
}

export async function logAdsClick(record: AdsClickRecord): Promise<void> {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    return;
  }

  try {
    const sql = neon(dbUrl);
    await sql`
      INSERT INTO ads_clicks (
        click_id,
        click_id_type,
        ip,
        user_agent,
        landing_path,
        referer,
        country,
        region,
        city
      ) VALUES (
        ${record.click_id},
        ${record.click_id_type},
        ${record.ip || null},
        ${record.user_agent || null},
        ${record.landing_path || null},
        ${record.referer || null},
        ${record.country || null},
        ${record.region || null},
        ${record.city || null}
      )
    `;
  } catch (error) {
    // Fail-silent design: never throw. Never log PII (IP, User Agent, Referer, click_id) in production,
    // but leave a data-free marker so failed writes are visible in the hosting logs.
    if (process.env.NODE_ENV !== 'production') {
      console.error('Error logging ads click to Neon:', error);
    } else {
      console.error('ads_click_log_failed', error instanceof Error ? error.name : 'unknown');
    }
  }
}
