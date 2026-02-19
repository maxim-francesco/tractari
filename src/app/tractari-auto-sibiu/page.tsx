import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Phone, CheckCircle2, MapPin, Truck, Car } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Tractări Auto Sibiu | Serviciu Rapid 24/7 | +40 742 916 370',
  description: 'Ai nevoie de tractări auto în Sibiu? Intervenim rapid în maxim 30 min. Servicii profesionale de tractare 24/7 în tot județul Sibiu și A1. Prețuri corecte.',
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
          "text": "Prețul unei tractări începe de la 150 RON pentru transport local. Costul final depinde de distanță, greutatea vehiculului și complexitatea intervenției."
        }
      },
      {
        "@type": "Question",
        "name": "În cât timp ajunge platforma la mine?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "În municipiul Sibiu și zonele limitrofe, timpul mediu de răspuns este de aproximativ 20-30 de minute."
        }
      },
      {
        "@type": "Question",
        "name": "Tractați și SUV-uri sau autoutilitare?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Da, dispunem de platforme specializate pentru vehicule grele, SUV-uri și dube."
        }
      },
      {
        "@type": "Question",
        "name": "Interveniți pe autostrada A1?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Da, oferim asistență rapidă pe tot segmentul autostrăzii A1 din județul Sibiu."
        }
      },
      {
        "@type": "Question",
        "name": "Oferiți asigurare pentru mașina transportată?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolut. Toate transporturile noastre sunt acoperite de asigurare CMR."
        }
      }
    ]
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Acasă", "item": "https://tractarimasinisibiu.ro" },
      { "@type": "ListItem", "position": 2, "name": "Tractări Auto Sibiu", "item": "https://tractarimasinisibiu.ro/tractari-auto-sibiu" }
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
              Suntem partenerul tău de încredere atunci când ai nevoie de o platformă auto în Sibiu. Indiferent de oră, echipa noastră este gata să intervină rapid.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold h-14 px-8 rounded-xl text-lg shadow-xl" asChild>
              <a href="tel:+40742916370">
                <Phone className="w-5 h-5 mr-3" />
                SUNĂ ACUM: +40 742 916 370
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 border-y border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div className="prose prose-invert prose-orange max-w-none">
              <h2 className="text-3xl font-bold mb-6 text-white uppercase font-headline">Profesionalism în tractări</h2>
              <p className="text-muted-foreground mb-4">
                Serviciul de <strong>tractări auto Sibiu</strong> oferit de echipa noastră se bazează pe rapiditate și siguranță. Tractăm autoturisme, SUV-uri și dube în tot județul.
              </p>
              
              <h3 className="text-2xl font-bold mt-10 mb-6 text-white uppercase font-headline">Beneficiile noastre</h3>
              <ul className="space-y-4">
                {[
                  'Disponibilitate Non-Stop 24/7',
                  'Intervenție rapidă în maxim 30 min',
                  'Platforme moderne pentru orice tonaj',
                  'Asigurare CMR inclusă',
                  'Acoperire Autostrada A1 și județul Sibiu'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-secondary/20 p-8 rounded-3xl border border-border">
              <h2 className="text-2xl font-bold mb-8 uppercase font-headline text-center">Întrebări Frecvente</h2>
              <Accordion type="single" collapsible className="w-full">
                {jsonLd.mainEntity.map((item, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`} className="border-border">
                    <AccordionTrigger className="text-left font-semibold hover:text-primary py-4">
                      {item.name}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {item.acceptedAnswer.text}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <StickyCTA />
    </main>
  );
}
