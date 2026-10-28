import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import { Button } from '@/components/ui/button';
import { Phone, ArrowLeft, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { JsonLd, PHONE_DISPLAY, PHONE_HREF, breadcrumbJsonLd, faqJsonLd, pageMetadata } from '@/lib/site';
import { FAQ_ITEMS } from '@/lib/faq';

const PATH = '/intrebari-frecvente';

export const metadata: Metadata = pageMetadata({
  path: PATH,
  title: 'Întrebări Frecvente Tractări Auto Sibiu | Preț, A1, Zone',
  description: `Răspunsuri despre tractări auto în Sibiu: cum se stabilește prețul, ce informații ne trebuie, zone deservite, Autostrada A1 și alimentare greșită.`,
});

const faqItems = FAQ_ITEMS;

export default function FAQPage() {


  return (
    <main className="min-h-screen">
      <Navigation />
      <JsonLd data={faqJsonLd(faqItems)} />
      <JsonLd data={breadcrumbJsonLd([{ name: 'Întrebări Frecvente', path: PATH }])} />
      
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/20 to-background">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/" className="inline-flex items-center gap-2 text-primary font-bold mb-8 hover:underline">
            <ArrowLeft className="w-4 h-4" /> Înapoi la Acasă
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold font-headline mb-6 uppercase tracking-tight">
            Întrebări Frecvente <span className="block text-primary">Tractări Auto Sibiu</span>
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
            <p className="text-xl mb-10 opacity-90 font-medium">Preluăm apeluri non-stop.</p>
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-black h-auto min-h-16 py-3 whitespace-normal max-w-full px-6 sm:px-10 rounded-2xl text-xl" asChild>
              <a href={PHONE_HREF} data-cta="faq-bottom">
                <Phone className="w-6 h-6 mr-3" />
                SUNĂ ACUM: {PHONE_DISPLAY}
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
