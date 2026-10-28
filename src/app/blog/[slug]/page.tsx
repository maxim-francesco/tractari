import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import { blogPosts } from '@/lib/blog-data';
import { Button } from '@/components/ui/button';
import { Phone, Calendar, Clock, ArrowLeft, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { BUSINESS_ID, JsonLd, PHONE_DISPLAY, PHONE_HREF, WHATSAPP_URL, absoluteUrl, breadcrumbJsonLd, pageMetadata } from '@/lib/site';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return { title: 'Articol negăsit' };

  return {
    ...pageMetadata({
      path: `/blog/${slug}`,
      title: post.seoTitle,
      description: post.excerpt,
      openGraphType: 'article',
      publishedTime: post.date,
    }),
    keywords: post.keywords,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  const url = absoluteUrl(`/blog/${slug}`);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.date,
    "inLanguage": "ro-RO",
    "mainEntityOfPage": url,
    "author": { "@id": BUSINESS_ID },
    "publisher": { "@id": BUSINESS_ID },
  };

  return (
    <main className="min-h-screen">
      <Navigation />
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd([{ name: 'Blog', path: '/blog' }, { name: post.title, path: `/blog/${slug}` }])} />
      
      {/* Reading Progress Indicator */}
      <div className="fixed top-16 left-0 w-full h-1 z-50 pointer-events-none">
        <div className="h-full bg-primary animate-in slide-in-from-left duration-1000 origin-left" />
      </div>

      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/20 to-background border-b border-border">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/blog" className="inline-flex items-center gap-2 text-primary font-bold mb-8 hover:underline uppercase tracking-widest text-xs">
            <ArrowLeft className="w-4 h-4" /> Înapoi la Blog
          </Link>
          
          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6 font-black uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              {post.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              {post.readTime}
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black font-headline mb-8 uppercase tracking-tighter leading-tight">
            {post.title}
          </h1>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4">
          <div className="prose prose-invert prose-orange max-w-none">
            {post.content.map((paragraph, index) => (
              <div key={index}>
                <p className="text-xl leading-relaxed text-muted-foreground mb-8">
                  {paragraph}
                </p>
                
                {/* Mid-article CTA */}
                {index === Math.floor(post.content.length / 2) && (
                  <div className="my-16 p-10 rounded-[2.5rem] bg-secondary/20 border border-primary/30 text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <h3 className="text-2xl font-black uppercase tracking-tight mb-4 relative z-10">Ai nevoie de ajutor acum?</h3>
                    <p className="text-muted-foreground mb-8 font-medium relative z-10">Preluăm apeluri non-stop pentru Sibiu, împrejurimi și A1. Prețul și timpul estimat vi le spunem la telefon.</p>
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-black h-auto min-h-14 py-3 whitespace-normal max-w-full px-6 sm:px-10 rounded-xl text-lg relative z-10" asChild>
                      <a href={PHONE_HREF} data-cta="article-mid">
                        <Phone className="w-5 h-5 mr-3" />
                        {PHONE_DISPLAY}
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Related links: other articles + the matching service pages */}
          <nav aria-label="Articole și servicii similare" className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-border pt-12">
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight mb-5">Articole similare</h2>
              <ul className="space-y-3">
                {blogPosts.filter((p) => p.slug !== post.slug).map((p) => (
                  <li key={p.slug}>
                    <Link href={`/blog/${p.slug}`} className="text-primary font-bold hover:underline">{p.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight mb-5">Servicii în Sibiu</h2>
              <ul className="space-y-3">
                <li><Link href="/tractari-auto-sibiu" className="text-primary font-bold hover:underline">Tractări auto Sibiu cu platformă</Link></li>
                <li><Link href="/asistenta-rutiera-sibiu" className="text-primary font-bold hover:underline">Asistență rutieră Sibiu non-stop</Link></li>
                <li><Link href="/intrebari-frecvente" className="text-primary font-bold hover:underline">Întrebări frecvente despre tractări</Link></li>
              </ul>
            </div>
          </nav>

          {/* End of article CTA */}
          <div className="mt-24 p-12 rounded-[3rem] bg-primary text-white text-center shadow-2xl shadow-primary/30">
            <h2 className="text-3xl md:text-4xl font-black mb-6 uppercase tracking-tight">Ai nevoie de tractare acum?</h2>
            <p className="text-xl mb-10 opacity-90 font-medium">Sunați non-stop. Spuneți-ne locația și destinația, iar noi vă spunem prețul înainte de plecare.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-black h-auto min-h-16 py-3 whitespace-normal max-w-full px-6 sm:px-10 rounded-2xl text-xl" asChild>
                <a href={PHONE_HREF} data-cta="article-bottom">
                  <Phone className="w-6 h-6 mr-3" />
                  {PHONE_DISPLAY}
                </a>
              </Button>
              <Button size="lg" variant="outline" className="h-16 px-10 rounded-2xl border-white/40 hover:bg-white/10 font-black text-xl text-white" asChild>
                <a href={WHATSAPP_URL} data-cta="article-bottom" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-6 h-6 mr-3 text-white" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <StickyCTA />
    </main>
  );
}
