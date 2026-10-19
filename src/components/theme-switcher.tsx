'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme()

  return (
    <button
      type="button"
      className="focus-visible:ring-ring rounded-base flex focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      <Sun className="stroke-main-foreground hidden size-4 sm:size-6 dark:inline" />
      <Moon className="stroke-main-foreground inline size-4 sm:size-6 dark:hidden" />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
