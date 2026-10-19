import type { Metadata } from 'next'
import { ProjectCard } from '@/components/project-card'
import { Reveal } from '@/components/reveal'
import PROJECTS from '@/data/projects'
import { siteConfig } from '@/site.config'

const description = `Selected projects by ${siteConfig.name}: ${PROJECTS.map((p) => p.name).join(', ')}.`

export const metadata: Metadata = {
  title: 'Work',
  description,
  openGraph: {
    title: `Work | ${siteConfig.name}`,
    description,
    url: '/work',
  },
  alternates: {
    canonical: '/work',
  },
}

const github = siteConfig.socials.find((s) => s.icon === 'github')

export default function Work() {
  return (
    <div>
      <h1 className="font-display mb-8 text-4xl sm:text-5xl animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
        Work
      </h1>

      <div className="flex flex-col gap-8">
        {PROJECTS.map((project, i) => (
          <Reveal key={project.name}>
            <ProjectCard project={project} priority={i === 0} />
          </Reveal>
        ))}
      </div>

      {github && (
        <p className="text-foreground/80 mt-12 text-center text-sm sm:text-base">
          Not everything is posted here yet.{' '}
          <a
            href={github.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-heading decoration-main whitespace-nowrap underline decoration-2 underline-offset-4"
          >
            More on GitHub →
          </a>
        </p>
      )}
    </div>
  )
}
