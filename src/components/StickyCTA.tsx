'use client';

import { Phone } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/site';

// White border + dark outline keep the button visible on orange sections too
// (box-shadow is driven by the pulse animation, so outline is used for the halo).
export default function StickyCTA() {
  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <a
        href={PHONE_HREF}
        data-cta="sticky"
        className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-primary text-white rounded-full border-[3px] border-white outline outline-4 outline-black/70 animate-pulse-orange transition-transform active:scale-90 group"
        aria-label={`Sună acum la ${PHONE_DISPLAY}`}
      >
        <Phone className="w-8 h-8 md:w-10 md:h-10 group-hover:rotate-12 transition-transform" aria-hidden="true" />
        <span className="sr-only">Sună acum: {PHONE_DISPLAY}</span>
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white animate-bounce" aria-hidden="true" />
      </a>
    </div>
  );
}
