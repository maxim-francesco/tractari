import { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/blog-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tractarimasinisibiu.ro'
  const lastModified = new Date()
  
  const routes = [
    '',
    '/tractari-auto-sibiu',
    '/transport-auto-sibiu',
    '/depanare-auto-sibiu',
    '/asistenta-rutiera-sibiu',
    '/intrebari-frecvente',
    '/contact',
    '/blog',
    '/politica-de-confidentialitate',
    '/termeni-si-conditii',
    '/politica-cookies',
    '/anpc',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...routes, ...blogRoutes]
}
