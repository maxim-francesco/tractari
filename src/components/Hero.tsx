import Image from 'next/image';
import { Phone, Clock, MapPin, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-tow-truck');

  return (
    <section className="relative min-h-[90vh] flex items-center pt-16 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage?.imageUrl || 'https://picsum.photos/seed/tow1/1200/800'}
          alt="Tractări Auto Sibiu"
          fill
          className="object-cover opacity-30 grayscale"
          priority
          data-ai-hint="tow truck"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10 py-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full text-primary font-bold text-xs mb-6 uppercase tracking-wider animate-pulse">
            <Zap className="w-3 h-3" />
            Intervenție Rapidă în Sibiu
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-headline mb-6 leading-[1.1]">
            Tractări Auto Sibiu — <span className="text-primary">Rapid, 24/7, Profesional</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
            Echipa noastră de asistență rutieră este pregătită să intervină în orice moment pentru tractări, depanări și transport auto în Sibiu și județ. Ajungem la tine în maxim 30 de minute.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-black h-14 px-8 text-lg rounded-xl shadow-xl shadow-primary/25" asChild>
              <a href="tel:0700000000">
                <Phone className="w-5 h-5 mr-3" />
                SUNĂ ACUM: 0700 000 000
              </a>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-xl border-white/20 hover:bg-white/5" asChild>
              <a href="#servicii">Vezi Servicii</a>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center border border-border">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <span className="font-semibold">24/7 Disponibilitate</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center border border-border">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <span className="font-semibold">30 Min. Răspuns</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center border border-border">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <span className="font-semibold">Sibiu & Împrejurimi</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
