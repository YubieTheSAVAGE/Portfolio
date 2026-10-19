import {
  type IconType,
  SiGithub,
  SiGmail,
  SiLinkedin,
  SiMedium,
  SiX,
} from '@icons-pack/react-simple-icons'
import { siteConfig, type SocialIcon } from '@/site.config'
import { cn } from '@/lib/utils'

const ICONS: Record<SocialIcon, IconType> = {
  gmail: SiGmail,
  github: SiGithub,
  linkedin: SiLinkedin,
  x: SiX,
  medium: SiMedium,
}

export default function Links({
  className,
  size = 24,
}: {
  className?: string
  size?: number
}) {
  return (
    <ul className={cn('flex flex-wrap items-center gap-3', className)}>
      {siteConfig.socials.map((link) => {
        const Icon = ICONS[link.icon]
        const external = link.href.startsWith('http')
        return (
          <li key={link.href}>
            <a
              href={link.href}
              aria-label={link.label}
              title={link.label}
              {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
              className="border-border bg-secondary-background shadow-shadow rounded-base hover:translate-x-boxShadowX hover:translate-y-boxShadowY focus-visible:ring-ring flex border-2 p-2 transition-all hover:shadow-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <Icon size={size} aria-hidden />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
