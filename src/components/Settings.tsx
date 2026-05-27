import React, { useState } from 'react';
import { Settings as SettingsIcon, LogOut, Bell, Moon, Sun, Cpu, X, Shield, Network, Zap, Fingerprint, Database, HardDrive, LayoutTemplate, Sliders } from 'lucide-react';

const CyberCard = ({ children, className = '', border = 'border-[#1e2d4a]' }: { children: React.ReactNode, className?: string, border?: string }) => (
  <div className={`bg-[#090d1a]/80 backdrop-blur-md border ${border} p-6 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden group ${className}`}>
    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
    {children}
  </div>
);

export function Settings({ onBack, onLogout }: { onBack: () => void; onLogout: () => void }) {
  const [model, setModel] = useState('DeepSeek');
  const [theme, setTheme] = useState('Dark');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [telemetry, setTelemetry] = useState(false);
  const [memoryLimit, setMemoryLimit] = useState(64);

  return (
    <div className="min-h-screen w-full bg-[#050811] text-slate-300 font-sans relative overflow-x-hidden p-6 flex flex-col items-center">
      {/* Immersive Background */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjMTUyMDM2IiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIG9wYWNpdHk9IjAuMiI+PHBhdGggZD0iTTAgNjBoNjBNNjAgMGYtNjAgNjAiLz48L2c+PC9zdmc+')] pointer-events-none z-0 opacity-40"></div>
      
      {/* Ambient Orbs */}
      <div className="fixed top-[20%] right-[-10%] w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none animate-[pulse_12s_infinite] z-0" />
      <div className="fixed bottom-[-20%] left-[0%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none animate-[pulse_15s_infinite] z-0" />

      <div className="max-w-4xl w-full relative z-10 space-y-8 mt-4">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold font-display text-white tracking-wide flex items-center gap-3">
              <Sliders className="text-cyan-400" size={28} /> System Configurations
            </h1>
            <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mt-1">Aethelgard OS Core Parameters</p>
          </div>
          <button
            onClick={onBack}
            className="text-slate-400 hover:text-cyan-400 transition-colors p-2 bg-[#090d1a] border border-[#1e2d4a] hover:border-cyan-500/50 rounded-xl group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-cyan-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            <X size={20} className="relative z-10" />
          </button>
        </div>

        <div className="grid gap-6">
          {/* AI Settings */}
          <CyberCard className="border-purple-500/20 shadow-[0_0_40px_rgba(168,85,247,0.05)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
                <Network size={24} className="text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-display text-white tracking-wide">Neural Engine Selection</h3>
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Active Intelligence Architecture</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-[#050811] rounded-xl border border-[#1e2d4a] group-hover:border-purple-500/30 transition-colors">
                <div>
                  <p className="text-sm font-bold text-white font-sans flex items-center gap-2">
                    <Database size={14} className="text-purple-400" /> Model Selection
                  </p>
                  <p className="text-[10px] text-slate-500 font-mono mt-1">Designate primary LLM routing</p>
                </div>
                
                <div className="flex gap-2 bg-[#090d1a] p-1.5 rounded-xl border border-[#1e2d4a]">
                  <button
                    onClick={() => setModel('DeepSeek')}
                    className={`px-6 py-2 rounded-lg text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-2 ${
                      model === 'DeepSeek' 
                        ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]' 
                        : 'text-slate-400 hover:text-white border border-transparent hover:bg-white/5'
                    }`}
                  >
                    DeepSeek V3
                  </button>
                  <button
                    onClick={() => setModel('Gemini')}
                    className={`px-6 py-2 rounded-lg text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-2 ${
                      model === 'Gemini' 
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]' 
                        : 'text-slate-400 hover:text-white border border-transparent hover:bg-white/5'
                    }`}
                  >
                    Gemini Pro
                  </button>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-[#050811] rounded-xl border border-[#1e2d4a] group-hover:border-purple-500/30 transition-colors">
                <div>
                  <p className="text-sm font-bold text-white font-sans flex items-center gap-2">
                    <HardDrive size={14} className="text-purple-400" /> Vector Memory Allocation
                  </p>
                  <p className="text-[10px] text-slate-500 font-mono mt-1">Context window retention size</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-purple-400 font-bold">{memoryLimit} GB</span>
                  <input 
                    type="range" 
                    min="16" 
                    max="128" 
                    step="16"
                    value={memoryLimit}
                    onChange={(e) => setMemoryLimit(parseInt(e.target.value))}
                    className="w-32 accent-purple-500 h-1 bg-[#090d1a] rounded-lg appearance-none cursor-pointer border border-[#1e2d4a]"
                  />
                </div>
              </div>
            </div>
          </CyberCard>

          {/* Theme Settings */}
          <CyberCard className="border-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.05)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                <LayoutTemplate size={24} className="text-emerald-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-display text-white tracking-wide">Environment Optics</h3>
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Interface Rendering Preferences</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-[#050811] rounded-xl border border-[#1e2d4a] group-hover:border-emerald-500/30 transition-colors">
                <div>
                  <p className="text-sm font-bold text-white font-sans flex items-center gap-2">
                    <Moon size={14} className="text-emerald-400" /> Aesthetic Matrix
                  </p>
                  <p className="text-[10px] text-slate-500 font-mono mt-1">System color space rendering</p>
                </div>
                
                <div className="flex gap-2 bg-[#090d1a] p-1.5 rounded-xl border border-[#1e2d4a]">
                  <button
                    onClick={() => setTheme('Dark')}
                    className={`flex items-center gap-2 px-6 py-2 rounded-lg text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 ${
                      theme === 'Dark' 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
                        : 'text-slate-400 hover:text-white border border-transparent hover:bg-white/5'
                    }`}
                  >
                    Cyber Dark
                  </button>
                  <button
                    onClick={() => setTheme('Light')}
                    className={`flex items-center gap-2 px-6 py-2 rounded-lg text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 ${
                      theme === 'Light' 
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]' 
                        : 'text-slate-400 hover:text-white border border-transparent hover:bg-white/5'
                    }`}
                  >
                    Solar Flare
                  </button>
                </div>
              </div>
            </div>
          </CyberCard>

          {/* Account Settings */}
          <CyberCard className="border-rose-500/20 shadow-[0_0_40px_rgba(244,63,94,0.05)]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-rose-500/10 rounded-xl border border-rose-500/20">
                <Shield size={24} className="text-rose-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-display text-white tracking-wide">Security & Subroutines</h3>
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Access Control and Telemetry</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-5 bg-[#050811] rounded-xl border border-[#1e2d4a] group-hover:border-rose-500/30 transition-colors">
                <div>
                  <p className="text-sm font-bold text-white font-sans flex items-center gap-2">
                    <Bell size={14} className="text-rose-400" /> Neural Alerts
                  </p>
                  <p className="text-[10px] text-slate-500 font-mono mt-1">Interrupt tasks for completion status</p>
                </div>
                <button
                  onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                  className={`w-14 h-7 rounded-full relative transition-colors border ${
                    notificationsEnabled ? 'bg-rose-500/20 border-rose-500/50' : 'bg-[#090d1a] border-[#1e2d4a]'
                  }`}
                >
                  <div className={`absolute top-1 w-5 h-5 rounded-full shadow-lg transition-all ${
                    notificationsEnabled ? 'left-8 bg-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.8)]' : 'left-1 bg-slate-500'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-5 bg-[#050811] rounded-xl border border-[#1e2d4a] group-hover:border-rose-500/30 transition-colors">
                <div>
                  <p className="text-sm font-bold text-white font-sans flex items-center gap-2">
                    <Zap size={14} className="text-rose-400" /> Anonymous Telemetry
                  </p>
                  <p className="text-[10px] text-slate-500 font-mono mt-1">Send usage metrics to central command</p>
                </div>
                <button
                  onClick={() => setTelemetry(!telemetry)}
                  className={`w-14 h-7 rounded-full relative transition-colors border ${
                    telemetry ? 'bg-cyan-500/20 border-cyan-500/50' : 'bg-[#090d1a] border-[#1e2d4a]'
                  }`}
                >
                  <div className={`absolute top-1 w-5 h-5 rounded-full shadow-lg transition-all ${
                    telemetry ? 'left-8 bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]' : 'left-1 bg-slate-500'
                  }`} />
                </button>
              </div>

              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#1e2d4a] to-transparent my-6"></div>

              <div className="flex items-center justify-between p-5 bg-rose-950/20 rounded-xl border border-rose-500/20 hover:border-rose-500/50 transition-colors">
                <div>
                  <p className="text-sm font-bold text-rose-400 font-sans flex items-center gap-2">
                    <Fingerprint size={14} /> Sever Connection
                  </p>
                  <p className="text-[10px] text-rose-400/60 font-mono mt-1">Securely purge local session cache</p>
                </div>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 px-6 py-2.5 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 hover:text-rose-300 rounded-lg transition-all border border-rose-500/30 font-mono text-[10px] uppercase tracking-widest font-bold shadow-[0_0_15px_rgba(244,63,94,0.1)] hover:shadow-[0_0_20px_rgba(244,63,94,0.3)]"
                >
                  <LogOut size={16} />
                  Terminate
                </button>
              </div>
            </div>
          </CyberCard>
        </div>
      </div>
    </div>
  );
}
