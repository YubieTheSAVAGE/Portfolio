import PAST_ROLES from '@/data/experience'
import { Highlight } from '../ui/highlight'

export default function Experience() {
  return (
    <div className="mb-16">
      <h2 className="mb-8 text-xl font-heading sm:text-2xl">Experience</h2>

      {PAST_ROLES.map((role, id) => {
        return (
          <div className="mb-8" key={id}>
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

            <p className="mb-4 mt-0.5 text-sm">
              {role.startDate} - {role.endDate}
            </p>
            <p>{role.description}</p>
          </div>
        )
      })}
    </div>
  )
}
