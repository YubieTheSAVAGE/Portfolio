'use client'

import {
  SiCss3,
  SiDocker,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiLinux,
  SiNextdotjs,
  SiNginx,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from '@icons-pack/react-simple-icons'
import type { LucideIcon } from 'lucide-react'
import {
  Key,
  Lock,
  Server,
  Box,
  Container,
  Code2,
  FileCode,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const ICON_SIZE = 28

const brandIcons: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  nextjs: SiNextdotjs,
  react: SiReact,
  tailwindcss: SiTailwindcss,
  typescript: SiTypescript,
  javascript: SiJavascript,
  html5: SiHtml5,
  css3: SiCss3,
  postgresql: SiPostgresql,
  git: SiGit,
  github: SiGithub,
  docker: SiDocker,
  linux: SiLinux,
  nginx: SiNginx,
  prisma: SiPrisma,
}

const lucideIcons: Record<string, LucideIcon> = {
  restapis: Server,
  nextauth: Lock,
  jwt: Key,
  betterauth: Lock,
  dockercompose: Container,
  cpp: Code2,
  twig: FileCode,
}

function FallbackIcon({
  label,
  className,
}: {
  label: string
  className?: string
}) {
  const short = label
    .replace(/REST APIs?/i, 'REST')
    .replace(/NextAuth/i, 'Auth')
    .replace(/BetterAuth/i, 'BA')
    .replace(/Docker Compose/i, 'DC')
    .replace(/C\/C\+\+/i, 'C++')
    .replace(/Twig/i, 'Twig')
    .slice(0, 3)
  return (
    <span
      className={cn(
        'inline-flex size-7 shrink-0 items-center justify-center rounded-none border-2 border-foreground bg-background text-[10px] font-bold text-foreground',
        className,
      )}
      aria-hidden
    >
      {short}
    </span>
  )
}

export type SkillIconProps = {
  name: string
  iconKey: string
  className?: string
  size?: number
}

export function SkillIcon({ name, iconKey, className, size = ICON_SIZE }: SkillIconProps) {
  const BrandIcon = brandIcons[iconKey]
  const LucideIcon = lucideIcons[iconKey]

  if (BrandIcon) {
    return (
      <BrandIcon
        className={cn('size-7 shrink-0 text-foreground', className)}
        size={size}
        aria-hidden
      />
    )
  }

  if (LucideIcon) {
    return (
      <LucideIcon
        className={cn('size-7 shrink-0 text-foreground', className)}
        size={size}
        strokeWidth={2}
        aria-hidden
      />
    )
  }

  return <FallbackIcon label={name} className={className} />
}
