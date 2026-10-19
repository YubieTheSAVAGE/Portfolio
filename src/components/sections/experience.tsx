import PAST_ROLES from '@/data/experience'
import { Highlight } from '@/components/ui/highlight'
import { Reveal } from '@/components/reveal'
import { formatMonth } from '@/lib/utils'

export default function Experience() {
  return (
    <section className="mb-16" aria-labelledby="experience-heading">
      <h2
        id="experience-heading"
        className="font-display mb-8 text-xl sm:text-2xl"
      >
        Experience
      </h2>

      <ol className="border-border relative ml-2 border-l-2 pl-6 sm:pl-8">
        {PAST_ROLES.map((role) => (
          <li
            key={`${role.company}-${role.role}`}
            className="relative mb-8 last:mb-0"
          >
            <span
              aria-hidden
              className="border-border absolute top-5 -left-[33px] size-4 rotate-45 border-2 sm:-left-[41px]"
              style={{
                background: role.end ? 'var(--secondary-background)' : 'var(--main)',
              }}
            />
            <Reveal>
              <article className="border-border bg-secondary-background shadow-shadow rounded-base border-2 p-4 sm:p-5">
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                  <h3 className="font-heading text-base sm:text-lg">
                    {role.role} @{' '}
                    {role.website ? (
                      <a
                        href={role.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="focus-visible:ring-ring rounded-base focus-visible:ring-2 focus-visible:outline-none"
                      >
                        <Highlight>{role.company}</Highlight>
                      </a>
                    ) : (
                      <Highlight>{role.company}</Highlight>
                    )}
                  </h3>
                  <span className="border-border bg-background rounded-base shrink-0 border-2 px-2 py-0.5 text-xs font-semibold sm:text-sm">
                    {formatMonth(role.start)} — {formatMonth(role.end)}
                  </span>
                </div>

                <ul className="mt-4 space-y-2 text-sm sm:text-base">
                  {role.description.map((line) => (
                    <li key={line} className="flex gap-3">
                      <span
                        aria-hidden
                        className="bg-foreground mt-2 size-1.5 shrink-0"
                      />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  )
}
