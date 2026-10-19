/**
 * Tiny 2D physics for the sticker game: gravity, walls, floor,
 * circle-vs-circle collisions and a box (the bin) sitting on the floor.
 * Stickers are drawn as squares but collide as circles; nobody notices.
 */

export type Body = {
  x: number // center
  y: number
  vx: number
  vy: number
  r: number
  angle: number // degrees
  spin: number // degrees / second
  dragging: boolean
  /** Released by the player since it last spawned; only live stickers score. */
  live: boolean
}

export type Bin = { x: number; width: number; height: number }

export type World = {
  width: number
  height: number
  bodies: Body[]
  bin: Bin
}

const GRAVITY = 2400
const WALL_BOUNCE = 0.55
const FLOOR_BOUNCE = 0.4
const FLOOR_FRICTION = 0.86
const BODY_BOUNCE = 0.45
const MAX_SPEED = 3200
/** Below this speed (px/s) a body counts as resting. */
const REST_SPEED = 50

/**
 * Advances the world by `dt` seconds.
 * Returns indices of bodies that dropped into the bin this step.
 */
export function step(world: World, dt: number): number[] {
  const { width, height, bodies, bin } = world
  const binTop = height - bin.height
  const scored: number[] = []

  bodies.forEach((b, i) => {
    if (b.dragging) return

    const prevY = b.y
    b.vy += GRAVITY * dt
    b.vx = clamp(b.vx, -MAX_SPEED, MAX_SPEED)
    b.vy = clamp(b.vy, -MAX_SPEED, MAX_SPEED)
    b.x += b.vx * dt
    b.y += b.vy * dt
    b.angle += b.spin * dt
    b.spin *= 0.985

    // Dropped into the bin: center crossed the rim going down, inside the opening.
    // Stickers the player didn't throw land on the lid instead.
    const inOpening = b.x > bin.x && b.x < bin.x + bin.width
    if (inOpening && b.vy > 0) {
      if (b.live && prevY < binTop && b.y >= binTop) {
        scored.push(i)
        return
      }
      if (!b.live && prevY + b.r <= binTop + 1 && b.y + b.r > binTop) {
        b.y = binTop - b.r
        b.vy = -b.vy * FLOOR_BOUNCE
        if (Math.abs(b.vy) < 60) b.vy = 0
        b.vx *= FLOOR_FRICTION
      }
    }

    // Bin walls (only reachable from the side, from above is a score).
    if (b.y > binTop && b.x + b.r > bin.x && b.x - b.r < bin.x + bin.width) {
      if (b.x < bin.x + bin.width / 2) {
        b.x = bin.x - b.r
        b.vx = -Math.abs(b.vx) * WALL_BOUNCE
      } else {
        b.x = bin.x + bin.width + b.r
        b.vx = Math.abs(b.vx) * WALL_BOUNCE
      }
    }

    if (b.x - b.r < 0) {
      b.x = b.r
      b.vx = Math.abs(b.vx) * WALL_BOUNCE
    } else if (b.x + b.r > width) {
      b.x = width - b.r
      b.vx = -Math.abs(b.vx) * WALL_BOUNCE
    }

    if (b.y - b.r < 0) {
      b.y = b.r
      b.vy = Math.abs(b.vy) * WALL_BOUNCE
    } else if (b.y + b.r > height) {
      b.y = height - b.r
      b.vy = -Math.abs(b.vy) * FLOOR_BOUNCE
      if (Math.abs(b.vy) < 60) b.vy = 0
      b.vx *= FLOOR_FRICTION
      // Roll with the floor.
      b.spin = (b.vx / b.r) * (180 / Math.PI) * 0.5
    }
  })

  collide(bodies)
  return scored
}

function collide(bodies: Body[]) {
  for (let i = 0; i < bodies.length; i++) {
    for (let j = i + 1; j < bodies.length; j++) {
      const a = bodies[i]
      const b = bodies[j]
      const dx = b.x - a.x
      const dy = b.y - a.y
      const minDist = a.r + b.r
      const distSq = dx * dx + dy * dy
      if (distSq >= minDist * minDist || distSq === 0) continue

      const dist = Math.sqrt(distSq)
      const nx = dx / dist
      const ny = dy / dist
      const overlap = minDist - dist

      // A dragged sticker acts like an immovable hand.
      const aShare = a.dragging ? 0 : b.dragging ? 1 : 0.5
      const bShare = 1 - aShare
      a.x -= nx * overlap * aShare
      a.y -= ny * overlap * aShare
      b.x += nx * overlap * bShare
      b.y += ny * overlap * bShare

      const relVel = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny
      if (relVel > 0) continue
      const impulse = -(1 + BODY_BOUNCE) * relVel
      if (!a.dragging) {
        a.vx -= nx * impulse * aShare
        a.vy -= ny * impulse * aShare
      }
      if (!b.dragging) {
        b.vx += nx * impulse * bShare
        b.vy += ny * impulse * bShare
      }
    }
  }
}

/** True when nothing is moving (the caller waits a few frames before sleeping). */
export function isResting(world: World): boolean {
  return world.bodies.every(
    (b) =>
      !b.dragging &&
      Math.abs(b.vx) < REST_SPEED &&
      Math.abs(b.vy) < REST_SPEED,
  )
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}
