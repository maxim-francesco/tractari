import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import TrustSignals from '@/components/TrustSignals';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import FaqList from '@/components/FaqList';
import { MapPin, Shield, HelpCircle, Truck } from 'lucide-react';
import { AREA_SERVED, JsonLd, PHONE_DISPLAY, faqJsonLd, pageMetadata } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  path: '/',
  title: 'Tractări Auto Sibiu Non-Stop | Platformă Auto și Asistență',
  description: `Tractări auto Sibiu non-stop: platformă auto, asistență rutieră și tractări pe Autostrada A1. Prețul vi-l spunem la telefon. Sunați: 0742 916 370`,
});

const locations = ['Sibiu', 'Autostrada A1', ...AREA_SERVED.filter((loc) => loc !== 'Sibiu')];

// TODO(confirmare operator): răspunsurile despre vehicule, alimentare greșită și zone
// trebuie confirmate de operator înainte de a fi formulate mai ferm.
const faqItems = [
  {
    q: "Cât costă o tractare auto în Sibiu?",
    a: `Prețul depinde de distanță, tipul și starea vehiculului și locul preluării. Sunați la ${PHONE_DISPLAY}, descrieți situația, iar prețul vi-l comunicăm înainte de plecarea platformei.`
  },
  {
    q: "În cât timp ajungeți la locul incidentului?",
    a: "Timpul depinde de locul în care vă aflați, de trafic și de intervențiile în curs. Când sunați, vă spunem un timp estimat de sosire pentru locația dumneavoastră."
  },
  {
    q: "Oferiți servicii de tractare 24/7, inclusiv în weekend și sărbători?",
    a: "Da, preluăm apeluri non-stop, inclusiv în weekend și de sărbători."
  },
  {
    q: "Puteți tracta mașini accidentate sau fără roți?",
    a: "Spuneți-ne la telefon ce s-a întâmplat (roți blocate, direcție blocată, avarii după accident). Vă confirmăm pe loc dacă putem prelua vehiculul și cum."
  },
  {
    q: "Ce vehicule tractați?",
    a: "Tractăm doar autoturisme și dube; camioane, autocare sau utilaje nu tractăm. Spuneți-ne marca și modelul, iar noi vă confirmăm la telefon cum încărcăm vehiculul."
  },
  {
    q: "Ce fac dacă am rămas fără baterie sau am pană de cauciuc?",
    a: `Sunați la ${PHONE_DISPLAY}. Pentru baterie descărcată sau roată de rezervă vă spunem la telefon dacă se poate rezolva la fața locului sau dacă e nevoie de tractare.`
  },
  {
    q: "Oferiți servicii pe Autostrada A1 lângă Sibiu?",
    a: `Da, intervenim pe A1 în zona Sibiu. Opriți pe banda de urgență, porniți avariile, ieșiți din mașină prin dreapta și treceți în spatele parapetului, apoi sunați la ${PHONE_DISPLAY}.`
  },
  {
    q: "Ce se întâmplă dacă am alimentat greșit mașina?",
    a: `Nu porniți motorul și nu puneți contactul. Sunați la ${PHONE_DISPLAY}: vă spunem dacă mașina trebuie tractată la service sau ce alte variante există.`
  }
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <JsonLd data={faqJsonLd(faqItems)} />
      <Navigation />
      <main role="main">
        <Hero />
        <TrustSignals />
        <Services />
        
        <section id="coverage" className="py-32 bg-secondary/5" aria-labelledby="coverage-title">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 id="coverage-title" className="text-4xl md:text-6xl font-black mb-6 uppercase font-headline tracking-tighter text-white">
                Tractări în Sibiu, <span className="text-primary">Împrejurimi și pe A1</span>
              </h2>
              <p className="text-white/90 text-xl max-w-3xl mx-auto font-medium">
                Tractări Sibiu și asistență rutieră în tot județul, pe Autostrada A1 în zona Sibiu și pe Valea Oltului (DN7) până la Râmnicu Vâlcea, inclusiv în localitățile de mai jos. Pentru alte localități, sunați și vă spunem dacă putem ajunge și în cât timp.
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
                Întrebări despre <span className="text-primary">Tractări Auto Sibiu</span>
              </h2>
              <p className="text-white/90 text-xl font-medium">
                Răspunsuri la cele mai comune întrebări despre serviciile noastre.
              </p>
            </div>

            <FaqList items={faqItems} />
          </div>
        </section>

        <section id="despre" className="py-32 bg-background overflow-hidden border-t border-border" aria-labelledby="about-title">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-20">
              <div className="flex-1 order-2 md:order-1">
                <div className="inline-flex items-center gap-2 text-primary font-black mb-6 uppercase tracking-widest text-sm">
                  <Shield className="w-5 h-5" aria-hidden="true" /> Cum lucrăm
                </div>
                <h2 id="about-title" className="text-4xl md:text-6xl font-black mb-8 font-headline uppercase tracking-tighter leading-tight text-white">
                  Platformă Auto Sibiu: <br />
                  <span className="text-primary">Cum Lucrăm</span>
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
                      {/* TODO(confirmare operator): tipul de asigurare pentru vehiculele transportate. */}
                      <h3 className="font-black uppercase tracking-tight text-lg text-white">Preț stabilit înainte de plecare</h3>
                      <p className="text-white/80">Vă spunem prețul și condițiile de transport la telefon, înainte să plece platforma.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1" aria-hidden="true">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <div>
                      <h3 className="font-black uppercase tracking-tight text-lg text-white">Spuneți-ne situația exactă</h3>
                      <p className="text-white/80">Locația, tipul vehiculului și ce s-a întâmplat ne ajută să vă spunem corect dacă și cum putem interveni.</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl border border-border bg-background shadow-xl">
                    <div className="text-primary font-black text-4xl mb-2 tracking-tighter">NON-STOP</div>
                    <div className="text-sm text-white/80 font-bold uppercase tracking-widest">Disponibilitate</div>
                  </div>
                  <div className="p-6 rounded-2xl border border-border bg-background shadow-xl">
                    <div className="text-primary font-black text-4xl mb-2 tracking-tighter">A1</div>
                    <div className="text-sm text-white/80 font-bold uppercase tracking-widest">Zona Sibiu</div>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 order-1 md:order-2 relative w-full max-w-xl aspect-square bg-secondary/30 rounded-[4rem] border border-primary/20 flex items-center justify-center overflow-hidden" aria-hidden="true">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                <div className="relative text-center p-12">
                  <Truck className="w-32 h-32 text-primary mx-auto mb-6 opacity-50" />
                  <p className="text-3xl font-black uppercase tracking-tighter italic text-white">Sunați <br/><span className="text-primary">Non-Stop</span></p>
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
