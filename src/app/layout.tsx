import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Nav from '@/components/nav'
import { ViewTransitions } from 'next-view-transitions'
import { ThemeProvider } from '@/components/theme-provider'

const montserrat = Montserrat({ subsets: ['latin'] })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://boudiba.me'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Ayoub Boudiba | Frontend Engineer',
    template: '%s | Ayoub Boudiba',
  },
  description:
    'Frontend Engineer building scalable SaaS dashboards and product-focused web platforms. Next.js, TypeScript, Tailwind. EST Essaouira & 1337 (42 Network).',
  keywords: [
    'Ayoub Boudiba',
    'Frontend Engineer',
    'Frontend Developer',
    'React',
    'Next.js',
    'TypeScript',
    'Tailwind CSS',
    'SaaS',
    'web development',
    'portfolio',
  ],
  authors: [{ name: 'Ayoub Boudiba', url: siteUrl }],
  creator: 'Ayoub Boudiba',
  publisher: 'Ayoub Boudiba',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Ayoub Boudiba',
    title: 'Ayoub Boudiba | Frontend Engineer',
    description:
      'Frontend Engineer building scalable SaaS dashboards and product-focused web platforms. Next.js, TypeScript, Tailwind.',
    images: [
      {
        url: '/preview.png',
        width: 1200,
        height: 630,
        alt: 'Ayoub Boudiba — Frontend Engineer portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ayoub Boudiba | Frontend Engineer',
    description:
      'Frontend Engineer building scalable SaaS dashboards and product-focused web platforms. Next.js, TypeScript, Tailwind.',
    images: ['/preview.png'],
  },
  alternates: {
    canonical: siteUrl,
  },
  category: 'technology',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ViewTransitions>
      <html suppressHydrationWarning lang="en">
        <body className={montserrat.className}>
          <ThemeProvider attribute="class" disableTransitionOnChange>
            <Nav />
            <div className="text-foreground mx-auto w-[750px] max-w-full px-5 pt-28 pb-10">
              {children}
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  )
}
