'use client';

import { Phone } from 'lucide-react';

export default function StickyCTA() {
  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <a
        href="tel:+40742916370"
        className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-primary text-white rounded-full shadow-[0_0_30px_rgba(255,107,0,0.5)] animate-pulse-orange transition-transform active:scale-90 group"
        aria-label="Sună acum la +40 742 916 370"
      >
        <Phone className="w-8 h-8 md:w-10 md:h-10 group-hover:rotate-12 transition-transform" aria-hidden="true" />
        <span className="sr-only">Sună acum: +40 742 916 370</span>
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white animate-bounce" aria-hidden="true" />
      </a>
    </div>
  );
}
