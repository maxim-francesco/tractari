import Link from 'next/link';
import { Truck, Car, Wrench, Battery, TriangleAlert, Fuel, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const services = [
  {
    id: 'autoturisme',
    title: 'Tractări Autoturisme',
    description: 'Tractare pe platformă pentru autoturisme, inclusiv mașini care nu mai pornesc sau sunt avariate. Confirmăm la telefon cum le preluăm.',
    icon: Car,
    href: '/tractari-auto-sibiu'
  },
  {
    id: 'dube',
    title: 'Tractări Dube',
    description: 'Tractăm și dube, pe lângă autoturisme. Camioane și utilaje nu tractăm.',
    icon: Truck,
    href: '/tractari-auto-sibiu'
  },
  {
    id: 'transport',
    title: 'Transport Programat',
    description: 'Transport auto programat din Sibiu: la service, la RAR sau la o altă adresă. Stabilim ziua, ora și prețul la telefon.',
    icon: Wrench,
    href: '/transport-auto-sibiu'
  },
  {
    id: 'curent',
    title: 'Baterie Descărcată',
    description: 'Baterie descărcată? Sunați și vă spunem dacă putem porni mașina la fața locului.',
    icon: Battery,
    href: '/depanare-auto-sibiu'
  },
  {
    id: 'pana',
    title: 'Pană de Cauciuc',
    description: 'Ajutor la montarea roții de rezervă sau tractare până la vulcanizare.',
    icon: TriangleAlert,
    href: '/depanare-auto-sibiu'
  },
  {
    id: 'alimentare',
    title: 'Alimentare Greșită',
    // TODO(confirmare operator): dacă se face golire de rezervor la fața locului.
    description: 'Ați alimentat greșit? Nu porniți motorul. Sunați și vă spunem dacă mașina trebuie tractată la service.',
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
            Tractări și <span className="text-primary">Asistență Rutieră</span>
          </h2>
          <div className="w-24 h-2 bg-primary mx-auto rounded-full mb-8" aria-hidden="true"></div>
          <p className="text-white/90 text-xl max-w-3xl mx-auto font-medium">
            Tractări, transport pe platformă și ajutor la fața locului în Sibiu și pe A1. Ce putem face în situația dumneavoastră vă confirmăm la telefon.
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
