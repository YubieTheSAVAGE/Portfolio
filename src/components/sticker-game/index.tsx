'use client'

import dynamic from 'next/dynamic'
import { useSyncExternalStore } from 'react'
import { ARENA_CLASS, StaticStickers, type Sticker } from './arena'

const StickerGame = dynamic(() => import('./sticker-game'), {
  ssr: false,
  // Same box as the game, so nothing shifts while the chunk loads.
  loading: () => <div className={ARENA_CLASS} aria-hidden />,
})

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

function subscribe(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

export function StickerPlayground({ stickers }: { stickers: Sticker[] }) {
  const reducedMotion = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => null,
  )

  // null = server render / hydration: show the static arena so layout never shifts.
  if (reducedMotion !== false) return <StaticStickers stickers={stickers} />
  return <StickerGame stickers={stickers} />
}
