import { ogSize, renderOgCard } from '@/lib/og'
import { siteConfig } from '@/site.config'

export const alt = `About ${siteConfig.name}`
export const size = ogSize
export const contentType = 'image/png'

export default function Image() {
  return renderOgCard({
    label: 'About',
    heading: siteConfig.name,
    subheading: `${siteConfig.title} · skills & experience`,
  })
}
