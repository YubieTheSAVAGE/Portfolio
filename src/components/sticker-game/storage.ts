const KEY = 'sticker-game:best'
export const BEST_SCORE_EVENT = 'sticker-game:best'

export function readBestScore(): number {
  try {
    return Number(localStorage.getItem(KEY)) || 0
  } catch {
    return 0
  }
}

export function writeBestScore(score: number) {
  try {
    localStorage.setItem(KEY, String(score))
  } catch {
    // Private mode / blocked storage: the score just won't persist.
  }
  window.dispatchEvent(new Event(BEST_SCORE_EVENT))
}
