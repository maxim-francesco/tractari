import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import TrustSignals from '@/components/TrustSignals';
import Services from '@/components/Services';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Tractări Mașini Sibiu",
    "image": "https://tractarimasinisibiu.ro/logo.png",
    "telephone": "0700 000 000",
    "url": "https://tractarimasinisibiu.ro",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Sibiu",
      "addressRegion": "SB",
      "addressCountry": "RO"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 45.7983,
      "longitude": 24.1256
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "priceRange": "$$"
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <Hero />
      <TrustSignals />
      <Services />
      
      {/* About Section Short */}
      <section id="despre" className="py-24 bg-secondary/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 order-2 md:order-1">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 font-headline uppercase">Experiență de încredere</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Suntem lideri locali în asistență rutieră și tractări auto în zona județului Sibiu. Cu o flotă modernă de platforme și o echipă de specialiști pregătiți pentru orice situație, garantăm un transport sigur și rapid pentru vehiculul tău.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Indiferent dacă ai rămas în pană pe autostradă sau ai nevoie de transport pentru o mașină neînmatriculată, noi suntem soluția ta 24 de ore din 24.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-border bg-background">
                  <div className="text-primary font-bold text-xl mb-1">Prețuri Corecte</div>
                  <div className="text-sm text-muted-foreground">Fără taxe ascunse</div>
                </div>
                <div className="p-4 rounded-xl border border-border bg-background">
                  <div className="text-primary font-bold text-xl mb-1">Asigurare CMR</div>
                  <div className="text-sm text-muted-foreground">Vehicul asigurat</div>
                </div>
              </div>
            </div>
            <div className="flex-1 order-1 md:order-2 relative aspect-square w-full max-w-lg">
              <div className="absolute inset-0 bg-primary/20 rounded-3xl rotate-3" />
              <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://picsum.photos/seed/experience/800/800" 
                  alt="Echipa Tractări Sibiu" 
                  className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
                />
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
