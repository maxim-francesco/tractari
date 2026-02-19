import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Clock, MapPin, Truck, Phone, Check } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Asistență Rutieră Sibiu 24/7 | +40 742 916 370',
  description: 'Servicii complete de asistență rutieră în Sibiu. Intervenții de urgență pentru pană, pornire curent sau accident. Disponibili 24/7 în tot județul.',
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
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Intervenim prompt în caz de pană, baterie descărcată sau accident. Serviciile noastre sunt disponibile non-stop în tot județul Sibiu și pe A1.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold h-14 px-8 rounded-xl" asChild>
                <a href="tel:+40742916370">ASISTENȚĂ: +40 742 916 370</a>
              </Button>
            </div>
            <div className="flex-1 w-full max-w-lg aspect-square bg-secondary/30 rounded-full border border-primary/20 flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-primary/5 animate-pulse" />
               <div className="relative text-center p-12">
                  <Clock className="w-16 h-16 text-primary mx-auto mb-4" />
                  <p className="text-2xl font-bold uppercase">Răspuns Rapid</p>
                  <p className="text-5xl font-black text-primary">30 MIN</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 uppercase">Soluții Complete la Orice Oră</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Acoperim orice situație neprevăzută pe drumurile din județul Sibiu.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {[
              { title: 'Tractare Urgentă', desc: 'Recuperare vehicul de la locul incidentului.' },
              { title: 'Pornire Curent', desc: 'Ajutor rapid pentru baterii descărcate.' },
              { title: 'Pană de Cauciuc', desc: 'Schimb roată sau asistență vulcanizare.' },
              { title: 'Alimentare Greșită', desc: 'Golire și curățare rezervor pe loc.' }
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
        </div>
      </section>

      <Footer />
      <StickyCTA />
    </main>
  );
}
