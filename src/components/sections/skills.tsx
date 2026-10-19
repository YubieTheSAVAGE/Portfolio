import { SKILL_CATEGORIES } from '@/data/skills'
import { SkillRow } from '@/components/SkillRow'

export default function Skills() {
  return (
    <section className="mb-16" aria-labelledby="skills-heading">
      <h2 id="skills-heading" className="font-display mb-8 text-xl sm:text-2xl">
        Skills
      </h2>

      {SKILL_CATEGORIES.map((category) => (
        <SkillRow
          key={category.label}
          label={category.label}
          skills={category.skills}
        />
      ))}
    </section>
  )
}
