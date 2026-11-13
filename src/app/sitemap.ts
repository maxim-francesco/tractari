import { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/blog-data'
import { absoluteUrl } from '@/lib/site'

// Only final, indexable, self-canonical URLs. Noindex legal pages are left out.
// lastmod only for articles, which carry a real content date; the other pages have no
// reliable modification date (build time is not one).
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '/',
    '/tractari-auto-sibiu',
    '/transport-auto-sibiu',
    '/depanare-auto-sibiu',
    '/asistenta-rutiera-sibiu',
    '/intrebari-frecvente',
    '/contact',
    '/blog',
  ]

  return [
    ...routes.map((route) => ({ url: absoluteUrl(route) })),
    ...blogPosts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: post.updated ?? post.date,
    })),
  ]
}
