import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import { Button } from '@/components/ui/button';
import { Zap, Battery, Settings, Fuel, Phone, HelpCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Depanare Auto Sibiu | Asistență Tehnică la Fața Locului',
  description: 'Ai rămas în pană? Oferim depanare auto rapidă în Sibiu: curent baterie, schimb roată, deblocare uși sau alimentare greșită. Intervenții 24/7.',
  alternates: {
    canonical: 'https://tractarimasinisibiu.ro/depanare-auto-sibiu',
  },
};

export default function DepanareAutoPage() {
  const faqData = [
    { q: "Ce fac dacă am alimentat cu combustibil greșit?", a: "Nu porniți motorul! Sunați-ne imediat și vom trimite o echipă pentru golirea și curățarea rezervorului direct la fața locului." },
    { q: "Puteți porni o mașină cu bateria descărcată?", a: "Da, folosim roboți de pornire profesionali care asigură tensiunea corectă fără a afecta componentele electronice ale mașinii." },
    { q: "Mă puteți ajuta dacă am pierdut cheile sau s-au blocat în mașină?", a: "Oferim servicii de deblocare uși auto fără daune, folosind tehnici și instrumente specializate." },
    { q: "Interveniți și pe autostradă (A1)?", a: "Absolut. Acoperim întreg segmentul de autostradă din jurul Sibiului pentru intervenții rapide de depanare." },
    { q: "Ce se întâmplă dacă mașina nu poate fi reparată pe loc?", a: "În cazul în care defecțiunea este majoră, asigurăm tractarea imediată către cel mai apropiat service sau către locația dorită de dumneavoastră." }
  ];

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Acasă", "item": "https://tractarimasinisibiu.ro" },
      { "@type": "ListItem", "position": 2, "name": "Depanare Auto Sibiu", "item": "https://tractarimasinisibiu.ro/depanare-auto-sibiu" }
    ]
  };

  return (
    <main className="min-h-screen">
      <Navigation />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/20 to-background">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full text-primary font-bold text-sm mb-6 uppercase tracking-widest">
            <Zap className="w-4 h-4" /> Ajutor Imediat
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-headline mb-6 uppercase tracking-tight">
            Depanare Auto la <span className="text-primary">Fața Locului</span> Sibiu
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            Nu orice problemă necesită tractare. Echipa noastră de depanatori auto din Sibiu intervine pentru a te repune la drum în cel mai scurt timp posibil.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold h-14 px-10 rounded-xl text-lg" asChild>
            <a href="tel:+40742916370">
              <Phone className="w-5 h-5 mr-3" />
              SUNAȚI PENTRU ASISTENȚĂ
            </a>
          </Button>
        </div>
      </section>

      <section className="py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <h2 className="text-3xl font-bold mb-6 font-headline uppercase">Reparăm acolo unde ești</h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Uneori, o mică defecțiune te poate lăsa blocat în trafic sau în parcare. Serviciul nostru de depanare auto Sibiu este conceput pentru a oferi soluții rapide pentru problemele comune:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-center gap-4">
                  <Battery className="w-10 h-10 text-primary shrink-0" />
                  <span className="font-bold">Curent Baterie</span>
                </div>
                <div className="flex items-center gap-4">
                  <Settings className="w-10 h-10 text-primary shrink-0" />
                  <span className="font-bold">Schimb Roată</span>
                </div>
                <div className="flex items-center gap-4">
                  <Fuel className="w-10 h-10 text-primary shrink-0" />
                  <span className="font-bold">Alimentare Greșită</span>
                </div>
                <div className="flex items-center gap-4">
                  <HelpCircle className="w-10 h-10 text-primary shrink-0" />
                  <span className="font-bold">Diagnosticare Rapidă</span>
                </div>
              </div>
            </div>
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-border bg-secondary/20 flex items-center justify-center">
              <div className="text-center p-10">
                <h3 className="text-2xl font-black text-primary mb-2 uppercase">Non-Stop</h3>
                <p className="text-muted-foreground">Intervenim 24/7 în tot județul Sibiu.</p>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center uppercase font-headline">Întrebări și Răspunsuri</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqData.map((item, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`}>
                  <AccordionTrigger className="text-left py-6">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="mt-24 pt-10 border-t border-border flex flex-col md:flex-row justify-center items-center gap-8">
            <p className="font-bold uppercase tracking-widest text-sm text-muted-foreground">Alte servicii:</p>
            <div className="flex gap-8">
              <Link href="/tractari-auto-sibiu" className="text-primary font-bold hover:underline">Tractări</Link>
              <Link href="/transport-auto-sibiu" className="text-primary font-bold hover:underline">Transport</Link>
              <Link href="/asistenta-rutiera-sibiu" className="text-primary font-bold hover:underline">Asistență</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <StickyCTA />
    </main>
  );
}
