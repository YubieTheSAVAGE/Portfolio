import type { Metadata } from 'next'
import Experience from '@/components/sections/experience'
import Skills from '@/components/sections/skills'
import { Highlight } from '@/components/ui/highlight'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Frontend engineer focused on SaaS dashboards and product-driven web platforms. Next.js, TypeScript, Tailwind. EST Essaouira & 1337 (42 Network). Skills and experience.',
  openGraph: {
    title: 'About | Ayoub Boudiba',
    description:
      'Frontend engineer focused on SaaS dashboards and product-driven web platforms. Skills and experience.',
    url: '/about',
  },
}

export default function About() {
  return (
    <div className="font-base">
      <h1
        className="mb-8 text-2xl font-heading sm:text-4xl animate-in fade-in-0 slide-in-from-bottom-2 duration-500 fill-mode-both"
        style={{ animationDelay: '0ms' }}
      >
        About
      </h1>

      <div
        className="mb-10 text-base sm:text-lg animate-in fade-in-0 slide-in-from-bottom-2 duration-500 fill-mode-both"
        style={{ animationDelay: '80ms' }}
      >
        <p className="text-justify">
          I'm a frontend engineer focused on building scalable, maintainable <Highlight>SaaS dashboards</Highlight> and product-driven web platforms. I work primarily with <Highlight>Next.js / TypeScript / Tailwind</Highlight>, and I care deeply about clean UI, clear structure, and frontend architecture that holds up as products grow.
          <br />
          <br />
          I enjoy working close to the product — translating requirements into well-designed interfaces, thinking through <Highlight>UX, role-based flows</Highlight>, and owning features from idea to production. I've contributed to and led frontend development on production-level projects, making decisions around application structure, authentication flows, and user experience across different roles.
          <br />
          <br />
          My background is hands-on and project-driven, shaped by real SaaS work as well as my studies. I'm a graduate with a Bachelor of Technical Studies from the Higher School of Technology <Highlight>EST Essaouira</Highlight>, and I currently study at <Highlight>1337 (42 Network)</Highlight>. I'm drawn to product-focused teams where frontend engineers have ownership, move fast, and ship things that people actually use.
        </p>
      </div>

      <div
        className="animate-in fade-in-0 slide-in-from-bottom-2 duration-500 fill-mode-both"
        style={{ animationDelay: '160ms' }}
      >
        <Skills />
      </div>

      <div
        className="animate-in fade-in-0 slide-in-from-bottom-2 duration-500 fill-mode-both"
        style={{ animationDelay: '240ms' }}
      >
        <Experience />
      </div>
    </div>
  )
}
