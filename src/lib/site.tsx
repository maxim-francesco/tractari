import type { Metadata } from 'next';

// Single source for the public origin. Live: apex and http redirect here.
export const SITE_HOST = 'www.tractarimasinisibiu.ro';
export const SITE_URL = `https://${SITE_HOST}`;
export const SITE_NAME = 'RDL Tractări Auto Sibiu';

export const CONSENT_COOKIE = 'cookie_consent';

export const BUSINESS_ID = `${SITE_URL}/#business`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const PHONE_E164 = '+40742916370';
export const PHONE_DISPLAY = '+40 742 916 370';
export const PHONE_HREF = `tel:${PHONE_E164}`;
export const WHATSAPP_URL = 'https://wa.me/40742916370';
// Profilul verificat „RDL Tractări Auto Sibiu” din Google Business Profile (CID).
export const GOOGLE_MAPS_URL = 'https://maps.google.com/?cid=11914490510479750594';

export const LEGAL_NAME = 'PISALTU MIHAI-ILIE P.F.A.';
export const CUI = '53773945';
export const REG_COM = 'F02/600/570007';

// TODO(confirmare operator): link real „Scrie o recenzie” din Google Business Profile.
// Cât timp e null, secțiunea de recenzii nu se afișează.
export const REVIEW_URL: string | null = null;

// Focus: județul Sibiu, Autostrada A1 (zona Sibiu) și Valea Oltului (DN7).
export const AREA_SERVED = [
  'Sibiu', 'Șelimbăr', 'Cisnădie', 'Rășinari', 'Cristian', 'Săliște', 'Avrig', 'Tălmaciu',
  'Boița', 'Ocna Sibiului', 'Miercurea Sibiului', 'Slimnic', 'Mediaș', 'Agnita', 'Dumbrăveni', 'Păltiniș',
  'Râmnicu Vâlcea', 'Călimănești', 'Căciulata', 'Brezoi',
];

// One form everywhere (canonical, og:url, sitemap, schema): no trailing slash,
// homepage = SITE_URL (Next.js renders the root canonical without the slash too).
export function absoluteUrl(path: string = '/'): string {
  if (path === '/' || path === '') return SITE_URL;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function whatsappUrl(text?: string): string {
  return text ? `${WHATSAPP_URL}?text=${encodeURIComponent(text)}` : WHATSAPP_URL;
}

type PageMetadataInput = {
  path: string;
  title: string;
  description?: string;
  noindex?: boolean;
  openGraphType?: 'website' | 'article';
  publishedTime?: string;
};

// Share image per page, prerendered by app/og/[key] (keys listed in lib/og.tsx).
export function ogImageUrl(path: string): string {
  const key = path === '/' || path === '' ? 'home' : path.replace(/^\//, '').replace(/\//g, '--');
  return absoluteUrl(`/og/${key}`);
}

// Self-canonical + og:url for indexable pages; noindex pages get neither.
export function pageMetadata({ path, title, description, noindex, openGraphType = 'website', publishedTime }: PageMetadataInput): Metadata {
  if (noindex) {
    return {
      title,
      description,
      robots: { index: false, follow: true },
    };
  }
  const url = absoluteUrl(path);
  const image = { url: ogImageUrl(path), width: 1200, height: 630, alt: title, type: 'image/png' };
  return {
    title,
    description,
    alternates: { canonical: url },
    // A page-level openGraph object replaces the inherited one, so every field is set here.
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: 'ro_RO',
      type: openGraphType,
      images: [image],
      ...(openGraphType === 'article' && publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image.url],
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Acasă', path: '/' }, ...items].map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceJsonLd({ path, name, description, serviceType }: { path: string; name: string; description: string; serviceType: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${absoluteUrl(path)}#service`,
    name,
    description,
    serviceType,
    url: absoluteUrl(path),
    provider: { '@id': BUSINESS_ID },
    areaServed: AREA_SERVED.map((name) => ({ '@type': 'City', name })),
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
