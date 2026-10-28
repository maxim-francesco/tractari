import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { pageMetadata } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  path: '/termeni-si-conditii',
  title: 'Termeni și Condiții | RDL Tractări Auto Sibiu',
  noindex: true,
});

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/20 to-background border-b border-border">
        <div className="max-w-4xl mx-auto px-4">
          <Button variant="ghost" className="mb-8 text-primary hover:text-primary/80 font-bold p-0" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" /> Înapoi la pagina principală
            </Link>
          </Button>
          <h1 className="text-4xl md:text-5xl font-black font-headline mb-4 uppercase tracking-tighter">
            Termeni și <span className="text-primary">Condiții</span>
          </h1>
          <p className="text-muted-foreground font-bold">Ultima actualizare: Octombrie 2026</p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 prose prose-invert prose-orange max-w-none">
          <div className="space-y-8 text-muted-foreground text-lg leading-relaxed">
            <div>
              <h2 className="text-white text-2xl font-black uppercase mb-4">1. Informații Generale</h2>
              <p>
                Prezentul document stabilește termenii și condițiile de utilizare a website-ului <strong>tractarimasinisibiu.ro</strong>, operat de <strong>PISALTU MIHAI-ILIE PERSOANĂ FIZICĂ AUTORIZATĂ</strong>, CUI 53773945, Reg. Com. F02/600/570007, cu sediul în Sat Rășinari, Județul Sibiu.
              </p>
            </div>

            <div>
              <h2 className="text-white text-2xl font-black uppercase mb-4">2. Servicii oferite</h2>
              <p>
                Prestatorul oferă servicii de tractări auto, transport auto pe platformă și asistență rutieră în municipiul Sibiu, în localitățile din jur și pe autostrada A1 în zona Sibiu. Disponibilitatea pentru alte localități și pentru un anumit vehicul se confirmă telefonic.
              </p>
            </div>

            <div>
              <h2 className="text-white text-2xl font-black uppercase mb-4">3. Stabilirea Prețului</h2>
              <p>
                Prețurile pentru serviciile noastre nu sunt fixe pe website, deoarece acestea depind de distanță, tonajul vehiculului și complexitatea intervenției. Tariful final se stabilește telefonic, de comun acord cu clientul, înainte de începerea oricărei intervenții.
              </p>
            </div>

            <div>
              <h2 className="text-white text-2xl font-black uppercase mb-4">4. Obligațiile Clientului</h2>
              <p>
                Clientul are obligația de a furniza informații corecte și complete cu privire la starea vehiculului (roți blocate, avarii la direcție etc.) și locația exactă a acestuia. Clientul trebuie să dețină documentele de proprietate sau utilizare legală a vehiculului ce urmează a fi tractat.
              </p>
            </div>

            <div>
              <h2 className="text-white text-2xl font-black uppercase mb-4">5. Răspundere</h2>
              <p>
                Condițiile de răspundere și asigurare pentru vehiculul transportat se comunică telefonic, înainte de începerea intervenției. Prestatorul nu răspunde pentru daunele preexistente ale vehiculului care nu au fost declarate sau vizibile la momentul preluării pe platformă.
              </p>
            </div>

            <div>
              <h2 className="text-white text-2xl font-black uppercase mb-4">6. Litigii</h2>
              <p>
                Orice conflict apărut între prestator și client va fi soluționat pe cale amiabilă. În cazul în care acest lucru nu este posibil, competența revine instanțelor judecătorești din raza sediului prestatorului (Județul Sibiu).
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <StickyCTA />
    </main>
  );
}
