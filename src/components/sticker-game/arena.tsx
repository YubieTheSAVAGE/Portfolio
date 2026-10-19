import { SkillIcon } from '@/components/SkillIcon'
import { cn } from '@/lib/utils'

export type Sticker = { name: string; iconKey: string }

export const BIN_WIDTH = 104
export const BIN_HEIGHT = 64

export const ARENA_CLASS =
  'border-border bg-secondary-background shadow-shadow rounded-base relative h-64 w-full touch-pan-y overflow-hidden border-2 select-none sm:h-72 bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-size-[18px_18px] dark:bg-[radial-gradient(oklch(100%_0_0/0.12)_1px,transparent_1px)]'

export function StickerFace({
  sticker,
  index,
  className,
  style,
}: {
  sticker: Sticker
  index: number
  className?: string
  style?: React.CSSProperties
}) {
  const accent = index % 2 === 0
  return (
    <div
      className={cn(
        'border-border shadow-shadow rounded-base flex size-(--sticker) items-center justify-center border-2',
        accent ? 'bg-main' : 'bg-background',
        className,
      )}
      style={style}
    >
      <SkillIcon
        name={sticker.name}
        iconKey={sticker.iconKey}
        className={accent ? 'text-main-foreground' : undefined}
      />
    </div>
  )
}

export function BinBox({
  ref,
  className,
  style,
}: {
  ref?: React.Ref<HTMLDivElement>
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div
      ref={ref}
      className={cn(
        'border-border bg-main absolute bottom-0 left-0 z-10 flex items-end justify-center border-2 border-b-0 pb-2',
        className,
      )}
      style={{ width: BIN_WIDTH, height: BIN_HEIGHT, ...style }}
    >
      <div className="border-border bg-foreground absolute -top-[2px] -right-2 -left-2 h-2.5 border-2" />
      <span className="font-display text-main-foreground text-xs tracking-wider">
        DROP HERE
      </span>
    </div>
  )
}

/** Non-interactive version: SSR/loading fallback and reduced-motion mode. */
export function StaticStickers({ stickers }: { stickers: Sticker[] }) {
  return (
    <div
      className={ARENA_CLASS}
      style={{ '--sticker': '52px' } as React.CSSProperties}
      aria-hidden
    >
      <div className="absolute inset-x-4 bottom-0 flex flex-wrap-reverse items-end gap-2 pr-[120px]">
        {stickers.map((sticker, i) => (
          <StickerFace
            key={sticker.iconKey}
            sticker={sticker}
            index={i}
            style={{ rotate: `${((i * 37) % 17) - 8}deg` }}
          />
        ))}
      </div>
      <BinBox style={{ left: 'auto', right: 16 }} />
    </div>
  )
}
