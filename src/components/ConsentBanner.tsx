'use client';

import { useSyncExternalStore } from 'react';
import Link from 'next/link';
import { CONSENT_COOKIE } from '@/lib/site';

const OPEN_EVENT = 'open-cookie-settings';
const SIX_MONTHS = 60 * 60 * 24 * 182;

type Choice = 'granted' | 'denied';

function readChoice(): Choice | null {
  try {
    const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=(granted|denied)`));
    return match ? (match[1] as Choice) : null;
  } catch {
    return null;
  }
}

// Removes Google Analytics / Ads cookies set earlier when consent is withdrawn.
function clearTrackingCookies() {
  const host = window.location.hostname;
  const domains = ['', host, `.${host.replace(/^www\./, '')}`];
  document.cookie.split('; ').forEach((pair) => {
    const name = pair.split('=')[0];
    if (/^(_ga|_gid|_gcl_)/.test(name)) {
      domains.forEach((domain) => {
        document.cookie = `${name}=; max-age=0; path=/${domain ? `; domain=${domain}` : ''}`;
      });
    }
  });
}

function applyChoice(choice: Choice) {
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${CONSENT_COOKIE}=${choice}; max-age=${SIX_MONTHS}; path=/; SameSite=Lax${secure}`;
  const state = choice === 'granted' ? 'granted' : 'denied';
  window.gtag?.('consent', 'update', {
    ad_storage: state,
    analytics_storage: state,
    ad_user_data: state,
    ad_personalization: state,
  });
  if (choice === 'denied') clearTrackingCookies();
}

// Tiny external store: open when no choice is stored or when „Setări cookies” was clicked.
const listeners = new Set<() => void>();
let reopened = false;
const emit = () => listeners.forEach((listener) => listener());

if (typeof window !== 'undefined') {
  window.addEventListener(OPEN_EVENT, () => {
    reopened = true;
    emit();
  });
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

const getSnapshot = () => reopened || readChoice() === null;
// Server HTML never contains the banner; it appears after hydration.
const getServerSnapshot = () => false;

export default function ConsentBanner() {
  const open = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!open) return null;

  const choose = (choice: Choice) => {
    applyChoice(choice);
    reopened = false;
    emit();
  };

  // Mobile: compact card at the bottom, leaving room on the right for the sticky call
  // button (right-6 + w-16 + outline ≈ 5.75rem). Desktop: bottom-left card.
  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      className="fixed bottom-3 left-3 right-[5.75rem] z-[90] rounded-2xl border border-white/20 bg-[#141414] p-3 shadow-2xl md:bottom-6 md:left-6 md:right-auto md:max-w-md md:p-6"
    >
      <p id="consent-title" className="sr-only md:not-sr-only md:mb-1 md:block md:text-sm md:font-black md:uppercase md:tracking-widest md:text-white">Cookie-uri</p>
      <p className="mb-3 text-sm leading-snug text-white/85 md:mb-4 md:leading-relaxed">
        Folosim cookie-uri ca să ne îmbunătățim site-ul. <Link href="/politica-cookies" className="font-bold text-primary underline">Detalii</Link>
      </p>
      <div className="grid grid-cols-2 gap-2 md:gap-3">
        <button
          type="button"
          onClick={() => choose('denied')}
          className="min-h-11 whitespace-nowrap rounded-xl border border-white/40 px-3 text-sm font-black uppercase text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          Refuz
        </button>
        <button
          type="button"
          onClick={() => choose('granted')}
          className="min-h-11 whitespace-nowrap rounded-xl border border-white/40 px-3 text-sm font-black uppercase text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          Accept
        </button>
      </div>
    </div>
  );
}

export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      Setări cookies
    </button>
  );
}
