'use client'

import { useSyncExternalStore } from 'react'
import { BEST_SCORE_EVENT, readBestScore } from '@/components/sticker-game/storage'

function subscribe(onChange: () => void) {
  window.addEventListener(BEST_SCORE_EVENT, onChange)
  window.addEventListener('storage', onChange)
  return () => {
    window.removeEventListener(BEST_SCORE_EVENT, onChange)
    window.removeEventListener('storage', onChange)
  }
}

/** Shows the visitor's best sticker-game score, if they have one. */
export function BestScore() {
  const best = useSyncExternalStore(subscribe, readBestScore, () => 0)

  if (!best) return null
  return (
    <span className="border-border bg-main text-main-foreground rounded-base inline-block border-2 px-2 py-0.5 text-xs font-bold">
      ★ Your best: {best}
    </span>
  )
}
