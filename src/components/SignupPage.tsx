import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, Zap } from 'lucide-react';
import { GlassCard, NeonButton, AIInput, PulsingCore, SectionTitle, HolographicLine } from './UI';

export function SignupPage({ onSignup, onBackToLogin }: { onSignup: (name: string, email: string, password: string) => void; onBackToLogin: () => void }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    onSignup(fullName, email, password);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-ai-bg via-ai-surface to-ai-bg flex items-center justify-center p-4">
      {/* Background orbs */}
      <div className="fixed top-10 left-10 w-96 h-96 bg-ai-accent-purple/20 rounded-full blur-3xl opacity-20" />
      <div className="fixed bottom-10 right-10 w-96 h-96 bg-ai-accent-cyan/20 rounded-full blur-3xl opacity-20" />

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <PulsingCore size="lg" />
              <Zap className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-ai-bg" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-ai-accent-cyan to-ai-accent-purple bg-clip-text text-transparent mb-2">
            AutoResearch
          </h1>
          <p className="text-ai-text-secondary">Join the AI Research Revolution</p>
        </div>

        {/* Signup Card */}
        <GlassCard className="p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-ai-accent-purple mb-2">Create Account</h2>
            <p className="text-ai-text-secondary">Start your intelligent research journey</p>
          </div>

          <HolographicLine />

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name Input */}
            <div>
              <label className="text-sm text-ai-text-secondary mb-2 block">Full Name</label>
              <AIInput
                placeholder="Dr. Jane Researcher"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                icon={User}
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="text-sm text-ai-text-secondary mb-2 block">Email</label>
              <AIInput
                placeholder="your.email@research.ai"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={Mail}
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="text-sm text-ai-text-secondary mb-2 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a secure password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`
                    w-full px-4 py-3 pl-12
                    bg-white/10 border border-white/20 rounded-lg
                    text-ai-text-primary placeholder-ai-text-secondary
                    backdrop-blur-lg focus:outline-none focus:border-ai-accent-cyan focus:bg-white/20
                    transition-all duration-300
                  `}
                />
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-ai-accent-cyan" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-ai-accent-cyan hover:text-ai-accent-blue transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="text-sm text-ai-text-secondary mb-2 block">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`
                    w-full px-4 py-3 pl-12
                    bg-white/10 border border-white/20 rounded-lg
                    text-ai-text-primary placeholder-ai-text-secondary
                    backdrop-blur-lg focus:outline-none focus:border-ai-accent-cyan focus:bg-white/20
                    transition-all duration-300
                  `}
                />
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-ai-accent-cyan" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-ai-accent-cyan hover:text-ai-accent-blue transition"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="px-4 py-3 bg-ai-accent-pink/20 border border-ai-accent-pink rounded-lg text-ai-accent-pink text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <NeonButton
              onClick={() => handleSubmit({ preventDefault: () => {} } as any)}
              variant="secondary"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Initializing...' : 'Create Account'}
            </NeonButton>
          </form>

          <div className="text-center">
            <p className="text-ai-text-secondary text-sm">
              Already have an account?{' '}
              <button
                onClick={onBackToLogin}
                className="text-ai-accent-cyan hover:text-ai-accent-blue transition font-semibold"
              >
                Login here
              </button>
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
