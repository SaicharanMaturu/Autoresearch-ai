import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, ShieldCheck, Loader, Key, Network } from 'lucide-react';

const CyberInput = ({ icon: Icon, type, placeholder, value, onChange, showPasswordToggle = false, showPassword, setShowPassword }: any) => (
  <div className="relative group">
    <div className="absolute inset-0 bg-purple-500/10 translate-y-1 group-hover:translate-y-0 transition-transform duration-300 rounded-xl blur-sm -z-10 opacity-0 group-focus-within:opacity-100"></div>
    <div className="relative flex items-center bg-[#050811] border border-[#1e2d4a] rounded-xl focus-within:border-purple-500/50 focus-within:shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all">
      <div className="pl-4 pr-3 py-3 border-r border-[#1e2d4a]">
        <Icon size={18} className="text-purple-400 opacity-70 group-focus-within:opacity-100 transition-opacity" />
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent border-none text-white placeholder-slate-600 text-sm px-4 py-3 focus:outline-none font-sans"
      />
      {showPasswordToggle && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="pr-4 text-purple-400 hover:text-purple-300 transition-colors"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  </div>
);

export function SignupPage({ onSignup, onBackToLogin }: { onSignup?: () => void; onBackToLogin: () => void }) {
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
    
    const validateEmail = (em: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em);

    if (!fullName.trim()) {
      setError('Full name is required');
      return;
    }

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setError('');
    setIsLoading(true);
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || data.message || 'Signup failed. Please try again.');
        setIsLoading(false);
        return;
      }

      if (data.success) {
        if (data.token) localStorage.setItem('token', data.token);
        // Notify parent to fetch profile if token provided
        onSignup && onSignup();
      } else {
        setError(data.error || data.message || 'Signup failed');
      }
    } catch (err: any) {
      setError(err?.message || 'Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#050811] text-slate-300 font-sans relative overflow-x-hidden flex items-center justify-center p-4">
      {/* Immersive Background */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjMTUyMDM2IiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIG9wYWNpdHk9IjAuMiI+PHBhdGggZD0iTTAgNjBoNjBNNjAgMGYtNjAgNjAiLz48L2c+PC9zdmc+')] pointer-events-none z-0 opacity-40"></div>
      
      {/* Ambient Orbs */}
      <div className="fixed top-[10%] left-[10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none animate-[pulse_10s_infinite] z-0" />
      <div className="fixed bottom-[10%] right-[10%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none animate-[pulse_15s_infinite] z-0" />

      <div className="relative z-10 w-full max-w-lg">
        
        {/* Header Title */}
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full"></div>
            <div className="w-20 h-20 bg-[#090d1a] border-2 border-purple-500/50 rounded-2xl flex items-center justify-center relative z-10 shadow-[0_0_30px_rgba(168,85,247,0.3)] -rotate-3 hover:rotate-0 transition-transform duration-500 overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-purple-400 animate-[slide_2s_linear_infinite_reverse]" style={{ transform: 'translateY(80px)' }}></div>
              <Network size={36} className="text-purple-400 group-hover:scale-110 transition-transform duration-500" />
            </div>
          </div>
          <h1 className="text-4xl font-bold font-display text-white tracking-widest uppercase mb-2" style={{ textShadow: '0 0 20px rgba(168,85,247,0.5)' }}>
            Aethelgard <span className="text-purple-400">OS</span>
          </h1>
          <p className="text-[10px] font-mono text-slate-400 uppercase tracking-[0.3em]">Operator Registration</p>
        </div>

        {/* Signup Card */}
        <div className="bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] rounded-2xl p-8 shadow-[0_0_40px_rgba(0,0,0,0.5)] relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
          <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl"></div>

          <div className="mb-8">
            <h2 className="text-xl font-bold text-white font-display tracking-wide flex items-center gap-2">
              <Key className="text-purple-400" size={20} /> Request Clearance
            </h2>
            <p className="text-xs text-slate-500 font-mono mt-1">Generate a new neural identity profile</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-[9px] font-mono uppercase tracking-widest text-purple-400 mb-2 block">Operator Designation (Name)</label>
              <CyberInput
                icon={User}
                type="text"
                placeholder="Dr. Elara Vance"
                value={fullName}
                onChange={(e: any) => setFullName(e.target.value)}
              />
            </div>

            <div>
              <label className="text-[9px] font-mono uppercase tracking-widest text-purple-400 mb-2 block">Comms Channel (Email)</label>
              <CyberInput
                icon={Mail}
                type="email"
                placeholder="operator@aethelgard.os"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-[9px] font-mono uppercase tracking-widest text-purple-400 mb-2 block">Matrix Key (Password)</label>
              <CyberInput
                icon={Lock}
                type={showPassword ? 'text' : 'password'}
                placeholder="Create secure key"
                value={password}
                onChange={(e: any) => setPassword(e.target.value)}
                showPasswordToggle={true}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            </div>

            <div>
              <label className="text-[9px] font-mono uppercase tracking-widest text-purple-400 mb-2 block">Verify Matrix Key</label>
              <CyberInput
                icon={ShieldCheck}
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm secure key"
                value={confirmPassword}
                onChange={(e: any) => setConfirmPassword(e.target.value)}
                showPasswordToggle={true}
                showPassword={showConfirmPassword}
                setShowPassword={setShowConfirmPassword}
              />
            </div>

            {error && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs font-mono flex items-center gap-2 shadow-[0_0_10px_rgba(244,63,94,0.1)]">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-pulse"></span>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full relative group overflow-hidden bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 hover:border-purple-400 rounded-xl py-3.5 transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.1)] hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] mt-2"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <div className="flex items-center justify-center gap-2 text-purple-400 font-mono text-xs uppercase tracking-widest font-bold">
                {isLoading ? (
                  <>
                    <Loader size={16} className="animate-spin" />
                    <span>Generating Profile...</span>
                  </>
                ) : (
                  <>
                    <User size={16} />
                    <span>Request Identity</span>
                  </>
                )}
              </div>
            </button>
          </form>

          {/* Alternate Login / Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#1e2d4a]"></div>
            <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500">Or</span>
            <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#1e2d4a]"></div>
          </div>

          <div className="text-center">
            <button
              onClick={onBackToLogin}
              className="text-[10px] font-mono text-slate-400 hover:text-cyan-400 transition-colors uppercase tracking-widest flex items-center justify-center gap-2 w-full"
            >
              <span>Return to Login Gateway</span>
              <span className="h-1 w-1 rounded-full bg-cyan-400 animate-pulse"></span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
