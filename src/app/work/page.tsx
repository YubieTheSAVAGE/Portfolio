import type { Metadata } from 'next'
import PROJECTS from '@/data/projects'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image from 'next/image'
import { ArrowDown } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Portfolio projects: IMMO 360, SHAMSIMMO, Flow Board, FiveM Store. SaaS dashboards and web platforms built with Next.js, TypeScript, and Tailwind.',
  openGraph: {
    title: 'Work | Ayoub Boudiba',
    description:
      'Portfolio projects: SaaS dashboards and web platforms built with Next.js, TypeScript, and Tailwind.',
    url: '/work',
  },
}

export default function Work() {
  return (
    <div>
      <h1 className="font-heading mb-8 text-2xl sm:text-4xl">Work</h1>

      <div className="flex flex-col gap-5">
        {PROJECTS.map((project, id) => {
          return (
            <div
              className="border-border shadow-shadow rounded-base bg-main border-2 p-4 sm:p-5"
              key={id}
            >
              <AspectRatio
                className="border-border shadow-shadow rounded-base -bottom-[2px]! border-2"
                ratio={71 / 26}
              >
                <Image
                  width={710}
                  height={260}
                  className="rounded-base w-full h-full object-cover"
                  src={`${project.previewImage}`}
                  alt={project.name}
                />
              </AspectRatio>

              <div className="text-main-foreground font-base mt-5">
                <h2 className="font-heading text-xl sm:text-2xl">
                  {project.name}
                </h2>

                <p className="mt-2">{project.description}</p>

                <div className="mt-8 grid grid-cols-2 gap-5">
                  {project.liveLink && (
                  <a
                    className="border-border bg-secondary-background text-foreground shadow-shadow rounded-base font-base hover:translate-x-boxShadowX hover:translate-y-boxShadowY cursor-pointer border-2 px-4 py-2 text-center text-sm transition-all hover:shadow-none sm:text-base"
                    href={project.liveLink}
                    target="_blank"
                  >
                    Visit
                  </a>
                  )}
                  {project.repoUrl && (
                  <a
                    className="border-border bg-secondary-background text-foreground shadow-shadow rounded-base font-base hover:translate-x-boxShadowX hover:translate-y-boxShadowY cursor-pointer border-2 px-4 py-2 text-center text-sm transition-all hover:shadow-none sm:text-base"
                    href={project.repoUrl}
                    target="_blank"
                  >
                    Github
                  </a>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-12 flex flex-col items-center justify-center gap-3 text-main-foreground/70 dark:text-white">
        <p className="font-base text-sm sm:text-base">
          More to come — I haven&apos;t posted everything yet
        </p>
        <ArrowDown
          className="size-4 animate-bounce"
        />
      </div>
    </div>
  )
}
