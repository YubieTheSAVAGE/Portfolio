import Links from '@/components/links'
import { BestScore } from '@/components/best-score'
import { siteConfig } from '@/site.config'

export default function Footer() {
  return (
    <footer className="border-border bg-secondary-background border-t-2">
      <div className="mx-auto flex w-[750px] max-w-full flex-col gap-6 px-5 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <p className="font-display text-lg">{siteConfig.name}</p>
          <p className="text-foreground/70 text-sm">
            © {new Date().getFullYear()} · Built with Next.js ·{' '}
            <a
              href={siteConfig.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="decoration-main font-semibold whitespace-nowrap underline decoration-2 underline-offset-4"
            >
              Use this template →
            </a>
          </p>
          <BestScore />
        </div>
        <Links size={18} />
      </div>
    </footer>
  )
}
