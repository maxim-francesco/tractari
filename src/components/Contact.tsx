import { Phone, MessageCircle, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-background border-t border-border/50" aria-labelledby="contact-section-title">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 px-4 py-2 rounded-full text-primary font-black text-xs md:text-sm mb-6 uppercase tracking-widest">
            <div className="w-2 h-2 rounded-full bg-primary animate-ping" aria-hidden="true" />
            Asistență 24/7
          </div>
          <h2 id="contact-section-title" className="text-4xl md:text-6xl font-black mb-6 uppercase font-headline tracking-tighter text-white">
            Contactați-ne <span className="text-primary">Acum</span>
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-medium">
            Suntem disponibili non-stop în tot județul Sibiu și pe Autostrada A1. Apelați telefonic sau trimiteți un mesaj pe WhatsApp pentru asistență.
          </p>
        </div>

        {/* Primary Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Direct Phone Call Button */}
          <a
            href="tel:+40742916370"
            className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-8 md:p-10 rounded-3xl bg-primary text-white shadow-2xl shadow-primary/20 hover:bg-primary/95 hover:scale-[1.02] active:scale-[0.99] transition-all group"
            aria-label="Sună acum la +40 742 916 370"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Phone className="w-8 h-8 text-white" aria-hidden="true" />
            </div>
            <div className="text-center sm:text-left">
              <span className="inline-block text-xs font-black uppercase tracking-widest opacity-90 mb-1">
                Apel Telefonic (24/7)
              </span>
              <p className="text-2xl md:text-3xl font-black tracking-tight mb-2">
                +40 742 916 370
              </p>
              <p className="text-sm font-semibold opacity-90">
                Preluare directă a apelului pentru asistență rutieră
              </p>
            </div>
          </a>

          {/* WhatsApp Direct Button */}
          <a
            href="https://wa.me/40742916370"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-8 md:p-10 rounded-3xl bg-[#25D366]/10 border-2 border-[#25D366]/30 hover:border-[#25D366] hover:bg-[#25D366]/20 hover:scale-[1.02] active:scale-[0.99] transition-all group"
            aria-label="Trimite mesaj pe WhatsApp la +40 742 916 370"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#25D366] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-[#25D366]/20">
              <MessageCircle className="w-8 h-8 text-white" aria-hidden="true" />
            </div>
            <div className="text-center sm:text-left">
              <span className="inline-block text-xs font-black uppercase tracking-widest text-[#25D366] mb-1">
                WhatsApp Direct
              </span>
              <p className="text-2xl md:text-3xl font-black text-white tracking-tight mb-2">
                Trimite Locația
              </p>
              <p className="text-sm font-semibold text-white/80">
                Transmiteți detalii sau coordonatele pe WhatsApp
              </p>
            </div>
          </a>
        </div>

        {/* Real Contact Info & Availability Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-border/50">
          <div className="flex items-center gap-4 p-5 rounded-2xl bg-secondary/20 border border-border">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 text-primary" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs uppercase font-black tracking-widest text-white/60">Program de lucru</p>
              <p className="font-bold text-white text-base">Disponibil 24/7 (Non-stop)</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-2xl bg-secondary/20 border border-border">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6 text-primary" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs uppercase font-black tracking-widest text-white/60">Zonă deservită</p>
              <p className="font-bold text-white text-base">Sibiu, Județ & Autostrada A1</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
