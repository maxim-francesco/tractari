import { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import { blogPosts } from '@/lib/blog-data';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { pageMetadata } from '@/lib/site';

export const metadata: Metadata = pageMetadata({
  path: '/blog',
  title: 'Blog Tractări Auto Sibiu | Sfaturi pentru Șoferi în Pană',
  description: 'Articole despre tractări auto, depanare și asistență rutieră în Sibiu și pe A1: ce faci în pană, cum se stabilește prețul, alimentare greșită.',
});

export default function BlogListingPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/20 to-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-black font-headline mb-6 uppercase tracking-tighter">
            Blog Tractări Auto Sibiu: <span className="block text-primary">Sfaturi pentru Șoferi</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Descoperiți ghidurile noastre practice despre asistență rutieră, întreținere auto și siguranță pe drumurile din județul Sibiu.
          </p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <Card className="h-full border border-border bg-secondary/10 hover:border-primary/50 transition-all rounded-[2rem] overflow-hidden">
                  <CardHeader className="p-8 pb-4">
                    <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4 font-bold uppercase tracking-widest">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" />
                        {post.readTime}
                      </div>
                    </div>
                    <CardTitle className="text-2xl md:text-3xl font-black uppercase tracking-tight group-hover:text-primary transition-colors leading-tight">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 pt-0">
                    <p className="text-muted-foreground text-lg mb-8 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-sm group-hover:gap-4 transition-all">
                      Citește Articolul <ArrowRight className="w-5 h-5" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <StickyCTA />
    </main>
  );
}
