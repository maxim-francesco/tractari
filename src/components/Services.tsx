import Image from 'next/image';
import Link from 'next/link';
import { Truck, Navigation, Settings, ShieldCheck, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const services = [
  {
    id: 'tractari',
    title: 'Tractări Auto',
    description: 'Recuperare și transport pentru autoturisme, SUV-uri sau autoutilitare avariate.',
    icon: Truck,
    image: 'hero-tow-truck',
    href: '/tractari-auto-sibiu'
  },
  {
    id: 'transport',
    title: 'Transport Auto',
    description: 'Transport pe platformă la nivel național și internațional în condiții de maximă siguranță.',
    icon: Navigation,
    image: 'car-transport',
    href: '/transport-auto-sibiu'
  },
  {
    id: 'asistenta',
    title: 'Asistență Rutieră',
    description: 'Intervenții rapide 24/7 pentru orice tip de incident rutier în Sibiu.',
    icon: ShieldCheck,
    image: 'emergency-service',
    href: '/asistenta-rutiera-sibiu'
  },
  {
    id: 'depanare',
    title: 'Depanare pe Loc',
    description: 'Ajutor pentru baterie, roată, alimentare greșită sau deblocare uși fără daune.',
    icon: Settings,
    image: 'roadside-assistance',
    href: '/depanare-auto-sibiu'
  }
];

export default function Services() {
  return (
    <section id="servicii" className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase font-headline tracking-tighter">
            Servicii <span className="text-primary">Complete</span>
          </h2>
          <div className="w-24 h-2 bg-primary mx-auto rounded-full mb-8"></div>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto font-medium">
            Suntem pregătiți să intervenim cu echipamente moderne pentru a vă oferi soluții rapide în orice situație.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const serviceImg = PlaceHolderImages.find(img => img.id === service.image);
            return (
              <Link key={service.id} href={service.href} className="group">
                <Card className="h-full overflow-hidden border border-border bg-secondary/20 hover:border-primary/50 hover:bg-secondary/40 transition-all duration-300 rounded-3xl group">
                  <div className="relative h-48">
                    <Image
                      src={serviceImg?.imageUrl || 'https://picsum.photos/600/400'}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                      data-ai-hint={serviceImg?.imageHint || 'towing'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent" />
                    <div className="absolute bottom-4 left-6">
                      <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                        <service.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">{service.title}</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed font-medium">
                      {service.description}
                    </p>
                    <div className="flex items-center text-primary font-black uppercase text-sm tracking-widest group-hover:gap-3 gap-2 transition-all">
                      Află mai mult <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
