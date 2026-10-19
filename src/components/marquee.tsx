import { SkillIcon } from '@/components/SkillIcon'
import type { SkillEntry } from '@/data/skills'

/** Endless brutal ticker. The list is rendered twice so the loop is seamless. */
export function Marquee({ items }: { items: SkillEntry[] }) {
  return (
    <div className="border-border bg-main text-main-foreground group relative -mx-5 overflow-hidden border-y-2 py-3 sm:mx-0 sm:border-2 sm:shadow-shadow">
      <p className="sr-only">Stack: {items.map((i) => i.name).join(', ')}</p>
      <div className="animate-marquee flex w-max group-hover:[animation-play-state:paused]" aria-hidden>
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {items.map((item) => (
              <li
                key={item.iconKey}
                className="font-heading flex items-center gap-2 px-5 text-sm whitespace-nowrap sm:text-base"
              >
                <SkillIcon
                  name={item.name}
                  iconKey={item.iconKey}
                  className="text-main-foreground size-5"
                  size={20}
                />
                {item.name}
                <span className="ml-5">✦</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
