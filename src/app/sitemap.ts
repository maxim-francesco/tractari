import { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/blog-data'
import { absoluteUrl } from '@/lib/site'

// Only final, indexable, self-canonical URLs. Noindex legal pages are left out.
// No lastmod: there is no reliable modification date (build time is not one).
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
    ...blogPosts.map((post) => `/blog/${post.slug}`),
  ]

  return routes.map((route) => ({ url: absoluteUrl(route) }))
}
