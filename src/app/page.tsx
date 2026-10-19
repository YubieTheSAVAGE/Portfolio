import { Link } from 'next-view-transitions'
import { ArrowRight } from 'lucide-react'
import Links from '@/components/links'
import { CopyEmail } from '@/components/copy-email'
import { Marquee } from '@/components/marquee'
import { ProjectCard } from '@/components/project-card'
import { Reveal } from '@/components/reveal'
import { StickerPlayground } from '@/components/sticker-game'
import PROJECTS from '@/data/projects'
import { ALL_SKILLS } from '@/data/skills'
import { buttonClass, cn } from '@/lib/utils'
import { siteConfig } from '@/site.config'

const stickers = siteConfig.heroStack.map(
  (iconKey) =>
    ALL_SKILLS.find((skill) => skill.iconKey === iconKey) ?? { name: iconKey, iconKey },
)

const featured = PROJECTS.filter((project) => project.featured).slice(0, 2)

export default function Home() {
  return (
    <div>
      <section className="animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
        {siteConfig.status && (
          <a
            href={siteConfig.status.href}
            target="_blank"
            rel="noopener noreferrer"
            className="border-border bg-secondary-background rounded-base hover:bg-main hover:text-main-foreground mb-6 inline-flex items-center gap-2 border-2 px-3 py-1 text-xs font-bold transition-colors sm:text-sm"
          >
            <span className="relative flex size-2.5">
              <span className="bg-main absolute inline-flex size-full animate-ping" />
              <span className="border-border bg-main relative inline-flex size-2.5 border" />
            </span>
            {siteConfig.status.label}
          </a>
        )}

        <h1 className="font-display text-4xl leading-none tracking-tight sm:text-6xl">
          {siteConfig.heroName || siteConfig.name}
        </h1>
        <p className="font-heading mt-3 text-lg sm:text-2xl">
          <span className="bg-main text-main-foreground border-border rounded-base border-2 px-2">
            {siteConfig.title}
          </span>
        </p>

        <p className="mt-6 max-w-[60ch] text-base sm:text-lg">{siteConfig.tagline}</p>
        <p className="text-foreground/80 mt-3 max-w-[60ch] text-base sm:text-lg">
          {siteConfig.intro}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link href="/work" className={cn(buttonClass, 'bg-main text-main-foreground')}>
            See my work <ArrowRight className="size-4" aria-hidden />
          </Link>
          <CopyEmail email={siteConfig.email} />
          <Links className="sm:ml-auto" size={20} />
        </div>
      </section>

      <section className="mt-12 animate-in fade-in-0 slide-in-from-bottom-2 duration-500 fill-mode-both delay-150">
        <StickerPlayground stickers={stickers} />
      </section>

      <Reveal className="mt-12">
        <Marquee items={ALL_SKILLS} />
      </Reveal>

      {featured.length > 0 && (
        <section className="mt-16" aria-labelledby="featured-heading">
          <Reveal className="mb-6 flex items-end justify-between gap-4">
            <h2 id="featured-heading" className="font-display text-2xl sm:text-3xl">
              Featured work
            </h2>
            <Link
              href="/work"
              className="font-heading decoration-main text-sm underline decoration-2 underline-offset-4 sm:text-base"
            >
              All work →
            </Link>
          </Reveal>
          <div className="flex flex-col gap-6">
            {featured.map((project) => (
              <Reveal key={project.name}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
