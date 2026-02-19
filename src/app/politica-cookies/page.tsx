import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Politică Cookies | Tractări Mașini Sibiu',
  robots: {
    index: false,
    follow: true,
  },
};

export default function CookiesPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/20 to-background border-b border-border">
        <div className="max-w-4xl mx-auto px-4">
          <Button variant="ghost" className="mb-8 text-primary hover:text-primary/80 font-bold p-0" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" /> Înapoi la pagina principală
            </Link>
          </Button>
          <h1 className="text-4xl md:text-5xl font-black font-headline mb-4 uppercase tracking-tighter">
            Politică <span className="text-primary">Cookies</span>
          </h1>
          <p className="text-muted-foreground font-bold">Ultima actualizare: Februarie 2026</p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 prose prose-invert prose-orange max-w-none">
          <div className="space-y-8 text-muted-foreground text-lg leading-relaxed">
            <div>
              <h2 className="text-white text-2xl font-black uppercase mb-4">1. Ce sunt cookie-urile?</h2>
              <p>
                Cookie-urile sunt fișiere text de dimensiuni reduse, stocate pe computerul, tableta sau telefonul dumneavoastră atunci când vizitați un website. Acestea permit website-ului să funcționeze corect sau să ofere o experiență de navigare mai fluidă.
              </p>
            </div>

            <div>
              <h2 className="text-white text-2xl font-black uppercase mb-4">2. Ce cookie-uri folosim?</h2>
              <p>
                Website-ul nostru folosește <strong>exclusiv cookie-uri tehnice esențiale</strong>, necesare pentru operarea framework-ului Next.js și pentru asigurarea securității navigării.
              </p>
              <p className="mt-4">
                <strong>Nu folosim:</strong> Google Analytics, Facebook Pixel, Hotjar sau orice alt tip de cookie de tracking, publicitate sau analiză a comportamentului utilizatorului.
              </p>
            </div>

            <div>
              <h2 className="text-white text-2xl font-black uppercase mb-4">3. Consimțământul</h2>
              <p>
                Conform legislației în vigoare (Legea 506/2004), pentru utilizarea cookie-urilor strict necesare bunei funcționări a website-ului nu este necesar consimțământul prealabil al utilizatorului.
              </p>
            </div>

            <div>
              <h2 className="text-white text-2xl font-black uppercase mb-4">4. Administrarea cookie-urilor</h2>
              <p>
                Puteți seta browserul dumneavoastră să blocheze sau să vă alerteze despre aceste cookie-uri, dar unele părți ale site-ului pot să nu funcționeze corect în acest caz. Toate browserele moderne permit schimbarea setărilor de cookie-uri din secțiunea "Opțiuni" sau "Preferințe".
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <StickyCTA />
    </main>
  );
}
