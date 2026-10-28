import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Clock, Check } from 'lucide-react';
import Link from 'next/link';
import { JsonLd, PHONE_DISPLAY, PHONE_HREF, breadcrumbJsonLd, pageMetadata, serviceJsonLd } from '@/lib/site';

const PATH = '/asistenta-rutiera-sibiu';

export const metadata: Metadata = pageMetadata({
  path: PATH,
  title: 'Asistență Rutieră Sibiu Non-Stop | Tractare, Baterie, Pană',
  description: `Asistență rutieră în Sibiu și pe A1, non-stop: tractare, baterie descărcată, pană de cauciuc, alimentare greșită. Sunați și aflați soluția și prețul.`,
});

export default function AsistentaRutieraPage() {

  return (
    <main className="min-h-screen">
      <Navigation />
      <JsonLd data={serviceJsonLd({ path: PATH, name: 'Asistență rutieră Sibiu', description: metadata.description as string, serviceType: 'Asistență rutieră' })} />
      <JsonLd data={breadcrumbJsonLd([{ name: 'Asistență Rutieră Sibiu', path: PATH }])} />
      
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/20 to-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-primary font-bold mb-4 uppercase tracking-tighter">
                <ShieldCheck className="w-5 h-5" /> Partenerul tău de drum
              </div>
              <h1 className="text-4xl md:text-6xl font-bold font-headline mb-6 uppercase tracking-tight leading-tight">
                Asistență Rutieră Sibiu <span className="text-primary">Non-Stop</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Pană, baterie descărcată sau accident? Preluăm apeluri non-stop pentru Sibiu, localitățile din jur și A1 în zona Sibiu. La telefon vă spunem ce soluție aveți, prețul și timpul estimat.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold h-auto min-h-14 py-3 whitespace-normal max-w-full px-6 sm:px-8 rounded-xl" asChild>
                <a href={PHONE_HREF} data-cta="service-hero">ASISTENȚĂ: {PHONE_DISPLAY}</a>
              </Button>
            </div>
            <div className="flex-1 w-full max-w-lg aspect-square bg-secondary/30 rounded-full border border-primary/20 flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-primary/5 animate-pulse" />
               <div className="relative text-center p-12">
                  <Clock className="w-16 h-16 text-primary mx-auto mb-4" />
                  {/* TODO(confirmare operator): timp mediu real de sosire. */}
                  <p className="text-2xl font-bold uppercase">Apeluri preluate</p>
                  <p className="text-5xl font-black text-primary">NON-STOP</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 uppercase">Asistență rutieră în Sibiu și pe A1</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Cele mai frecvente situații pentru care ne sunați în Sibiu și pe A1.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {[
              { title: 'Tractare Urgentă', desc: 'Recuperare vehicul de la locul incidentului.' },
              { title: 'Baterie Descărcată', desc: 'Vă spunem la telefon dacă putem porni mașina la fața locului.' },
              { title: 'Pană de Cauciuc', desc: 'Ajutor la roata de rezervă sau tractare până la vulcanizare.' },
              // TODO(confirmare operator): golire rezervor la fața locului.
              { title: 'Alimentare Greșită', desc: 'Nu porniți motorul. Vă spunem la telefon ce variante aveți.' }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-3xl bg-secondary/20 border border-border group">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6">
                  <Check className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-xl mb-3 uppercase tracking-tight">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto mb-20 text-muted-foreground text-lg leading-relaxed">
            <h2 className="text-3xl font-bold mb-5 text-white uppercase font-headline">Ce faceți până ajunge asistența rutieră</h2>
            <ol className="list-decimal pl-5 space-y-3">
              <li>Opriți cât mai în afara carosabilului și porniți luminile de avarie.</li>
              <li>Purtați vesta reflectorizantă și puneți triunghiul doar dacă o puteți face în siguranță.</li>
              <li>Pe autostradă, ieșiți prin dreapta și așteptați în spatele parapetului, nu lângă mașină.</li>
              <li>Sunați la <strong>{PHONE_DISPLAY}</strong> și spuneți locația exactă, ce vehicul aveți și ce s-a întâmplat.</li>
            </ol>
          </div>

          <div className="pt-10 border-t border-border flex flex-col md:flex-row justify-center items-center gap-8">
            <p className="font-bold uppercase tracking-widest text-sm text-muted-foreground">Detalii pe servicii:</p>
            <div className="flex flex-wrap justify-center gap-8">
              <Link href="/tractari-auto-sibiu" className="text-primary font-bold hover:underline">Tractări auto Sibiu</Link>
              <Link href="/depanare-auto-sibiu" className="text-primary font-bold hover:underline">Depanare auto</Link>
              <Link href="/transport-auto-sibiu" className="text-primary font-bold hover:underline">Transport programat</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <StickyCTA />
    </main>
  );
}
