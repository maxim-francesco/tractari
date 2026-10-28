import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import FaqList from '@/components/FaqList';
import { Button } from '@/components/ui/button';
import { Phone, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import {
  JsonLd, PHONE_DISPLAY, PHONE_HREF, breadcrumbJsonLd, faqJsonLd, pageMetadata, serviceJsonLd,
} from '@/lib/site';

const PATH = '/tractari-auto-sibiu';

export const metadata: Metadata = pageMetadata({
  path: PATH,
  title: 'Tractări Sibiu, Platformă Auto Sibiu | Autostrada A1',
  description: `Tractări Sibiu non-stop cu platformă auto pentru autoturisme și dube, în Sibiu, pe Autostrada A1 și pe Valea Oltului. Prețul îl aflați înainte de plecare.`,
});

// Vehicule: doar autoturisme și dube (confirmat 28.10.2026).
// TODO(confirmare operator): asigurare, tarif de pornire, timp mediu.
const faqItems = [
  {
    q: "Cât costă o tractare auto în Sibiu?",
    a: "Prețul depinde de distanță, de tipul și starea vehiculului și de locul preluării. Vi-l comunicăm la telefon, înainte să plece platforma, după ce ne spuneți locația și destinația."
  },
  {
    q: "În cât timp ajunge platforma la mine?",
    a: "Depinde de locația dumneavoastră, de trafic și de intervențiile în curs. La telefon vă spunem un timp estimat de sosire."
  },
  {
    q: "Ce vehicule tractați?",
    a: "Tractăm doar autoturisme și dube; camioane, autocare sau utilaje nu tractăm. Spuneți-ne marca și modelul, iar noi vă confirmăm la telefon cum încărcăm vehiculul."
  },
  {
    q: "Interveniți pe autostrada A1?",
    a: "Da, intervenim pe A1 în zona Sibiu. Spuneți-ne sensul de mers și cel mai apropiat reper (kilometru, ieșire sau nod rutier)."
  },
  {
    q: "Ce informații vă trebuie când sun?",
    a: "Locația exactă, destinația (service, acasă sau altă adresă), marca și modelul mașinii și ce s-a întâmplat: nu pornește, roți blocate, accident etc."
  }
];

export default function TractariAutoPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <JsonLd data={serviceJsonLd({ path: PATH, name: 'Tractări auto Sibiu', description: metadata.description as string, serviceType: 'Tractare auto pe platformă' })} />
      <JsonLd data={faqJsonLd(faqItems)} />
      <JsonLd data={breadcrumbJsonLd([{ name: 'Tractări Auto Sibiu', path: PATH }])} />

      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/20 to-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold font-headline mb-6 uppercase tracking-tight">
              Tractări Auto Sibiu <span className="block text-primary">cu Platformă și pe A1</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Tractare pe platformă în municipiul Sibiu, în localitățile din jur și pe Autostrada A1 în zona Sibiu. Sunați, spuneți-ne unde sunteți și unde trebuie dusă mașina, iar noi vă spunem prețul și timpul estimat înainte de plecare.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold h-auto min-h-14 py-3 whitespace-normal max-w-full px-6 sm:px-8 rounded-xl text-lg shadow-xl" asChild>
              <a href={PHONE_HREF} data-cta="service-hero">
                <Phone className="w-5 h-5 mr-3" />
                SUNĂ ACUM: {PHONE_DISPLAY}
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 border-y border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div className="prose prose-invert prose-orange max-w-none">
              <h2 className="text-3xl font-bold mb-6 text-white uppercase font-headline">Tractare Sibiu: cum decurge</h2>
              <ol className="space-y-4 text-muted-foreground list-decimal pl-5">
                <li>Sunați la <strong>{PHONE_DISPLAY}</strong> și spuneți-ne locația, destinația și ce vehicul aveți.</li>
                <li>Vă spunem prețul și timpul estimat de sosire. Platforma pleacă după ce sunteți de acord.</li>
                <li>Mașina este încărcată și dusă la service, acasă sau la adresa indicată.</li>
              </ol>

              <h3 className="text-2xl font-bold mt-10 mb-6 text-white uppercase font-headline">Zone deservite</h3>
              <ul className="space-y-4">
                {[
                  'Municipiul Sibiu, non-stop',
                  'Șelimbăr, Cisnădie, Rășinari, Cristian și localitățile din jur',
                  'Autostrada A1 în zona Sibiu (Săliște, Miercurea Sibiului, Boița)',
                  'Valea Oltului (DN7): Tălmaciu, Boița, Brezoi, Călimănești, Râmnicu Vâlcea',
                  'Alte localități din județ: sunați și vă spunem dacă putem ajunge',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground mt-8">
                Aveți nevoie doar de pornire de la baterie sau de ajutor la roată? Vedeți <Link href="/depanare-auto-sibiu" className="text-primary font-bold">depanare auto Sibiu</Link>.
                Pentru un transport programat (service, RAR), vedeți <Link href="/transport-auto-sibiu" className="text-primary font-bold">transport auto Sibiu</Link>.
              </p>
            </div>

            <div className="bg-secondary/20 p-8 rounded-3xl border border-border">
              <h2 className="text-2xl font-bold mb-8 uppercase font-headline text-center">Întrebări despre tractări în Sibiu</h2>
              <FaqList items={faqItems} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 space-y-14 text-muted-foreground text-lg leading-relaxed">
          <div>
            <h2 className="text-3xl font-bold mb-5 text-white uppercase font-headline">Platformă auto Sibiu, non-stop</h2>
            <p className="mb-4">Aveți nevoie de o platformă în Sibiu chiar acum? Sunați și vă spunem imediat când poate ajunge la dumneavoastră.</p>
            <p>
              Tractarea se face pe platformă: mașina este încărcată complet, nu remorcată pe roți. Așa pot fi transportate și mașini care nu mai pornesc,
              au roțile sau direcția blocate ori au fost avariate într-un accident. Spuneți-ne la telefon marca, modelul și starea mașinii, ca să vă confirmăm
              cum o preluăm.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-5 text-white uppercase font-headline">Tractări autostrada A1, zona Sibiu</h2>
            <p>
              Dacă ați rămas în pană pe A1 în zona Sibiu, opriți pe banda de urgență, porniți avariile, ieșiți din mașină prin dreapta și așteptați în spatele
              parapetului. Când sunați, spuneți-ne sensul de mers și cel mai apropiat reper (kilometru, ieșire sau nod rutier). Pe autostradă, mașina se
              încarcă pe platformă și se duce la service sau la adresa indicată de dumneavoastră.
            </p>
            <p className="mt-4">
              Mai multe detalii: <Link href="/blog/ce-faci-cand-ramai-in-pana-pe-autostrada" className="text-primary font-bold">ce faci când rămâi în pană pe A1</Link>.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-5 text-white uppercase font-headline">Tractări pe Valea Oltului (DN7)</h2>
            <p>
              Pe Valea Oltului, de la Tălmaciu și Boița până la Brezoi, Călimănești și Râmnicu Vâlcea, drumul e îngust și aglomerat, iar oprirea pe
              acostament e riscantă. Spuneți-ne la telefon sensul de mers și cea mai apropiată localitate sau bornă kilometrică; vă spunem timpul estimat
              și prețul înainte de plecare.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-5 text-white uppercase font-headline">Cât costă o tractare auto în Sibiu</h2>
            <p>
              Prețul depinde de distanța până la destinație, de tipul și starea vehiculului și de locul preluării. Vi-l spunem la telefon, înainte să plece
              platforma, ca să știți de la început cât plătiți. Vedeți și <Link href="/blog/cat-costa-o-tractare-auto-in-sibiu" className="text-primary font-bold">de ce depinde prețul unei tractări</Link>.
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <StickyCTA />
    </main>
  );
}
