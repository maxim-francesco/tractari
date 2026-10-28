import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import { Button } from '@/components/ui/button';
import { Truck, Globe, Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { JsonLd, PHONE_DISPLAY, PHONE_HREF, breadcrumbJsonLd, pageMetadata, serviceJsonLd } from '@/lib/site';

const PATH = '/transport-auto-sibiu';

// Vehicule: doar autoturisme și dube (confirmat 28.10.2026).
// TODO(confirmare operator): transport internațional și asigurare.
export const metadata: Metadata = pageMetadata({
  path: PATH,
  title: 'Transport Auto pe Platformă Sibiu | La Service, RAR, Acasă',
  description: `Transport auto pe platformă din Sibiu, programat: la service, la RAR sau o mașină cumpărată din alt oraș. Ziua și prețul le stabilim la telefon.`,
});

export default function TransportAutoPage() {

  return (
    <main className="min-h-screen">
      <Navigation />
      <JsonLd data={serviceJsonLd({ path: PATH, name: 'Transport auto pe platformă din Sibiu', description: metadata.description as string, serviceType: 'Transport auto pe platformă' })} />
      <JsonLd data={breadcrumbJsonLd([{ name: 'Transport Auto Sibiu', path: PATH }])} />
      
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/20 to-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold font-headline mb-6 uppercase tracking-tight">
              Transport Auto Sibiu <span className="block text-primary">Pe Platformă</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Transport programat pe platformă din Sibiu: la service, la RAR, acasă sau o mașină cumpărată din altă localitate. Spuneți-ne de unde, până unde și ce vehicul, iar noi vă dăm prețul și ziua.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold h-auto min-h-14 py-3 whitespace-normal max-w-full px-6 sm:px-8 rounded-xl shadow-xl shadow-primary/20" asChild>
                <a href={PHONE_HREF} data-cta="service-hero">Cere Ofertă: {PHONE_DISPLAY}</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/5">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-white uppercase font-headline">Transport mașină pe platformă din Sibiu</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="p-8 rounded-3xl bg-background border border-border hover:border-primary/50 transition-colors">
              <Globe className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-xl font-bold mb-4 uppercase">Distanțe Lungi</h3>
              <p className="text-muted-foreground">Pentru destinații din afara județului sau din străinătate, sunați și vă spunem dacă putem prelua cursa și în ce condiții.</p>
            </div>
            <div className="p-8 rounded-3xl bg-background border border-border hover:border-primary/50 transition-colors">
              <Shield className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-xl font-bold mb-4 uppercase">Condiții Clare</h3>
              <p className="text-muted-foreground">Prețul, ziua preluării și condițiile de transport le stabilim la telefon, înainte de plecare.</p>
            </div>
            <div className="p-8 rounded-3xl bg-background border border-border hover:border-primary/50 transition-colors">
              <Truck className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-xl font-bold mb-4 uppercase">Spuneți-ne Vehiculul</h3>
              <p className="text-muted-foreground">Marca, modelul și starea mașinii ne ajută să confirmăm dacă o putem încărca pe platformă.</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <h2 className="text-3xl font-bold mb-8 text-white uppercase font-headline">Când aveți nevoie de transport auto programat</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-muted-foreground">
              <div>
                <p>Ai cumpărat o mașină din altă localitate, trebuie să ajungi la RAR sau la service cu o mașină care nu mai circulă? Programăm transportul pe platformă din Sibiu.</p>
                <p className="mt-4">Pentru o ofertă, pregătiți adresa de preluare, destinația, marca și modelul și dacă mașina pornește și rulează.</p>
              </div>
              <div className="bg-background p-6 rounded-2xl border border-border">
                <h4 className="text-white font-bold mb-4">Servicii Specializate:</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Transport mașini noi sau second-hand</li>
                  <li>Transport vehicule pentru RAR sau Service</li>
                  <li>Transport mașini avariate sau nefuncționale</li>
                                  </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-20 text-center">
            <h3 className="text-2xl font-bold mb-6">Alte servicii în Sibiu</h3>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/tractari-auto-sibiu" className="flex items-center gap-2 text-primary font-bold hover:underline">
                <Truck className="w-5 h-5" /> Tractări Auto
              </Link>
              <Link href="/depanare-auto-sibiu" className="flex items-center gap-2 text-primary font-bold hover:underline">
                <ArrowRight className="w-5 h-5" /> Depanare Auto
              </Link>
              <Link href="/asistenta-rutiera-sibiu" className="flex items-center gap-2 text-primary font-bold hover:underline">
                <Shield className="w-5 h-5" /> Asistență Rutieră
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <StickyCTA />
    </main>
  );
}
