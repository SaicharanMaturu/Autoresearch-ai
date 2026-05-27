import React, { useState, useEffect } from "react";
import { Sliders, Activity, Globe, Compass, ArrowUpRight, Award, Layers, Zap, ChevronLeft, Target, Cpu, Wifi } from "lucide-react";
import { StreamDataPoint } from "../types";

export function DataStreams({ onBack }: { onBack?: () => void }) {
  const [semanticDensity, setSemanticDensity] = useState<number>(84.2);
  const [fluxVelocity, setFluxVelocity] = useState<number>(5.42);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Dynamic values multiplier
  useEffect(() => {
    const streamTimer = setInterval(() => {
      setFluxVelocity(prev => {
        const delta = (Math.random() - 0.5) * 0.4;
        return parseFloat(Math.max(3.2, Math.min(prev + delta, 7.8)).toFixed(2));
      });
    }, 2500);
    return () => clearInterval(streamTimer);
  }, []);

  const clusters = [
    { name: "Somatic AI Sphere", rate: 94, cits: "1.4k mapped", color: "#00ffcc" }, // cyan
    { name: "Quantum Biology Relay", rate: 82, cits: "912 papers", color: "#a855f7" }, // purple
    { name: "Neuromorphic Gate Array", rate: 56, cits: "420 journals", color: "#10b981" } // emerald
  ];

  const keywords = [
    { word: "Neural Osmosis", weight: 9.8, type: "quantum" },
    { word: "Ternary Quantum Gates", weight: 8.4, type: "hardware" },
    { word: "Decoherence Preservation", weight: 7.9, type: "bio" },
    { word: "Somatic Synapse", weight: 9.2, type: "bio" },
    { word: "Thermal Dissipation loops", weight: 6.8, type: "hardware" },
    { word: "Holographic outlines", weight: 8.8, type: "quantum" },
    { word: "Linear dendritic summation", weight: 7.2, type: "hardware" },
    { word: "Bio-Relays", weight: 5.5, type: "bio" }
  ];

  const citationFluxHistory = [
    { interval: "08:00", value: 45 },
    { interval: "09:00", value: 68 },
    { interval: "10:00", value: 89 },
    { interval: "11:00", value: 120 },
    { interval: "12:00", value: 104 },
    { interval: "13:00", value: 142 },
    { interval: "14:00", value: 168 }
  ];

  // Global nodes
  const globalLocations = [
    { id: "sv", r: 12, name: "Silicon Valley (Node 01)", x: 80, y: 70, progress: 98.4 },
    { id: "zur", r: 10, name: "Zurich BioLabs (Node 02)", x: 230, y: 65, progress: 94.2 },
    { id: "tky", r: 9, name: "Tokyo Neuromorphics (Node 03)", x: 390, y: 80, progress: 89.1 }
  ];

  return (
    <div id="data-streams-screen" className="min-h-screen w-full bg-[#050811] text-slate-300 font-sans relative overflow-x-hidden p-6 flex flex-col gap-6">
      
      {/* Immersive Background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjMTUyMDM2IiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIG9wYWNpdHk9IjAuMiI+PHBhdGggZD0iTTAgNjBoNjBNNjAgMGYtNjAgNjAiLz48L2c+PC9zdmc+')] pointer-events-none z-0"></div>
      
      {/* Ambient Orbs */}
      <div className="fixed top-[20%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse z-0" style={{ animationDuration: '8s' }} />
      <div className="fixed bottom-[10%] right-[10%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse z-0" style={{ animationDuration: '12s' }} />

      {/* Header Console */}
      <div className="bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] p-6 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)] relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
        <div className="relative z-10 flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-[#050811] border border-emerald-500/30 flex items-center justify-center shadow-[inset_0_0_20px_rgba(16,185,129,0.1)] relative">
            <div className="absolute inset-0 bg-emerald-400/20 rounded-xl animate-ping opacity-30"></div>
            <Wifi className="text-emerald-400 w-8 h-8" />
          </div>
          <div>
            <h2 className="text-[10px] font-mono tracking-[0.3em] text-emerald-400 uppercase font-bold mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Intelligence Data Streams
            </h2>
            <h1 className="text-2xl font-bold font-display text-white tracking-wide drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Global Research Synchronization</h1>
            <p className="text-xs text-slate-400 font-mono mt-1 uppercase tracking-widest flex items-center gap-2">
               AI Architect Active <ChevronLeft size={10} className="rotate-180"/> Syncing 1,402 Nodes
            </p>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-3 z-10">
          {onBack && (
            <button onClick={onBack} className="px-5 py-2.5 bg-[#050811] border border-[#1e2d4a] hover:border-emerald-500/50 text-slate-400 hover:text-emerald-400 rounded-xl transition-all duration-300 shadow-lg flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest group/btn">
              <ChevronLeft size={14} className="group-hover/btn:-translate-x-1 transition-transform" />
              Return
            </button>
          )}
          {/* Global speed indicator */}
          <div className="flex items-center space-x-3 bg-[#050811] border border-[#1e2d4a] px-4 py-2 rounded-xl shadow-[inset_0_0_15px_rgba(0,0,0,0.5)]">
            <Activity className="text-cyan-400 w-4 h-4 animate-pulse" />
            <div className="flex flex-col">
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest leading-none mb-1">Flux Velocity</span>
              <span className="text-sm text-cyan-400 font-bold font-mono leading-none">{fluxVelocity} <span className="text-[10px] text-slate-400">cits/s</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Row: Citation charts & Growth spheres */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        
        {/* Real-time Bar chart (Citation velocity) */}
        <div className="lg:col-span-8 bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] rounded-2xl p-6 shadow-xl flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-[50px] pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6 border-b border-[#1e2d4a] pb-4">
              <div>
                <h3 className="text-sm font-mono font-bold text-white uppercase tracking-widest flex items-center gap-2">
                  <Activity size={16} className="text-cyan-400" /> Citation Flux Velocity
                </h3>
                <span className="text-[10px] text-slate-400 font-mono mt-1 block uppercase tracking-widest">Historical scientific dissemination spike index</span>
              </div>
              <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-lg text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                Interval Stable
              </div>
            </div>

            {/* Custom SVG bar chart */}
            <div className="relative h-[220px] w-full flex items-end justify-between px-4 pb-2 pt-6">
              {/* Backgrid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-full border-b border-[#1e2d4a] border-dashed"></div>
                ))}
              </div>

              {citationFluxHistory.map((item, idx) => {
                const heightPercent = `${(item.value / 180) * 100}%`;
                return (
                  <div key={idx} className="flex flex-col items-center flex-1 mx-2 group/bar relative">
                    {/* Hover Tooltip tooltip */}
                    <div className="absolute bottom-full mb-3 bg-[#050811] border border-cyan-500/50 text-[10px] text-cyan-300 font-mono py-1.5 px-2.5 rounded-lg opacity-0 group-hover/bar:opacity-100 group-hover/bar:-translate-y-2 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] whitespace-nowrap z-20 pointer-events-none font-bold">
                      {item.value} Refs
                    </div>
                    {/* Pulsing bar */}
                    <div className="relative w-full h-full flex items-end justify-center">
                      {/* Glow effect behind bar */}
                      <div 
                        className="absolute bottom-0 w-full bg-cyan-400/20 blur-md transition-all duration-500 opacity-0 group-hover/bar:opacity-100"
                        style={{ height: heightPercent }}
                      ></div>
                      
                      <div 
                        className="relative w-full max-w-[40px] bg-gradient-to-t from-cyan-900 via-cyan-500 to-emerald-400 rounded-t-md transition-all duration-500 group-hover/bar:brightness-125 cursor-pointer min-h-[4px] shadow-[inset_0_0_10px_rgba(255,255,255,0.2)]"
                        style={{ height: heightPercent }}
                      >
                        {/* Scanning line inside bar */}
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-white opacity-50 shadow-[0_0_5px_#fff]"></div>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono mt-3 uppercase tracking-widest">{item.interval}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-[9px] font-mono text-slate-600 border-t border-[#1e2d4a] pt-3 mt-4 flex justify-between uppercase tracking-widest">
            <span>Sampling Frequency: 1 Hz</span>
            <span>Aethelgard Telemetry</span>
          </div>
        </div>

        {/* Sphere indicators */}
        <div className="lg:col-span-4 bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] rounded-2xl p-6 shadow-xl flex flex-col justify-between relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[40px] pointer-events-none"></div>
           
           <div className="relative z-10 space-y-6">
            <span className="text-xs uppercase tracking-widest font-mono text-purple-400 font-bold block flex items-center gap-2 border-b border-[#1e2d4a] pb-4">
              <Target size={16} /> Emerging Research Clusters
            </span>
            
            <div className="space-y-4">
              {clusters.map((cluster, idx) => (
                <div key={cluster.name} className="p-4 bg-[#050811] border border-[#1e2d4a] rounded-xl relative overflow-hidden group/item hover:border-purple-500/30 transition-colors">
                  {/* Subtle background glow based on cluster color */}
                  <div className="absolute inset-0 opacity-0 group-hover/item:opacity-10 transition-opacity duration-300" style={{ backgroundColor: cluster.color }}></div>
                  
                  <div className="flex justify-between items-end mb-3 relative z-10">
                    <span className="text-sm text-slate-200 font-bold font-sans tracking-wide">{cluster.name}</span>
                    <span className="text-lg font-display font-bold" style={{ color: cluster.color }}>{cluster.rate}<span className="text-[10px] text-slate-500">%</span></span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-[#090d1a] h-2 rounded-full overflow-hidden border border-[#1e2d4a] mb-2 relative z-10 shadow-inner">
                    <div 
                      className="h-full relative overflow-hidden transition-all duration-1000 ease-out" 
                      style={{ width: `${cluster.rate}%`, backgroundColor: cluster.color, boxShadow: `0 0 10px ${cluster.color}` }}
                    >
                      {/* Animated shine on progress bar */}
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[slide_2s_infinite]"></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center text-[9px] text-slate-500 font-mono uppercase tracking-widest relative z-10">
                    <span className="flex items-center gap-1"><Cpu size={10} className="text-slate-400"/> Sync: Mapped</span>
                    <span className="text-slate-400 font-bold">{cluster.cits}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Semantic Tag Slider & Dynamic Trajectory */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        
        {/* Semantic tags cloud filter density */}
        <div className="lg:col-span-6 bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] rounded-2xl p-6 shadow-xl flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/5 rounded-full blur-[40px] pointer-events-none"></div>
          
          <div className="relative z-10 space-y-6">
            <div className="flex justify-between items-center border-b border-[#1e2d4a] pb-4">
              <span className="text-xs uppercase tracking-widest font-mono text-cyan-400 font-bold flex items-center gap-2">
                <Layers size={16} /> Semantic Cloud Density
              </span>
              <Sliders className="h-4 w-4 text-cyan-400 animate-pulse" />
            </div>

            {/* Cyberpunk Sliders controls */}
            <div className="bg-[#050811] p-5 rounded-xl border border-[#1e2d4a] relative overflow-hidden group/slider">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-purple-500"></div>
              
              <div className="flex justify-between items-end mb-4">
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">Density Threshold</span>
                <span className="text-2xl font-display font-bold text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)] leading-none">{semanticDensity.toFixed(1)}<span className="text-xs text-slate-500">%</span></span>
              </div>
              
              <div className="relative pt-2 pb-2">
                <input 
                  type="range" 
                  min="10" 
                  max="100" 
                  step="0.5"
                  value={semanticDensity}
                  onChange={e => setSemanticDensity(parseFloat(e.target.value))}
                  className="w-full h-1 bg-[#1e2d4a] rounded-lg appearance-none cursor-pointer relative z-10"
                  style={{
                    background: `linear-gradient(to right, #22d3ee 0%, #a855f7 ${semanticDensity}%, #1e2d4a ${semanticDensity}%, #1e2d4a 100%)`
                  }}
                />
                <style>{`
                  input[type=range]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: #fff;
                    border: 2px solid #22d3ee;
                    box-shadow: 0 0 10px rgba(34, 211, 238, 0.8);
                    cursor: pointer;
                    transition: all 0.15s ease;
                  }
                  input[type=range]::-webkit-slider-thumb:hover {
                    transform: scale(1.2);
                    box-shadow: 0 0 15px rgba(168, 85, 247, 0.8);
                    border-color: #a855f7;
                  }
                `}</style>
              </div>
            </div>

            {/* Keyword tags rendering sizing proportional to density */}
            <div className="flex flex-wrap gap-3 pt-2">
              {keywords.map((kw) => {
                const scaledSize = Math.max(10, Math.min((kw.weight / 10) * semanticDensity * 0.18, 28));
                const opacity = semanticDensity > (kw.weight * 5) ? 1 : 0.3;
                
                let colorClass = "";
                let glowColor = "";
                if (kw.type === "quantum") { colorClass = "text-cyan-400 border-cyan-500/30 bg-cyan-500/10 hover:border-cyan-400"; glowColor = "rgba(6,182,212,0.3)"; }
                else if (kw.type === "hardware") { colorClass = "text-purple-400 border-purple-500/30 bg-purple-500/10 hover:border-purple-400"; glowColor = "rgba(168,85,247,0.3)"; }
                else { colorClass = "text-emerald-400 border-emerald-500/30 bg-emerald-500/10 hover:border-emerald-400"; glowColor = "rgba(16,185,129,0.3)"; }

                return (
                  <span 
                    key={kw.word}
                    className={`px-3 py-1.5 rounded-lg font-mono border transition-all duration-300 cursor-pointer backdrop-blur-sm
                      ${colorClass} hover:text-white hover:-translate-y-0.5
                    `}
                    style={{ 
                      fontSize: `${scaledSize}px`,
                      opacity: opacity,
                      boxShadow: opacity > 0.5 ? `0 4px 12px ${glowColor}` : 'none'
                    }}
                  >
                    {kw.word}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Global distribution world map indicator overlay */}
        <div className="lg:col-span-6 bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] rounded-2xl p-6 shadow-xl flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[40px] pointer-events-none"></div>
          
          <div className="relative z-10">
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-[#1e2d4a] pb-4">
              <Globe size={16} className="text-emerald-400" /> Global Research Sync Distribution
            </h3>

            {/* Vector World map representation */}
            <div className="bg-[#050811] border border-[#1e2d4a] rounded-xl p-4 relative min-h-[220px] flex items-center justify-center overflow-hidden shadow-inner group/map">
              {/* Radar sweep background */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 border border-emerald-500/30 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent -translate-y-1/2 animate-[spin_6s_linear_infinite] origin-center"></div>
              </div>

              <svg viewBox="0 0 460 160" className="w-full h-auto opacity-70 relative z-10 filter drop-shadow-[0_0_8px_rgba(16,185,129,0.2)]">
                {/* Simplified vector outline drawing continents */}
                <path d="M 30,50 Q 80,42 90,80 T 110,130 C 120,150 140,110 150,110 T 170,80 Z" fill="#090d1a" stroke="#10b981" strokeWidth="0.8" opacity="0.6" />
                <path d="M 180,60 Q 230,20 280,40 T 320,110 C 270,120 270,140 230,130 Z" fill="#090d1a" stroke="#10b981" strokeWidth="0.8" opacity="0.6" />
                <path d="M 340,70 Q 380,50 410,70 T 420,110 Q 390,140 370,120 Z" fill="#090d1a" stroke="#10b981" strokeWidth="0.8" opacity="0.6" />

                {/* Nodes positioning */}
                {globalLocations.map((loc) => (
                  <g 
                    key={loc.id} 
                    className="cursor-pointer group/node"
                    onMouseEnter={() => setHoveredNode(loc.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    <circle cx={loc.x} cy={loc.y} r={loc.r * 1.5} fill="rgba(16, 185, 129, 0.1)" className="animate-ping group-hover/node:fill-[rgba(16,185,129,0.3)] transition-colors" />
                    <circle cx={loc.x} cy={loc.y} r={loc.r} fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="2 2" className="animate-[spin_4s_linear_infinite]" />
                    <circle cx={loc.x} cy={loc.y} r="3" fill="#10b981" filter="drop-shadow(0 0 4px #10b981)" />
                  </g>
                ))}
              </svg>

              {/* Float popover details */}
              {hoveredNode && (
                <div className="absolute top-4 right-4 bg-[#050811]/90 backdrop-blur-md border border-emerald-500/50 p-3 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] z-20 min-w-[140px] animate-[fadeIn_0.2s_ease-out]">
                  <div className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest mb-1 pb-1 border-b border-emerald-500/30">
                    {globalLocations.find(l => l.id === hoveredNode)?.name}
                  </div>
                  <div className="text-white mt-1.5 font-bold font-sans text-sm flex justify-between items-center">
                    <span>Sync</span>
                    <span className="text-emerald-400">{globalLocations.find(l => l.id === hoveredNode)?.progress}%</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-6 pt-4 border-t border-[#1e2d4a] relative z-10">
            {globalLocations.map((loc) => (
              <div key={loc.id} className="text-center bg-[#050811] p-3 rounded-xl border border-[#1e2d4a] hover:border-emerald-500/30 transition-colors group">
                <span className="text-slate-500 block uppercase font-mono text-[9px] tracking-widest mb-1 group-hover:text-emerald-400/70 transition-colors">{loc.id} HUB</span>
                <span className="text-white font-bold block font-display text-xs group-hover:text-emerald-400 transition-colors">{loc.progress}% <span className="text-[9px] text-slate-500 font-mono">SYNC</span></span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Global Animation Styles */}
      <style>{`
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

