import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/site';

// Served with HTTP 404 (Next.js adds noindex). It keeps the visitor one tap away
// from the phone number and from the service pages.
export const metadata: Metadata = {
  title: 'Pagina nu a fost găsită | RDL Tractări Auto Sibiu',
};

const links = [
  { href: '/tractari-auto-sibiu', label: 'Tractări auto Sibiu cu platformă' },
  { href: '/asistenta-rutiera-sibiu', label: 'Asistență rutieră Sibiu non-stop' },
  { href: '/depanare-auto-sibiu', label: 'Depanare auto Sibiu' },
  { href: '/transport-auto-sibiu', label: 'Transport auto pe platformă' },
  { href: '/intrebari-frecvente', label: 'Întrebări frecvente' },
  { href: '/contact', label: 'Contact' },
];

export default function NotFound() {
  return (
    <main className="min-h-screen">
      <Navigation />

      <section className="pt-32 pb-24 bg-gradient-to-b from-secondary/20 to-background">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-primary font-black uppercase tracking-widest text-sm mb-4">Eroare 404</p>
          <h1 className="text-4xl md:text-6xl font-black font-headline mb-6 uppercase tracking-tight">
            Pagina nu a fost găsită
          </h1>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            Adresa nu există sau a fost mutată. Dacă aveți nevoie de tractare acum, sunați direct: preluăm apeluri non-stop.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold h-auto min-h-14 py-3 whitespace-normal max-w-full px-6 sm:px-8 rounded-xl text-lg shadow-xl mb-14" asChild>
            <a href={PHONE_HREF} data-cta="not-found">
              <Phone className="w-5 h-5 mr-3" aria-hidden="true" />
              SUNĂ ACUM: {PHONE_DISPLAY}
            </a>
          </Button>

          <h2 className="text-2xl font-bold mb-6 uppercase font-headline">Pagini utile</h2>
          <ul className="space-y-3 text-lg">
            <li><Link href="/" className="text-primary font-bold underline underline-offset-4">Pagina principală</Link></li>
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-primary font-bold underline underline-offset-4">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
      <StickyCTA />
    </main>
  );
}
