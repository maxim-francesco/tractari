'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/site';

declare global {
  interface Window {
    __gfn?: { display: string; dial: string };
  }
}

// gtag hands over the Google forwarding number (ad visitors only, see layout.tsx).
// React keeps rendering the real number, so it is swapped in the DOM after each page render.
function swapPhoneNumber() {
  const gfn = window.__gfn;
  if (!gfn || gfn.display === PHONE_DISPLAY) return;

  const href = `tel:${gfn.dial.replace(/[^\d+]/g, '')}`;
  document.querySelectorAll<HTMLAnchorElement>(`a[href="${PHONE_HREF}"]`).forEach((link) => {
    link.href = href;
    const label = link.getAttribute('aria-label');
    if (label) link.setAttribute('aria-label', label.replace(PHONE_DISPLAY, gfn.display));
  });

  // Visible text only: JSON-LD and other scripts keep the real number for search engines.
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) =>
      node.parentElement?.closest('script, style, noscript') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT,
  });
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    if (node.nodeValue?.includes(PHONE_DISPLAY)) {
      node.nodeValue = node.nodeValue.split(PHONE_DISPLAY).join(gfn.display);
    }
  }
}

export default function ForwardingNumber() {
  const pathname = usePathname();

  useEffect(() => {
    swapPhoneNumber();
    window.addEventListener('gfn', swapPhoneNumber);
    return () => window.removeEventListener('gfn', swapPhoneNumber);
  }, [pathname]);

  return null;
}
