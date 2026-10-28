import { Phone, MessageCircle, Mail, MapPin, Clock, ShieldCheck } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-background border-t border-border/50" aria-labelledby="contact-section-title">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 px-4 py-2 rounded-full text-primary font-black text-xs md:text-sm mb-6 uppercase tracking-widest">
            <div className="w-2 h-2 rounded-full bg-primary animate-ping" aria-hidden="true" />
            Asistență Imediată 24/7
          </div>
          <h2 id="contact-section-title" className="text-4xl md:text-6xl font-black mb-6 uppercase font-headline tracking-tighter text-white">
            Contactați-ne <span className="text-primary">Acum</span>
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-medium">
            Suntem disponibili non-stop în tot județul Sibiu și pe Autostrada A1. Alegeți metoda de contact dorită pentru o intervenție rapidă.
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
                Apel Telefonic Urgent (24/7)
              </span>
              <p className="text-2xl md:text-3xl font-black tracking-tight mb-2">
                +40 742 916 370
              </p>
              <p className="text-sm font-semibold opacity-90">
                Răspuns imediat • Echipaj trimis în 20-30 min
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
                Trimiteți coordonatele GPS pentru intervenție promptă
              </p>
            </div>
          </a>
        </div>

        {/* Real Contact Info & Availability Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 border-t border-border/50">
          <div className="flex items-center gap-4 p-5 rounded-2xl bg-secondary/20 border border-border">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 text-primary" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs uppercase font-black tracking-widest text-white/60">Program</p>
              <p className="font-bold text-white text-base">Non-stop 24/7 (365 zile)</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-2xl bg-secondary/20 border border-border">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6 text-primary" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs uppercase font-black tracking-widest text-white/60">Acoperire</p>
              <p className="font-bold text-white text-base">Sibiu, Județ & Autostrada A1</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 rounded-2xl bg-secondary/20 border border-border sm:col-span-2 lg:col-span-1">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6 text-primary" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <p className="text-xs uppercase font-black tracking-widest text-white/60">Email</p>
              <a
                href="mailto:contact@tractarimasinisibiu.ro"
                className="font-bold text-white text-base hover:text-primary transition-colors truncate block"
              >
                contact@tractarimasinisibiu.ro
              </a>
            </div>
          </div>
        </div>

        {/* Dispatch Guarantee Banner */}
        <div className="mt-8 p-6 rounded-2xl bg-secondary/10 border border-white/5 flex items-center justify-center gap-3 text-center text-sm font-semibold text-white/70">
          <ShieldCheck className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
          <span>Platformă autorizată, șoferi calificați și intervenție rapidă garantată în tot județul Sibiu.</span>
        </div>
      </div>
    </section>
  );
}
