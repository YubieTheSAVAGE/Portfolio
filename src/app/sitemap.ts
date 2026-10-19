import type { MetadataRoute } from 'next'
import { NAV_LINKS } from '@/data/nav'
import { siteConfig } from '@/site.config'

export default function sitemap(): MetadataRoute.Sitemap {
  return NAV_LINKS.map((link) => ({
    url: `${siteConfig.url}${link.path === '/' ? '' : link.path}`,
    changeFrequency: 'monthly',
    priority: link.path === '/' ? 1 : 0.9,
  }))
}
