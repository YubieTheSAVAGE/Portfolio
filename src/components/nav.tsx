'use client'

import { Link } from 'next-view-transitions'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useCallback } from 'react'
import clsx from 'clsx'
import { ThemeSwitcher } from './theme-switcher'
import { NAV_LINKS } from '@/data/nav'

function isActive(path: string, linkPath: string): boolean {
  return (
    path === linkPath ||
    (linkPath !== '/' && path.startsWith(linkPath))
  )
}

export default function Nav() {
  const path = usePathname()
  const headerRef = useRef<HTMLElement>(null)
  const lastScrollY = useRef(0)
  const visible = useRef(true)

  const updateVisibility = useCallback(() => {
    const current = window.scrollY
    if (current <= 0) {
      visible.current = true
    } else if (current > lastScrollY.current) {
      visible.current = false
    } else {
      visible.current = true
    }
    lastScrollY.current = current
    headerRef.current?.classList.toggle('-translate-y-full', !visible.current)
  }, [])

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateVisibility()
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [updateVisibility])

  return (
    <header
      ref={headerRef}
      className="fixed top-5 left-0 z-50 w-full transition-transform duration-300 ease-out animate-in fade-in-0 slide-in-from-top-2"
    >
      <nav
        aria-label="Main"
        className="text-main-foreground border-border shadow-shadow rounded-base bg-main font-base w450:gap-4 mx-auto flex w-max max-w-[calc(100vw-1.5rem)] flex-wrap items-center gap-5 border-2 p-2.5 px-4 text-sm sm:px-5 sm:text-base"
      >
        <ul className="flex list-none flex-wrap items-center gap-5 w450:gap-4">
          {NAV_LINKS.map((link) => (
            <li key={link.path}>
              <Link
                className={clsx(
                  'hover:border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-base border-2 px-2 py-1 transition-colors',
                  isActive(path, link.path)
                    ? 'border-border bg-main/80'
                    : 'border-transparent',
                )}
                href={link.path}
              >
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
        <div className="border-border flex items-center border-l pl-4">
          <ThemeSwitcher />
        </div>
      </nav>
    </header>
  )
}
