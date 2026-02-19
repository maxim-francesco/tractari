import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import { blogPosts } from '@/lib/blog-data';
import { Button } from '@/components/ui/button';
import { Phone, Calendar, Clock, ArrowLeft, ChevronRight, MessageCircle } from 'lucide-react';
import Link from 'next/link';

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
    title: `${post.title} | Blog Tractări Sibiu`,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: {
      canonical: `https://tractarimasinisibiu.ro/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://tractarimasinisibiu.ro/blog/${slug}`,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.date,
    "author": {
      "@type": "Organization",
      "name": "Tractări Mașini Sibiu"
    }
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Acasă", "item": "https://tractarimasinisibiu.ro" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://tractarimasinisibiu.ro/blog" },
      { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://tractarimasinisibiu.ro/blog/${slug}` }
    ]
  };

  return (
    <main className="min-h-screen">
      <Navigation />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      
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
                    <p className="text-muted-foreground mb-8 font-medium relative z-10">Intervenim în Sibiu și pe autostrada A1 în maxim 30 de minute.</p>
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-black h-14 px-10 rounded-xl text-lg relative z-10" asChild>
                      <a href="tel:+40742916370">
                        <Phone className="w-5 h-5 mr-3" />
                        +40 742 916 370
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* End of article CTA */}
          <div className="mt-24 p-12 rounded-[3rem] bg-primary text-white text-center shadow-2xl shadow-primary/30">
            <h2 className="text-3xl md:text-4xl font-black mb-6 uppercase tracking-tight">Siguranța ta este prioritatea noastră</h2>
            <p className="text-xl mb-10 opacity-90 font-medium">Suntem disponibili 24/7 pentru orice urgență rutieră în județul Sibiu.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-black h-16 px-10 rounded-2xl text-xl" asChild>
                <a href="tel:+40742916370">
                  <Phone className="w-6 h-6 mr-3" />
                  +40 742 916 370
                </a>
              </Button>
              <Button size="lg" variant="outline" className="h-16 px-10 rounded-2xl border-white/40 hover:bg-white/10 font-black text-xl text-white" asChild>
                <a href="https://wa.me/40742916370" target="_blank" rel="noopener noreferrer">
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
