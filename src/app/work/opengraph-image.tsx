import { ogSize, renderOgCard } from '@/lib/og'
import PROJECTS from '@/data/projects'
import { siteConfig } from '@/site.config'

export const alt = `Work by ${siteConfig.name}`
export const size = ogSize
export const contentType = 'image/png'

export default function Image() {
  return renderOgCard({
    label: 'Selected work',
    heading: siteConfig.name,
    subheading: PROJECTS.slice(0, 3)
      .map((p) => p.name)
      .join(' · '),
  })
}
