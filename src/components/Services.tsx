import Image from 'next/image';
import Link from 'next/link';
import { Truck, Car, Wrench, Battery, TriangleAlert, Fuel, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const services = [
  {
    id: 'autoturisme',
    title: 'Tractări Autoturisme',
    description: 'Transport sigur pentru orice tip de autoturism, inclusiv mașini accidentate sau fără roți.',
    icon: Car,
    image: 'hero-tow-truck',
    href: '/tractari-auto-sibiu'
  },
  {
    id: 'suv-dubite',
    title: 'Tractări SUV & Dubite',
    description: 'Platformă specială pentru vehicule mai mari și mai grele, inclusiv SUV-uri și utilitare.',
    icon: Truck,
    image: 'car-transport',
    href: '/tractari-auto-sibiu'
  },
  {
    id: 'utilaje',
    title: 'Transport Utilaje',
    description: 'Transportăm utilaje și echipamente grele cu platforme specializate din Sibiu.',
    icon: Wrench,
    image: 'car-transport',
    href: '/transport-auto-sibiu'
  },
  {
    id: 'curent',
    title: 'Pornire Curent',
    description: 'Bateria te-a lăsat? Venim rapid pentru pornire de la baterie externă în Sibiu și A1.',
    icon: Battery,
    image: 'roadside-assistance',
    href: '/depanare-auto-sibiu'
  },
  {
    id: 'pana',
    title: 'Pană de Cauciuc',
    description: 'Asistență rapidă pentru schimbarea roților sau transport către vulcanizare 24/7.',
    icon: TriangleAlert,
    image: 'emergency-service',
    href: '/depanare-auto-sibiu'
  },
  {
    id: 'alimentare',
    title: 'Alimentare Greșită',
    description: 'Ajutor profesional în cazul alimentării cu combustibil nepotrivit. Golire rezervor pe loc.',
    icon: Fuel,
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
            Servicii <span className="text-primary">Profesionale</span>
          </h2>
          <div className="w-24 h-2 bg-primary mx-auto rounded-full mb-8"></div>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto font-medium">
            Oferim soluții complete de asistență rutieră și tractări auto cu echipamente moderne și personal calificat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const serviceImg = PlaceHolderImages.find(img => img.id === service.image);
            return (
              <Link key={service.id} href={service.href} className="group">
                <Card className="h-full overflow-hidden border border-border bg-secondary/20 hover:border-primary/50 hover:bg-secondary/40 transition-all duration-300 rounded-3xl">
                  <div className="relative h-48">
                    <Image
                      src={serviceImg?.imageUrl || 'https://picsum.photos/600/400'}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                      loading="lazy"
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
