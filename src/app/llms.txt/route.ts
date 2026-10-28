import { blogPosts } from '@/lib/blog-data';
import { FAQ_ITEMS } from '@/lib/faq';
import {
  AREA_SERVED, CUI, GOOGLE_MAPS_URL, LEGAL_NAME, PHONE_DISPLAY, REG_COM, SITE_NAME, WHATSAPP_URL, absoluteUrl,
} from '@/lib/site';

// llms.txt (llmstxt.org): a plain summary for AI tools. Built from the same data as the
// pages (contact constants, FAQ, blog list), so it cannot drift from the site content.
// Google Search does not use it; it is optional for other AI assistants.
export const dynamic = 'force-static';

const PAGES = [
  { path: '/tractari-auto-sibiu', name: 'Tractări auto Sibiu', note: 'tractare pe platformă în Sibiu, împrejurimi și pe Autostrada A1; cum decurge, zone, de ce depinde prețul' },
  { path: '/asistenta-rutiera-sibiu', name: 'Asistență rutieră Sibiu', note: 'tractare, baterie descărcată, pană de cauciuc, alimentare greșită; ce faceți până ajunge ajutorul' },
  { path: '/depanare-auto-sibiu', name: 'Depanare auto Sibiu', note: 'situații care se pot rezolva la fața locului și când e nevoie de tractare' },
  { path: '/transport-auto-sibiu', name: 'Transport auto pe platformă', note: 'transport programat din Sibiu: la service, la RAR, mașini cumpărate din alt oraș' },
  { path: '/intrebari-frecvente', name: 'Întrebări frecvente', note: 'preț, timp de sosire, zone, A1, informații necesare la apel' },
  { path: '/contact', name: 'Contact', note: 'telefon non-stop și WhatsApp' },
];

export function GET() {
  const lines = [
    `# ${SITE_NAME}`,
    '',
    `> Tractări auto, platformă auto și asistență rutieră în Sibiu, în tot județul, pe Autostrada A1 în zona Sibiu și pe Valea Oltului (DN7) până la Râmnicu Vâlcea. Doar autoturisme și dube. Apeluri preluate non-stop la ${PHONE_DISPLAY}. Prețul și timpul estimat de sosire se comunică la telefon, înainte de plecarea platformei.`,
    '',
    `- Telefon: ${PHONE_DISPLAY} (non-stop)`,
    `- WhatsApp: ${WHATSAPP_URL}`,
    `- Zone deservite: ${AREA_SERVED.join(', ')}, Autostrada A1 (zona Sibiu), Valea Oltului (DN7). Alte localități: la cerere, confirmate telefonic.`,
    `- Profil Google Maps: ${GOOGLE_MAPS_URL}`,
    `- Operator: ${LEGAL_NAME}, CUI ${CUI}, Reg. Com. ${REG_COM}`,
    `- Site: ${absoluteUrl('/')}`,
    '',
    '## Servicii',
    '',
    ...PAGES.map((p) => `- [${p.name}](${absoluteUrl(p.path)}): ${p.note}`),
    '',
    '## Întrebări frecvente',
    '',
    ...FAQ_ITEMS.flatMap((item) => [`### ${item.q}`, '', item.a, '']),
    '## Articole',
    '',
    ...blogPosts.map((post) => `- [${post.title}](${absoluteUrl(`/blog/${post.slug}`)}): ${post.excerpt}`),
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
