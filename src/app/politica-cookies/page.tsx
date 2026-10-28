import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { pageMetadata } from '@/lib/site';
import { CookieSettingsButton } from '@/components/ConsentBanner';

export const metadata: Metadata = pageMetadata({
  path: '/politica-cookies',
  title: 'Politică Cookies | Tractări Mașini Sibiu',
  noindex: true,
});

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
          <p className="text-muted-foreground font-bold">Ultima actualizare: Octombrie 2026</p>
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
              <p><strong>Cookie-uri necesare</strong> (fără acord, pentru funcționarea site-ului):</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li><strong>cookie_consent</strong>: păstrează alegerea dumneavoastră privind cookie-urile de măsurare (6 luni).</li>
                <li>
                  <strong>ads_logged</strong>: se setează doar când ajungeți pe site dintr-o reclamă Google (link cu parametrul gclid, gbraid sau wbraid), pentru 30 de minute.
                  Împiedică înregistrarea repetată a aceleiași vizite din reclamă în jurnalul nostru de verificare a traficului publicitar (vezi Politica de confidențialitate).
                </li>
              </ul>
              <p className="mt-6"><strong>Cookie-uri de măsurare</strong> (numai cu acordul dumneavoastră):</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li><strong>Google Analytics 4</strong> (_ga, _ga_*): statistici despre paginile vizitate și apăsările pe butoanele de apel și WhatsApp. Durată: până la 2 ani.</li>
                <li><strong>Google Ads</strong> (de exemplu _gcl_au, _gcl_aw): măsoară dacă o vizită venită dintr-o reclamă a dus la o apăsare pe butonul de apel. Durată: aproximativ 90 de zile.</li>
              </ul>
              <p className="mt-4">
                O apăsare pe butonul de apel înseamnă doar că s-a deschis aplicația de telefon. Nu înregistrăm conținutul sau durata apelurilor pe acest site.
              </p>
            </div>

            <div>
              <h2 className="text-white text-2xl font-black uppercase mb-4">3. Consimțământul</h2>
              <p>
                La prima vizită vă întrebăm dacă acceptați cookie-urile de măsurare. Până la alegere și dacă refuzați, Google Analytics și Google Ads nu plasează cookie-uri.
                Folosim modul de consimțământ Google (Consent Mode): în lipsa acordului, Google poate primi semnale fără cookie-uri despre vizită, conform documentației Google.
              </p>
            </div>

            <div>
              <h2 className="text-white text-2xl font-black uppercase mb-4">4. Cum vă schimbați alegerea</h2>
              <p>
                Puteți schimba oricând alegerea din linkul „Setări cookies” din subsolul paginii sau de aici: <CookieSettingsButton className="font-bold text-primary underline" />.
                La retragerea acordului ștergem cookie-urile Google Analytics și Google Ads de pe acest domeniu. Le puteți șterge și din setările browserului.
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
