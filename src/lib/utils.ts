import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Brutal button that presses into its shadow on hover. */
export const buttonClass =
  'border-border bg-secondary-background text-foreground shadow-shadow rounded-base font-heading inline-flex cursor-pointer items-center justify-center gap-2 border-2 px-4 py-2 text-center text-sm transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:text-base'

/** "2025-06" -> "Jun 2025". Anything else is returned as-is. */
export function formatMonth(value?: string) {
  if (!value) return 'Present'
  const match = /^(\d{4})-(\d{2})$/.exec(value)
  if (!match) return value
  const date = new Date(Number(match[1]), Number(match[2]) - 1)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}
