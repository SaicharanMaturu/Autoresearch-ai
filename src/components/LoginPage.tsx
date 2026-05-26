import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Chrome, Loader } from 'lucide-react';
import { GlassCard, NeonButton, AIInput, PulsingCore, HolographicLine } from './UI';
import { GoogleLogin } from '@react-oauth/google';

export function LoginPage({ 
  onLogin, 
  onSignupClick,
  onForgotPassword
}: { 
  onLogin: (email: string, password: string) => void;
  onSignupClick?: () => void;
  onForgotPassword?: () => void;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    onLogin(email, password);
    setIsLoading(false);
  };

  const handleGoogleLogin = async (credentialResponse: any) => {
    setError('');
    setGoogleLoading(true);
    
    try {
      const response = await fetch('/api/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idToken: credentialResponse.credential
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Google login failed');
        setGoogleLoading(false);
        return;
      }

      // Store session and login
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      
      // Simulate delay then trigger login
      await new Promise(resolve => setTimeout(resolve, 500));
      onLogin(data.user.email, '');
    } catch (err: any) {
      setError(err.message || 'Google login error');
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-ai-bg via-ai-surface to-ai-bg flex items-center justify-center p-4">
      {/* Background orbs */}
      <div className="fixed top-10 left-10 w-96 h-96 bg-ai-accent-cyan/20 rounded-full blur-3xl opacity-20" />
      <div className="fixed bottom-10 right-10 w-96 h-96 bg-ai-accent-purple/20 rounded-full blur-3xl opacity-20" />

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <PulsingCore size="lg" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-ai-accent-cyan to-ai-accent-purple bg-clip-text text-transparent mb-2">
            AutoResearch
          </h1>
          <p className="text-ai-text-secondary">AI Scientist Operating System</p>
        </div>

        {/* Login Card */}
        <GlassCard className="p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-ai-accent-cyan mb-2">Welcome Back</h2>
            <p className="text-ai-text-secondary">Access your research intelligence center</p>
          </div>

          <HolographicLine />

          <form onSubmit={handleSubmit} className="space-y-4">
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
                  placeholder="Enter your password"
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

            {/* Submit Button */}
            <NeonButton
              onClick={() => handleSubmit({ preventDefault: () => {} } as any)}
              variant="primary"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Connecting...' : 'Login'}
            </NeonButton>
          </form>

          <div className="flex items-center gap-2 text-ai-text-secondary text-sm">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-ai-accent-cyan/50" />
            <span>Don't have an account?</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-ai-accent-cyan/50" />
          </div>

          <button
            onClick={onSignupClick}
            className="w-full px-4 py-3 border-2 border-ai-accent-blue text-ai-accent-blue rounded-lg hover:bg-ai-accent-blue/10 transition-all duration-300 font-semibold"
          >
            Create Account
          </button>
        </GlassCard>

        {/* Google Sign-In Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-ai-text-secondary text-sm">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-ai-accent-cyan/50" />
            <span>Or continue with</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-ai-accent-cyan/50" />
          </div>

          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="flex justify-center">
            {googleLoading ? (
              <div className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center gap-2 text-white">
                <Loader size={18} className="animate-spin" />
                Signing in with Google...
              </div>
            ) : (
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => setError('Google sign-in not configured. Use email/password for now.')}
              />
            )}
          </div>
        </div>

        {/* Footer Links */}
        <p className="text-center text-ai-text-secondary text-sm mt-6 space-x-2">
          <button
            onClick={onForgotPassword}
            className="text-ai-accent-cyan hover:text-ai-accent-blue transition font-semibold"
          >
            Forgot Password?
          </button>
        </p>
      </div>
    </div>
  );
}
