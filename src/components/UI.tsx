import React from 'react';

// Enhanced Glassmorphic Card with Neural Glow
export function GlassCard({ children, className = '', hover = true, ...props }: React.HTMLAttributes<HTMLDivElement> & { hover?: boolean }) {
  return (
    <div 
      className={`
      bg-white/10 backdrop-blur-lg border border-electric-cyan/30 rounded-2xl
      shadow-neural-net
      ${hover ? 'hover:bg-white/15 hover:border-electric-cyan/50 hover:shadow-deep-glow transition-all duration-300 hover:scale-[1.02]' : ''}
      ${className}
    `}
      {...props}
    >
      {children}
    </div>
  );
}

// Enhanced Neon Button with Futuristic Styling
export function NeonButton({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '',
  disabled = false,
  type = 'button',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { 
  variant?: 'primary' | 'secondary' | 'ghost'; 
}) {
  const variants = {
    primary: 'bg-gradient-to-r from-electric-cyan via-neon-purple to-electric-cyan text-space-black shadow-neon-cyan hover:shadow-deep-glow',
    secondary: 'bg-gradient-to-r from-neon-purple to-hot-pink text-white shadow-neon-purple hover:shadow-deep-glow',
    ghost: 'border-2 border-electric-cyan text-electric-cyan hover:bg-electric-cyan/10 hover:shadow-neon-cyan',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...props}
      className={`
        px-6 py-3 rounded-lg font-semibold text-sm font-display
        transition-all duration-300 transform hover:scale-105 active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
        relative overflow-hidden group
        ${variants[variant]}
        ${className}
      `}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
    </button>
  );
}

// Enhanced Floating Panel with Neural Animation
export function FloatingPanel({ 
  title, 
  children, 
  className = '' 
}: { 
  title: string; 
  children: React.ReactNode; 
  className?: string 
}) {
  return (
    <div className={`animate-particle-float ${className}`}>
      <GlassCard className="p-6 border-electric-cyan/40">
        <h3 className="text-electric-cyan font-bold text-lg mb-4 font-display animate-brain-glow">{title}</h3>
        {children}
      </GlassCard>
    </div>
  );
}

// Enhanced Pulsing Core with Neural Brain Effect
export function PulsingCore({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeMap = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32',
  };

  return (
    <div className={`relative ${sizeMap[size]} group`}>
      {/* Outer neural ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-electric-cyan via-neon-purple to-electric-cyan animate-orbital-spin opacity-60" />
      
      {/* Glow ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-electric-cyan to-neon-purple animate-pulse-glow" />
      
      {/* Core center */}
      <div className="absolute inset-2 rounded-full bg-gradient-to-br from-electric-cyan via-neon-purple to-hot-pink animate-holographic shadow-deep-glow" />
      
      {/* Inner light */}
      <div className="absolute inset-4 rounded-full bg-white/40 blur-md" />
      
      {/* Data stream effect */}
      <div className="absolute inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-electric-cyan/50 animate-connection-pulse" />
    </div>
  );
}

// Enhanced Loading Spinner with Neural Pulse
export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center gap-3">
      <div className="w-3 h-3 bg-electric-cyan rounded-full animate-neural-pulse" />
      <div className="w-3 h-3 bg-neon-purple rounded-full animate-neural-pulse" style={{ animationDelay: '0.2s' }} />
      <div className="w-3 h-3 bg-hot-pink rounded-full animate-neural-pulse" style={{ animationDelay: '0.4s' }} />
    </div>
  );
}

// Enhanced Stat Display with Futuristic Styling
export function StatDisplay({ label, value, unit = '', icon: Icon, ...props }: React.HTMLAttributes<HTMLDivElement> & { label: string; value: number | string; unit?: string; icon?: React.ComponentType<any> }) {
  return (
    <GlassCard className="p-4 border-neon-purple/30 group hover:border-electric-cyan/50" {...props}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-ai-text-secondary text-sm font-body">{label}</p>
        {Icon && <Icon className="w-5 h-5 text-electric-cyan group-hover:animate-pulse" />}
      </div>
      <p className="text-2xl font-bold bg-gradient-to-r from-electric-cyan to-neon-purple bg-clip-text text-transparent font-display">
        {value}{unit && <span className="text-sm text-ai-text-secondary ml-1">{unit}</span>}
      </p>
    </GlassCard>
  );
}

// Enhanced Input with Holographic Effect
export function AIInput({ 
  placeholder, 
  value, 
  onChange,
  icon: Icon,
  className = '',
  type = 'text',
  disabled = false,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: React.ComponentType<any>;
}) {
  return (
    <div className={`relative group ${className}`}>
      <input
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
        className={`
          w-full px-4 py-3 pl-12
          bg-white/10 border border-electric-cyan/30 rounded-lg
          text-ai-text-primary placeholder-ai-text-secondary
          backdrop-blur-lg focus:outline-none focus:border-electric-cyan focus:bg-white/20
          focus:shadow-neon-cyan focus:shadow-lg
          transition-all duration-300 font-body
          group-hover:border-electric-cyan/50 group-hover:shadow-neon-cyan
          ${className}
        `}
      />
      {Icon && <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-electric-cyan group-hover:animate-pulse" />}
    </div>
  );
}

// Enhanced Section Title with Animated Glow
export function SectionTitle({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`
      text-3xl font-bold bg-gradient-to-r from-electric-cyan via-neon-purple to-hot-pink 
      bg-clip-text text-transparent animate-brain-glow font-display
      ${className}
    `}>
      {children}
    </h2>
  );
}

// Enhanced Holographic Line with Neural Pulse
export function HolographicLine() {
  return (
    <div className="h-1 bg-gradient-to-r from-transparent via-electric-cyan to-transparent shadow-neon-cyan animate-pulse-glow" />
  );
}
