import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import TrustSignals from '@/components/TrustSignals';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import { MapPin, Shield, HelpCircle, Truck } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const locations = [
  "Sibiu", "Autostrada A1", "Șelimbăr", "Cisnădie", "Avrig", "Tălmaciu", 
  "Ocna Sibiului", "Mediaș", "Agnita", "Dumbrăveni", "Păltiniș", "Rășinari"
];

const faqItems = [
  {
    q: "Cât costă o tractare auto în Sibiu?",
    a: "Prețul unei tractări auto în Sibiu variază în funcție de distanță și tipul vehiculului. Contactați-ne la +40 742 916 370 pentru un preț exact. Oferim tarife transparente fără costuri ascunse."
  },
  {
    q: "În cât timp ajungeți la locul incidentului?",
    a: "Timpul nostru mediu de răspuns în Sibiu și împrejurimi este de 20-30 de minute. Acoperim tot județul Sibiu, inclusiv Autostrada A1, Șelimbăr, Cisnădie, Avrig și alte localități."
  },
  {
    q: "Oferiți servicii de tractare 24/7, inclusiv în weekend și sărbători?",
    a: "Da! Suntem disponibili 24 de ore din 24, 7 zile din 7, inclusiv în weekend și în toate zilele de sărbătoare. Indiferent când aveți nevoie, suntem un telefon distanță."
  },
  {
    q: "Puteți tracta mașini accidentate sau fără roți?",
    a: "Da, dispunem de echipamente specializate pentru tractarea oricărui tip de vehicul, inclusiv mașini grav avariate, fără roți sau în poziții dificile."
  },
  {
    q: "Tractați și SUV-uri, dube sau vehicule mari?",
    a: "Absolut! Avem platforme speciale pentru SUV-uri, dubite, utilitare și chiar utilaje grele. Indiferent de dimensiunea vehiculului, avem soluția potrivită."
  },
  {
    q: "Ce fac dacă am rămas fără baterie sau am pană de cauciuc?",
    a: "Sunați-ne la +40 742 916 370 și ajungem rapid. Oferim servicii de pornire la curent extern și asistență pentru pană de cauciuc direct la fața locului în tot județul Sibiu."
  },
  {
    q: "Oferiți servicii pe Autostrada A1 lângă Sibiu?",
    a: "Da, intervenim și pe Autostrada A1 în zona Sibiu. Dacă ați rămas în pană pe autostradă, sunați imediat la +40 742 916 370 pentru intervenție rapidă și sigură."
  },
  {
    q: "Ce se întâmplă dacă am alimentat greșit mașina?",
    a: "Nu porniți motorul! Sunați-ne imediat la +40 742 916 370. Oferim servicii specializate pentru vehicule alimentate cu combustibil greșit, fie benzină în loc de motorină sau invers."
  }
];

export default function Home() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navigation />
      <main role="main">
        <Hero />
        <TrustSignals />
        <Services />
        
        <section id="coverage" className="py-32 bg-secondary/5" aria-labelledby="coverage-title">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 id="coverage-title" className="text-4xl md:text-6xl font-black mb-6 uppercase font-headline tracking-tighter text-white">
                Acoperim Sibiu și <span className="text-primary">Împrejurimile</span>
              </h2>
              <p className="text-white/90 text-xl max-w-3xl mx-auto font-medium">
                Oferim servicii de tractare auto și asistență rutieră în tot județul Sibiu, inclusiv pe Autostrada A1 și în localități precum Șelimbăr. Indiferent unde te afli, ajungem la tine rapid și sigur.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {locations.map((loc) => (
                <div key={loc} className="flex items-center gap-3 p-4 bg-background border border-border rounded-2xl hover:border-primary/50 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                    <MapPin className="w-5 h-5 text-primary group-hover:text-white" aria-hidden="true" />
                  </div>
                  <span className="font-bold uppercase tracking-tight text-sm md:text-base text-white">{loc}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="py-32 bg-background border-t border-border" aria-labelledby="faq-title">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 text-primary font-black mb-4 uppercase tracking-widest text-sm">
                <HelpCircle className="w-5 h-5" aria-hidden="true" /> Suport 24/7
              </div>
              <h2 id="faq-title" className="text-4xl md:text-6xl font-black mb-6 uppercase font-headline tracking-tighter text-white">
                Întrebări <span className="text-primary">Frecvente</span>
              </h2>
              <p className="text-white/90 text-xl font-medium">
                Răspunsuri la cele mai comune întrebări despre serviciile noastre.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqItems.map((item, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="border border-border bg-secondary/10 rounded-2xl px-6">
                  <AccordionTrigger className="text-lg font-black uppercase tracking-tight hover:text-primary hover:no-underline py-6 text-white">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/80 text-lg leading-relaxed pb-6">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section id="despre" className="py-32 bg-background overflow-hidden border-t border-border" aria-labelledby="about-title">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-20">
              <div className="flex-1 order-2 md:order-1">
                <div className="inline-flex items-center gap-2 text-primary font-black mb-6 uppercase tracking-widest text-sm">
                  <Shield className="w-5 h-5" aria-hidden="true" /> Siguranță Garantată
                </div>
                <h2 id="about-title" className="text-4xl md:text-6xl font-black mb-8 font-headline uppercase tracking-tighter leading-tight text-white">
                  Partenerul Tău în <br />
                  <span className="text-primary">Asistență Rutieră</span>
                </h2>
                <p className="text-white/90 text-xl leading-relaxed mb-8 font-medium">
                  Cu dedicare și profesionalism, echipa noastră din Sibiu este ajutorul pe care te poți baza oricând ai o problemă cu vehiculul tău, indiferent de oră sau locație.
                </p>
                
                <div className="space-y-6 mb-12">
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1" aria-hidden="true">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <div>
                      <h3 className="font-black uppercase tracking-tight text-lg text-white">Asigurare CMR Inclusă</h3>
                      <p className="text-white/80">Orice vehicul transportat de noi este asigurat pe toată durata transportului.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1" aria-hidden="true">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <div>
                      <h3 className="font-black uppercase tracking-tight text-lg text-white">Echipamente Profesionale</h3>
                      <p className="text-white/80">Folosim platforme moderne și roboți de pornire de ultimă generație.</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl border border-border bg-background shadow-xl">
                    <div className="text-primary font-black text-4xl mb-2 tracking-tighter">NON-STOP</div>
                    <div className="text-sm text-white/80 font-bold uppercase tracking-widest">Disponibilitate</div>
                  </div>
                  <div className="p-6 rounded-2xl border border-border bg-background shadow-xl">
                    <div className="text-primary font-black text-4xl mb-2 tracking-tighter">CMR</div>
                    <div className="text-sm text-white/80 font-bold uppercase tracking-widest">Transport Asigurat</div>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 order-1 md:order-2 relative w-full max-w-xl aspect-square bg-secondary/30 rounded-[4rem] border border-primary/20 flex items-center justify-center overflow-hidden" aria-hidden="true">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                <div className="relative text-center p-12">
                  <Truck className="w-32 h-32 text-primary mx-auto mb-6 opacity-50" />
                  <p className="text-3xl font-black uppercase tracking-tighter italic text-white">Promptitudine <br/><span className="text-primary">Garantată</span></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
}
