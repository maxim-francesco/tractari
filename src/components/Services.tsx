import Image from 'next/image';
import { Truck, Navigation, Settings, ShieldCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const services = [
  {
    id: 'tractari',
    title: 'Tractări Auto',
    description: 'Servicii profesionale de tractare pentru autoturisme, SUV-uri și autoutilitare în orice stare tehnică.',
    icon: Truck,
    image: 'hero-tow-truck'
  },
  {
    id: 'transport',
    title: 'Transport Auto',
    description: 'Transportăm vehicule pe platformă la nivel național și internațional, în siguranță deplină.',
    icon: Navigation,
    image: 'car-transport'
  },
  {
    id: 'asistenta',
    title: 'Asistență Rutieră 24/7',
    description: 'Suntem disponibili non-stop pentru a vă ajuta în caz de pană, accident sau orice problemă tehnică.',
    icon: ShieldCheck,
    image: 'emergency-service'
  },
  {
    id: 'depanare',
    title: 'Depanare la Fața Locului',
    description: 'Servicii rapide pentru curent baterie, schimb roată, alimentare greșită sau deblocare uși.',
    icon: Settings,
    image: 'roadside-assistance'
  }
];

export default function Services() {
  return (
    <section id="servicii" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 font-headline uppercase tracking-tight">Servicii Profesionale</h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full mb-6"></div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Oferim o gamă completă de soluții de asistență rutieră pentru orice tip de vehicul.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => {
            const serviceImg = PlaceHolderImages.find(img => img.id === service.image);
            return (
              <Card key={service.id} className="overflow-hidden border-none bg-secondary/30 hover:bg-secondary/50 transition-colors group">
                <CardContent className="p-0">
                  <div className="flex flex-col lg:flex-row">
                    <div className="relative h-64 lg:h-auto lg:w-2/5 shrink-0">
                      <Image
                        src={serviceImg?.imageUrl || 'https://picsum.photos/600/400'}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        data-ai-hint={serviceImg?.imageHint || 'towing'}
                      />
                    </div>
                    <div className="p-8 lg:p-10 flex flex-col justify-center">
                      <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mb-6 border border-primary/30">
                        <service.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
