import React, { useState, useEffect } from "react";
import { Sliders, Activity, Globe, Compass, ArrowUpRight, Award, Layers } from "lucide-react";
import { StreamDataPoint } from "../types";

export function DataStreams() {
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
    { name: "Somatic AI Sphere", rate: 94, cits: "1.4k mapped", color: "#06b6d4" },
    { name: "Quantum Biology Relay", rate: 82, cits: "912 papers", color: "#10b981" },
    { name: "Neuromorphic Gate Array", rate: 56, cits: "420 journals", color: "#a855f7" }
  ];

  const keywords = [
    { word: "Neural Osmosis", weight: 9.8, type: "quantum" },
    { word: "Ternary Quantum Gates", weight: 8.4, type: "hardware" },
    { word: "Decoherence Preservation", weight: 7.9, type: "bio" },
    { word: "Somatic Synapse", weight: 9.2, type: "bio" },
    { word: "Thermal Dissipation loops", weight: 6.8, type: "hardware" },
    { word: "Holographic outlines", weight: 8.8, type: "quantum" },
    { word: "Linear dendritic summation", weight: 7.2, type: "hardware" }
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
    <div id="data-streams-screen" className="space-y-6">
      {/* 1. Sub-Header */}
      <div className="bg-[#0b0f19]/80 border border-[#1a2536] p-4 rounded-xl shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-[#00ffcc] font-mono">INTELLIGENCE DATA STREAMS</h2>
          <div className="flex items-center space-x-2 mt-1">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs text-slate-400 font-mono text-white">AI ARCHITECT ACTIVE | SYNCING 1,402 DATA NODES...</span>
          </div>
        </div>

        {/* Global speed indicator */}
        <div className="flex items-center space-x-2 font-mono text-xs bg-[#0c121e] border border-[#182334] p-2 rounded-lg">
          <span className="text-slate-500">CITATION FLUX VELOCITY:</span>
          <span className="text-cyan-400 font-bold">{fluxVelocity} cits/second</span>
        </div>
      </div>

      {/* 2. Main Row: Citation charts & Growth spheres */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="streams-top-row">
        {/* Real-time Bar chart (Citation velocity) */}
        <div id="citation-bar-chart" className="lg:col-span-8 bg-[#0b0f19]/80 border border-[#1a2536] rounded-xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-1">Citation Flux Velocity</h3>
            <span className="text-[10px] text-slate-400 font-mono block mb-4">Historical scientific dissemination spike index</span>

            {/* Render custom SVG bar chart */}
            <div className="relative h-[180px] w-full flex items-end justify-between px-4 pb-2 pt-6">
              {/* Backgrid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-5">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-full border-b border-white"></div>
                ))}
              </div>

              {citationFluxHistory.map((item, idx) => {
                const heightPercent = `${(item.value / 180) * 100}%`;
                return (
                  <div key={idx} className="flex flex-col items-center flex-1 mx-2 group relative">
                    {/* Hover Tooltip tooltip */}
                    <div className="absolute bottom-full mb-1 bg-[#101929] border border-cyan-500/30 text-[9px] text-cyan-300 font-mono py-1 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointers-none">
                      {item.value} refs
                    </div>
                    {/* Pulsing bar */}
                    <div 
                      className="w-full bg-gradient-to-t from-cyan-600 to-[#10b981] rounded-t-sm transition-all duration-500 group-hover:from-cyan-400 group-hover:to-teal-400 cursor-pointer min-h-[4px]"
                      style={{ height: heightPercent }}
                    ></div>
                    <span className="text-[9px] text-slate-500 font-mono mt-1.5">{item.interval}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-[10px] font-mono text-slate-500 border-t border-[#17253b] pt-2 flex justify-between">
            <span>STREAMS SAMPLING FREQUENCY: 1 Hz</span>
            <span className="text-emerald-400">INTERVAL STABLE</span>
          </div>
        </div>

        {/* Sphere indicators */}
        <div id="growth-spheres-panel" className="lg:col-span-4 bg-[#0b0f19]/80 border border-[#1a2536] rounded-xl p-5 shadow-lg flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-[10px] uppercase font-mono text-cyan-400 font-semibold block">Emerging Research Clusters</span>
            
            <div className="space-y-3" id="spheres-progress-list">
              {clusters.map((cluster) => (
                <div key={cluster.name} className="p-3 bg-[#070b13] border border-[#17243c] rounded-lg">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-white font-medium">{cluster.name}</span>
                    <span className="text-slate-400 font-mono">{cluster.rate}%</span>
                  </div>
                  <div className="w-full bg-[#111827] h-1.5 rounded-full overflow-hidden border border-[#1b263a]">
                    <div className="h-full" style={{ width: `${cluster.rate}%`, backgroundColor: cluster.color }}></div>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono mt-1">
                    <span>Cluster Sync Status: MAPPED</span>
                    <span className="text-slate-400">{cluster.cits}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Row: Semantic Tag Slider & Dynamic Trajectory */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="streams-bottom-row">
        {/* Semantic tags cloud filter density */}
        <div id="semantic-cloud-panel" className="lg:col-span-6 bg-[#0b0f19]/80 border border-[#1a2536] rounded-xl p-5 shadow-lg flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] uppercase font-mono text-cyan-400 font-bold">Semantic Cloud Vector Density</span>
              <Sliders className="h-4 w-4 text-cyan-400" />
            </div>

            {/* Sliders controls */}
            <div className="bg-[#070b13] p-3 rounded-lg border border-[#17253b] space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-mono">DENSITY PREFERENCE THRESHOLD</span>
                <span className="text-cyan-400 font-mono font-bold">{semanticDensity.toFixed(1)}%</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="100" 
                step="0.5"
                value={semanticDensity}
                onChange={e => setSemanticDensity(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 bg-slate-900 border border-slate-800"
              />
            </div>

            {/* Keyword tags rendering sizing proportional to density */}
            <div className="flex flex-wrap gap-2 pt-2" id="semantic-tags-container">
              {keywords.map((kw) => {
                const scaledSize = Math.max(10, Math.min((kw.weight / 10) * semanticDensity * 0.16, 24));
                return (
                  <span 
                    key={kw.word}
                    className={`px-2 py-1 rounded-md font-mono border transition-all hover:border-cyan-400/50 hover:text-white cursor-pointer ${
                      kw.type === "quantum" ? "bg-cyan-950/20 text-cyan-300 border-cyan-500/20" :
                      kw.type === "hardware" ? "bg-purple-950/20 text-purple-300 border-purple-500/20" :
                      "bg-emerald-950/20 text-emerald-300 border-emerald-500/20"
                    }`}
                    style={{ fontSize: `${scaledSize}px` }}
                  >
                    {kw.word}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Global distribution world map indicator overlay */}
        <div id="distribution-map-panel" className="lg:col-span-6 bg-[#0b0f19]/80 border border-[#1a2536] rounded-xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4">Global Research Sync Distribution</h3>

            {/* Vector World map representation */}
            <div className="bg-[#050812] border border-[#142034] rounded-lg p-2 relative min-h-[160px] flex items-center justify-center">
              <svg viewBox="0 0 460 160" className="w-full h-auto opacity-70">
                {/* Simplified vector outline drawing continents */}
                <path d="M 30,50 Q 80,42 90,80 T 110,130 C 120,150 140,110 150,110 T 170,80 Z" fill="#0f1a2e" stroke="#1d2e49" strokeWidth="0.5" />
                <path d="M 180,60 Q 230,20 280,40 T 320,110 C 270,120 270,140 230,130 Z" fill="#0f1a2e" stroke="#1d2e49" strokeWidth="0.5" />
                <path d="M 340,70 Q 380,50 410,70 T 420,110 Q 390,140 370,120 Z" fill="#0f1a2e" stroke="#1d2e49" strokeWidth="0.5" />

                {/* Nodes positioning */}
                {globalLocations.map((loc) => (
                  <g 
                    key={loc.id} 
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredNode(loc.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    <circle cx={loc.x} cy={loc.y} r={loc.r} fill="rgba(6, 182, 212, 0.25)" className="animate-pulse" />
                    <circle cx={loc.x} cy={loc.y} r="4" fill="#00ffcc" />
                  </g>
                ))}
              </svg>

              {/* Float popover details */}
              {hoveredNode && (
                <div className="absolute top-2 right-2 bg-slate-900/90 border border-cyan-400/40 p-2 rounded text-[10px] font-mono text-cyan-300">
                  {globalLocations.find(l => l.id === hoveredNode)?.name}
                  <div className="text-white mt-0.5">Sync Efficiency: {globalLocations.find(l => l.id === hoveredNode)?.progress}%</div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-3 font-mono text-[9px] pt-1 border-t border-[#1a2536]">
            {globalLocations.map((loc) => (
              <div key={loc.id} className="text-center bg-[#070b13] p-1.5 rounded border border-[#162235]">
                <span className="text-slate-500 block uppercase">{loc.id.toUpperCase()} HUB</span>
                <span className="text-white font-bold block">{loc.progress}% SYNCED</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
