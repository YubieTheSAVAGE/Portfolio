import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { SiGithub } from '@icons-pack/react-simple-icons'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import type { Project } from '@/data/projects'
import { buttonClass } from '@/lib/utils'

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <article className="group border-border shadow-shadow rounded-base bg-main border-2 p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-[-8px_8px_0_0_var(--border)] sm:p-5">
      <AspectRatio
        className="border-border rounded-base overflow-hidden border-2"
        ratio={71 / 26}
      >
        <Image
          fill
          sizes="(max-width: 750px) 100vw, 710px"
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          src={project.previewImage}
          alt={`Screenshot of ${project.name}`}
        />
      </AspectRatio>

      <div className="text-main-foreground mt-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-display text-xl sm:text-2xl">{project.name}</h3>
          {project.year && <span className="text-sm font-bold">{project.year}</span>}
        </div>

        <p className="mt-2">{project.description}</p>

        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tags">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="border-border bg-background text-foreground rounded-base border-2 px-2 py-0.5 text-xs font-bold"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-5">
          {project.liveLink && (
            <a
              className={buttonClass}
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit <ArrowUpRight className="size-4" aria-hidden />
              <span className="sr-only">{project.name}</span>
            </a>
          )}
          {project.repoUrl && (
            <a
              className={buttonClass}
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiGithub className="size-4" aria-hidden /> Code
              <span className="sr-only">for {project.name}</span>
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
