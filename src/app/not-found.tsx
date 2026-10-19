import { Link } from 'next-view-transitions'
import { buttonClass, cn } from '@/lib/utils'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center py-10 text-center">
      <div className="border-border bg-main text-main-foreground shadow-shadow rounded-base relative -rotate-2 border-2 px-10 py-6">
        <p className="font-display text-7xl sm:text-8xl">404</p>
        <span
          aria-hidden
          className="border-border bg-secondary-background shadow-shadow absolute -right-6 -bottom-5 size-12 rotate-12 border-2"
        />
        <span
          aria-hidden
          className="border-border bg-chart-4 shadow-shadow absolute -top-4 -left-5 size-9 -rotate-12 border-2"
        />
      </div>

      <h1 className="font-display mt-10 text-2xl sm:text-3xl">This page fell off the sticker sheet</h1>
      <p className="text-foreground/80 mt-3 max-w-[45ch]">
        The link might be old, or it never existed. While you&apos;re here, the stickers on the home
        page still need throwing.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link href="/" className={cn(buttonClass, 'bg-main text-main-foreground')}>
          Go play the sticker game
        </Link>
        <Link href="/work" className={buttonClass}>
          See my work
        </Link>
      </div>
    </div>
  )
}
