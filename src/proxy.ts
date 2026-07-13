import { NextResponse } from 'next/server';
import type { NextRequest, NextFetchEvent } from 'next/server';
import { logAdsClick } from './lib/ads-click-log';

export function proxy(request: NextRequest, event: NextFetchEvent) {
  try {
    const isPrefetch =
      request.headers.has('next-router-prefetch') ||
      request.headers.get('purpose') === 'prefetch' ||
      request.headers.has('x-middleware-prefetch');

    if (isPrefetch) {
      return NextResponse.next();
    }

    const { searchParams, pathname, search } = request.nextUrl;
    const gclid = searchParams.get('gclid');
    const gbraid = searchParams.get('gbraid');
    const wbraid = searchParams.get('wbraid');

    if (gclid || gbraid || wbraid) {
      let click_id = '';
      let click_id_type: 'gclid' | 'gbraid' | 'wbraid' = 'gclid';

      if (gclid) {
        click_id = gclid;
        click_id_type = 'gclid';
      } else if (gbraid) {
        click_id = gbraid;
        click_id_type = 'gbraid';
      } else if (wbraid) {
        click_id = wbraid;
        click_id_type = 'wbraid';
      }

      const xForwardedFor = request.headers.get('x-forwarded-for');
      let ip = 'unknown';
      if (xForwardedFor) {
        const parts = xForwardedFor.split(',');
        if (parts[0]) {
          ip = parts[0].trim();
        }
      } else {
        const xRealIp = request.headers.get('x-real-ip');
        if (xRealIp) {
          ip = xRealIp.trim();
        }
      }

      const user_agent = request.headers.get('user-agent') || undefined;
      const landing_path = pathname + search;
      const referer = request.headers.get('referer') || undefined;

      const country = request.headers.get('x-vercel-ip-country') || undefined;
      const region = request.headers.get('x-vercel-ip-country-region') || undefined;
      
      let city: string | undefined = undefined;
      const xVercelIpCity = request.headers.get('x-vercel-ip-city');
      if (xVercelIpCity) {
        try {
          city = decodeURIComponent(xVercelIpCity);
        } catch {
          city = xVercelIpCity;
        }
      }

      const record = {
        click_id,
        click_id_type,
        ip,
        user_agent,
        landing_path,
        referer,
        country,
        region,
        city,
      };

      event.waitUntil(logAdsClick(record));
    }
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Error in proxy middleware:', error);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - manifest.json
     * - robots.txt
     * - sitemap.xml
     * and any path containing a dot (e.g. .png, .css, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|manifest.json|robots.txt|sitemap.xml|.*\\.).*)',
  ],
};
