import type { PropsWithChildren, ReactNode } from 'react'

type GlassPanelProps = PropsWithChildren<{
  title: string
  subtitle?: string
  actions?: ReactNode
  className?: string
}>

export function GlassPanel({ title, subtitle, actions, className = '', children }: GlassPanelProps) {
  return (
    <section
      className={`rounded-3xl border border-white/10 bg-white/6 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_18px_50px_rgba(4,8,20,0.45)] backdrop-blur-xl ${className}`}
    >
      <header className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-cyan-200/70">AutoResearch module</p>
          <h2 className="mt-2 text-xl font-semibold text-white">{title}</h2>
          {subtitle ? <p className="mt-1 text-sm text-slate-300">{subtitle}</p> : null}
        </div>
        {actions}
      </header>
      {children}
    </section>
  )
}
