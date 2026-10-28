import { Star, MessageCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { REVIEW_URL } from '@/lib/site';

// Hidden until a real Google review link exists (see REVIEW_URL in lib/site).
export default function Testimonials() {
  if (!REVIEW_URL) return null;

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

            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-10 relative z-10">
              Dacă v-am ajutat, o recenzie pe Google îi ajută și pe alți șoferi să ne găsească.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-black h-auto min-h-16 py-3 whitespace-normal max-w-full px-6 sm:px-10 rounded-2xl text-lg shadow-xl shadow-primary/30" asChild>
                <a href={REVIEW_URL} target="_blank" rel="noopener noreferrer">
                  LASĂ O RECENZIE PE GOOGLE <ExternalLink className="w-5 h-5 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
