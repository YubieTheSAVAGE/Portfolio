/**
 * Skills extracted from Ayoub_Boudiba_SWE_Internship_resume.pdf
 * Technical Skills: Languages, Frontend, Backend & Data, Tools & Platforms
 * + tech explicitly named in Projects/Experience (Prisma, BetterAuth, Docker Compose, Nginx, Twig)
 * DO NOT add technologies not explicitly in the resume.
 *
 * `iconKey` must exist in `src/components/SkillIcon.tsx` (unknown keys get a text badge).
 */

export type SkillEntry = { name: string; iconKey: string }

export const SKILL_CATEGORIES: { label: string; skills: SkillEntry[] }[] = [
  {
    label: 'Frontend',
    skills: [
      { name: 'Next.js', iconKey: 'nextjs' },
      { name: 'React', iconKey: 'react' },
      { name: 'Tailwind CSS', iconKey: 'tailwindcss' },
      { name: 'TypeScript', iconKey: 'typescript' },
      { name: 'JavaScript', iconKey: 'javascript' },
      { name: 'HTML5', iconKey: 'html5' },
      { name: 'CSS3', iconKey: 'css3' },
    ],
  },
  {
    label: 'Backend',
    skills: [
      { name: 'REST APIs', iconKey: 'restapis' },
      { name: 'NextAuth', iconKey: 'nextauth' },
      { name: 'JWT', iconKey: 'jwt' },
      { name: 'Prisma', iconKey: 'prisma' },
      { name: 'BetterAuth', iconKey: 'betterauth' },
    ],
  },
  {
    label: 'Database',
    skills: [{ name: 'PostgreSQL', iconKey: 'postgresql' }],
  },
  {
    label: 'DevOps/Tools',
    skills: [
      { name: 'Git', iconKey: 'git' },
      { name: 'GitHub', iconKey: 'github' },
      { name: 'Docker', iconKey: 'docker' },
      { name: 'Linux', iconKey: 'linux' },
      { name: 'Nginx', iconKey: 'nginx' },
      { name: 'Docker Compose', iconKey: 'dockercompose' },
    ],
  },
  {
    label: 'Other',
    skills: [
      { name: 'C/C++', iconKey: 'cpp' },
      { name: 'Twig', iconKey: 'twig' },
    ],
  },
]

export const ALL_SKILLS: SkillEntry[] = SKILL_CATEGORIES.flatMap((c) => c.skills)
