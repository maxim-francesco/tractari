import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import { Button } from '@/components/ui/button';
import { Phone, Clock, MapPin, Truck, Shield, CheckCircle2, MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact | Tractări Auto Sibiu 24/7 | +40 742 916 370',
  description: 'Contactați Tractări Mașini Sibiu pentru asistență rapidă 24/7. Sunați acum la +40 742 916 370 sau scrieți pe WhatsApp. Răspundem imediat!',
  alternates: {
    canonical: 'https://tractarimasinisibiu.ro/contact',
  },
};

const locations = [
  "Sibiu", "Șelimbăr", "Cisnădie", "Avrig", "Tălmaciu", "Ocna Sibiului", 
  "Mediaș", "Agnita", "Dumbrăveni", "Păltiniș", "Rășinari", "Autostrada A1"
];

export default function ContactPage() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Acasă", "item": "https://tractarimasinisibiu.ro" },
      { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://tractarimasinisibiu.ro/contact" }
    ]
  };

  return (
    <main className="min-h-screen">
      <Navigation />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/20 to-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black font-headline mb-6 uppercase tracking-tighter">
              Contactați-ne — <span className="text-primary italic">Suntem Disponibili 24/7</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-medium">
              Indiferent de problemă sau locație, suntem gata să intervenim. Alegeți metoda de contact cea mai rapidă pentru dumneavoastră.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
            {/* Card 1 - Telefon */}
            <a 
              href="tel:+40742916370" 
              className="p-10 rounded-[2.5rem] bg-primary text-white flex flex-col items-center text-center group hover:scale-[1.02] transition-all shadow-2xl shadow-primary/30"
            >
              <div className="w-20 h-20 rounded-3xl bg-white/20 flex items-center justify-center mb-6 animate-pulse-orange">
                <Phone className="w-10 h-10 text-white" />
              </div>
              <span className="text-sm font-black uppercase tracking-widest mb-2 opacity-90">Sună Acum</span>
              <span className="text-2xl md:text-3xl font-black mb-2 tracking-tighter">+40 742 916 370</span>
              <span className="text-sm font-bold opacity-80">Răspundem imediat, 24/7</span>
            </a>

            {/* Card 2 - WhatsApp */}
            <a 
              href="https://wa.me/40742916370?text=Bună ziua! Am nevoie de ajutor cu tractarea mașinii." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-10 rounded-[2.5rem] bg-background border-2 border-[#25D366]/30 flex flex-col items-center text-center group hover:border-[#25D366] transition-all"
            >
              <div className="w-20 h-20 rounded-3xl bg-[#25D366]/10 flex items-center justify-center mb-6">
                <MessageCircle className="w-10 h-10 text-[#25D366]" />
              </div>
              <span className="text-sm font-black uppercase tracking-widest mb-2 text-muted-foreground">Scrie pe WhatsApp</span>
              <span className="text-2xl md:text-3xl font-black mb-2 tracking-tighter text-[#25D366]">+40 742 916 370</span>
              <span className="text-sm font-bold text-muted-foreground">Răspuns rapid prin mesaj</span>
            </a>

            {/* Card 3 - Program */}
            <div className="p-10 rounded-[2.5rem] bg-secondary/20 border-2 border-border flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-3xl bg-secondary flex items-center justify-center mb-6">
                <Clock className="w-10 h-10 text-primary" />
              </div>
              <span className="text-sm font-black uppercase tracking-widest mb-2 text-muted-foreground">Program Lucru</span>
              <span className="text-4xl font-black mb-2 tracking-tighter">24/7</span>
              <span className="text-sm font-bold text-muted-foreground">Inclusiv weekenduri și sărbători</span>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="py-24 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tighter font-headline">Zona Noastră de <span className="text-primary">Acoperire</span></h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">Baza noastră principală este în Sibiu, dar deservim întreg județul și segmentele adiacente de autostradă.</p>
          </div>

          <div className="rounded-[3rem] overflow-hidden border-4 border-secondary shadow-2xl mb-12">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d89411.29!2d24.1!3d45.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x474c671b632f7bf9%3A0x12a51dafdc59a016!2sSibiu!5e0!3m2!1sro!2sro!4v1"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {locations.map((loc) => (
              <div key={loc} className="px-6 py-2.5 rounded-full bg-secondary/20 border border-border text-sm font-black uppercase tracking-wider flex items-center gap-2 hover:border-primary transition-colors">
                <MapPin className="w-4 h-4 text-primary" />
                {loc}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-24 bg-secondary/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-6 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-primary" /> Informații Intervenție
                </h3>
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <div className="text-primary font-bold">01.</div>
                    <div>
                      <p className="font-black uppercase text-sm tracking-widest text-muted-foreground">Zonă de acoperire</p>
                      <p className="text-xl font-bold">Tot județul Sibiu & Autostrada A1</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="text-primary font-bold">02.</div>
                    <div>
                      <p className="font-black uppercase text-sm tracking-widest text-muted-foreground">Timp de răspuns</p>
                      <p className="text-xl font-bold">20-30 minute în Sibiu</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="text-primary font-bold">03.</div>
                    <div>
                      <p className="font-black uppercase text-sm tracking-widest text-muted-foreground">Disponibilitate</p>
                      <p className="text-xl font-bold">24/7, 365 zile pe an</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="pt-6">
                <p className="font-black uppercase text-sm tracking-widest text-muted-foreground mb-4">Servicii oferite la locație:</p>
                <div className="grid grid-cols-2 gap-y-3">
                  {['Tractări Auto', 'Depanare Baterie', 'Pornire Curent', 'Pană Cauciuc', 'Alimentare Greșită'].map((s) => (
                    <div key={s} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span className="font-bold text-sm">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-12 rounded-[3rem] bg-secondary/20 border border-primary/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Truck className="w-48 h-48" />
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tight mb-6">Aveți o urgență acum?</h3>
              <p className="text-muted-foreground text-lg mb-10 leading-relaxed font-medium">
                Nu pierdeți timp prețios! Sunați imediat și o platformă va fi trimisă către dumneavoastră în cel mai scurt timp posibil.
              </p>
              <div className="space-y-4">
                <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-white font-black h-16 rounded-2xl text-xl shadow-xl shadow-primary/30" asChild>
                  <a href="tel:+40742916370">
                    <Phone className="w-6 h-6 mr-3" />
                    +40 742 916 370
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="w-full h-16 rounded-2xl border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/5 font-black text-xl" asChild>
                  <a href="https://wa.me/40742916370" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-6 h-6 mr-3" />
                    WhatsApp Direct
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <StickyCTA />
    </main>
  );
}
