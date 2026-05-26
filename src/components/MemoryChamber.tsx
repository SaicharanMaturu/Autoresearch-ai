import React, { useState } from "react";
import { BrainCircuit, Book, Shield, Trash2, CheckCircle2, History } from "lucide-react";
import { TimelineEvent } from "../types";

export function MemoryChamber() {
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
    <div id="memory-chamber-screen" className="space-y-6">
      {/* 1. Header with KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6" id="memory-header-info">
        {/* Personalization Index */}
        <div className="md:col-span-8 bg-[#0b0f19]/80 border border-[#1a2536] p-5 rounded-xl shadow-lg relative overflow-hidden flex flex-col justify-between">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-cyan-400/5 to-transparent pointer-events-none"></div>
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-400 font-bold block">Personalization Index Calibration</span>
            <h1 className="text-xl font-bold font-sans text-white mt-1">Cognitive Alignment Coefficient: {personalizationIndex}%</h1>
            <p className="text-xs text-slate-400 mt-2 max-w-xl leading-relaxed">
              Analyzes Doctor Vance's click trajectories, slide outlines, and active chatbot inquiries. Stabilizing at optimal parameter tolerances.
            </p>
          </div>
          <div className="flex space-x-2 mt-4 text-[10px] font-mono text-slate-400">
            <span className="bg-[#121c2c] p-1 px-2.5 border border-cyan-500/20 text-cyan-300 rounded uppercase">ALIGNMENT: EXCELLENT</span>
            <span className="p-1 px-2.5 border border-slate-800 rounded uppercase">CALIBRATOR: ONLINE</span>
          </div>
        </div>

        {/* Learning Status circular meter */}
        <div className="md:col-span-4 bg-[#0b0f19]/80 border border-[#1a2536] p-4 rounded-xl shadow-lg flex flex-col justify-between">
          <div>
            <span className="text-[9px] uppercase tracking-wider font-mono text-slate-500 block">Sensory learning status</span>
            <div className="flex items-center space-x-3 mt-3">
              <div className="p-3 bg-purple-950/40 border border-purple-500/30 rounded-lg shrink-0">
                <BrainCircuit className="h-6 w-6 text-purple-400 animate-pulse" />
              </div>
              <div>
                <span className="text-xs text-slate-400 font-mono">ACTIVE SYNAPSE FILE</span>
                <span className="text-lg font-bold font-mono text-white block mt-0.5">4.2 TB SYNCHRONIZED</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Memory Helix Interactive Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="memory-constellations">
        {/* Timeline representation (DNA Helix outline layout) */}
        <div id="helix-timeline-stage" className="lg:col-span-8 bg-[#05080e]/95 border border-[#1e2a3c] rounded-xl p-6 shadow-lg min-h-[380px] flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">The Memory Helix Timeline</h3>
                <span className="text-[10px] text-slate-400 font-mono">Sensorial preferences chronologically vector indexed</span>
              </div>
              <div className="flex items-center space-x-1 text-[10px] font-mono bg-[#0e1624] border border-[#182334] text-slate-400 p-1 px-2.5 rounded">
                <History className="h-3.5 w-3.5 text-cyan-400" />
                <span>INDEXED RECORDCOUNT: {activeMemoryItems.length}</span>
              </div>
            </div>

            {/* Custom vector DNA helix vertical timeline component */}
            <div className="relative pl-6 sm:pl-12 space-y-4" id="timeline-v-stack">
              {/* Helix vertical core backbone loop */}
              <div className="absolute left-[31px] sm:left-[55px] top-4 bottom-4 w-0.5 bg-dashed border-l border-cyan-900 border-dashed pointer-events-none"></div>

              {activeMemoryItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 font-mono text-slate-500 space-y-2">
                  <BrainCircuit className="h-8 w-8 text-slate-600 animate-bounce" />
                  <span>All memory vectors purged. Operating on flat defaults.</span>
                </div>
              ) : (
                activeMemoryItems.map((item, idx) => {
                  const isCurSelected = item.id === selectedMemoryId;
                  
                  // Category specific indicators colors
                  let pointerColor = "bg-cyan-400";
                  if (item.category === "session") pointerColor = "bg-purple-400";
                  if (item.category === "behavior") pointerColor = "bg-yellow-400";
                  if (item.category === "insight") pointerColor = "bg-emerald-400";

                  return (
                    <div 
                      key={item.id}
                      onClick={() => setSelectedMemoryId(item.id)}
                      className={`relative flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                        isCurSelected ? "bg-cyan-950/20 border-cyan-500/40" : "bg-[#0c1220]/50 border-[#1a2536] hover:border-slate-700"
                      }`}
                    >
                      {/* Timeline dot circle anchor */}
                      <div className="absolute left-[-22px] sm:left-[-35px] top-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
                        <div className={`h-3 w-3 rounded-full border-2 border-black ${pointerColor} ${isCurSelected ? "scale-125 animate-ping" : ""}`}></div>
                      </div>

                      <div className="flex-1 min-w-0 pr-4">
                        <span className="text-[8px] font-mono text-slate-500 font-bold uppercase block">{item.date}</span>
                        <h4 className="text-xs font-mono font-bold text-white mt-0.5 truncate">{item.title}</h4>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5 font-sans">{item.description}</p>
                      </div>

                      <span className="text-[10px] font-mono text-slate-500 shrink-0 select-none">
                        Coeff: {item.indexPercent}%
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
          
          <div className="text-[9px] font-mono text-slate-650 pt-3 border-t border-slate-900 mt-6 uppercase">
            * Vance protocol limits: Cognitive database handles recursive sensory updates at 30-sec epochs.
          </div>
        </div>

        {/* Sidebar Diagnostics Details vector inspect */}
        <div id="memory-diagnostics-details" className="lg:col-span-4 bg-[#0b0f19]/80 border border-[#1a2536] rounded-xl p-5 shadow-lg flex flex-col justify-between Border-t-purple-400/40 border-t-2">
          {selectedMemory ? (
            <div className="space-y-4">
              <span className="text-[9px] uppercase tracking-wider font-mono text-purple-400 font-bold block">Sensory Profile Details</span>
              
              <div className="bg-[#070b13] p-4 rounded-lg border border-[#15202f]">
                <h4 className="text-xs font-mono font-bold text-white leading-normal uppercase">{selectedMemory.title}</h4>
                <div className="flex items-center space-x-2 text-[10px] font-mono mt-2">
                  <span className="bg-purple-950/40 text-purple-300 border border-purple-500/20 px-1.5 py-0.5 rounded capitalize">{selectedMemory.category}</span>
                  <span className="text-slate-500 font-bold">{selectedMemory.date}</span>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <span className="text-xs font-mono font-bold text-slate-350 uppercase block">Vector Description</span>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">{selectedMemory.description}</p>
              </div>

              <div className="flex items-center justify-between text-xs font-mono pt-3 border-t border-[#1a2536]">
                <span className="text-slate-500 font-bold">ACCURACY RELIABILITY</span>
                <span className="text-emerald-400 flex items-center">
                  <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                  99.8% STABILIZED
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500 font-mono text-xs">No vector highlighted.</div>
          )}

          {selectedMemory && (
            <button 
              onClick={() => handlePurgeMemory(selectedMemory.id)}
              className="w-full mt-6 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-450 border border-rose-500/25 hover:border-rose-400 hover:text-white rounded-lg text-xs font-mono font-medium flex items-center justify-center space-x-1.5 transition-all"
            >
              <Trash2 className="h-4 w-4" />
              <span>PURGE VECTOR VALUE</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
