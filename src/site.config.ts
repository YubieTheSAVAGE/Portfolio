/**
 * Site config — the one file to edit when you use this template.
 * Projects, experience, skills and nav live in `src/data/*`.
 */

export type SocialIcon = 'gmail' | 'github' | 'linkedin' | 'x' | 'medium'

export const siteConfig = {
  name: 'Ayoub Boudiba',
  /** Shown big in the hero. Defaults to `name` when empty. */
  heroName: 'Ayoub BOUDIBA',
  title: 'Software Engineer',
  tagline:
    'I build software products end to end, from SaaS platforms and dashboards to autonomous AI systems.',
  intro:
    'Previously led frontend on production SaaS at Digisyma and co-founded two companies. Studying at 1337 (42 Network).',
  description:
    'Software engineer building SaaS platforms, dashboards and autonomous AI systems. Currently the engineer behind Mergeflo, an autonomous GTM platform.',
  keywords: [
    'Ayoub Boudiba',
    'Software Engineer',
    'Frontend Developer',
    'AI agents',
    'GTM',
    'React',
    'Next.js',
    'TypeScript',
    'Tailwind CSS',
    'SaaS',
    'web development',
    'portfolio',
  ],

  /** Set NEXT_PUBLIC_SITE_URL in production. No trailing slash. */
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.boudiba.me').replace(/\/$/, ''),
  /** Linked from the footer "Use this template" button. */
  repoUrl: 'https://github.com/YubieTheSAVAGE/Portfolio',

  email: 'boudibaayoub.contact@gmail.com',
  location: 'Morocco',
  /** Badge above your name. Set to null to hide it. */
  status: {
    label: 'Now: building autonomous GTM at Mergeflo',
    href: 'https://mergeflo.com',
  } as { label: string; href?: string } | null,

  socials: [
    { label: 'Email', icon: 'gmail', href: 'mailto:boudibaayoub.contact@gmail.com' },
    { label: 'GitHub', icon: 'github', href: 'https://github.com/YubieTheSAVAGE' },
    { label: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/in/ayoubboudiba/' },
  ] satisfies { label: string; icon: SocialIcon; href: string }[],

  /**
   * Stickers in the hero game + the stack marquee.
   * Keys must exist in `src/components/SkillIcon.tsx`.
   */
  heroStack: ['nextjs', 'typescript', 'react', 'tailwindcss', 'postgresql', 'docker', 'prisma', 'git'],

  /** About page bio. Wrap words in ==double equals== to highlight them. */
  about: [
    "I'm a software engineer who likes owning products end to end. Right now I'm the sole engineer at ==Mergeflo==, an autonomous go-to-market platform: it finds what buyers search for, writes and publishes the content, gets brands named in AI answers and runs outreach. I took it from its first AI workflows to a live product with payments.",
    'Before that I led frontend development at Digisyma on production SaaS platforms like ==aaqaar== and SHAMSIMMO, and co-founded two companies: a digital agency, and CODLead, where I built internal dashboards for e-commerce logistics. Most of my work is in ==Next.js / TypeScript / React==, and I care about clean UI, clear structure and architecture that holds up as a product grows.',
    "I hold a Bachelor of Technical Studies from the Higher School of Technology ==EST Essaouira== and I'm currently at ==1337 (42 Network)==. I do my best work on product-focused teams where engineers have ownership, move fast and ship things people actually use.",
  ],
}

export type SiteConfig = typeof siteConfig
