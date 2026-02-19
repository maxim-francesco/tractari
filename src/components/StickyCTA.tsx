import { Phone } from 'lucide-react';

export default function StickyCTA() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 z-[100] bg-gradient-to-t from-background via-background/90 to-transparent">
      <a
        href="tel:0700000000"
        className="flex items-center justify-center gap-3 w-full bg-primary hover:bg-primary/90 text-white font-black py-4 rounded-2xl text-xl shadow-2xl sticky-cta-shadow transition-transform active:scale-95"
      >
        <Phone className="w-6 h-6 animate-bounce" />
        SUNĂ ACUM 📞
      </a>
    </div>
  );
}
