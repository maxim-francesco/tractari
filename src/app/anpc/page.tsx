import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { pageMetadata } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  path: '/anpc',
  title: 'ANPC | RDL Tractări Auto Sibiu',
  noindex: true,
});

export default function AnpcPage() {
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
            Informații <span className="text-primary">ANPC</span>
          </h1>
          <p className="text-muted-foreground font-bold">Ultima actualizare: Februarie 2026</p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 prose prose-invert prose-orange max-w-none">
          <div className="space-y-12 text-muted-foreground text-lg leading-relaxed">
            <div>
              <h2 className="text-white text-2xl font-black uppercase mb-6">Protecția Consumatorului</h2>
              <p>
                În conformitate cu legislația din România, clienții noștri beneficiază de toate drepturile prevăzute de OUG 34/2014 privind drepturile consumatorilor în cadrul contractelor încheiate cu profesioniștii.
              </p>
              <div className="mt-8 p-8 rounded-3xl bg-secondary/20 border border-border">
                <p className="text-white font-bold mb-2 uppercase tracking-widest text-sm">Date Identificare Prestator:</p>
                <p className="font-black text-xl text-primary">PISALTU MIHAI-ILIE PERSOANĂ FIZICĂ AUTORIZATĂ</p>
                <p>CUI: 53773945 | Reg. Com. F02/600/570007</p>
                <p>Sediu: Sat Rășinari, Str. Sava P. Barcianu, Nr. 49, Sibiu</p>
                <p>Telefon: +40 742 916 370</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <a 
                href="https://anpc.ro/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-8 rounded-3xl border border-border bg-secondary/10 hover:border-primary transition-all group text-center"
              >
                <h3 className="text-white font-black uppercase mb-4 group-hover:text-primary">ANPC</h3>
                <p className="text-sm mb-6">Autoritatea Națională pentru Protecția Consumatorilor</p>
                <div className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                  Vizitează Website <ExternalLink className="w-3 h-3" />
                </div>
              </a>

              <a 
                href="https://ec.europa.eu/consumers/odr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-8 rounded-3xl border border-border bg-secondary/10 hover:border-primary transition-all group text-center"
              >
                <h3 className="text-white font-black uppercase mb-4 group-hover:text-primary">SOL</h3>
                <p className="text-sm mb-6">Soluționarea Online a Litigiilor (Platforma Europeană)</p>
                <div className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
                  Vizitează Website <ExternalLink className="w-3 h-3" />
                </div>
              </a>
            </div>

            <div>
              <p className="text-sm italic">
                Suntem dedicați oferirii unui serviciu transparent și corect. Pentru orice nemulțumire legată de serviciile noastre, vă rugăm să ne contactați telefonic pentru o rezolvare rapidă pe cale amiabilă.
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
