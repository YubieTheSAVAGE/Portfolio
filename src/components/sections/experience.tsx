import PAST_ROLES from '@/data/experience'
import { Highlight } from '../ui/highlight'

function Description({ text }: { text: string }) {
  const paragraphs = text.trim().split(/\n+/).filter(Boolean)
  return (
    <div className="space-y-3">
      {paragraphs.map((paragraph, i) => (
        <p key={i} className="text-justify">
          {paragraph}
        </p>
      ))}
    </div>
  )
}

export default function Experience() {
  return (
    <div className="mb-16">
      <h2 className="mb-8 text-xl font-heading sm:text-2xl">Experience</h2>

      {PAST_ROLES.map((role, index) => (
        <div
          key={`${role.company}-${role.role}`}
          className="mb-8 animate-in fade-in-0 slide-in-from-bottom-2 duration-300 fill-mode-both"
          style={{ animationDelay: `${index * 60}ms` }}
        >
          <h3 className="text-lg font-heading sm:text-xl">
            {role.role} @{' '}
            {role.website ? (
              <a
                href={role.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block underline decoration-muted-foreground/40 underline-offset-2 transition-all duration-200 hover:decoration-foreground hover:translate-x-0.5"
              >
                <Highlight>{role.company}</Highlight>
              </a>
            ) : (
              <Highlight>{role.company}</Highlight>
            )}
          </h3>

          <p className="mb-4 mt-0.5 text-sm text-foreground/70">
            {role.startDate} — {role.endDate}
          </p>
          <Description text={role.description} />
        </div>
      ))}
    </div>
  )
}
