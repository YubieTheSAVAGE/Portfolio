/**
 * Skills extracted from Ayoub_Boudiba_SWE_Internship_resume.pdf
 * Technical Skills: Languages, Frontend, Backend & Data, Tools & Platforms
 * + tech explicitly named in Projects/Experience (Prisma, BetterAuth, Docker Compose, Nginx, Twig)
 * DO NOT add technologies not explicitly in the resume.
 */

export type SkillEntry = { name: string; iconKey: string }

export const skills = {
  frontend: [
    { name: 'Next.js', iconKey: 'nextjs' },
    { name: 'React', iconKey: 'react' },
    { name: 'Tailwind CSS', iconKey: 'tailwindcss' },
    { name: 'TypeScript', iconKey: 'typescript' },
    { name: 'JavaScript', iconKey: 'javascript' },
    { name: 'HTML5', iconKey: 'html5' },
    { name: 'CSS3', iconKey: 'css3' },
  ] as SkillEntry[],
  backend: [
    { name: 'REST APIs', iconKey: 'restapis' },
    { name: 'NextAuth', iconKey: 'nextauth' },
    { name: 'JWT', iconKey: 'jwt' },
    { name: 'Prisma', iconKey: 'prisma' },
    { name: 'BetterAuth', iconKey: 'betterauth' },
  ] as SkillEntry[],
  database: [{ name: 'PostgreSQL', iconKey: 'postgresql' }] as SkillEntry[],
  devopsTools: [
    { name: 'Git', iconKey: 'git' },
    { name: 'GitHub', iconKey: 'github' },
    { name: 'Docker', iconKey: 'docker' },
    { name: 'Linux', iconKey: 'linux' },
    { name: 'Nginx', iconKey: 'nginx' },
    { name: 'Docker Compose', iconKey: 'dockercompose' },
  ] as SkillEntry[],
  other: [
    { name: 'C/C++', iconKey: 'cpp' },
    { name: 'Twig', iconKey: 'twig' },
  ] as SkillEntry[],
} as const

/**
 * Canonical list of skill names extracted from the resume.
 * Dev-only validation warns if the UI renders a skill not in this list.
 */
export const RESUME_SKILL_NAMES: readonly string[] = [
  'Next.js',
  'React',
  'Tailwind CSS',
  'TypeScript',
  'JavaScript',
  'HTML5',
  'CSS3',
  'REST APIs',
  'NextAuth',
  'JWT',
  'Prisma',
  'BetterAuth',
  'PostgreSQL',
  'Git',
  'GitHub',
  'Docker',
  'Linux',
  'Nginx',
  'Docker Compose',
  'C/C++',
  'Twig',
]
