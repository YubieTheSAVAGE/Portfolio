const PAST_ROLES: {
  company: string
  role: string
  description: string
  startDate: string
  endDate: string
  website?: string
}[] = [
  {
    company: 'Digisyma',
    website: 'https://digisyma.com',
    role: 'Frontend lead developer & Team coordinator',
    description:
      'Led frontend development for multiple production SaaS platforms, including IMMO 360 and SHAMSIMMO, serving real business users.\n' +
      'Built scalable UI architecture, authentication flows, and dashboard interfaces using Next.js, React, and TypeScript, and shipped features to production with a strong focus on performance and UI consistency.',
      endDate: 'January 2026',
    startDate: 'April 2025',
  },
  {
    company: 'CODLead',
    website: 'https://codlead.ma',
    role: 'Co-Founder & Tech Lead',
    description:
      'Built internal dashboards for e-commerce logistics operations, integrating frontend interfaces with RESTful APIs to support day-to-day business workflows.\n' + 
      'Contributed to frontend architecture and technical decisions on a multi-role platform (admins, agents, merchants), focusing on clarity, scalability, and role-based access.' +
      'Worked closely with backend engineers to integrate APIs and resolve CORS and deployment-related issues in production environments.',
    startDate: 'August 2024',
    endDate: 'April 2025',
  },
  {
    company: '6starsagency',
    website: 'https://www.linkedin.com/company/6starsagency/',
    role: 'Co-Founder',
    description:
      'Co-founded a digital agency and designed and developed client-facing web applications using modern frontend stacks.\n' +
      'Handled projects end-to-end, from UI design and frontend development to deployment, working directly with business stakeholders.\n' +
      'Delivered multiple production websites for real clients, balancing technical quality, timelines, and client requirements.',
    startDate: 'January 2024',
    endDate: 'July 2024',
  },
  {
    company: 'Norsys Afrique',
    website: 'https://norsys.fr',
    role: 'Frontend Developer intern',
    description:
      'Built the complete frontend of a travel agency web platform using Twig, Tailwind CSS, and JavaScript.\n' +
      'Implemented responsive UI and integrated RESTful APIs to support dynamic content and booking-related flows.' +
      'Made technical decisions around frontend structure and deployment readiness, ensuring the application was stable and production-ready.',
    startDate: 'April 2023',
    endDate: 'June 2023',
  },
]

export default PAST_ROLES
