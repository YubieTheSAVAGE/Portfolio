export type Project = {
  name: string
  description: string
  previewImage: string
  /** Short tech/role chips shown on the card. */
  tags: string[]
  year?: string
  /** Featured projects also show on the home page. */
  featured?: boolean
  repoUrl?: string
  liveLink?: string
}

const PROJECTS: Project[] = [
  {
    name: 'aaqaar',
    description:
      'Real estate management platform for agencies and property developers in Morocco. Projects, stock, sales, reservations, contracts and payments in one place, with 3D models built into each project. I led the frontend at Digisyma.',
    tags: ['SaaS', 'Next.js', 'TypeScript'],
    year: '2025',
    featured: true,
    liveLink: 'https://aaqaar.com',
    previewImage: '/preview-aaqaar.png',
  },
  {
    name: 'SHAMSIMMO',
    description:
      'A real estate SaaS built on the aaqaar foundation and extended with extra features. Frontend also led at Digisyma.',
    tags: ['SaaS', 'Next.js', 'TypeScript'],
    year: '2025',
    liveLink: 'https://shamsimmo.com',
    previewImage: '/preview-shamsimmo.png',
  },
  {
    name: 'Flow Board',
    description:
      'A minimalist SaaS dashboard built with the Next.js App Router, TypeScript and Tailwind.',
    tags: ['Dashboard', 'Next.js', 'Tailwind'],
    featured: true,
    previewImage: '/preview-flowboard.png',
    repoUrl: 'https://github.com/YubieTheSAVAGE/flowboard',
  },
  {
    name: 'FiveM Store template',
    description:
      'A FiveM resource with an in-game shopping system and a modern Next.js UI.',
    tags: ['Game mod', 'Next.js'],
    previewImage: '/preview-fivemal3atim.png',
    repoUrl: 'https://github.com/YubieTheSAVAGE/FiveM-al3atim',
  },
]

export default PROJECTS
