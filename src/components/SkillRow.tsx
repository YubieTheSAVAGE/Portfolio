'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import type { SkillEntry } from '@/data/skills'
import { SkillIcon } from '@/components/SkillIcon'
import { cn } from '@/lib/utils'

export type SkillRowProps = {
  label: string
  skills: readonly SkillEntry[]
  className?: string
}

export function SkillRow({ label, skills, className }: SkillRowProps) {
  if (skills.length === 0) return null

  return (
    <div className={cn('mb-10 last:mb-0', className)}>
      <h3 className="font-heading mb-4 text-base sm:text-lg">{label}</h3>
      <div className="flex flex-wrap items-center gap-4">
        <TooltipProvider delayDuration={0}>
          {skills.map((skill, index) => (
            <Tooltip key={skill.iconKey}>
              <TooltipTrigger asChild>
                <span
                  className={cn(
                    'inline-flex shrink-0 cursor-default rounded-base focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none border-2 border-foreground bg-secondary-background p-2 shadow-shadow transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[var(--spacing-boxShadowX)_calc(var(--spacing-boxShadowY)_+_2px)_0_0_var(--border)] animate-in fade-in-0 zoom-in-95 duration-300 fill-mode-both',
                  )}
                  style={{ animationDelay: `${index * 25}ms` }}
                  role="img"
                  aria-label={skill.name}
                  tabIndex={0}
                >
                  <SkillIcon name={skill.name} iconKey={skill.iconKey} />
                </span>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                {skill.name}
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </div>
  )
}
