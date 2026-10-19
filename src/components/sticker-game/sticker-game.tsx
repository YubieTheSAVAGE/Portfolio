'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  ARENA_CLASS,
  BIN_HEIGHT,
  BIN_WIDTH,
  BinBox,
  StickerFace,
  type Sticker,
} from './arena'
import { type World, clamp, isResting, step } from './physics'
import { readBestScore, writeBestScore } from './storage'

/** Scores within this window (ms) build a combo. */
const COMBO_WINDOW = 2500
/** Seconds of stillness before the loop goes to sleep. */
const SLEEP_AFTER = 0.6
const MAX_THROW = 2600

type Burst = { id: number; x: number; y: number; points: number }

const BURST_PARTS = [
  { dx: '-36px', dy: '-48px', rot: '-90deg', color: 'var(--chart-2)' },
  { dx: '30px', dy: '-56px', rot: '120deg', color: 'var(--chart-3)' },
  { dx: '-14px', dy: '-70px', rot: '200deg', color: 'var(--chart-4)' },
  { dx: '44px', dy: '-30px', rot: '-160deg', color: 'var(--chart-5)' },
]

const random = (min: number, max: number) => min + Math.random() * (max - min)

export default function StickerGame({ stickers }: { stickers: Sticker[] }) {
  const arenaRef = useRef<HTMLDivElement>(null)
  const binRef = useRef<HTMLDivElement>(null)
  const stickerRefs = useRef<(HTMLDivElement | null)[]>([])

  const [count, setCount] = useState(stickers.length)
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0)
  const [best, setBest] = useState(0)
  const [touched, setTouched] = useState(false)
  const [bursts, setBursts] = useState<Burst[]>([])

  // Fewer stickers on small screens so they don't bury the bin.
  useLayoutEffect(() => {
    const width = arenaRef.current?.clientWidth ?? 0
    setCount(width < 480 ? Math.min(5, stickers.length) : stickers.length)
    setBest(readBestScore())
  }, [stickers.length])

  useLayoutEffect(() => {
    const arena = arenaRef.current
    const binEl = binRef.current
    if (!arena || !binEl) return

    const size = arena.clientWidth < 480 ? 52 : 60
    arena.style.setProperty('--sticker', `${size}px`)
    const r = size / 2

    const world: World = {
      width: arena.clientWidth,
      height: arena.clientHeight,
      bin: { x: arena.clientWidth - BIN_WIDTH - 16, width: BIN_WIDTH, height: BIN_HEIGHT },
      bodies: [],
    }

    // Intro: stickers rain down on the left, away from the bin.
    const spread = Math.max(world.bin.x - 2 * r - 16, r)
    for (let i = 0; i < count; i++) {
      world.bodies.push({
        x: r + 8 + (spread * (i + 0.5)) / count,
        y: random(r, world.height * 0.45),
        vx: random(-60, 60),
        vy: 0,
        r,
        angle: random(-14, 14),
        spin: random(-40, 40),
        dragging: false,
        live: false,
      })
    }

    let frame = 0
    let last = 0
    let rested = 0
    let inView = true
    let pageVisible = document.visibilityState === 'visible'
    let total = 0
    let currentCombo = 0
    let lastScoreAt = 0
    let bestScore = readBestScore()
    let comboTimer: ReturnType<typeof setTimeout> | undefined
    const timers = new Set<ReturnType<typeof setTimeout>>()
    let drag: {
      index: number
      offsetX: number
      offsetY: number
      samples: { x: number; y: number; t: number }[]
    } | null = null

    const placeBin = () => {
      binEl.style.transform = `translateX(${world.bin.x}px)`
    }

    const render = () => {
      world.bodies.forEach((b, i) => {
        const el = stickerRefs.current[i]
        if (!el) return
        el.style.transform = `translate(${b.x - b.r}px, ${b.y - b.r}px) rotate(${b.angle}deg)`
      })
    }

    const onScore = (index: number) => {
      const now = performance.now()
      currentCombo = now - lastScoreAt < COMBO_WINDOW ? currentCombo + 1 : 1
      lastScoreAt = now
      total += currentCombo
      setScore(total)
      setCombo(currentCombo)
      clearTimeout(comboTimer)
      comboTimer = setTimeout(() => setCombo(0), COMBO_WINDOW)
      if (total > bestScore) {
        bestScore = total
        setBest(total)
        writeBestScore(total)
      }

      const burst: Burst = {
        id: now,
        x: world.bin.x + world.bin.width / 2,
        y: world.height - world.bin.height,
        points: currentCombo,
      }
      setBursts((all) => [...all, burst])
      const timer = setTimeout(() => {
        setBursts((all) => all.filter((b) => b.id !== burst.id))
        timers.delete(timer)
      }, 800)
      timers.add(timer)

      // Hop the bin somewhere new, preferring a spot with no stickers under it.
      const b = world.bodies[index]
      const minX = Math.min(world.width * 0.35, world.width - world.bin.width - 8)
      const maxX = world.width - world.bin.width - 8
      const blocked = (x: number) =>
        world.bodies.filter(
          (o) => o !== b && o.x + o.r > x && o.x - o.r < x + world.bin.width,
        ).length
      let next = world.bin.x
      let fewest = Infinity
      for (let attempt = 0; attempt < 12; attempt++) {
        const x = random(minX, maxX)
        if (Math.abs(x - world.bin.x) < 48) continue
        const count = blocked(x)
        if (count < fewest) {
          fewest = count
          next = x
        }
        if (count === 0) break
      }
      world.bin.x = next

      // ...and respawn the sticker from the top, never straight above the bin.
      b.live = false
      const gapLeft = world.bin.x - b.r
      const gapRight = world.bin.x + world.bin.width + b.r
      const leftRoom = gapLeft - b.r
      const rightRoom = world.width - b.r - gapRight
      b.x =
        leftRoom >= rightRoom
          ? random(b.r, Math.max(b.r, gapLeft))
          : random(gapRight, world.width - b.r)
      b.y = b.r
      b.vx = random(-60, 60)
      b.vy = 0
      b.spin = random(-200, 200)
      placeBin()
    }

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30)
      last = now
      // Two substeps keep fast throws from tunnelling through the rim.
      for (let s = 0; s < 2; s++) {
        for (const index of step(world, dt / 2)) onScore(index)
      }
      render()

      rested = isResting(world) ? rested + dt : 0
      if (rested > SLEEP_AFTER || !inView || !pageVisible) {
        frame = 0
        return
      }
      frame = requestAnimationFrame(tick)
    }

    const wake = () => {
      if (frame || !inView || !pageVisible) return
      rested = 0
      last = performance.now()
      frame = requestAnimationFrame(tick)
    }

    const localPoint = (e: PointerEvent) => {
      const rect = arena.getBoundingClientRect()
      return { x: e.clientX - rect.left, y: e.clientY - rect.top, t: e.timeStamp }
    }

    const onPointerDown = (e: PointerEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>('[data-sticker]')
      if (!target) return
      const index = Number(target.dataset.sticker)
      const b = world.bodies[index]
      if (!b) return
      e.preventDefault()
      target.setPointerCapture(e.pointerId)
      const p = localPoint(e)
      b.dragging = true
      b.vx = 0
      b.vy = 0
      drag = { index, offsetX: p.x - b.x, offsetY: p.y - b.y, samples: [p] }
      target.dataset.dragging = ''
      setTouched(true)
      wake()
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!drag) return
      const b = world.bodies[drag.index]
      const p = localPoint(e)
      b.x = clamp(p.x - drag.offsetX, b.r, world.width - b.r)
      b.y = clamp(p.y - drag.offsetY, b.r, world.height - b.r)
      drag.samples.push(p)
      if (drag.samples.length > 6) drag.samples.shift()
      wake()
    }

    const onPointerUp = (e: PointerEvent) => {
      if (!drag) return
      const b = world.bodies[drag.index]
      const { samples } = drag
      const lastSample = samples[samples.length - 1]
      // Throw velocity from roughly the last 100ms of movement.
      const first = samples.find((s) => e.timeStamp - s.t < 100) ?? lastSample
      const seconds = (lastSample.t - first.t) / 1000
      if (seconds > 0.005) {
        b.vx = clamp((lastSample.x - first.x) / seconds, -MAX_THROW, MAX_THROW)
        b.vy = clamp((lastSample.y - first.y) / seconds, -MAX_THROW, MAX_THROW)
      }
      b.spin = b.vx * 0.25
      b.dragging = false
      b.live = true
      delete stickerRefs.current[drag.index]?.dataset.dragging
      drag = null
      wake()
    }

    const resize = new ResizeObserver(() => {
      world.width = arena.clientWidth
      world.height = arena.clientHeight
      world.bin.x = clamp(world.bin.x, 0, world.width - world.bin.width - 8)
      world.bodies.forEach((b) => {
        b.x = clamp(b.x, b.r, world.width - b.r)
        b.y = clamp(b.y, b.r, world.height - b.r)
      })
      placeBin()
      render()
      wake()
    })

    const visibility = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      wake()
    })

    const onVisibilityChange = () => {
      pageVisible = document.visibilityState === 'visible'
      wake()
    }

    placeBin()
    render()
    resize.observe(arena)
    visibility.observe(arena)
    arena.addEventListener('pointerdown', onPointerDown)
    arena.addEventListener('pointermove', onPointerMove)
    arena.addEventListener('pointerup', onPointerUp)
    arena.addEventListener('pointercancel', onPointerUp)
    document.addEventListener('visibilitychange', onVisibilityChange)
    wake()

    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(comboTimer)
      timers.forEach(clearTimeout)
      resize.disconnect()
      visibility.disconnect()
      arena.removeEventListener('pointerdown', onPointerDown)
      arena.removeEventListener('pointermove', onPointerMove)
      arena.removeEventListener('pointerup', onPointerUp)
      arena.removeEventListener('pointercancel', onPointerUp)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [count])

  return (
    <div ref={arenaRef} className={ARENA_CLASS} aria-hidden>
      <div className="pointer-events-none absolute top-3 left-3 z-20 flex flex-wrap items-center gap-2 text-sm">
        <span className="border-border bg-main text-main-foreground rounded-base font-display border-2 px-2 py-0.5">
          ★ {score}
        </span>
        {combo > 1 && (
          <span
            key={combo}
            className="border-border bg-chart-4 rounded-base font-display animate-in zoom-in-50 border-2 px-2 py-0.5 text-black duration-200"
          >
            x{combo} combo
          </span>
        )}
        {best > 0 && (
          <span className="text-foreground/70 text-xs font-semibold">best {best}</span>
        )}
      </div>

      {!touched && (
        <p className="text-foreground/70 pointer-events-none absolute top-12 left-3 z-20 text-xs font-semibold sm:text-sm">
          Drag & throw the stickers into the bin →
        </p>
      )}

      {stickers.slice(0, count).map((sticker, i) => (
        <div
          key={sticker.iconKey}
          ref={(el) => {
            stickerRefs.current[i] = el
          }}
          data-sticker={i}
          className="group absolute top-0 left-0 cursor-grab touch-none will-change-transform data-dragging:z-30 data-dragging:cursor-grabbing"
        >
          <StickerFace
            sticker={sticker}
            index={i}
            className="transition-[scale,box-shadow] group-data-dragging:scale-110 group-data-dragging:shadow-[-8px_8px_0_0_var(--border)]"
          />
        </div>
      ))}

      <BinBox
        ref={binRef}
        className="transition-transform duration-300 ease-[cubic-bezier(.34,1.56,.64,1)]"
      />

      {bursts.map((burst) => (
        <div
          key={burst.id}
          className="pointer-events-none absolute z-20"
          style={{ left: burst.x, top: burst.y }}
        >
          <span className="font-display text-foreground animate-out fade-out slide-out-to-top-8 fill-mode-forwards absolute -translate-x-1/2 -translate-y-full text-xl duration-700">
            +{burst.points}
          </span>
          {BURST_PARTS.map((part, i) => (
            <span
              key={i}
              className="border-border animate-pop absolute size-3 border-2"
              style={
                {
                  background: part.color,
                  '--dx': part.dx,
                  '--dy': part.dy,
                  '--rot': part.rot,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      ))}
    </div>
  )
}
