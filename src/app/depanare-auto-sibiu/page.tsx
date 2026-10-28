import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import { Button } from '@/components/ui/button';
import { Zap, Battery, Settings, Fuel, Phone, HelpCircle } from 'lucide-react';
import FaqList from '@/components/FaqList';
import Link from 'next/link';
import { JsonLd, PHONE_HREF, breadcrumbJsonLd, faqJsonLd, pageMetadata, serviceJsonLd } from '@/lib/site';

const PATH = '/depanare-auto-sibiu';

export const metadata: Metadata = pageMetadata({
  path: PATH,
  title: 'Depanare Auto Sibiu | Baterie, Roată, Alimentare Greșită',
  description: `Depanare auto în Sibiu și pe A1: baterie descărcată, roată de rezervă, alimentare greșită. Aflați la telefon dacă se rezolvă pe loc sau prin tractare.`,
});

export default function DepanareAutoPage() {
  // TODO(confirmare operator): golire rezervor pe loc, deblocare uși, echipament de pornire.
  const faqData = [
    { q: "Ce fac dacă am alimentat cu combustibil greșit?", a: "Nu porniți motorul și nu puneți contactul. Sunați-ne: vă spunem dacă mașina trebuie tractată la service sau ce alte variante există în situația dumneavoastră." },
    { q: "Puteți porni o mașină cu bateria descărcată?", a: "În multe cazuri, da. Sunați și spuneți-ne unde vă aflați și ce mașină aveți; vă confirmăm dacă venim pentru pornire sau e nevoie de tractare." },
    { q: "Interveniți și pe autostradă (A1)?", a: "Da, în zona Sibiu. Pe autostradă, pentru siguranță, de cele mai multe ori mașina este încărcată pe platformă și dusă într-un loc sigur sau la service." },
    { q: "Ce se întâmplă dacă mașina nu poate fi reparată pe loc?", a: "O tractăm la service, acasă sau la adresa dorită. Prețul vi-l spunem înainte de încărcare." }
  ];

  return (
    <main className="min-h-screen">
      <Navigation />
      <JsonLd data={serviceJsonLd({ path: PATH, name: 'Depanare auto Sibiu', description: metadata.description as string, serviceType: 'Asistență rutieră și depanare auto' })} />
      <JsonLd data={faqJsonLd(faqData)} />
      <JsonLd data={breadcrumbJsonLd([{ name: 'Depanare Auto Sibiu', path: PATH }])} />
      
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/20 to-background">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full text-primary font-bold text-sm mb-6 uppercase tracking-widest">
            <Zap className="w-4 h-4" /> Ajutor Imediat
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-headline mb-6 uppercase tracking-tight">
            Depanare Auto Sibiu <span className="text-primary">la Fața Locului</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            Nu orice problemă necesită tractare. Sunați și vă spunem dacă situația se poate rezolva la fața locului sau dacă e mai sigur să tractăm mașina.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold h-auto min-h-14 py-3 whitespace-normal max-w-full px-6 sm:px-10 rounded-xl text-lg" asChild>
            <a href={PHONE_HREF} data-cta="service-hero">
              <Phone className="w-5 h-5 mr-3" />
              SUNAȚI PENTRU ASISTENȚĂ
            </a>
          </Button>
        </div>
      </section>

      <section className="py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <h2 className="text-3xl font-bold mb-6 font-headline uppercase">Depanare auto în Sibiu: situații frecvente</h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Uneori o problemă mică te lasă blocat în trafic sau în parcare. Cele mai frecvente situații pentru care ne sunați:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-center gap-4">
                  <Battery className="w-10 h-10 text-primary shrink-0" />
                  <span className="font-bold">Curent Baterie</span>
                </div>
                <div className="flex items-center gap-4">
                  <Settings className="w-10 h-10 text-primary shrink-0" />
                  <span className="font-bold">Roată de Rezervă</span>
                </div>
                <div className="flex items-center gap-4">
                  <Fuel className="w-10 h-10 text-primary shrink-0" />
                  <span className="font-bold">Alimentare Greșită</span>
                </div>
                <div className="flex items-center gap-4">
                  <HelpCircle className="w-10 h-10 text-primary shrink-0" />
                  <span className="font-bold">Tractare la Service</span>
                </div>
              </div>
            </div>
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-border bg-secondary/20 flex items-center justify-center">
              <div className="text-center p-10">
                <h3 className="text-2xl font-black text-primary mb-2 uppercase">Non-Stop</h3>
                <p className="text-muted-foreground">Preluăm apeluri non-stop pentru Sibiu, împrejurimi și A1.</p>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center uppercase font-headline">Întrebări despre depanarea auto</h2>
            <FaqList items={faqData} />
          </div>

          <div className="mt-24 pt-10 border-t border-border flex flex-col md:flex-row justify-center items-center gap-8">
            <p className="font-bold uppercase tracking-widest text-sm text-muted-foreground">Alte servicii:</p>
            <div className="flex gap-8">
              <Link href="/tractari-auto-sibiu" className="text-primary font-bold hover:underline">Tractări</Link>
              <Link href="/transport-auto-sibiu" className="text-primary font-bold hover:underline">Transport</Link>
              <Link href="/asistenta-rutiera-sibiu" className="text-primary font-bold hover:underline">Asistență</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <StickyCTA />
    </main>
  );
}
