import { OG_PAGES, renderOgImage } from '@/lib/og';

// Share images are generated once at build time, only for the known pages.
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(OG_PAGES).map((key) => ({ key }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  return renderOgImage(key);
}
