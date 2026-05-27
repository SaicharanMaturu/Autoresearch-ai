import React, { useState } from "react";
import { BrainCircuit, Shield, Trash2, CheckCircle2, History, ChevronLeft, Fingerprint, Network, Activity } from "lucide-react";
import { TimelineEvent } from "../types";

export function MemoryChamber({ onBack }: { onBack?: () => void }) {
  const [personalizationIndex, setPersonalizationIndex] = useState(94.8);
  const [activeMemoryItems, setActiveMemoryItems] = useState<TimelineEvent[]>([
    { id: "mem-1", title: "Remembered Preference: Spatial Diagrams", description: "Configured neural outlines to favor Asymmetric slide orientations and compact slate backgrounds automatically.", date: "2 Hours Ago", indexPercent: 96.1, category: "preference" },
    { id: "mem-2", title: "Previous Research Session: Wetware Photosynthesis", description: "Completed a 45-minute scanning matrix detailing structural biology and quantum coherence decay inside chloroplast membranes.", date: "1 Day Ago", indexPercent: 94.0, category: "session" },
    { id: "mem-3", title: "Learned Behavior: Dense Semantic Tag Sliding", description: "Noticed manual adjustment spikes in cloud vector densities between 80% and 85%. Recalibrating automatic threshold defaults.", date: "3 Days Ago", indexPercent: 95.4, category: "behavior" },
    { id: "mem-4", title: "Projected Insight: Non-Euclidean Gate Arrays", description: "AI-forward recommendation vector suggests pre-registering patent blueprints with Zurich biolab databases regarding ternary Logic gates.", date: "6 Days Ago", indexPercent: 93.7, category: "insight" }
  ]);

  const [selectedMemoryId, setSelectedMemoryId] = useState<string>("mem-1");

  const selectedMemory = activeMemoryItems.find(m => m.id === selectedMemoryId) || activeMemoryItems[0];

  const handlePurgeMemory = (id: string) => {
    if (confirm("Are you absolutely sure you want to purge this sensory memory vector from Aethelgard's semantic timeline?")) {
      setActiveMemoryItems(prev => prev.filter(m => m.id !== id));
      setPersonalizationIndex(prev => parseFloat((prev - 1.2).toFixed(1)));
    }
  };

  return (
    <div id="memory-chamber-screen" className="min-h-screen w-full bg-[#050811] text-slate-300 font-sans relative overflow-x-hidden p-6 flex flex-col gap-6">
      
      {/* Immersive Background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjMTUyMDM2IiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIG9wYWNpdHk9IjAuMiI+PHBhdGggZD0iTTAgNjBoNjBNNjAgMGYtNjAgNjAiLz48L2c+PC9zdmc+')] pointer-events-none z-0"></div>
      
      {/* Ambient Orbs */}
      <div className="fixed top-[-10%] left-[20%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse z-0" style={{ animationDuration: '9s' }} />
      <div className="fixed bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse z-0" style={{ animationDuration: '13s' }} />

      {/* Header Console */}
      <div className="bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] p-6 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)] relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
        <div className="relative z-10 flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-[#050811] border border-purple-500/30 flex items-center justify-center shadow-[inset_0_0_20px_rgba(168,85,247,0.1)] relative">
            <div className="absolute inset-0 bg-purple-400/20 rounded-xl animate-ping opacity-30"></div>
            <BrainCircuit className="text-purple-400 w-8 h-8" />
          </div>
          <div>
            <h2 className="text-[10px] font-mono tracking-[0.3em] text-purple-400 uppercase font-bold mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span> Memory Chamber
            </h2>
            <h1 className="text-2xl font-bold font-display text-white tracking-wide drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Neural Timeline Archive</h1>
            <p className="text-xs text-slate-400 font-mono mt-1 uppercase tracking-widest flex items-center gap-2">
               Cognitive Indexing Active <ChevronLeft size={10} className="rotate-180"/> Syncing Enablers
            </p>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-3 z-10">
          {onBack && (
            <button onClick={onBack} className="px-5 py-2.5 bg-[#050811] border border-[#1e2d4a] hover:border-purple-500/50 text-slate-400 hover:text-purple-400 rounded-xl transition-all duration-300 shadow-lg flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest group/btn">
              <ChevronLeft size={14} className="group-hover/btn:-translate-x-1 transition-transform" />
              Return
            </button>
          )}
        </div>
      </div>

      {/* KPI Header Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">
        
        {/* Personalization Index */}
        <div className="md:col-span-8 bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] p-6 rounded-2xl shadow-xl relative overflow-hidden group">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-cyan-400/10 to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="relative z-10">
            <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-bold flex items-center gap-2 mb-2">
              <Fingerprint size={14} /> Personalization Calibration
            </span>
            <div className="flex items-end gap-3 mb-2">
              <h1 className="text-3xl font-bold font-display text-white">Cognitive Alignment</h1>
              <span className="text-3xl font-display font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)] leading-none">{personalizationIndex}%</span>
            </div>
            <p className="text-sm text-slate-400 mt-2 max-w-xl font-sans">
              Analyzes operator interaction trajectories, semantic outlines, and active heuristic inquiries. Stabilizing at optimal system parameter tolerances.
            </p>
            
            <div className="flex space-x-3 mt-6">
              <span className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-3 py-1.5 rounded-lg uppercase tracking-widest font-mono text-[9px] font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></span> Alignment: Excellent
              </span>
              <span className="bg-[#050811] border border-[#1e2d4a] text-slate-400 px-3 py-1.5 rounded-lg uppercase tracking-widest font-mono text-[9px] flex items-center gap-1.5">
                <Activity size={10} /> Calibrator: Online
              </span>
            </div>
          </div>
        </div>

        {/* Learning Status circular meter */}
        <div className="md:col-span-4 bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] p-6 rounded-2xl shadow-xl relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-24 h-24 bg-purple-500/10 rounded-bl-full pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col h-full justify-between">
            <span className="text-[10px] uppercase tracking-widest font-mono text-purple-400 font-bold block mb-4 flex items-center gap-2">
              <Network size={14} /> Sensory Learning Status
            </span>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 bg-[#050811] border border-purple-500/30 rounded-xl flex items-center justify-center shadow-[inset_0_0_15px_rgba(168,85,247,0.2)]">
                  <BrainCircuit className="h-8 w-8 text-purple-400" />
                </div>
                <div className="absolute inset-0 border-2 border-purple-400/50 rounded-xl border-dashed animate-[spin_10s_linear_infinite]"></div>
              </div>
              
              <div className="flex flex-col">
                <span className="text-[9px] text-slate-500 font-mono uppercase tracking-widest mb-1">Active Synapse File</span>
                <span className="text-xl font-bold font-display text-white tracking-wide">4.2 TB <span className="text-xs text-purple-400 font-mono font-normal">SYNCED</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Memory Helix Interactive Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        
        {/* Timeline representation (DNA Helix outline layout) */}
        <div className="lg:col-span-8 bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] rounded-2xl p-6 shadow-xl min-h-[480px] flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-[40px] pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-8 border-b border-[#1e2d4a] pb-4">
              <div>
                <h3 className="text-sm font-mono font-bold text-white uppercase tracking-widest flex items-center gap-2">
                  <History size={16} className="text-cyan-400" /> The Memory Helix Timeline
                </h3>
                <span className="text-[10px] text-slate-400 font-mono mt-1 block uppercase tracking-widest">Sensorial preferences chronologically vector indexed</span>
              </div>
              <div className="flex items-center gap-2 bg-[#050811] border border-[#1e2d4a] px-3 py-1.5 rounded-lg text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                <span>Indexed Count: <span className="text-cyan-400">{activeMemoryItems.length}</span></span>
              </div>
            </div>

            {/* Custom vector DNA helix vertical timeline component */}
            <div className="relative pl-6 sm:pl-12 space-y-4">
              {/* Helix vertical core backbone loop */}
              <div className="absolute left-[31px] sm:left-[55px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-cyan-400/50 via-purple-500/50 to-transparent pointer-events-none shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                {/* Animated traveling light on the backbone */}
                <div className="absolute top-0 left-0 w-full h-[40px] bg-gradient-to-b from-transparent via-cyan-400 to-transparent animate-[slide_3s_linear_infinite]"></div>
              </div>

              {activeMemoryItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 font-mono text-slate-500 space-y-4">
                  <div className="w-16 h-16 rounded-full border border-slate-700 flex items-center justify-center bg-[#050811]">
                    <Trash2 className="h-6 w-6 text-slate-600" />
                  </div>
                  <span className="uppercase tracking-widest text-xs">All memory vectors purged. Operating on flat defaults.</span>
                </div>
              ) : (
                activeMemoryItems.map((item, idx) => {
                  const isCurSelected = item.id === selectedMemoryId;
                  
                  // Category specific indicators colors
                  let pointerColor = "bg-cyan-400";
                  let shadowColor = "rgba(6,182,212,0.5)";
                  let bgHover = "hover:border-cyan-500/50";
                  let bgSelected = "bg-cyan-500/10 border-cyan-500/50";
                  
                  if (item.category === "session") { pointerColor = "bg-purple-400"; shadowColor = "rgba(168,85,247,0.5)"; bgHover = "hover:border-purple-500/50"; bgSelected = "bg-purple-500/10 border-purple-500/50"; }
                  if (item.category === "behavior") { pointerColor = "bg-amber-400"; shadowColor = "rgba(245,158,11,0.5)"; bgHover = "hover:border-amber-500/50"; bgSelected = "bg-amber-500/10 border-amber-500/50"; }
                  if (item.category === "insight") { pointerColor = "bg-emerald-400"; shadowColor = "rgba(16,185,129,0.5)"; bgHover = "hover:border-emerald-500/50"; bgSelected = "bg-emerald-500/10 border-emerald-500/50"; }

                  return (
                    <div 
                      key={item.id}
                      onClick={() => setSelectedMemoryId(item.id)}
                      className={`relative flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-300 group ${
                        isCurSelected ? `${bgSelected} shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]` : `bg-[#050811] border-[#1e2d4a] ${bgHover}`
                      }`}
                    >
                      {/* Timeline dot circle anchor */}
                      <div className="absolute left-[-22px] sm:left-[-35px] top-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
                        <div 
                          className={`h-4 w-4 rounded-full border-[3px] border-[#090d1a] ${pointerColor} transition-all duration-300 ${isCurSelected ? "scale-125" : "scale-100 group-hover:scale-110"}`}
                          style={{ boxShadow: isCurSelected ? `0 0 15px ${shadowColor}` : 'none' }}
                        >
                          {isCurSelected && <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-50"></div>}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0 pr-6">
                        <span className="text-[9px] font-mono text-slate-500 font-bold uppercase tracking-widest block mb-1">{item.date}</span>
                        <h4 className={`text-sm font-sans font-bold transition-colors ${isCurSelected ? "text-white" : "text-slate-300 group-hover:text-white"}`}>{item.title}</h4>
                        <p className="text-[11px] text-slate-400 truncate mt-1 font-sans opacity-80">{item.description}</p>
                      </div>

                      <div className="flex flex-col items-end shrink-0 pl-4 border-l border-[#1e2d4a]">
                        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-1">Index Match</span>
                        <span className="text-sm font-mono font-bold text-white">{item.indexPercent}%</span>
                      </div>
                      
                      {/* Interactive scanning line on selected */}
                      {isCurSelected && (
                        <div className="absolute left-0 bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
          
          <div className="text-[9px] font-mono text-slate-600 pt-4 border-t border-[#1e2d4a] mt-8 uppercase tracking-widest relative z-10 flex items-center gap-2">
            <Shield size={12} /> Aethelgard Protocol: Cognitive database updates at 30-sec epochs.
          </div>
        </div>

        {/* Sidebar Diagnostics Details vector inspect */}
        <div className="lg:col-span-4 bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] rounded-2xl p-6 shadow-xl flex flex-col justify-between relative overflow-hidden">
          
          {selectedMemory ? (
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="space-y-6">
                <span className="text-xs uppercase tracking-widest font-mono text-purple-400 font-bold flex items-center gap-2 border-b border-[#1e2d4a] pb-4">
                  <Activity size={16} /> Sensory Vector Analysis
                </span>
                
                <div className="bg-[#050811] p-5 rounded-xl border border-[#1e2d4a] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/10 rounded-bl-full pointer-events-none"></div>
                  
                  <h4 className="text-sm font-sans font-bold text-white leading-relaxed mb-3">{selectedMemory.title}</h4>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-purple-500/10 text-purple-400 border border-purple-500/30 px-2 py-1 rounded text-[9px] font-mono uppercase tracking-widest font-bold">
                      Class: {selectedMemory.category}
                    </span>
                    <span className="bg-[#1e2d4a]/30 text-slate-400 border border-[#1e2d4a] px-2 py-1 rounded text-[9px] font-mono uppercase tracking-widest">
                      Logged: {selectedMemory.date}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">Neural Trajectory Description</span>
                  <p className="text-sm text-slate-300 leading-relaxed font-sans bg-[#050811]/50 p-4 rounded-xl border border-[#1e2d4a]/50">
                    {selectedMemory.description}
                  </p>
                </div>

                <div className="flex items-center justify-between p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Accuracy Status</span>
                  <span className="text-emerald-400 flex items-center gap-1.5 text-xs font-mono font-bold">
                    <CheckCircle2 className="h-4 w-4" />
                    99.8% STABILIZED
                  </span>
                </div>
              </div>
              
              <button 
                onClick={() => handlePurgeMemory(selectedMemory.id)}
                className="w-full mt-8 py-3 bg-[#050811] hover:bg-rose-500/10 text-rose-400 border border-[#1e2d4a] hover:border-rose-500/50 rounded-xl text-xs font-mono font-bold uppercase tracking-widest flex items-center justify-center space-x-2 transition-all duration-300 group"
              >
                <Trash2 className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>Purge Vector Record</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-50 relative z-10">
              <Activity size={32} className="text-slate-600" />
              <span className="font-mono text-xs text-slate-500 uppercase tracking-widest">Awaiting Vector Selection</span>
            </div>
          )}
          
          {/* Subtle background element for sidebar */}
          <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-purple-500/5 to-transparent pointer-events-none"></div>
        </div>
      </div>

      <style>{`
        @keyframes slide {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(800px); }
        }
      `}</style>
    </div>
  );
}

