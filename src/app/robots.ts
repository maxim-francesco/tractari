import { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/site'

// Search engines and AI crawlers (search, training and user-initiated fetches) are all
// allowed. A named group replaces `*` for that bot, so each one repeats `Allow: /`.
const AI_CRAWLERS = [
  'OAI-SearchBot', 'GPTBot', 'ChatGPT-User',
  'Claude-SearchBot', 'ClaudeBot', 'Claude-User',
  'PerplexityBot', 'Perplexity-User',
  'Google-Extended', 'Applebot-Extended', 'Bingbot',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: AI_CRAWLERS, allow: '/' },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
  }
}
