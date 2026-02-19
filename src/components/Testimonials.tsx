import { Star, MessageCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Testimonials() {
  return (
    <section id="testimoniale" className="py-32 bg-secondary/10 border-y border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-primary font-black mb-6 uppercase tracking-widest text-sm">
            <Star className="w-5 h-5 fill-primary" aria-hidden="true" /> Recenzii Clienți
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-8 uppercase font-headline tracking-tighter">
            Opinia Ta <span className="text-primary">Contează</span>
          </h2>
          
          <div className="p-10 md:p-16 rounded-[3rem] bg-background border border-border relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <MessageCircle className="w-32 h-32" />
            </div>
            
            <p className="text-xl md:text-2xl text-muted-foreground italic leading-relaxed mb-10 relative z-10">
              "Fii primul care lasă o recenzie — suntem o echipă dedicată și vrem să câștigăm încrederea ta prin seriozitate, rapiditate și profesionalism la fiecare intervenție."
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-black h-16 px-10 rounded-2xl text-lg shadow-xl shadow-primary/30" asChild>
                <a href="https://g.page/r/placeholder-review-link/review" target="_blank" rel="noopener noreferrer">
                  LASĂ O RECENZIE PE GOOGLE <ExternalLink className="w-5 h-5 ml-2" />
                </a>
              </Button>
            </div>
          </div>
          
          <p className="mt-8 text-sm text-muted-foreground font-bold uppercase tracking-widest">
            Suntem disponibili 24/7 pentru a-ți oferi cea mai bună experiență.
          </p>
        </div>
      </div>
    </section>
  );
}
