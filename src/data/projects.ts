const PROJECTS: {
  name: string
  description: string
  previewImage: string
  repoUrl?: string
  liveLink?: string
}[] = [
  {
    name: 'IMMO 360',
    description: 'Product-focused SaaS built to streamline how real estate promoters track projects, properties, and client interactions.',
    liveLink: 'https://immo-360.ma',
    previewImage: '/preview-immo360.png',
  },
  {
    name: 'SHAMSIMMO',
    description: 'A clone of Immo 360, with additional features.',
    liveLink: 'https://shamsimmo.com',
    previewImage: '/preview-shamsimmo.png',

  },
  {
    name: "Flow Board",
    description: 'Minimalist SaaS dashboard built with Next.js App Router, TypeScript, and Tailwind.',
    previewImage: '/preview-flowboard.png',
    repoUrl: 'https://github.com/YubieTheSAVAGE/flowboard',
  },
  {
    name: "FiveM Store template",
    description: 'A modern FiveM resource featuring a shopping system with a beautiful NextJS UI',
    previewImage: '/preview-fivemal3atim.png',
    repoUrl: 'https://github.com/YubieTheSAVAGE/FiveM-al3atim',
  }
]

export default PROJECTS
