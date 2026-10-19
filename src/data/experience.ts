export type Role = {
  company: string
  role: string
  /** One entry per line on the timeline. */
  description: string[]
  /** "YYYY-MM". Leave `end` empty for a current role. */
  start: string
  end?: string
  website?: string
}

const PAST_ROLES: Role[] = [
  {
    company: 'Mergeflo',
    website: 'https://mergeflo.com',
    role: 'Software Engineer',
    description: [
      'Sole engineer on Mergeflo, an autonomous go-to-market (GTM) platform that finds what buyers search for, writes and publishes the content, gets brands named in AI answers (ChatGPT, Perplexity, Gemini) and runs approved social posts and outreach.',
      'Launched it to production in October 2026 with open sign-up, credit-based billing and Paddle payments, and own it end to end: React app, Deno edge functions on Postgres, a Python agent engine, and integrations with Webflow, Google Search Console, GA4 and LinkedIn.',
    ],
    start: '2026-10',
  },
  {
    company: 'Mergeflo',
    website: 'https://mergeflo.com',
    role: 'Software Engineer Intern',
    description: [
      'Started on AI blog generation and SEO automation, then built the GTM cockpit: AI agents that plan the week, draft articles and posts, publish them and run outreach, with autonomy levels and server-side safety gates so nothing risky goes out unapproved.',
      'Rebuilt the product as v2 from August 2026 on its own gateway, Postgres database and agent engine, and was promoted to Software Engineer after six months.',
    ],
    start: '2026-04',
    end: '2026-09',
  },
  {
    company: 'Digisyma',
    website: 'https://digisyma.com',
    role: 'Software Engineer (Frontend Lead)',
    description: [
      'Led frontend development for multiple production SaaS platforms, including aaqaar and SHAMSIMMO, serving real business users.',
      'Built scalable UI architecture, authentication flows, and dashboard interfaces using Next.js, React, and TypeScript, and shipped features to production with a strong focus on performance and UI consistency.',
    ],
    start: '2025-04',
    end: '2026-01',
  },
  {
    company: 'CODLead',
    website: 'https://codlead.ma',
    role: 'Frontend Engineer & Co-Founder',
    description: [
      'Built internal dashboards for e-commerce logistics operations, integrating frontend interfaces with RESTful APIs to support day-to-day business workflows.',
      'Contributed to frontend architecture and technical decisions on a multi-role platform (admins, agents, merchants), focusing on clarity, scalability, and role-based access.',
      'Worked closely with backend engineers to integrate APIs and resolve CORS and deployment-related issues in production environments.',
    ],
    start: '2024-08',
    end: '2025-04',
  },
  {
    company: '6starsagency',
    website: 'https://www.linkedin.com/company/6starsagency/',
    role: 'Co-Founder',
    description: [
      'Co-founded a digital agency and designed and developed client-facing web applications using modern frontend stacks.',
      'Handled projects end-to-end, from UI design and frontend development to deployment, working directly with business stakeholders.',
      'Delivered multiple production websites for real clients, balancing technical quality, timelines, and client requirements.',
    ],
    start: '2024-01',
    end: '2024-07',
  },
  {
    company: 'Norsys Afrique',
    website: 'https://norsys.fr',
    role: 'Frontend Developer Intern',
    description: [
      'Built the complete frontend of a travel agency web platform using Twig, Tailwind CSS, and JavaScript.',
      'Implemented responsive UI and integrated RESTful APIs to support dynamic content and booking-related flows.',
      'Made technical decisions around frontend structure and deployment readiness, ensuring the application was stable and production-ready.',
    ],
    start: '2023-04',
    end: '2023-06',
  },
]

export default PAST_ROLES
