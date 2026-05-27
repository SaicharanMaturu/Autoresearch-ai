import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, Cpu, Database, Eye, X, Clock, Server, Zap, ChevronLeft, Network } from 'lucide-react';

export function AgentMonitor({ onBack }: { onBack: () => void }) {
  const [agents, setAgents] = useState([
    { id: '1', name: 'Research Agent', status: 'Active', tasks: 45, uptime: '99.9%', icon: Network, color: 'emerald' },
    { id: '2', name: 'OCR Agent', status: 'Idle', tasks: 12, uptime: '98.5%', icon: Eye, color: 'slate' },
    { id: '3', name: 'Memory Agent', status: 'Thinking', tasks: 89, uptime: '99.2%', icon: Database, color: 'purple' },
    { id: '4', name: 'PPT Agent', status: 'Idle', tasks: 3, uptime: '99.9%', icon: Cpu, color: 'slate' },
    { id: '5', name: 'Gap Agent', status: 'Active', tasks: 24, uptime: '99.5%', icon: ShieldCheck, color: 'cyan' },
    { id: '6', name: 'Synthesizer Node', status: 'Active', tasks: 156, uptime: '100%', icon: Zap, color: 'rose' },
  ]);

  // Simulate active agent updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAgents(prev => prev.map(agent => {
        if (agent.status === 'Active' || agent.status === 'Thinking') {
          return { ...agent, tasks: agent.tasks + Math.floor(Math.random() * 3) };
        }
        return agent;
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getColorClasses = (color: string) => {
    const classes = {
      emerald: {
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/30',
        text: 'text-emerald-400',
        shadow: 'shadow-[0_0_15px_rgba(16,185,129,0.2)]',
        hover: 'hover:border-emerald-500/60 hover:shadow-[0_0_25px_rgba(16,185,129,0.3)]',
        pulse: 'bg-emerald-400',
      },
      purple: {
        bg: 'bg-purple-500/10',
        border: 'border-purple-500/30',
        text: 'text-purple-400',
        shadow: 'shadow-[0_0_15px_rgba(168,85,247,0.2)]',
        hover: 'hover:border-purple-500/60 hover:shadow-[0_0_25px_rgba(168,85,247,0.3)]',
        pulse: 'bg-purple-400',
      },
      cyan: {
        bg: 'bg-cyan-500/10',
        border: 'border-cyan-500/30',
        text: 'text-cyan-400',
        shadow: 'shadow-[0_0_15px_rgba(6,182,212,0.2)]',
        hover: 'hover:border-cyan-500/60 hover:shadow-[0_0_25px_rgba(6,182,212,0.3)]',
        pulse: 'bg-cyan-400',
      },
      rose: {
        bg: 'bg-rose-500/10',
        border: 'border-rose-500/30',
        text: 'text-rose-400',
        shadow: 'shadow-[0_0_15px_rgba(244,63,94,0.2)]',
        hover: 'hover:border-rose-500/60 hover:shadow-[0_0_25px_rgba(244,63,94,0.3)]',
        pulse: 'bg-rose-400',
      },
      slate: {
        bg: 'bg-slate-500/5',
        border: 'border-[#1e2d4a]',
        text: 'text-slate-400',
        shadow: 'shadow-none',
        hover: 'hover:border-slate-500/40',
        pulse: 'bg-slate-500',
      }
    };
    return classes[color as keyof typeof classes] || classes.slate;
  };

  return (
    <div className="min-h-screen w-full bg-[#050811] text-slate-300 font-sans relative overflow-x-hidden p-6 flex flex-col gap-6">
      
      {/* Immersive Deep Space & Grid Background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjMTUyMDM2IiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIG9wYWNpdHk9IjAuMiI+PHBhdGggZD0iTTAgNjBoNjBNNjAgMGYtNjAgNjAiLz48L2c+PC9zdmc+')] pointer-events-none z-0"></div>
      
      {/* Ambient Orbs */}
      <div className="fixed top-[10%] right-[10%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none animate-pulse z-0" style={{ animationDuration: '10s' }} />
      <div className="fixed bottom-[10%] left-[10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse z-0" style={{ animationDuration: '14s' }} />

      {/* Header Console */}
      <div className="bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] p-6 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)] relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
        <div className="relative z-10 flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-[#050811] border border-cyan-500/30 flex items-center justify-center shadow-[inset_0_0_20px_rgba(6,182,212,0.1)] relative">
            <div className="absolute inset-0 bg-cyan-400/20 rounded-xl animate-ping opacity-30"></div>
            <Server className="text-cyan-400 w-8 h-8" />
          </div>
          <div>
            <h2 className="text-[10px] font-mono tracking-[0.3em] text-cyan-400 uppercase font-bold mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span> Multi-Agent Matrix
            </h2>
            <h1 className="text-2xl font-bold font-display text-white tracking-wide drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Agent Node Command</h1>
            <p className="text-xs text-slate-400 font-mono mt-1 uppercase tracking-widest flex items-center gap-2">
               Swarm Status <ChevronLeft size={10} className="rotate-180"/> 4 Nodes Active
            </p>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-3 z-10">
          <button onClick={onBack} className="px-5 py-2.5 bg-[#050811] border border-[#1e2d4a] hover:border-cyan-500/50 text-slate-400 hover:text-cyan-400 rounded-xl transition-all duration-300 shadow-lg flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest group/btn">
            <ChevronLeft size={14} className="group-hover/btn:-translate-x-1 transition-transform" />
            Sever Link
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Agent Node Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => {
            const Icon = agent.icon;
            const style = getColorClasses(agent.color);
            const isActive = agent.status === 'Active' || agent.status === 'Thinking';
            
            return (
              <div key={agent.id} className={`bg-[#090d1a]/80 backdrop-blur-md border rounded-2xl p-6 relative group overflow-hidden transition-all duration-500 ${style.border} ${style.hover}`}>
                {/* Cyberpunk Server node effect */}
                <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-white/5 to-transparent pointer-events-none -translate-x-full group-hover:translate-x-[500%] transition-transform duration-1000 ease-in-out"></div>
                
                {/* Node Status Indicator Line */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 rounded-r-full bg-[#1e2d4a]">
                  <div className={`w-full rounded-r-full transition-all duration-500 ${isActive ? style.bg : 'bg-transparent h-0'} ${isActive ? 'h-full' : ''}`} style={{ boxShadow: isActive ? `0 0 10px ${style.pulse}` : 'none' }}></div>
                </div>
                
                <div className="flex justify-between items-start mb-6 pl-2">
                  <div className={`p-3 rounded-xl bg-[#050811] border ${style.border} ${style.text} ${style.shadow} relative`}>
                    {isActive && <div className="absolute inset-0 bg-white/10 rounded-xl animate-pulse"></div>}
                    <Icon size={24} className="relative z-10" />
                  </div>
                  
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-[9px] uppercase tracking-widest font-bold ${
                    agent.status === 'Active' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
                    agent.status === 'Thinking' ? 'bg-purple-500/10 border-purple-500/30 text-purple-400 animate-pulse' :
                    'bg-[#050811] border-[#1e2d4a] text-slate-500'
                  }`}>
                    {agent.status === 'Thinking' ? <Clock size={12} className="animate-[spin_3s_linear_infinite]" /> : 
                     agent.status === 'Active' ? <Activity size={12} className="animate-pulse" /> :
                     <div className="w-1.5 h-1.5 rounded-full bg-slate-500"></div>}
                    {agent.status}
                  </div>
                </div>

                <div className="pl-2">
                  <h3 className="text-xl font-bold font-display text-white mb-6 group-hover:text-cyan-400 transition-colors drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">{agent.name}</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#050811] rounded-xl p-3 border border-[#1e2d4a] relative overflow-hidden group/stat">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover/stat:opacity-100 transition-opacity"></div>
                      <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-1">Processed Tasks</p>
                      <p className={`text-xl font-bold font-display ${isActive ? style.text : 'text-slate-400'}`}>{agent.tasks}</p>
                    </div>
                    
                    <div className="bg-[#050811] rounded-xl p-3 border border-[#1e2d4a] relative overflow-hidden group/stat">
                      <div className="absolute inset-0 bg-gradient-to-bl from-white/5 to-transparent opacity-0 group-hover/stat:opacity-100 transition-opacity"></div>
                      <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-1">System Uptime</p>
                      <p className="text-xl font-bold font-display text-slate-300">{agent.uptime}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
