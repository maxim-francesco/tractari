import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Tractări Auto Sibiu | Servicii 24/7 | +40 742 916 370',
  description: 'Tractări auto și asistență rutieră în Sibiu, Șelimbăr, Cisnădie și tot județul. Depanare, pornire curent, pană cauciuc. Disponibili 24/7. Sună: +40 742 916 370',
  keywords: ['tractări auto Sibiu', 'tractari masini sibiu', 'depanare auto sibiu', 'transport auto sibiu', 'asistență rutieră sibiu', 'tractari autostrada A1'],
  metadataBase: new URL('https://tractarimasinisibiu.ro'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Tractări Auto Sibiu | Servicii 24/7 | +40 742 916 370',
    description: 'Servicii rapide de tractare și asistență rutieră în tot județul Sibiu. Intervenție în 30 de minute.',
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
      "addressRegion": "Sibiu",
      "addressCountry": "RO"
    },
    "telephone": "+40742916370",
    "openingHours": "Mo-Su 00:00-24:00",
    "areaServed": ["Sibiu", "Șelimbăr", "Cisnădie", "Avrig", "Tălmaciu", "Ocna Sibiului", "Mediaș", "Agnita", "Dumbrăveni", "Păltiniș", "Rășinari", "Autostrada A1"],
    "priceRange": "$$",
    "hasMap": "https://maps.google.com/?q=Sibiu,Romania",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+40742916370",
      "contactType": "customer service",
      "availableLanguage": "Romanian",
      "hoursAvailable": "Mo-Su 00:00-24:00"
    }
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
