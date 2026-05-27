import React, { useState } from 'react';
import { User, Mail, BookOpen, Award, Clock, Settings, LogOut, X, Shield, Activity, Terminal, Zap, Fingerprint, Database, Network } from 'lucide-react';

// Custom UI Components for Aethelgard OS
const CyberCard = ({ children, className = '', border = 'border-[#1e2d4a]' }: { children: React.ReactNode, className?: string, border?: string }) => (
  <div className={`bg-[#090d1a]/80 backdrop-blur-md border ${border} p-6 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden group ${className}`}>
    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
    {children}
  </div>
);

const CyberButton = ({ children, onClick, variant = 'primary', className = '' }: { children: React.ReactNode, onClick?: () => void, variant?: 'primary' | 'danger' | 'ghost', className?: string }) => {
  const baseStyle = "px-6 py-2.5 rounded-lg text-[10px] uppercase tracking-widest font-mono font-bold flex items-center justify-center gap-2 transition-all duration-300";
  const variants = {
    primary: "bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)] hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]",
    danger: "bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 hover:border-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.1)] hover:shadow-[0_0_20px_rgba(244,63,94,0.3)]",
    ghost: "bg-[#050811] hover:bg-[#090d1a] text-slate-400 hover:text-white border border-[#1e2d4a] hover:border-slate-500"
  };
  
  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

export function ProfilePage({ 
  userName = 'Dr. Elara Vance', 
  userEmail = 'e.vance@aethelgard.os',
  onBack,
  onLogout
}: { 
  userName?: string; 
  userEmail?: string;
  onBack: () => void;
  onLogout: () => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: userName,
    email: userEmail,
    bio: 'Lead AI Architect | Quantum-Molecular Synapses',
    clearance: 'Omega Level',
  });

  const stats = [
    { label: 'Knowledge Nodes', value: '1,248', icon: Database, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
    { label: 'Neural Uploads', value: '342', icon: Network, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
    { label: 'Sync Uptime', value: '99.9%', icon: Activity, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { label: 'Core Cycles', value: '8.4T', icon: CpuIcon, color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
  ];

  const recentActivity = [
    { action: 'Neural Weight Update', subject: 'Vance-Protocol 77 Core Sync', date: '14 mins ago', status: 'success' },
    { action: 'Security Protocol', subject: 'Biometric Handshake Verified', date: '2 hours ago', status: 'info' },
    { action: 'Vector Purge', subject: 'Legacy Memory Chamber 04', date: '5 hours ago', status: 'warning' },
    { action: 'Sub-Agent Deployed', subject: 'Quantum Decay Simulation', date: '1 day ago', status: 'success' },
  ];

  const clearances = [
    { name: 'Core Access', active: true },
    { name: 'Memory Overwrite', active: true },
    { name: 'Root Terminal', active: false },
  ];

  return (
    <div className="min-h-screen w-full bg-[#050811] text-slate-300 font-sans relative overflow-x-hidden p-6 flex flex-col items-center">
      
      {/* Immersive Background */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjMTUyMDM2IiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIG9wYWNpdHk9IjAuMiI+PHBhdGggZD0iTTAgNjBoNjBNNjAgMGYtNjAgNjAiLz48L2c+PC9zdmc+')] pointer-events-none z-0 opacity-40"></div>
      
      {/* Ambient Orbs */}
      <div className="fixed top-[-10%] right-[10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none animate-[pulse_12s_infinite] z-0" />
      <div className="fixed bottom-[-10%] left-[10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none animate-[pulse_15s_infinite] z-0" />

      <div className="max-w-5xl w-full relative z-10 space-y-8 mt-4">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold font-display text-white tracking-wide flex items-center gap-3">
              <Fingerprint className="text-cyan-400" size={28} /> Operator Profile
            </h1>
            <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mt-1">Identity Confirmed • Session Active</p>
          </div>
          <button
            onClick={onBack}
            className="text-slate-400 hover:text-cyan-400 transition-colors p-2 bg-[#090d1a] border border-[#1e2d4a] hover:border-cyan-500/50 rounded-xl"
          >
            <X size={20} />
          </button>
        </div>

        {/* Profile Hero Card */}
        <CyberCard className="border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.1)]">
          <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-cyan-500/5 to-transparent pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
            {/* Avatar Hexagon (simulated with CSS) */}
            <div className="relative group shrink-0">
              <div className="w-32 h-32 bg-[#050811] border border-cyan-500/50 flex items-center justify-center font-display text-4xl font-bold text-white relative z-10 shadow-[inset_0_0_20px_rgba(6,182,212,0.3)]" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                EV
                <div className="absolute inset-0 bg-cyan-400/20 animate-pulse mix-blend-overlay"></div>
              </div>
              <div className="absolute inset-[-4px] bg-cyan-500/20 z-0 blur-sm group-hover:blur-md transition-all duration-500" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}></div>
              
              {/* Online Indicator */}
              <div className="absolute -bottom-2 -right-2 bg-[#090d1a] border border-[#1e2d4a] px-3 py-1 rounded-full flex items-center gap-2 z-20 shadow-lg">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[9px] font-mono uppercase text-emerald-400 font-bold tracking-widest">Live</span>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 w-full">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-4xl font-bold font-display text-white mb-2 tracking-wide">{profile.name}</h2>
                  <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-slate-400">
                    <span className="flex items-center gap-2"><Mail size={14} className="text-cyan-400" /> {profile.email}</span>
                    <span className="text-[#1e2d4a]">|</span>
                    <span className="flex items-center gap-2"><Shield size={14} className="text-purple-400" /> {profile.clearance}</span>
                  </div>
                </div>
                
                <CyberButton onClick={() => setIsEditing(!isEditing)} variant={isEditing ? 'ghost' : 'primary'}>
                  {isEditing ? 'Save Config' : 'Edit Matrix'}
                </CyberButton>
              </div>

              {isEditing ? (
                <div className="space-y-4 pt-4 border-t border-[#1e2d4a] mt-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono uppercase tracking-widest text-cyan-400">Designation / Bio</label>
                    <input
                      type="text"
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      className="w-full px-4 py-2 bg-[#050811] border border-[#1e2d4a] rounded-lg text-white font-sans text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono uppercase tracking-widest text-cyan-400">Clearance Level</label>
                    <input
                      type="text"
                      value={profile.clearance}
                      onChange={(e) => setProfile({ ...profile, clearance: e.target.value })}
                      className="w-full px-4 py-2 bg-[#050811] border border-[#1e2d4a] rounded-lg text-white font-sans text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
                    />
                  </div>
                </div>
              ) : (
                <div className="pt-4 border-t border-[#1e2d4a] mt-4">
                  <p className="text-sm text-slate-300 font-sans leading-relaxed border-l-2 border-cyan-500/50 pl-4 py-1">
                    {profile.bio}
                  </p>
                </div>
              )}
            </div>
          </div>
        </CyberCard>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] p-5 rounded-2xl flex flex-col justify-between hover:border-slate-600 transition-colors group relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-24 h-24 ${stat.bg} rounded-bl-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity`}></div>
              
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className={`p-2.5 rounded-xl border ${stat.border} ${stat.bg}`}>
                  <stat.icon size={20} className={stat.color} />
                </div>
                <Zap size={14} className="text-slate-600 group-hover:text-amber-400 transition-colors" />
              </div>
              
              <div className="relative z-10">
                <span className="text-3xl font-display font-bold text-white block mb-1">{stat.value}</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Security & Access */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest flex items-center gap-2 mb-4">
              <Shield size={16} className="text-purple-400" /> Security Matrix
            </h3>
            
            <div className="bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] p-1 rounded-2xl">
              {clearances.map((c, i) => (
                <div key={i} className={`flex items-center justify-between p-4 ${i !== clearances.length - 1 ? 'border-b border-[#1e2d4a]' : ''}`}>
                  <span className={`text-sm font-sans font-medium ${c.active ? 'text-white' : 'text-slate-500'}`}>{c.name}</span>
                  <div className={`h-6 w-10 rounded-full flex items-center px-1 transition-colors ${c.active ? 'bg-purple-500/20 border border-purple-500/30' : 'bg-[#050811] border border-[#1e2d4a]'}`}>
                    <div className={`h-4 w-4 rounded-full transition-transform ${c.active ? 'bg-purple-400 translate-x-3' : 'bg-slate-600 translate-x-0'}`}></div>
                  </div>
                </div>
              ))}
            </div>

            <CyberCard className="mt-4">
              <div className="flex flex-col items-center justify-center text-center py-4">
                <Fingerprint size={32} className="text-cyan-400 mb-3 opacity-80" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1">Last Authentication</span>
                <span className="text-sm font-bold text-white">09:41:22 UTC - Terminal 04</span>
              </div>
            </CyberCard>
          </div>

          {/* Activity Log */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest flex items-center gap-2 mb-4">
              <Terminal size={16} className="text-cyan-400" /> System Diagnostics Log
            </h3>
            
            <div className="bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] rounded-2xl overflow-hidden">
              <div className="grid grid-cols-12 gap-4 p-4 border-b border-[#1e2d4a] bg-[#050811] text-[9px] font-mono uppercase tracking-widest text-slate-500">
                <div className="col-span-3">Timestamp</div>
                <div className="col-span-3">Operation</div>
                <div className="col-span-4">Target</div>
                <div className="col-span-2 text-right">Status</div>
              </div>
              
              <div className="divide-y divide-[#1e2d4a]">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-[#050811]/50 transition-colors group">
                    <div className="col-span-3 text-[10px] font-mono text-slate-500">{activity.date}</div>
                    <div className="col-span-3 text-xs font-sans font-medium text-white">{activity.action}</div>
                    <div className="col-span-4 text-xs font-sans text-slate-400 truncate">{activity.subject}</div>
                    <div className="col-span-2 flex justify-end">
                      <span className={`text-[9px] font-mono uppercase tracking-widest px-2 py-1 rounded-md border flex items-center gap-1.5 ${
                        activity.status === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                        activity.status === 'warning' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                        'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${
                          activity.status === 'success' ? 'bg-emerald-400' :
                          activity.status === 'warning' ? 'bg-amber-400' : 'bg-cyan-400'
                        }`}></span>
                        {activity.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-[#1e2d4a]">
          <CyberButton variant="ghost" className="flex-1">
            <Settings size={16} /> Advanced Config
          </CyberButton>
          <CyberButton variant="ghost" className="flex-1">
            <Shield size={16} /> Key Management
          </CyberButton>
          <CyberButton onClick={onLogout} variant="danger" className="flex-1">
            <LogOut size={16} /> Terminate Session
          </CyberButton>
        </div>

      </div>
    </div>
  );
}

// Inline Cpu Icon since it might not be imported if I just added it
function CpuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="16" x="4" y="4" rx="2" />
      <rect width="6" height="6" x="9" y="9" rx="1" />
      <path d="M15 2v2" />
      <path d="M15 20v2" />
      <path d="M2 15h2" />
      <path d="M2 9h2" />
      <path d="M20 15h2" />
      <path d="M20 9h2" />
      <path d="M9 2v2" />
      <path d="M9 20v2" />
    </svg>
  );
}
