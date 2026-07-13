'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

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
    } catch (err) {
      // Fail-silent
    }

    // 2. Document-level click listener in capture phase
    const handleDocumentClick = (e: MouseEvent) => {
      try {
        const target = e.target as HTMLElement;
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
            });
          }
        }
      } catch (err) {
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
