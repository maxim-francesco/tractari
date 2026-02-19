import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: 'Andrei Popescu',
    role: 'Șofer autoturism',
    content: 'Am rămas blocat pe autostradă la ora 2 noaptea. Au ajuns în 20 de minute și m-au tractat până în Sibiu. Foarte profesioniști și preț corect.',
    stars: 5
  },
  {
    name: 'Maria Ionescu',
    role: 'Proprietar SUV',
    content: 'Serviciu de depanare excelent! Bateria a murit în parcare și au venit imediat să mă ajute cu pornirea. Recomand cu toată încrederea.',
    stars: 5
  },
  {
    name: 'Cristian Dumitru',
    role: 'Transport Internațional',
    content: 'Am apelat pentru un transport pe platformă din Germania. Totul a decurs perfect, mașina a ajuns intactă și la timp. O echipă de nota 10!',
    stars: 5
  }
];

export default function Testimonials() {
  return (
    <section id="testimoniale" className="py-32 bg-secondary/10 border-y border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase font-headline tracking-tighter">
            Ce Spun <span className="text-primary">Clienții</span>
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            Sute de clienți mulțumiți ne recomandă în fiecare lună pentru seriozitate și rapiditate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-background p-10 rounded-3xl border border-border relative group hover:border-primary/30 transition-colors">
              <Quote className="absolute top-6 right-6 w-12 h-12 text-primary/10 group-hover:text-primary/20 transition-colors" />
              <div className="flex gap-1 mb-6">
                {[...Array(review.stars)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground text-lg italic leading-relaxed mb-8">
                "{review.content}"
              </p>
              <div className="flex flex-col">
                <span className="font-black text-xl uppercase tracking-tight">{review.name}</span>
                <span className="text-primary text-sm font-bold uppercase tracking-widest">{review.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
