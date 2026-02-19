import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import { Button } from '@/components/ui/button';
import { Truck, Globe, Shield, CreditCard, Phone, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Transport Auto Sibiu | Platformă Națională și Internațională',
  description: 'Servicii de transport auto pe platformă din Sibiu către orice locație din România sau Europa. Siguranță maximă, prețuri competitive și asigurare inclusă.',
  alternates: {
    canonical: 'https://tractarimasinisibiu.ro/transport-auto-sibiu',
  },
};

export default function TransportAutoPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Acasă", "item": "https://tractarimasinisibiu.ro" },
      { "@type": "ListItem", "position": 2, "name": "Transport Auto Sibiu", "item": "https://tractarimasinisibiu.ro/transport-auto-sibiu" }
    ]
  };

  return (
    <main className="min-h-screen">
      <Navigation />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/20 to-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold font-headline mb-6 uppercase tracking-tight">
              Transport Auto Sibiu — <span className="text-primary">Național și Internațional</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              Oferim servicii profesionale de transport autoturisme, vehicule de lux sau utilaje pe platformă. Din Sibiu livrăm în toată țara și în Europa, cu garanția integrității vehiculului tău.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold h-14 px-8 rounded-xl shadow-xl shadow-primary/20" asChild>
                <a href="tel:0700000000">Cere Ofertă: 0700 000 000</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="p-8 rounded-3xl bg-background border border-border hover:border-primary/50 transition-colors">
              <Globe className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-xl font-bold mb-4 uppercase">Acoperire Europa</h3>
              <p className="text-muted-foreground">Transportăm mașini din și către Germania, Austria, Belgia, Olanda sau orice altă țară din UE.</p>
            </div>
            <div className="p-8 rounded-3xl bg-background border border-border hover:border-primary/50 transition-colors">
              <Shield className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-xl font-bold mb-4 uppercase">Asigurare CMR</h3>
              <p className="text-muted-foreground">Fiecare transport este asigurat. Mașina ta este în siguranță de la preluare până la destinație.</p>
            </div>
            <div className="p-8 rounded-3xl bg-background border border-border hover:border-primary/50 transition-colors">
              <Truck className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-xl font-bold mb-4 uppercase">Flotă Diversă</h3>
              <p className="text-muted-foreground">Dispunem de platforme pentru o singură mașină sau trailere pentru transport multiplu.</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <h2 className="text-3xl font-bold mb-8 text-white uppercase font-headline">De ce să alegi transportul nostru auto din Sibiu?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-muted-foreground">
              <div>
                <p>Echipa noastră oferă soluții logistice complete pentru transportul auto. Indiferent dacă ai cumpărat o mașină nouă din altă localitate sau ai nevoie să trimiți un vehicul peste hotare, noi ne ocupăm de toate detaliile tehnice ale transportului.</p>
                <p className="mt-4">Suntem recunoscuți în Sibiu pentru promptitudinea cu care onorăm comenzile și pentru grija deosebită pe care o purtăm fiecărui vehicul, indiferent de valoarea acestuia.</p>
              </div>
              <div className="bg-background p-6 rounded-2xl border border-border">
                <h4 className="text-white font-bold mb-4">Servicii Specializate:</h4>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Transport mașini noi sau second-hand</li>
                  <li>Transport vehicule pentru RAR sau Service</li>
                  <li>Transport mașini avariate sau nefuncționale</li>
                  <li>Transport utilaje agricole și industriale ușoare</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-20 text-center">
            <h3 className="text-2xl font-bold mb-6">Navigați către alte servicii</h3>
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
