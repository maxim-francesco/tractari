import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import TrustSignals from '@/components/TrustSignals';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import { Truck, Shield, Clock } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <TrustSignals />
      <Services />
      
      <section id="despre" className="py-32 bg-secondary/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-20">
            <div className="flex-1 order-2 md:order-1">
              <div className="inline-flex items-center gap-2 text-primary font-black mb-6 uppercase tracking-widest text-sm">
                <Shield className="w-5 h-5" /> Siguranță Garantată
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-8 font-headline uppercase tracking-tighter leading-tight">
                Lideri Locali în <br />
                <span className="text-primary">Tractări Auto</span>
              </h2>
              <p className="text-muted-foreground text-xl leading-relaxed mb-8 font-medium">
                Cu o experiență de peste 10 ani în domeniul asistenței rutiere, echipa noastră din Sibiu a ajutat mii de șoferi să ajungă în siguranță la destinație.
              </p>
              
              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h4 className="font-black uppercase tracking-tight text-lg">Asigurare CMR Inclusă</h4>
                    <p className="text-muted-foreground">Orice vehicul transportat de noi este asigurat pe toată durata transportului.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h4 className="font-black uppercase tracking-tight text-lg">Echipamente Moderne</h4>
                    <p className="text-muted-foreground">Folosim platforme de ultimă generație dotate cu sisteme de ancorare profesionale.</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl border border-border bg-background shadow-xl">
                  <div className="text-primary font-black text-4xl mb-2 tracking-tighter">100%</div>
                  <div className="text-sm text-muted-foreground font-bold uppercase tracking-widest">Clienți Mulțumiți</div>
                </div>
                <div className="p-6 rounded-2xl border border-border bg-background shadow-xl">
                  <div className="text-primary font-black text-4xl mb-2 tracking-tighter">24/7</div>
                  <div className="text-sm text-muted-foreground font-bold uppercase tracking-widest">Disponibilitate</div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 order-1 md:order-2 relative w-full max-w-xl aspect-square">
              <div className="absolute inset-0 bg-primary/20 rounded-[4rem] rotate-6 scale-95" />
              <div className="absolute inset-0 bg-secondary/20 rounded-[4rem] -rotate-3" />
              <div className="relative h-full w-full rounded-[4rem] overflow-hidden shadow-2xl border-4 border-white/5">
                <img 
                  src="https://picsum.photos/seed/experience/800/800" 
                  alt="Echipa Tractări Sibiu Intervenție" 
                  className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
      <Contact />
      <Footer />
      <StickyCTA />
    </main>
  );
}
