import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Clock, MapPin, Truck, Phone, Check } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Asistență Rutieră Sibiu 24/7 | Intervenții de Urgență',
  description: 'Servicii complete de asistență rutieră în Sibiu. Suntem partenerul tău în caz de accident sau defecțiune tehnică, zi și noapte. Intervenție rapidă în tot județul.',
  alternates: {
    canonical: 'https://tractarimasinisibiu.ro/asistenta-rutiera-sibiu',
  },
};

export default function AsistentaRutieraPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Acasă", "item": "https://tractarimasinisibiu.ro" },
      { "@type": "ListItem", "position": 2, "name": "Asistență Rutieră Sibiu", "item": "https://tractarimasinisibiu.ro/asistenta-rutiera-sibiu" }
    ]
  };

  return (
    <main className="min-h-screen">
      <Navigation />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/20 to-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-primary font-bold mb-4 uppercase tracking-tighter">
                <ShieldCheck className="w-5 h-5" /> Partenerul tău de drum
              </div>
              <h1 className="text-4xl md:text-6xl font-bold font-headline mb-6 uppercase tracking-tight leading-tight">
                Asistență Rutieră <span className="text-primary">Sibiu 24/7</span>
              </h1 >
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Intervenim prompt în caz de pană sau accident. Serviciile noastre de asistență rutieră în Sibiu sunt disponibile non-stop pentru a-ți asigura mobilitatea și siguranța.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold h-14 px-8 rounded-xl shadow-2xl" asChild>
                <a href="tel:0700000000">ASISTENȚĂ IMEDIATĂ: 0700 000 000</a>
              </Button>
            </div>
            <div className="flex-1 w-full max-w-lg aspect-square bg-secondary/30 rounded-full border border-primary/20 flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-primary/5 animate-pulse" />
               <div className="relative text-center p-12">
                  <Clock className="w-16 h-16 text-primary mx-auto mb-4" />
                  <p className="text-2xl font-bold uppercase">Timp Răspuns</p>
                  <p className="text-5xl font-black text-primary">30 MIN</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 font-headline uppercase">Soluții Complete la Orice Oră</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Oferim o gamă variată de servicii de asistență pentru a acoperi orice situație neprevăzută pe drum.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {[
              { title: 'Remorcare Accident', desc: 'Recuperare vehicul de la locul evenimentului rutier.' },
              { title: 'Depanare Tehnică', desc: 'Reparații minore efectuate direct la fața locului.' },
              { title: 'Suport în Pană', desc: 'Ajutor pentru roată de rezervă sau pană de curent.' },
              { title: 'Transport Service', desc: 'Ducem mașina la orice unitate service agreată.' }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-3xl bg-secondary/20 border border-border hover:border-primary/50 transition-all group">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/40 transition-colors">
                  <Check className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-xl mb-3 uppercase tracking-tight">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="prose prose-invert max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-white uppercase font-headline">Asistență Rutieră în tot județul Sibiu</h3>
            <p className="text-muted-foreground mb-6">Indiferent unde te afli în județ, echipa noastră poate ajunge la tine. Suntem prezenți constant pe rutele principale din jurul Sibiului, asigurând o acoperire optimă pentru intervenții rapide.</p>
            <p className="text-muted-foreground mb-10">Mii de șoferi au apelat la serviciile noastre de asistență rutieră Sibiu și au apreciat profesionalismul cu care tratăm fiecare apel de urgență. Siguranța dumneavoastră este prioritatea noastră numărul unu.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose">
              <Link href="/tractari-auto-sibiu" className="p-6 rounded-2xl border border-border hover:bg-secondary/20 transition-all flex items-center justify-between group">
                <span className="font-bold uppercase tracking-wider">Servicii Tractări</span>
                <Truck className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/depanare-auto-sibiu" className="p-6 rounded-2xl border border-border hover:bg-secondary/20 transition-all flex items-center justify-between group">
                <span className="font-bold uppercase tracking-wider">Servicii Depanare</span>
                <MapPin className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
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
