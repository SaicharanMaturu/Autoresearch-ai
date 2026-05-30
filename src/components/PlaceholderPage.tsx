import React from 'react';
import { ArrowRight, CheckCircle2, X } from 'lucide-react';
import { GlassCard, SectionTitle, HolographicLine, PulsingCore } from './UI';

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  onBack: () => void;
}

export function PlaceholderPage({ title, description, icon: Icon, onBack }: PlaceholderPageProps) {
  const frontendHighlights = [
    'Dashboard orchestration and operator navigation',
    'Research Universe graph exploration and filtering',
    'Gap Lab heatmap and hypothesis synthesis',
    'Data Streams telemetry dashboards and charts',
    'Presentation Studio slide editing workspace',
    'Agent Monitor and local system controls',
  ];

  const phaseTwoChecklist = [
    'Connect file processing to OCR and extraction services',
    'Add embeddings, vector search, and retrieval storage',
    'Wire agents into real orchestration jobs and logs',
    'Replace demo notifications with persisted events',
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-ai-bg via-ai-surface to-ai-bg">
      {/* Background orbs */}
      <div className="fixed top-20 right-20 w-96 h-96 bg-ai-accent-purple/10 rounded-full blur-3xl opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <SectionTitle>{title}</SectionTitle>
          <button
            onClick={onBack}
            className="text-ai-text-secondary hover:text-ai-accent-cyan transition p-2"
          >
            <X size={24} />
          </button>
        </div>

        <HolographicLine className="mb-8" />

        <div className="grid gap-6 lg:grid-cols-12">
          <GlassCard className="p-10 lg:col-span-7">
            <div className="flex items-start gap-6">
              <div className="relative shrink-0">
                <PulsingCore size="lg" />
                <Icon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-ai-bg" />
              </div>

              <div className="flex-1">
                <div className="inline-flex items-center px-3 py-1 rounded-full border border-ai-accent-cyan/40 bg-ai-accent-cyan/10 text-ai-accent-cyan text-xs font-semibold mb-4">
                  Frontend-only module
                </div>
                <h2 className="text-3xl font-bold text-ai-accent-cyan mb-4">{title}</h2>
                <p className="text-ai-text-secondary text-lg mb-6 max-w-2xl">{description}</p>
                <p className="text-ai-text-secondary text-sm leading-6">
                  This screen is designed to stay useful even before backend services are attached. It acts as a polished workspace,
                  roadmap surface, and visual placeholder for the next integration phase.
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 mt-8">
              <div className="rounded-2xl border border-ai-accent-cyan/20 bg-ai-bg/40 p-5">
                <h3 className="text-sm font-semibold text-ai-text-primary mb-3">Already frontend-complete</h3>
                <ul className="space-y-2 text-sm text-ai-text-secondary">
                  {frontendHighlights.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-ai-accent-cyan shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-ai-accent-purple/20 bg-ai-bg/40 p-5">
                <h3 className="text-sm font-semibold text-ai-text-primary mb-3">Still for Phase 2</h3>
                <ul className="space-y-2 text-sm text-ai-text-secondary">
                  {phaseTwoChecklist.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <ArrowRight className="mt-0.5 h-4 w-4 text-ai-accent-purple shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-8 lg:col-span-5">
            <h3 className="text-lg font-semibold text-ai-text-primary mb-5">Current frontend status</h3>
            <div className="space-y-4">
              <div className="rounded-xl border border-ai-accent-cyan/20 bg-ai-bg/40 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-ai-text-secondary mb-2">Navigation</p>
                <p className="text-ai-text-primary text-sm">The dashboard and research views are already routed and visually integrated.</p>
              </div>
              <div className="rounded-xl border border-ai-accent-cyan/20 bg-ai-bg/40 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-ai-text-secondary mb-2">Interaction</p>
                <p className="text-ai-text-primary text-sm">Charts, toggles, panels, and local state interactions work without backend calls.</p>
              </div>
              <div className="rounded-xl border border-ai-accent-cyan/20 bg-ai-bg/40 p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-ai-text-secondary mb-2">Next integration</p>
                <p className="text-ai-text-primary text-sm">When backend services arrive, this page can become the scaffold for missing modules.</p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
