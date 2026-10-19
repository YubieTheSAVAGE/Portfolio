import type { Metadata } from 'next'
import Experience from '@/components/sections/experience'
import Skills from '@/components/sections/skills'
import { Reveal } from '@/components/reveal'
import { RichText } from '@/components/ui/rich-text'
import { siteConfig } from '@/site.config'

const description = `About ${siteConfig.name}: ${siteConfig.title}. Background, skills and experience.`

export const metadata: Metadata = {
  title: 'About',
  description,
  openGraph: {
    title: `About | ${siteConfig.name}`,
    description,
    url: '/about',
  },
  alternates: {
    canonical: '/about',
  },
}

export default function About() {
  return (
    <div>
      <h1 className="font-display mb-8 text-4xl sm:text-5xl animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
        About
      </h1>

      <div className="mb-16 space-y-5 text-base leading-relaxed sm:text-lg animate-in fade-in-0 slide-in-from-bottom-2 duration-500 fill-mode-both delay-100">
        {siteConfig.about.map((paragraph) => (
          <p key={paragraph}>
            <RichText text={paragraph} />
          </p>
        ))}
      </div>

      <Reveal>
        <Skills />
      </Reveal>

      <Experience />
    </div>
  )
}
