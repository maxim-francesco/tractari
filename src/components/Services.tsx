import Link from 'next/link';
import { Truck, Car, Wrench, Battery, TriangleAlert, Fuel, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const services = [
  {
    id: 'autoturisme',
    title: 'Tractări Autoturisme',
    description: 'Transport sigur pentru orice tip de autoturism, inclusiv mașini accidentate sau fără roți.',
    icon: Car,
    href: '/tractari-auto-sibiu'
  },
  {
    id: 'suv-dubite',
    title: 'Tractări SUV & Dubite',
    description: 'Platformă specială pentru vehicule mai mari și mai grele, inclusiv SUV-uri și utilitare.',
    icon: Truck,
    href: '/tractari-auto-sibiu'
  },
  {
    id: 'utilaje',
    title: 'Transport Utilaje',
    description: 'Transportăm utilaje și echipamente grele cu platforme specializate din Sibiu.',
    icon: Wrench,
    href: '/transport-auto-sibiu'
  },
  {
    id: 'curent',
    title: 'Pornire Curent',
    description: 'Bateria te-a lăsat? Venim rapid pentru pornire de la baterie externă în Sibiu și A1.',
    icon: Battery,
    href: '/depanare-auto-sibiu'
  },
  {
    id: 'pana',
    title: 'Pană de Cauciuc',
    description: 'Asistență rapidă pentru schimbarea roților sau transport către vulcanizare 24/7.',
    icon: TriangleAlert,
    href: '/depanare-auto-sibiu'
  },
  {
    id: 'alimentare',
    title: 'Alimentare Greșită',
    description: 'Ajutor profesional în cazul alimentării cu combustibil nepotrivit. Golire rezervor pe loc.',
    icon: Fuel,
    href: '/depanare-auto-sibiu'
  }
];

export default function Services() {
  return (
    <section id="servicii" className="py-32 bg-background" aria-labelledby="services-title">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 id="services-title" className="text-4xl md:text-6xl font-black mb-6 uppercase font-headline tracking-tighter text-white">
            Servicii <span className="text-primary">Profesionale</span>
          </h2>
          <div className="w-24 h-2 bg-primary mx-auto rounded-full mb-8" aria-hidden="true"></div>
          <p className="text-white/90 text-xl max-w-3xl mx-auto font-medium">
            Oferim soluții complete de asistență rutieră și tractări auto cu echipamente moderne și personal calificat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            return (
              <Link key={service.id} href={service.href} className="group" aria-label={`Află mai multe despre ${service.title}`}>
                <Card className="h-full overflow-hidden border border-border bg-secondary/20 hover:border-primary/50 hover:bg-secondary/40 transition-all duration-300 rounded-3xl">
                  <div className="p-8 pb-0">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20 group-hover:bg-primary transition-all duration-300 shadow-xl group-hover:shadow-primary/20">
                      <service.icon className="w-8 h-8 text-primary group-hover:text-white" aria-hidden="true" />
                    </div>
                  </div>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-black mb-4 uppercase tracking-tight text-white">{service.title}</h3>
                    <p className="text-white/80 mb-6 leading-relaxed font-medium">
                      {service.description}
                    </p>
                    <div className="flex items-center text-primary font-black uppercase text-sm tracking-widest group-hover:gap-3 gap-2 transition-all">
                      Află mai mult <ArrowRight className="w-4 h-4" aria-hidden="true" />
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
