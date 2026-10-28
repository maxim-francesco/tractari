import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import CallClickTracker from '@/components/CallClickTracker';
import ConsentBanner from '@/components/ConsentBanner';
import {
  AREA_SERVED, BUSINESS_ID, CONSENT_COOKIE, CUI, JsonLd, LEGAL_NAME, PHONE_E164, SITE_HOST,
  SITE_NAME, SITE_URL, WEBSITE_ID, absoluteUrl, ogImageUrl,
} from '@/lib/site';

const GA_MEASUREMENT_ID = 'G-XYEP1TJYMQ';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// No global canonical/og:url here: each page sets its own (see pageMetadata in lib/site).
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Tractări Auto Sibiu Non-Stop | Platformă Auto și Asistență',
  description: 'Tractări auto Sibiu non-stop: platformă auto, asistență rutieră și tractări pe Autostrada A1. Prețul vi-l spunem la telefon. Sunați: 0742 916 370',
  robots: {
    index: true,
    follow: true,
  },
  // Fallback for pages without pageMetadata (e.g. noindex legal pages).
  openGraph: {
    siteName: SITE_NAME,
    locale: 'ro_RO',
    type: 'website',
    images: [{ url: ogImageUrl('/'), width: 1200, height: 630, alt: SITE_NAME, type: 'image/png' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: [ogImageUrl('/')],
  },
};

// gtag.js is in the raw HTML (Google Ads website-call verification needs that) for
// production builds, but not for Vercel preview deployments.
const loadGoogleTag = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV === 'production'
  : process.env.NODE_ENV === 'production';

// Consent Mode v2: everything denied until the visitor chooses. `config` runs only
// on the production host, so localhost / preview hosts never send hits.
const googleTagBootstrap = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied',
  analytics_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500
});
try {
  if (/(?:^|; )${CONSENT_COOKIE}=granted/.test(document.cookie)) {
    gtag('consent', 'update', {
      ad_storage: 'granted',
      analytics_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted'
    });
  }
} catch (e) {}
if (location.hostname === '${SITE_HOST}') {
  gtag('js', new Date());
  gtag('config', '${GA_MEASUREMENT_ID}');
}
`;

// TODO(confirmare operator): adresa publică (dacă primește clienți), programul real
// și localitățile deservite efectiv. Sediul legal din politici este în Rășinari.
const siteGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AutomotiveBusiness',
      '@id': BUSINESS_ID,
      name: SITE_NAME,
      legalName: LEGAL_NAME,
      taxID: CUI,
      url: absoluteUrl('/'),
      telephone: PHONE_E164,
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'Sibiu',
        addressCountry: 'RO',
      },
      areaServed: AREA_SERVED.map((name) => ({ '@type': 'City', name })),
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: PHONE_E164,
        contactType: 'customer service',
        availableLanguage: 'ro',
      },
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: absoluteUrl('/'),
      name: SITE_NAME,
      inLanguage: 'ro-RO',
      publisher: { '@id': BUSINESS_ID },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className={`scroll-smooth ${inter.variable}`} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#FF6B00" />
        <script dangerouslySetInnerHTML={{ __html: googleTagBootstrap }} />
        {loadGoogleTag && (
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
        )}
        <JsonLd data={siteGraph} />
      </head>
      <body className="font-body antialiased bg-background text-foreground selection:bg-primary selection:text-white">
        <CallClickTracker />
        {children}
        <ConsentBanner />
      </body>
    </html>
  );
}
