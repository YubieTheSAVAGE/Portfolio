'use client'

import { Check, Copy } from 'lucide-react'
import { useEffect, useState } from 'react'
import { buttonClass, cn } from '@/lib/utils'

export function CopyEmail({ email, className }: { email: string; className?: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  return (
    <button
      type="button"
      className={cn(buttonClass, className)}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email)
          setCopied(true)
        } catch {
          window.location.href = `mailto:${email}`
        }
      }}
    >
      {copied ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
      <span aria-live="polite">{copied ? 'Copied!' : 'Copy email'}</span>
    </button>
  )
}
