'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const ADS_CALL_CONVERSION_SEND_TO = 'AW-18256093286/sL2dCP7z3ZYdEObAl4FE';

export default function CallClickTracker() {
  useEffect(() => {
    // 1. On mount, check search params for ads click IDs
    try {
      const search = window.location.search;
      if (
        search.includes('gclid=') ||
        search.includes('gbraid=') ||
        search.includes('wbraid=')
      ) {
        window.sessionStorage.setItem('ads_click', '1');
      }
    } catch {
      // Fail-silent
    }

    // 2. Document-level click listener in capture phase
    const handleDocumentClick = (e: MouseEvent) => {
      try {
        const target = e.target as Element | null;
        if (!target || typeof target.closest !== 'function') {
          return;
        }

        const telLink = target.closest('a[href^="tel:"]');
        if (telLink) {
          const fromAds = (() => {
            try {
              return window.sessionStorage.getItem('ads_click') === '1';
            } catch {
              return false;
            }
          })();

          if (typeof window.gtag === 'function') {
            window.gtag('event', 'call_click', {
              page_path: window.location.pathname,
              from_ads: fromAds,
              transport_type: 'beacon',
            });

            window.gtag('event', 'conversion', {
              send_to: ADS_CALL_CONVERSION_SEND_TO,
              transport_type: 'beacon',
            });
          }
          return;
        }

        const waLink = target.closest(
          'a[href^="https://wa.me/"], a[href^="https://api.whatsapp.com/"], a[href^="whatsapp://"]'
        );
        if (waLink) {
          const fromAds = (() => {
            try {
              return window.sessionStorage.getItem('ads_click') === '1';
            } catch {
              return false;
            }
          })();

          if (typeof window.gtag === 'function') {
            window.gtag('event', 'whatsapp_click', {
              page_path: window.location.pathname,
              from_ads: fromAds,
              transport_type: 'beacon',
            });
          }
        }
      } catch {
        // Fail-silent
      }
    };

    document.addEventListener('click', handleDocumentClick, true);

    return () => {
      document.removeEventListener('click', handleDocumentClick, true);
    };
  }, []);

  return null;
}

