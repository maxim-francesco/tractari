import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import { Button } from '@/components/ui/button';
import { Phone, ArrowLeft, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Întrebări Frecvente | Tractări Auto Sibiu | +40 742 916 370',
  description: 'Răspunsuri la întrebările frecvente despre tractări auto în Sibiu. Prețuri, timp de răspuns, zone acoperite și mai mult. Sună 24/7: +40 742 916 370',
  alternates: {
    canonical: 'https://tractarimasinisibiu.ro/intrebari-frecvente',
  },
};

const faqItems = [
  {
    q: "Cât costă o tractare auto în Sibiu?",
    a: "Prețul unei tractări auto în Sibiu variază în funcție de distanță și tipul vehiculului. Transportul local în oraș începe de la tarife competitive. Contactați-ne la +40 742 916 370 pentru un preț exact bazat pe situația dumneavoastră. Oferim tarife transparente, stabilite de la început, fără costuri ascunse."
  },
  {
    q: "În cât timp ajungeți la locul incidentului?",
    a: "Timpul nostru mediu de răspuns în municipiul Sibiu și zonele limitrofe este de aproximativ 20-30 de minute. Pentru intervențiile pe Autostrada A1 sau în localitățile mai îndepărtate din județ, timpul poate varia, dar prioritatea noastră este să ajungem la dumneavoastră în cel mai scurt timp posibil."
  },
  {
    q: "Oferiți servicii de tractare 24/7, inclusiv în weekend și sărbători?",
    a: "Da, serviciul nostru de tractări auto Sibiu este complet non-stop. Suntem disponibili 24 de ore din 24, 7 zile din 7, inclusiv în zilele de sâmbătă, duminică și în toate sărbătorile legale. Defecțiunile auto nu aleg momentul, așa că nici noi nu avem program de pauză."
  },
  {
    q: "Puteți tracta mașini accidentate sau fără roți?",
    a: "Absolut. Dispunem de platforme moderne și echipamente speciale (cărucioare, trolii puternice) care ne permit să recuperăm și să transportăm în siguranță vehicule grav avariate, cu direcția blocată sau chiar fără roți."
  },
  {
    q: "Tractați și SUV-uri, dube sau vehicule mari?",
    a: "Da! Flota noastră include platforme de diferite capacități, capabile să transporte de la motociclete și autoturisme mici, până la SUV-uri masive, autoutilitare (dube) și utilaje agricole sau industriale ușoare."
  },
  {
    q: "Ce fac dacă am rămas fără baterie sau am pană de cauciuc?",
    a: "Dacă nu aveți nevoie de tractare, ci doar de asistență tehnică, sunați-ne cu încredere. Oferim servicii de depanare la fața locului: pornire cu robot profesional pentru baterii descărcate sau ajutor pentru schimbarea roții de rezervă în caz de pană."
  },
  {
    q: "Oferiți servicii pe Autostrada A1 lângă Sibiu?",
    a: "Intervenim rapid pe tot segmentul autostrăzii A1 din județul Sibiu. Cunoaștem punctele de acces și regulile de siguranță specifice autostrăzii, asigurând o evacuare rapidă a vehiculului dumneavoastră din zona de pericol."
  },
  {
    q: "Ce se întâmplă dacă am alimentat greșit mașina?",
    a: "Este esențial să NU porniți motorul. Dacă ați realizat greșeala la pompă, sunați-ne imediat. Putem tracta mașina la un service autorizat sau, în anumite condiții, putem ajuta cu golirea și curățarea rezervorului pentru a preveni daune majore la sistemul de injecție."
  }
];

export default function FAQPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Acasă", "item": "https://tractarimasinisibiu.ro" },
      { "@type": "ListItem", "position": 2, "name": "Întrebări Frecvente", "item": "https://tractarimasinisibiu.ro/intrebari-frecvente" }
    ]
  };

  return (
    <main className="min-h-screen">
      <Navigation />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/20 to-background">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/" className="inline-flex items-center gap-2 text-primary font-bold mb-8 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Înapoi la Acasă
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold font-headline mb-6 uppercase tracking-tight">
            Întrebări <span className="text-primary">Frecvente</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Aici găsiți toate informațiile necesare despre serviciile noastre de tractări auto și asistență rutieră în Sibiu.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-16">
            {faqItems.map((item, idx) => (
              <div key={idx} className="border-b border-border pb-12 last:border-0">
                <div className="flex gap-4 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                    <HelpCircle className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-black uppercase tracking-tight leading-tight">
                    {item.q}
                  </h2>
                </div>
                <div className="pl-12">
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 p-12 rounded-[3rem] bg-primary text-white text-center shadow-2xl shadow-primary/30">
            <h2 className="text-3xl md:text-4xl font-black mb-6 uppercase tracking-tight">Mai aveți întrebări?</h2>
            <p className="text-xl mb-10 opacity-90 font-medium">Suntem disponibili 24/7 pentru a vă ajuta.</p>
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-black h-16 px-10 rounded-2xl text-xl" asChild>
              <a href="tel:+40742916370">
                <Phone className="w-6 h-6 mr-3" />
                SUNĂ ACUM: +40 742 916 370
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <StickyCTA />
    </main>
  );
}
