import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Politică de Confidențialitate | Tractări Mașini Sibiu',
  robots: {
    index: false,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
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
            Politică de <span className="text-primary">Confidențialitate</span>
          </h1>
          <p className="text-muted-foreground font-bold">Ultima actualizare: Februarie 2026</p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 prose prose-invert prose-orange max-w-none">
          <div className="space-y-8 text-muted-foreground text-lg leading-relaxed">
            <div>
              <h2 className="text-white text-2xl font-black uppercase mb-4">1. Cine suntem</h2>
              <p>
                Operatorul de date este <strong>PISALTU MIHAI-ILIE PERSOANĂ FIZICĂ AUTORIZATĂ</strong>, cu sediul în Sat Rășinari, Comuna Rășinari, Strada Sava P. Barcianu, Nr. 49, Județul Sibiu, CUI 53773945, Nr. Reg. Comerțului F02/600/570007.
              </p>
            </div>

            <div>
              <h2 className="text-white text-2xl font-black uppercase mb-4">2. Ce date colectăm</h2>
              <p>
                Colectăm datele pe care ni le furnizați direct atunci când solicitați serviciile noastre prin apel telefonic sau prin intermediul aplicației WhatsApp: nume, prenume și număr de telefon. Nu utilizăm formulare de contact pe acest website.
              </p>
            </div>

            <div>
              <h2 className="text-white text-2xl font-black uppercase mb-4">3. Scopul și temeiul colectării</h2>
              <p>
                Datele sunt colectate exclusiv pentru furnizarea serviciilor de tractare auto, asistență rutieră și transport auto solicitate de dumneavoastră. Temeiul legal este executarea unui contract (Art. 6 alin. 1 lit. b din GDPR), reprezentat de solicitarea serviciului.
              </p>
            </div>

            <div>
              <h2 className="text-white text-2xl font-black uppercase mb-4">4. Durata stocării</h2>
              <p>
                Datele dumneavoastră nu sunt stocate într-o bază de date electronică pe acest website. Comunicarea se desfășoară exclusiv prin canale de telefonie și mesagerie privată (WhatsApp).
              </p>
            </div>

            <div>
              <h2 className="text-white text-2xl font-black uppercase mb-4">5. Drepturile dumneavoastră</h2>
              <p>
                Conform Regulamentului GDPR, beneficiați de dreptul de acces la date, dreptul de rectificare, dreptul de ștergere ("dreptul de a fi uitat"), dreptul la restricționarea prelucrării și dreptul de opoziție. Pentru exercitarea acestor drepturi, ne puteți contacta la numărul de telefon +40 742 916 370.
              </p>
            </div>

            <div>
              <h2 className="text-white text-2xl font-black uppercase mb-4">6. Securitatea datelor</h2>
              <p>
                Nu transferăm datele dumneavoastră către terți și nu utilizăm servicii de tracking, analytics sau profiling. Depunem toate eforturile pentru a asigura confidențialitatea comunicării noastre directe.
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
