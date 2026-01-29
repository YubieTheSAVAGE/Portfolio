import {
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
} from '@icons-pack/react-simple-icons'
import Links from '@/components/links'

const techStack = [
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
] as const

export default function Home() {
  return (
    <div className="font-base">
      <h1 className="text-2xl font-heading sm:text-4xl">Ayoub BOUDIBA</h1>
      <p className="mt-2 text-lg sm:text-xl">Frontend Engineer</p>
      <div className="mt-8 text-base sm:text-lg">
        <p>
          I build scalable SaaS dashboards and product-focused web platforms.{' '}
          {techStack.map(({ name, icon: Icon }, i) => (
            <span key={name}>
              {i > 0 && ' • '}
              <span className="inline-flex items-center gap-1.5">
                <Icon className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" title="" />
                {name}
              </span>
            </span>
          ))}
        </p>

        <br />

        <p>
          Product-driven and hands-on. Built through real projects at EST Essaouira, and 1337 (42 Network).
        </p>
      </div>

      <Links />
    </div>
  )
}
