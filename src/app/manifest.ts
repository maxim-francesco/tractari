import { MetadataRoute } from 'next'
import { SITE_NAME } from '@/lib/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: 'Tractări Sibiu',
    theme_color: '#FF6B00',
    background_color: '#0A0A0A',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    icons: [
      { src: '/icon', sizes: '512x512', type: 'image/png' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  }
}
