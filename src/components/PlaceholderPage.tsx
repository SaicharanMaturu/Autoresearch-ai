import React from 'react';
import { X } from 'lucide-react';
import { GlassCard, SectionTitle, HolographicLine, PulsingCore } from './UI';

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  onBack: () => void;
}

export function PlaceholderPage({ title, description, icon: Icon, onBack }: PlaceholderPageProps) {
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

        {/* Placeholder Content */}
        <GlassCard className="p-16 text-center">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <PulsingCore size="lg" />
              <Icon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-ai-bg" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-ai-accent-cyan mb-4">{title}</h2>
          <p className="text-ai-text-secondary text-lg mb-8 max-w-2xl mx-auto">{description}</p>
          
          <div className="inline-block px-6 py-3 bg-ai-accent-cyan/20 border border-ai-accent-cyan rounded-lg text-ai-accent-cyan font-semibold">
            🚀 Coming in Phase 2
          </div>

          <p className="text-ai-text-secondary text-sm mt-8">
            This feature is under active development. Check back soon for advanced analytics and insights!
          </p>
        </GlassCard>
      </div>
    </div>
  );
}
