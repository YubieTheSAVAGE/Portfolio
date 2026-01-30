import * as React from 'react'
import { cn } from '@/lib/utils'

export interface HighlightProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /** Visual style. Default: marker-like background. */
  variant?: 'default' | 'border' | 'subtle'
}

const Highlight = React.forwardRef<HTMLSpanElement, HighlightProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'rounded-base px-1 py-[0.05rem] transition-colors duration-200',
          variant === 'default' &&
            'bg-chart-1 border-border border-2 border-b-2 border-r-2 shadow-shadow',
          variant === 'border' &&
            'border-border bg-main border-2 border-b-2 border-r-2 shadow-shadow',
          variant === 'subtle' && 'bg-main/60',
          className,
        )}
        {...props}
      />
    )
  },
)

Highlight.displayName = 'Highlight'

export { Highlight }
