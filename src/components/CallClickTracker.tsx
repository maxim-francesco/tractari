'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

// Measures taps on tel:/WhatsApp links only. A tap is not a connected or answered call.
const ADS_CALL_CONVERSION_SEND_TO = 'AW-18256093286/sL2dCP7z3ZYdEObAl4FE';
const DEDUPE_MS = 3000;
const AD_CLICK_PARAMS = ['gclid', 'gbraid', 'wbraid'];

function hasAdClickParam(search: string): boolean {
  const params = new URLSearchParams(search);
  return AD_CLICK_PARAMS.some((p) => params.has(p));
}

// gtag.js only reads `arguments` objects from dataLayer, not plain arrays.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function queueGtag(..._args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
}

function sendEvent(...args: unknown[]) {
  if (typeof window.gtag === 'function') {
    window.gtag(...args);
  } else {
    queueGtag(...args);
  }
}

export default function CallClickTracker() {
  useEffect(() => {
    try {
      if (hasAdClickParam(window.location.search)) {
        window.sessionStorage.setItem('ads_click', '1');
      }
    } catch {
      // Fail-silent
    }

    const lastSent: Record<string, number> = {};
    const isDuplicate = (key: string) => {
      const now = Date.now();
      if (lastSent[key] && now - lastSent[key] < DEDUPE_MS) return true;
      lastSent[key] = now;
      return false;
    };

    const fromAds = () => {
      try {
        return window.sessionStorage.getItem('ads_click') === '1' || hasAdClickParam(window.location.search);
      } catch {
        return false;
      }
    };

    // Capture phase, never preventDefault: the dialer opens immediately.
    const handleDocumentClick = (e: MouseEvent) => {
      try {
        const target = e.target as Element | null;
        if (!target || typeof target.closest !== 'function') return;

        const telLink = target.closest('a[href^="tel:"]');
        if (telLink) {
          if (isDuplicate('tel')) return;
          sendEvent('event', 'call_click', {
            page_path: window.location.pathname,
            link_location: telLink.getAttribute('data-cta') || undefined,
            from_ads: fromAds(),
            transport_type: 'beacon',
          });
          sendEvent('event', 'conversion', {
            send_to: ADS_CALL_CONVERSION_SEND_TO,
            transport_type: 'beacon',
          });
          return;
        }

        const waLink = target.closest(
          'a[href^="https://wa.me/"], a[href^="https://api.whatsapp.com/"], a[href^="whatsapp://"]'
        );
        if (waLink) {
          if (isDuplicate('whatsapp')) return;
          sendEvent('event', 'whatsapp_click', {
            page_path: window.location.pathname,
            link_location: waLink.getAttribute('data-cta') || undefined,
            from_ads: fromAds(),
            transport_type: 'beacon',
          });
        }
      } catch {
        // Fail-silent
      }
    };

    document.addEventListener('click', handleDocumentClick, true);
    return () => document.removeEventListener('click', handleDocumentClick, true);
  }, []);

  return null;
}
