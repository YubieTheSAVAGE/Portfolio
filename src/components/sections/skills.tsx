'use client'

import { skills, RESUME_SKILL_NAMES } from '@/data/skills'
import { SkillRow } from '@/components/SkillRow'
import { useEffect } from 'react'

const RESUME_NAMES_SET = new Set(RESUME_SKILL_NAMES)

function validateSkillsInUI() {
  if (process.env.NODE_ENV !== 'development') return
  const allFromUI: string[] = []
  for (const category of Object.values(skills)) {
    for (const { name } of category) allFromUI.push(name)
  }
  const notInResume = allFromUI.filter((n) => !RESUME_NAMES_SET.has(n))
  if (notInResume.length > 0) {
    console.warn(
      '[Skills] The following skills appear in the UI but were not in the extracted resume list:',
      notInResume,
    )
  }
}

export default function Skills() {
  useEffect(() => {
    validateSkillsInUI()
  }, [])

  return (
    <section className="mb-16" aria-labelledby="skills-heading">
      <h2
        id="skills-heading"
        className="mb-8 text-xl font-heading sm:text-2xl"
      >
        Skills
      </h2>

      <SkillRow label="Frontend" skills={skills.frontend} />
      <SkillRow label="Backend" skills={skills.backend} />
      <SkillRow label="Database" skills={skills.database} />
      <SkillRow label="DevOps/Tools" skills={skills.devopsTools} />
      <SkillRow label="Other" skills={skills.other} />
    </section>
  )
}
