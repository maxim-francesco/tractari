import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Phone, CheckCircle2, MapPin, ArrowRight, Truck } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Tractări Auto Sibiu | Serviciu Rapid 24/7 | 0700 000 000',
  description: 'Ai nevoie de tractări auto în Sibiu? Intervenim rapid în maxim 30 min. Servicii profesionale de tractare 24/7 în tot județul Sibiu. Prețuri corecte, siguranță garantată.',
  alternates: {
    canonical: 'https://tractarimasinisibiu.ro/tractari-auto-sibiu',
  },
};

export default function TractariAutoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Cât costă o tractare auto în Sibiu?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Prețul unei tractări auto în Sibiu începe de la 150 RON pentru transport local. Costul final depinde de distanță, greutatea vehiculului și complexitatea intervenției."
        }
      },
      {
        "@type": "Question",
        "name": "În cât timp ajunge platforma la mine?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "În municipiul Sibiu și zonele limitrofe, timpul mediu de răspuns este de aproximativ 20-30 de minute, în funcție de trafic și locația exactă."
        }
      },
      {
        "@type": "Question",
        "name": "Efectuați tractări și în afara județului Sibiu?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Da, oferim servicii de tractare și transport auto la nivel național și internațional, pornind din Sibiu către orice destinație dorită."
        }
      },
      {
        "@type": "Question",
        "name": "Ce tipuri de vehicule puteți tracta?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Flota noastră permite tractarea autoturismelor, SUV-urilor, autoutilitarelor, motocicletelor și chiar a utilajelor agricole de mici dimensiuni."
        }
      },
      {
        "@type": "Question",
        "name": "Oferiți asigurare pentru mașina transportată?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolut. Toate transporturile noastre sunt acoperite de asigurare CMR, oferindu-vă liniștea că vehiculul dumneavoastră este protejat pe tot parcursul drumului."
        }
      }
    ]
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Acasă",
        "item": "https://tractarimasinisibiu.ro"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Tractări Auto Sibiu",
        "item": "https://tractarimasinisibiu.ro/tractari-auto-sibiu"
      }
    ]
  };

  return (
    <main className="min-h-screen">
      <Navigation />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/20 to-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold font-headline mb-6 uppercase tracking-tight">
              Tractări Auto Sibiu — <span className="text-primary">Serviciu Rapid 24/7</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Suntem partenerul tău de încredere atunci când ai nevoie de o platformă auto în Sibiu. Indiferent de oră sau condiții meteo, echipa noastră este gata să intervină pentru a-ți oferi siguranță și profesionalism.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold h-14 px-8 rounded-xl text-lg shadow-xl shadow-primary/20" asChild>
              <a href="tel:0700000000">
                <Phone className="w-5 h-5 mr-3" />
                SUNĂ ACUM: 0700 000 000
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 border-y border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div className="prose prose-invert prose-orange max-w-none">
              <h2 className="text-3xl font-bold mb-6 text-white uppercase font-headline">Profesionalism în fiecare intervenție</h2>
              <p className="text-muted-foreground mb-4">
                Serviciul de <strong>tractări auto Sibiu</strong> oferit de firma noastră se bazează pe trei piloni fundamentali: rapiditate, siguranță și prețuri competitive. Înțelegem că un incident auto este o situație stresantă, motiv pentru care ne străduim să simplificăm procesul de recuperare a vehiculului tău.
              </p>
              <p className="text-muted-foreground mb-4">
                Dispunem de autospeciale moderne, dotate cu trolii performante și sisteme de ancorare omologate, capabile să tracteze orice tip de vehicul, de la autoturisme mici până la dube sau SUV-uri grele. Fie că este vorba despre o defecțiune mecanică, un accident sau pur și simplu ai nevoie de transport pentru o mașină fără ITP sau asigurare, suntem aici să te ajutăm.
              </p>
              
              <h3 className="text-2xl font-bold mt-10 mb-6 text-white uppercase font-headline">Beneficiile noastre</h3>
              <ul className="space-y-4">
                {[
                  'Disponibilitate Non-Stop (24 ore din 24, 7 zile din 7)',
                  'Intervenție rapidă în municipiul Sibiu (max 30 min)',
                  'Personal calificat și experimentat în situații de urgență',
                  'Asigurare CMR pentru orice vehicul transportat',
                  'Posibilitate de plată cash sau card'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-2xl font-bold mt-10 mb-6 text-white uppercase font-headline">Zone de acoperire</h3>
              <p className="text-muted-foreground mb-4">
                Intervenim prompt în următoarele locații:
              </p>
              <div className="grid grid-cols-2 gap-4 text-muted-foreground italic">
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Sibiu</div>
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Șelimbăr</div>
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Cisnădie</div>
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Mediaș</div>
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Avrig</div>
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Tălmaciu</div>
              </div>
            </div>

            <div className="bg-secondary/20 p-8 rounded-3xl border border-border">
              <h2 className="text-2xl font-bold mb-8 uppercase font-headline tracking-tight text-center">Întrebări Frecvente (FAQ)</h2>
              <Accordion type="single" collapsible className="w-full">
                {jsonLd.mainEntity.map((item, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`} className="border-border">
                    <AccordionTrigger className="text-left font-semibold hover:text-primary transition-colors py-4">
                      {item.name}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {item.acceptedAnswer.text}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="mt-12 p-6 bg-primary/10 border border-primary/20 rounded-2xl text-center">
                <h4 className="font-bold text-lg mb-2">Alte Servicii</h4>
                <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
                  <Link href="/transport-auto-sibiu" className="text-primary hover:underline">Transport Auto</Link>
                  <span className="text-border">|</span>
                  <Link href="/depanare-auto-sibiu" className="text-primary hover:underline">Depanare</Link>
                  <span className="text-border">|</span>
                  <Link href="/asistenta-rutiera-sibiu" className="text-primary hover:underline">Asistență</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <StickyCTA />
    </main>
  );
}
