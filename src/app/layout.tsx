import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tractări Auto Sibiu — Servicii 24/7, Rapid & Profesional',
  description: 'Ai nevoie de tractări auto în Sibiu? Suntem disponibili 24/7. Intervenție rapidă în 30 de minute. Transport auto, depanare și asistență rutieră în județul Sibiu.',
  keywords: ['tractări auto sibiu', 'asistență rutieră sibiu', 'platformă auto sibiu', 'transport mașini sibiu', 'tractări auto 24/7'],
  openGraph: {
    title: 'Tractări Auto Sibiu — Servicii 24/7, Rapid & Profesional',
    description: 'Servicii profesionale de tractări auto și asistență rutieră în Sibiu. Disponibili non-stop pentru siguranța ta.',
    url: 'https://tractarimasinisibiu.ro',
    siteName: 'Tractări Mașini Sibiu',
    images: [
      {
        url: 'https://tractarimasinisibiu.ro/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Tractări Auto Sibiu Platformă',
      },
    ],
    locale: 'ro_RO',
    type: 'website',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground selection:bg-primary selection:text-white">
        {children}
      </body>
    </html>
  );
}
