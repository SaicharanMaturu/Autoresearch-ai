import type { Config } from 'tailwindcss';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 2035 Futuristic Palette
        'space-black': '#070707',      // Deep Space Black
        'deep-indigo': '#121B3A',      // Deep Indigo
        'electric-cyan': '#00E5FF',    // Electric Cyan
        'neon-purple': '#B84DFF',      // Neon Purple
        'hot-pink': '#FF1493',         // Hot Pink
        'amber-glow': '#FFB81C',       // Amber
        'emerald-green': '#00D084',    // Emerald Green
        // Legacy colors (kept for compatibility)
        'ai-bg': '#070707',
        'ai-surface': '#121B3A',
        'ai-border': '#1a2847',
        'ai-accent-cyan': '#00E5FF',
        'ai-accent-blue': '#00a8ff',
        'ai-accent-purple': '#B84DFF',
        'ai-accent-pink': '#FF1493',
        'ai-text-primary': '#ffffff',
        'ai-text-secondary': '#b0b8d4',
        'ai-neon-cyan': '#00F5FF',
        'ai-neon-purple': '#B84DFF',
      },
      fontFamily: {
        'display': ['Syne', 'sans-serif'],
        'body': ['DM Sans', 'sans-serif'],
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
      },
      animation: {
        // Existing animations
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'scan': 'scan 3s ease-in-out infinite',
        'orbit': 'orbit 20s linear infinite',
        // New 2035 animations
        'neural-pulse': 'neural-pulse 1.5s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'ripple': 'ripple 1s ease-out infinite',
        'holographic': 'holographic 4s ease-in-out infinite',
        'data-flow': 'data-flow 3s linear infinite',
        'brain-glow': 'brain-glow 2.5s ease-in-out infinite',
        'orbital-spin': 'orbital-spin 8s linear infinite',
        'particle-float': 'particle-float 4s ease-in-out infinite',
        'connection-pulse': 'connection-pulse 2s ease-in-out infinite',
        'ai-boot': 'ai-boot 3s ease-in-out',
      },
      keyframes: {
        // Existing keyframes
        'pulse-glow': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(0, 229, 255, 0.3)' },
          '50%': { opacity: '0.7', boxShadow: '0 0 40px rgba(0, 229, 255, 0.6)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow': {
          '0%, 100%': { textShadow: '0 0 10px rgba(0, 229, 255, 0.3)' },
          '50%': { textShadow: '0 0 20px rgba(0, 229, 255, 0.8)' },
        },
        'scan': {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        'orbit': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
        // New keyframes for 2035 aesthetic
        'neural-pulse': {
          '0%, 100%': { opacity: '0.5', boxShadow: '0 0 10px rgba(184, 77, 255, 0.2)' },
          '50%': { opacity: '1', boxShadow: '0 0 30px rgba(184, 77, 255, 0.8)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'ripple': {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
        'holographic': {
          '0%': { filter: 'hue-rotate(0deg) brightness(1)' },
          '50%': { filter: 'hue-rotate(20deg) brightness(1.2)' },
          '100%': { filter: 'hue-rotate(0deg) brightness(1)' },
        },
        'data-flow': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        'brain-glow': {
          '0%, 100%': { textShadow: '0 0 20px rgba(0, 229, 255, 0.3), 0 0 40px rgba(184, 77, 255, 0.1)' },
          '50%': { textShadow: '0 0 40px rgba(0, 229, 255, 0.6), 0 0 60px rgba(184, 77, 255, 0.4)' },
        },
        'orbital-spin': {
          '0%': { transform: 'rotate(0deg) translateY(-50px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateY(-50px) rotate(-360deg)' },
        },
        'particle-float': {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)', opacity: '0.5' },
          '50%': { transform: 'translateY(-20px) translateX(10px)', opacity: '1' },
        },
        'connection-pulse': {
          '0%': { opacity: '0.3', strokeDashoffset: '1000' },
          '50%': { opacity: '1', strokeDashoffset: '0' },
          '100%': { opacity: '0.3', strokeDashoffset: '1000' },
        },
        'ai-boot': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-neural': 'linear-gradient(45deg, transparent 0%, rgba(0, 229, 255, 0.1) 50%, transparent 100%)',
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(0, 229, 255, 0.5)',
        'neon-purple': '0 0 20px rgba(184, 77, 255, 0.5)',
        'neon-pink': '0 0 20px rgba(255, 20, 147, 0.5)',
        'glow-cyan': '0 0 40px rgba(0, 229, 255, 0.3), inset 0 0 20px rgba(0, 229, 255, 0.1)',
        'glow-purple': '0 0 40px rgba(184, 77, 255, 0.3), inset 0 0 20px rgba(184, 77, 255, 0.1)',
        'deep-glow': '0 0 60px rgba(0, 229, 255, 0.2), 0 0 30px rgba(184, 77, 255, 0.15)',
        'neural-net': '0 0 50px rgba(0, 229, 255, 0.1), inset 0 0 30px rgba(184, 77, 255, 0.05)',
      },
    },
  },
  plugins: [],
} satisfies Config;
