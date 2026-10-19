import type { Metadata, Viewport } from 'next'
import { Archivo_Black, Montserrat } from 'next/font/google'
import './globals.css'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import { ViewTransitions } from 'next-view-transitions'
import { ThemeProvider } from '@/components/theme-provider'
import { siteConfig } from '@/site.config'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
})

const archivoBlack = Archivo_Black({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-archivo-black',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.title}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
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
    url: '/',
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description: siteConfig.description,
  },
  alternates: {
    canonical: '/',
  },
  category: 'technology',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#eef5df' },
    { media: '(prefers-color-scheme: dark)', color: '#1a2114' },
  ],
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteConfig.name,
  jobTitle: siteConfig.title,
  url: siteConfig.url,
  email: `mailto:${siteConfig.email}`,
  sameAs: siteConfig.socials
    .map((s) => s.href)
    .filter((href) => href.startsWith('http')),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ViewTransitions>
      <html
        suppressHydrationWarning
        lang="en"
        className={`${montserrat.variable} ${archivoBlack.variable}`}
      >
        <body className="font-base flex min-h-dvh flex-col">
          <noscript>
            <style>{'.reveal{opacity:1!important;translate:none!important}'}</style>
          </noscript>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
          />
          <a
            href="#main"
            className="border-border bg-main text-main-foreground shadow-shadow font-heading fixed top-3 left-3 z-[60] -translate-y-24 border-2 px-3 py-2 transition-transform focus:translate-y-0"
          >
            Skip to content
          </a>
          <ThemeProvider attribute="class" disableTransitionOnChange>
            <Nav />
            <main
              id="main"
              className="text-foreground mx-auto w-[750px] max-w-full flex-1 px-5 pt-28 pb-16"
            >
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  )
}
