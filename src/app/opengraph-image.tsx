import { ogSize, renderOgCard } from '@/lib/og'
import { siteConfig } from '@/site.config'

export const alt = `${siteConfig.name} — ${siteConfig.title}`
export const size = ogSize
export const contentType = 'image/png'

export default function Image() {
  return renderOgCard({
    label: 'Portfolio',
    heading: siteConfig.name,
    subheading: siteConfig.title,
  })
}
