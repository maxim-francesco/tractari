import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Tractări Auto Sibiu | Servicii 24/7 | 0700 000 000',
  description: 'Tractări auto Sibiu rapid și profesional. Disponibili 24/7, timp răspuns 30 minute. Acoperim tot județul Sibiu. Sună acum!',
  keywords: ['tractări auto Sibiu', 'tractari masini sibiu', 'depanare auto sibiu', 'transport auto sibiu', 'asistență rutieră sibiu'],
  metadataBase: new URL('https://tractarimasinisibiu.ro'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Tractări Auto Sibiu | Servicii 24/7 | 0700 000 000',
    description: 'Tractări auto Sibiu rapid și profesional. Disponibili 24/7, timp răspuns 30 minute. Acoperim tot județul Sibiu. Sună acum!',
    url: 'https://tractarimasinisibiu.ro',
    siteName: 'Tractări Mașini Sibiu',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tractări Auto Sibiu Platformă',
      },
    ],
    locale: 'ro_RO',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": "Tractări Mașini Sibiu",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Sibiu",
      "addressCountry": "RO"
    },
    "telephone": "0700000000",
    "openingHours": "Mo-Su 00:00-24:00",
    "areaServed": ["Sibiu", "Județul Sibiu"],
    "priceRange": "$$"
  };

  return (
    <html lang="ro" className={`scroll-smooth ${inter.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#FF6B00" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground selection:bg-primary selection:text-white">
        {children}
      </body>
    </html>
  );
}
