import React, { useState, useEffect } from 'react';
import { Search, Upload, Brain, TrendingUp, Clock, FileText, Zap, Settings, LogOut, User, Cpu, Shield, Activity, Target, Network, Layers } from 'lucide-react';

export function Dashboard({ 
  userName = 'Researcher', 
  onNavigate,
  onLogout
}: { 
  userName?: string; 
  onNavigate: (page: string) => void;
  onLogout: () => void;
}) {
  const [systemStatus, setSystemStatus] = useState('Synchronizing...');
  const [searchQuery, setSearchQuery] = useState('');
  const [bootProgress, setBootProgress] = useState(0);

  // Simulate status updates and boot sequence
  useEffect(() => {
    const statuses = ['Active', 'Optimizing Vectors', 'Learning Patterns', 'Analyzing Topologies', 'Stable'];
    const statusInterval = setInterval(() => {
      setSystemStatus(statuses[Math.floor(Math.random() * statuses.length)]);
    }, 4000);

    const bootInterval = setInterval(() => {
      setBootProgress(prev => {
        if (prev >= 100) {
          clearInterval(bootInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => {
      clearInterval(statusInterval);
      clearInterval(bootInterval);
    };
  }, []);

  const recentPapers = [
    { id: 1, title: 'Bio-Digital Neural Optimization', date: '2024-05-23', type: 'ENCRYPTED-PDF', integrity: '99.8%' },
    { id: 2, title: 'Non-Euclidean Data Structures', date: '2024-05-22', type: 'RAW-DATA', integrity: '94.2%' },
    { id: 3, title: 'Quantum Synaptic Bridges', date: '2024-05-21', type: 'ANALYSIS', integrity: '100%' },
  ];

  const navigationItems = [
    { id: 'universe', label: 'Research Universe', icon: Network, color: 'cyan' },
    { id: 'gap-lab', label: 'Gap Lab Topology', icon: Target, color: 'rose' },
    { id: 'streams', label: 'Live Data Streams', icon: Activity, color: 'emerald' },
    { id: 'chamber', label: 'Memory Chamber', icon: Clock, color: 'purple' },
    { id: 'studio', label: 'Holographic Studio', icon: FileText, color: 'amber' },
    { id: 'profile', label: 'Operator Profile', icon: Shield, color: 'blue' },
    { id: 'settings', label: 'System Settings', icon: Settings, color: 'slate' },
  ];

  const getColorClasses = (color: string) => {
    const classes = {
      cyan: 'text-cyan-400 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] border-cyan-500/30 group-hover:border-cyan-400',
      rose: 'text-rose-400 group-hover:shadow-[0_0_20px_rgba(244,63,94,0.5)] border-rose-500/30 group-hover:border-rose-400',
      emerald: 'text-emerald-400 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] border-emerald-500/30 group-hover:border-emerald-400',
      purple: 'text-purple-400 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] border-purple-500/30 group-hover:border-purple-400',
      amber: 'text-amber-400 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] border-amber-500/30 group-hover:border-amber-400',
      blue: 'text-blue-400 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] border-blue-500/30 group-hover:border-blue-400',
      slate: 'text-slate-400 group-hover:shadow-[0_0_20px_rgba(148,163,184,0.5)] border-slate-500/30 group-hover:border-slate-400',
    };
    return classes[color as keyof typeof classes] || classes.cyan;
  };

  return (
    <div className="min-h-screen w-full bg-[#050811] text-slate-300 font-sans relative overflow-x-hidden">
      
      {/* Immersive Deep Space & Grid Background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjMTUyMDM2IiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIG9wYWNpdHk9IjAuMiI+PHBhdGggZD0iTTAgNjBoNjBNNjAgMGYtNjAgNjAiLz48L2c+PC9zdmc+')] pointer-events-none z-0"></div>
      
      {/* Dynamic Background Orbs */}
      <div className="fixed top-[-10%] right-[-5%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none animate-[pulse_10s_ease-in-out_infinite] z-0" />
      <div className="fixed bottom-[-10%] left-[-5%] w-[700px] h-[700px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none animate-[pulse_14s_ease-in-out_infinite] z-0" />
      <div className="fixed top-[40%] left-[30%] w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none animate-[pulse_8s_ease-in-out_infinite] z-0" />

      {/* Header Console */}
      <header className="relative z-40 bg-[#090d1a]/80 backdrop-blur-xl border-b border-[#1e2d4a] shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 group cursor-default">
            <div className="relative w-12 h-12 flex items-center justify-center bg-[#050811] rounded-xl border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <div className="absolute inset-0 rounded-xl bg-cyan-400/10 group-hover:bg-cyan-400/20 transition-colors"></div>
              <Cpu className="text-cyan-400 w-6 h-6 group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-[#050811] animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold font-display text-white tracking-widest uppercase drop-shadow-[0_0_10px_rgba(6,182,212,0.4)]">
                Aethelgard OS
              </h1>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping"></span>
                  Neural Core v7.0
                </span>
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest border-l border-[#1e2d4a] pl-3">
                  Uplink: Secure
                </span>
              </div>
            </div>
          </div>
          
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 bg-[#050811] border border-[#1e2d4a] text-slate-400 hover:text-rose-400 hover:border-rose-500/50 rounded-xl transition-all duration-300 shadow-lg group font-mono text-[10px] uppercase tracking-widest"
          >
            <LogOut size={14} className="group-hover:-translate-x-1 transition-transform" />
            Sever Connection
          </button>
        </div>
        {/* Scanning header line */}
        <div className="absolute bottom-0 left-0 h-[1px] w-full bg-transparent overflow-hidden">
          <div className="h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent w-1/3 animate-[slide_3s_ease-in-out_infinite]"></div>
        </div>
      </header>

      {/* Main Content Dashboard */}
      <main className="max-w-7xl mx-auto px-6 py-10 relative z-10 animate-[fadeIn_0.5s_ease-out]">
        
        {/* Operator Welcome Panel */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6 bg-[#090d1a]/60 backdrop-blur-md border border-[#1e2d4a] p-8 rounded-2xl shadow-[inset_0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-cyan-500/10 to-transparent pointer-events-none"></div>
          
          <div className="space-y-3 relative z-10">
            <h2 className="text-3xl font-display font-bold text-white tracking-wide">
              Operator: <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 animate-[gradient_3s_linear_infinite] bg-[length:200%_auto] uppercase">{userName}</span>
            </h2>
            <p className="text-xs font-mono text-slate-400 uppercase tracking-widest">
              Welcome to the Aethelgard Neural Research Environment. All systems optimal.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto relative z-10">
            {/* Search Input */}
            <div className="relative group flex-1 md:w-72">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative flex items-center bg-[#050811] border border-[#1e2d4a] rounded-xl px-4 py-3">
                <Search size={16} className="text-cyan-400 mr-3" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Query Aethelgard DB..." 
                  className="bg-transparent border-none outline-none text-slate-200 placeholder-slate-600 text-sm font-mono w-full"
                />
              </div>
            </div>
            
            {/* Upload Button */}
            <button 
              onClick={() => onNavigate('upload')}
              className="relative group overflow-hidden rounded-xl p-[1px]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 opacity-70 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]"></span>
              <div className="relative bg-[#050811] px-6 py-3 rounded-xl flex items-center justify-center gap-2 group-hover:bg-[#050811]/50 transition-colors duration-300 h-full">
                <Upload size={16} className="text-cyan-400 group-hover:text-white transition-colors group-hover:-translate-y-1 group-hover:scale-110 duration-300" />
                <span className="text-cyan-400 font-bold group-hover:text-white transition-colors text-xs uppercase tracking-widest font-mono">
                  Inject Data
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Neural Core & Telemetry Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* AI Neural Core Visualization */}
          <div className="lg:col-span-5 bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] rounded-2xl p-8 shadow-xl relative overflow-hidden flex flex-col items-center justify-center min-h-[360px] group">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-[60px] group-hover:bg-cyan-500/20 transition-colors duration-700"></div>
            
            <div className="relative w-40 h-40 flex items-center justify-center mb-8">
              {/* Spinning Rings */}
              <div className="absolute inset-0 border-[2px] border-cyan-500/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute inset-2 border-[2px] border-dashed border-purple-500/30 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
              <div className="absolute inset-6 border-[2px] border-emerald-500/20 rounded-full animate-[spin_8s_linear_infinite]"></div>
              
              {/* Core Brain */}
              <div className="relative z-10 w-16 h-16 bg-[#050811] rounded-2xl border border-cyan-400/50 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.3)] animate-pulse">
                <Brain size={32} className="text-cyan-400" />
              </div>

              {/* Connecting Nodes */}
              <div className="absolute top-0 right-1/2 w-1 h-4 bg-cyan-400 shadow-[0_0_10px_#00ffcc]"></div>
              <div className="absolute bottom-0 right-1/2 w-1 h-4 bg-cyan-400 shadow-[0_0_10px_#00ffcc]"></div>
              <div className="absolute top-1/2 right-0 w-4 h-1 bg-purple-400 shadow-[0_0_10px_#a855f7]"></div>
              <div className="absolute top-1/2 left-0 w-4 h-1 bg-purple-400 shadow-[0_0_10px_#a855f7]"></div>
            </div>

            <h3 className="text-xl font-bold font-display uppercase tracking-widest text-white mb-2 relative z-10">Aethelgard Core</h3>
            
            <div className="flex items-center gap-2 mb-6 relative z-10">
              <Activity size={14} className="text-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">{systemStatus}</span>
            </div>

            <div className="w-full max-w-xs relative z-10">
              <div className="flex justify-between text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1.5">
                <span>Boot Sequence</span>
                <span className="text-cyan-400">{bootProgress}%</span>
              </div>
              <div className="h-1.5 w-full bg-[#050811] rounded-full overflow-hidden border border-[#1e2d4a]">
                <div className="h-full bg-cyan-400 shadow-[0_0_10px_#00ffcc] transition-all duration-75" style={{ width: `${bootProgress}%` }}></div>
              </div>
            </div>
          </div>

          {/* Telemetry Stats Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] rounded-2xl p-6 relative overflow-hidden group hover:border-cyan-500/50 transition-colors">
              <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/10 rounded-bl-full"></div>
              <FileText className="text-cyan-400 mb-4" size={24} />
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block mb-1">Data Packets Uploaded</span>
              <span className="text-3xl font-display font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">3</span>
            </div>

            <div className="bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] rounded-2xl p-6 relative overflow-hidden group hover:border-purple-500/50 transition-colors">
              <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/10 rounded-bl-full"></div>
              <Target className="text-purple-400 mb-4" size={24} />
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block mb-1">Research Vectors</span>
              <span className="text-3xl font-display font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">12</span>
            </div>

            <div className="bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] rounded-2xl p-6 relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
              <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-bl-full"></div>
              <Zap className="text-emerald-400 mb-4" size={24} />
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block mb-1">Active AI Nodes</span>
              <span className="text-3xl font-display font-bold text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">7<span className="text-sm text-slate-600">/7</span></span>
            </div>

            <div className="bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] rounded-2xl p-6 relative overflow-hidden group hover:border-amber-500/50 transition-colors">
              <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/10 rounded-bl-full"></div>
              <Clock className="text-amber-400 mb-4" size={24} />
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block mb-1">System Uptime</span>
              <span className="text-3xl font-display font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">99.9<span className="text-sm text-slate-600">%</span></span>
            </div>
          </div>
        </div>

        {/* Database Logs (Recent Papers) */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6 border-b border-[#1e2d4a] pb-4">
            <div className="w-8 h-8 rounded-lg bg-[#050811] border border-cyan-500/30 flex items-center justify-center">
              <Network size={16} className="text-cyan-400" />
            </div>
            <h3 className="text-lg font-bold font-display uppercase tracking-widest text-white">Recent Data Ingestions</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentPapers.map((paper, idx) => (
              <div 
                key={paper.id} 
                className="bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] rounded-xl p-5 hover:border-cyan-500/50 hover:-translate-y-1 transition-all duration-300 group cursor-pointer relative overflow-hidden"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Scan line effect on hover */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-cyan-400/50 opacity-0 group-hover:opacity-100 group-hover:animate-[scanDown_2s_linear_infinite] shadow-[0_0_10px_#00ffcc]"></div>
                
                <div className="flex items-start justify-between mb-4">
                  <span className="text-[9px] font-mono text-cyan-400 border border-cyan-500/30 bg-cyan-500/10 px-2 py-1 rounded">
                    {paper.type}
                  </span>
                  <span className="text-[9px] font-mono text-slate-500">{paper.date}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-200 group-hover:text-cyan-400 transition-colors mb-4">{paper.title}</h4>
                <div className="flex justify-between items-center text-[10px] font-mono border-t border-[#1e2d4a] pt-3">
                  <span className="text-slate-500">Integrity Match</span>
                  <span className="text-emerald-400">{paper.integrity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Grid */}
        <div>
          <div className="flex items-center gap-3 mb-6 border-b border-[#1e2d4a] pb-4">
            <div className="w-8 h-8 rounded-lg bg-[#050811] border border-purple-500/30 flex items-center justify-center">
              <Layers size={16} className="text-purple-400" />
            </div>
            <h3 className="text-lg font-bold font-display uppercase tracking-widest text-white">System Modules</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
            {navigationItems.map((item, idx) => {
              const Icon = item.icon;
              const colorClasses = getColorClasses(item.color);
              
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`group relative bg-[#090d1a]/80 backdrop-blur-md border rounded-xl p-5 flex flex-col items-center justify-center gap-3 hover:-translate-y-1 transition-all duration-300 ${colorClasses}`}
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity"></div>
                  <Icon className="w-8 h-8 relative z-10 transition-transform group-hover:scale-110 duration-300" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-200 transition-colors text-center">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </main>

      <style>{`
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes scanDown {
          0% { transform: translateY(0); opacity: 1; }
          90% { transform: translateY(120px); opacity: 1; }
          100% { transform: translateY(120px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
