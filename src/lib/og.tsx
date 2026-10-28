import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { blogPosts } from '@/lib/blog-data';
import { PHONE_DISPLAY, SITE_HOST } from '@/lib/site';

export const OG_SIZE = { width: 1200, height: 630 };

// Fixed list of share images (one per indexable page). Keys come from the page path,
// so no arbitrary text can be rendered on the domain.
export const OG_PAGES: Record<string, { kicker: string; title: string }> = {
  home: { kicker: 'Non-stop · Sibiu și Autostrada A1', title: 'Tractări auto Sibiu' },
  'tractari-auto-sibiu': { kicker: 'Platformă auto · Autostrada A1', title: 'Tractări auto Sibiu cu platformă' },
  'asistenta-rutiera-sibiu': { kicker: 'Non-stop · Sibiu și A1', title: 'Asistență rutieră Sibiu' },
  'depanare-auto-sibiu': { kicker: 'Baterie · Roată · Alimentare greșită', title: 'Depanare auto Sibiu' },
  'transport-auto-sibiu': { kicker: 'Programat · Service · RAR', title: 'Transport auto pe platformă din Sibiu' },
  'intrebari-frecvente': { kicker: 'Preț · Zone · Autostrada A1', title: 'Întrebări frecvente despre tractări' },
  contact: { kicker: 'Telefon și WhatsApp', title: 'Contact tractări Sibiu, non-stop' },
  blog: { kicker: 'Sfaturi pentru șoferi', title: 'Blog tractări auto Sibiu' },
  ...Object.fromEntries(blogPosts.map((post) => [`blog--${post.slug}`, { kicker: 'Articol', title: post.title }])),
};

async function loadFonts() {
  const dir = join(process.cwd(), 'src/assets/fonts');
  const file = (name: string) => readFile(join(dir, name));
  // Full (non-subset) Inter TTFs: every Romanian diacritic (Ă ă Â â Î î Ș ș Ț ț) is in the
  // same file as the base letters, so no glyph falls back to a thinner default font.
  const [medium, bold] = await Promise.all([file('Inter_500Medium.ttf'), file('Inter_800ExtraBold.ttf')]);
  return [
    { name: 'InterBold', data: bold, weight: 800 as const, style: 'normal' as const },
    { name: 'InterMedium', data: medium, weight: 500 as const, style: 'normal' as const },
  ];
}

export async function renderOgImage(key: string) {
  const { kicker, title } = OG_PAGES[key] ?? OG_PAGES.home;
  const titleSize = title.length > 40 ? 64 : title.length > 26 ? 76 : 92;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          fontFamily: 'InterMedium',
          color: '#FFFFFF',
          background: 'linear-gradient(135deg, #0A0A0A 0%, #1C1C1C 55%, #0A0A0A 100%)',
        }}
      >
        <div style={{ width: 18, height: '100%', background: '#FF6B00' }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 72px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                width: 72, height: 72, borderRadius: 18, background: '#FF6B00', display: 'flex',
                alignItems: 'center', justifyContent: 'center', fontSize: 48, fontFamily: 'InterBold', fontWeight: 800, marginRight: 24,
              }}
            >
              T
            </div>
            <div style={{ fontSize: 34, fontFamily: 'InterBold', fontWeight: 800, color: '#FF6B00', letterSpacing: 1 }}>RDL TRACTĂRI AUTO SIBIU</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontSize: 30, fontWeight: 500, color: 'rgba(255,255,255,0.75)', marginBottom: 18 }}>{kicker}</div>
            <div style={{ display: 'flex', fontSize: titleSize, fontFamily: 'InterBold', fontWeight: 800, lineHeight: 1.05, letterSpacing: -1.5, maxWidth: 1000 }}>{title}</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div
              style={{
                display: 'flex', alignItems: 'center', background: '#FF6B00', borderRadius: 999,
                padding: '16px 34px', fontSize: 34, fontFamily: 'InterBold', fontWeight: 800,
              }}
            >
              Sună: {PHONE_DISPLAY}
            </div>
            <div style={{ fontSize: 28, fontWeight: 500, color: 'rgba(255,255,255,0.7)' }}>{SITE_HOST}</div>
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: await loadFonts() },
  );
}
