import { Phone, Clock, MapPin, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background Gradient */}
      <div 
        className="absolute inset-0 z-0" 
        style={{ background: 'linear-gradient(135deg, #0A0A0A 0%, #1a1a1a 50%, #0A0A0A 100%)' }} 
      />

      <div className="max-w-7xl mx-auto px-4 relative z-10 w-full py-20">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 px-4 py-2 rounded-full text-primary font-black text-sm mb-8 uppercase tracking-widest">
            <div className="w-2 h-2 rounded-full bg-primary animate-ping" aria-hidden="true" />
            Intervenție Rapidă Sibiu & A1
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-headline mb-8 leading-[0.9] uppercase tracking-tighter">
            Tractări Auto <br />
            <span className="text-primary italic">Sibiu 24/7</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl leading-relaxed font-medium">
            Servicii profesionale de asistență rutieră și transport pe platformă. Ajungem la tine rapid oriunde în județul Sibiu.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 mb-16">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-black h-16 px-10 text-xl rounded-2xl shadow-[0_0_30px_rgba(255,107,0,0.3)] group" asChild>
              <a href="tel:+40742916370" aria-label="Sună acum la +40 742 916 370">
                <Phone className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" aria-hidden="true" />
                SUNĂ ACUM: +40 742 916 370
              </a>
            </Button>
            <Button size="lg" variant="outline" className="h-16 px-10 text-xl rounded-2xl border-white/40 hover:bg-white/10 font-bold text-white" asChild>
              <a href="#servicii">Vezi Servicii</a>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-white/10">
            <div className="flex items-center gap-4 group">
              <div className="w-14 h-14 rounded-2xl bg-secondary/50 flex items-center justify-center border border-white/10 group-hover:border-primary/50 transition-colors">
                <Clock className="w-7 h-7 text-primary" aria-hidden="true" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg uppercase tracking-tight text-white">Disponibili 24/7</span>
                <span className="text-white/80 text-sm">Non-stop la datorie</span>
              </div>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="w-14 h-14 rounded-2xl bg-secondary/50 flex items-center justify-center border border-white/10 group-hover:border-primary/50 transition-colors">
                <CheckCircle className="w-7 h-7 text-primary" aria-hidden="true" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg uppercase tracking-tight text-white">Ajungem în 30 min</span>
                <span className="text-white/80 text-sm">Timp record de răspuns</span>
              </div>
            </div>
            <div className="flex items-center gap-4 group">
              <div className="w-14 h-14 rounded-2xl bg-secondary/50 flex items-center justify-center border border-white/10 group-hover:border-primary/50 transition-colors">
                <MapPin className="w-7 h-7 text-primary" aria-hidden="true" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg uppercase tracking-tight text-white">Județul Sibiu</span>
                <span className="text-white/80 text-sm">Acoperire completă</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
