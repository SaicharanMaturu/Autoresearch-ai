import React, { useState } from "react";
import { Sparkles, BarChart2, ShieldAlert, Cpu, Layers } from "lucide-react";

export function ResearchGapLab() {
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number; density: number; gap: string } | null>({
    r: 1, c: 3, density: 12, gap: "High latency in bio-osmosis synapses under electromagnetic perturbation."
  });

  const [crystallizedConcept, setCrystallizedConcept] = useState<string>("Neural Osmosis Theory");
  const [conceptDescription, setConceptDescription] = useState<string>(
    "Hypothesizes continuous fluid-state semantic transfers across synthetic cell membranes, minimizing decoherence dissipation."
  );
  const [isCalculatingConcept, setIsCalculatingConcept] = useState<boolean>(false);

  // Heatmap headers
  const rowHeaders = ["Quantum Info", "Neuromorphic", "Wetware Biology", "Non-Euclidean", "Crystalline"];
  const colHeaders = ["Synapses", "Diffusion Rates", "Ternary Gates", "Thermal Loop", "Atomic Nodes"];

  // Heatmap values representation (density of research)
  const heatmapData = [
    [84, 12, 45, 94, 21],
    [31, 88, 12, 65, 42],
    [52, 9,  76, 31, 84],
    [92, 41, 56, 12, 73],
    [15, 62, 38, 88, 10]
  ];

  // Map coordinate density to specific identified gap texts for immersive exploration
  const getCellGapText = (row: number, col: number, density: number) => {
    if (density < 20) {
      return `Critical Underdeveloped Domain: Sparse research activity detected in the convergence of ${rowHeaders[row]} and ${colHeaders[col]}. High discovery likelihood index.`;
    }
    if (density < 50) {
      return `Moderate Frontier Gap: Unstable predictive models identified in ${rowHeaders[row]} + ${colHeaders[col]} dynamics. Theoretical foundations are fragile.`;
    }
    return `Saturated Zone: High academic consensus. Over 400 papers published globally on ${rowHeaders[row]} connected with ${colHeaders[col]}. Low intellectual profit margins.`;
  };

  const trendStats = [
    { label: "Bio-Digital Convergence", value: "+142%", desc: "Neuromorphics matching cellular mitosis loops" },
    { label: "Non-Euclidean Logic Gates", value: "+88%", desc: "Continuous ternary integration arrays" },
    { label: "Atomic Data Persistence", value: "+56%", desc: "Dynamic molecular memory spin arrays" }
  ];

  const handleCrystallizeNewConcept = () => {
    setIsCalculatingConcept(true);
    setTimeout(() => {
      const concepts = [
        { title: "Chrono-Inference Quantum Bridges", desc: "Superimposes predictive future nodes as continuous state functions inside biological bio-relays." },
        { title: "Non-Euclidean Cell Mitosis Logic", desc: "Maps continuous division cycles to calculate double-integral ternary gates without heat dissipation." },
        { title: "Crystalline Cognitive Superconductors", desc: "Silicon-carbide embedded with peptide layers to synthesize instant multi-layer synaptic weights." },
        { title: "Somatic Energy Harvesting Rails", desc: "Converts micro-voltage cellular spikes of wetware neurons directly into neuromorphic bus clock pulses." }
      ];
      const randomSelect = concepts[Math.floor(Math.random() * concepts.length)];
      setCrystallizedConcept(randomSelect.title);
      setConceptDescription(randomSelect.desc);
      setIsCalculatingConcept(false);
    }, 1500);
  };

  return (
    <div id="gap-lab-screen" className="space-y-6">
      {/* 1. Header Information */}
      <div className="bg-[#0b0f19]/80 border border-[#1a2536] p-5 rounded-xl shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-radial-gradient from-emerald-500/10 to-transparent pointer-events-none"></div>
        <h2 className="text-sm font-semibold tracking-wider text-cyan-400 font-mono uppercase">Research Gap Lab</h2>
        <h1 className="text-xl font-bold font-sans text-white mt-1">Multi-Dimensional Boundary Topology Analyzer</h1>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Scanning unmapped boundary gaps across scientific matrices to formulate pristine digital hypotheses. Finding the optimal paths to patent and scientific discovery.
        </p>
      </div>

      {/* 2. Top-tier terrain gap simulator and KPIs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="gap-analytics-block">
        {/* Terrain Topography visual contour map */}
        <div id="topology-contour-map" className="lg:col-span-8 bg-[#04070d] border border-[#1a2536] rounded-xl p-5 shadow-lg relative min-h-[340px] flex flex-col justify-between">
          <div className="flex justify-between items-center z-10 mb-2">
            <div>
              <span className="text-[10px] uppercase tracking-wider font-mono text-emerald-400 font-bold block">Topological Terrain Model</span>
              <span className="text-xs text-slate-400 font-mono">Simulating unexplored biological logic depths (contour mapping)</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-[#090e17] border border-[#1e2a3c] px-2 py-0.5 rounded text-[9px] font-mono text-slate-400">
              <span className="h-1.5 w-1.5 bg-rose-500 rounded-full animate-ping"></span>
              <span>GAP ALERTS: 3 SPATIAL LOCATIONS</span>
            </div>
          </div>

          {/* Interactive Terrain Graphic */}
          <div className="flex-1 flex items-center justify-center relative min-h-[220px]">
            <svg viewBox="0 0 540 220" className="w-full max-w-[500px]">
              <defs>
                <linearGradient id="terrain-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(16, 185, 129, 0.4)" />
                  <stop offset="50%" stopColor="rgba(5, 150, 105, 0.15)" />
                  <stop offset="100%" stopColor="rgba(2, 6, 23, 0.9)" />
                </linearGradient>
              </defs>

              {/* Draw concentric scientific contour terrain trails */}
              <ellipse cx="270" cy="110" rx="190" ry="80" fill="none" stroke="#10b981" strokeWidth="0.5" opacity="0.1" />
              <ellipse cx="270" cy="110" rx="160" ry="65" fill="none" stroke="#10b981" strokeWidth="0.8" opacity="0.2" />
              <ellipse cx="270" cy="110" rx="130" ry="50" fill="none" stroke="#10b981" strokeWidth="1" opacity="0.3" />
              <ellipse cx="220" cy="100" rx="70" ry="32" fill="none" stroke="#10b981" strokeWidth="1.2" opacity="0.4" />
              <ellipse cx="220" cy="100" rx="40" ry="18" fill="none" stroke="#10b981" strokeWidth="1.5" opacity="0.5" />

              {/* Saturated High Plateau */}
              <ellipse cx="340" cy="120" rx="50" ry="25" fill="rgba(168, 85, 247, 0.1)" stroke="#a855f7" strokeWidth="1" opacity="0.3" />

              {/* Warning gaps anchors */}
              {/* Gap 1 (Biological osmosis integration) */}
              <g className="cursor-pointer" onClick={() => setSelectedCell({ r: 2, c: 1, density: 9, gap: "Underproductive bio-digital logical gateways using wetware membranes." })}>
                <circle cx="150" cy="80" r="5" fill="#f43f5e" className="animate-ping" />
                <circle cx="150" cy="80" r="4" fill="#f43f5e" />
                <path d="M150 80 L180 50 L250 50" fill="none" stroke="#f43f5e" strokeWidth="0.5" opacity="0.7" />
                <text x="254" y="53" fill="#f43f5e" fontSize="7" fontFamily="monospace">CELL BRAIN COUPLING ERROR (GAP-01)</text>
              </g>

              {/* Gap 2 (Thermal dissipation anomalies) */}
              <g className="cursor-pointer" onClick={() => setSelectedCell({ r: 4, c: 4, density: 10, gap: "High thermal decay rate on silicon synaptic channels." })}>
                <circle cx="390" cy="140" r="5" fill="#f43f5e" className="animate-ping" />
                <circle cx="390" cy="140" r="4" fill="#f43f5e" />
                <path d="M390 140 L410 110 L440 110" fill="none" stroke="#f43f5e" strokeWidth="0.5" opacity="0.7" />
                <text x="444" y="113" fill="#f43f5e" fontSize="7" fontFamily="monospace">HEAT CONVENT FRONTIER (GAP-02)</text>
              </g>

              {/* Central stabilized research point */}
              <circle cx="270" cy="110" r="3" fill="#00ffcc" />
              <text x="270" y="125" fill="#00ffcc" fontSize="8" fontFamily="monospace" textAnchor="middle">CORE STABLE RANGE</text>
            </svg>
          </div>

          <div className="text-[9px] font-mono text-slate-500 flex justify-between">
            <span>AXIS LATERAL: QUANTUM SPIN DIRECTIONAL COUPLING</span>
            <span>AXIS MEDIAL: SYNAPTIC COGNITION THETA DISSIPATION LEVEL</span>
          </div>
        </div>

        {/* Dynamic trends and indices */}
        <div id="gap-telemetry-kpis" className="lg:col-span-4 bg-[#0b0f19]/80 border border-[#1a2536] rounded-xl p-5 shadow-lg flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-wider font-mono text-cyan-400 block font-semibold">Discovery Indices</span>
            
            <div className="grid grid-cols-2 gap-3" id="gap-kpis">
              <div className="bg-[#070b13] p-3 rounded-lg border border-[#182335]">
                <span className="text-[9px] font-mono text-slate-500 uppercase">SYSTEM CONFIDENCE</span>
                <span className="text-xl font-mono font-bold text-white block mt-1">8.92 / 10</span>
              </div>
              <div className="bg-[#070b13] p-3 rounded-lg border border-[#182335]">
                <span className="text-[9px] font-mono text-slate-500 uppercase">DATA INTEGRITY</span>
                <span className="text-xl font-mono font-bold text-emerald-400 block mt-1">99.4%</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#1a2536] space-y-3">
              <span className="text-[10px] uppercase font-mono text-slate-400 font-semibold block">Future Bio-tech Trends</span>
              {trendStats.map((stat, idx) => (
                <div key={idx} className="flex justify-between items-start text-xs border-b border-[#0f1725] pb-2 last:border-none">
                  <div>
                    <span className="text-white font-medium block">{stat.label}</span>
                    <span className="text-[10px] text-slate-500 block">{stat.desc}</span>
                  </div>
                  <span className="text-emerald-400 font-mono font-bold shrink-0">{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Layer: Interactive Heatmap Matrix & AI Concept generator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="gap-bento-opportunity">
        {/* Heatmap grid */}
        <div id="opportunity-matrix-panel" className="lg:col-span-7 bg-[#0b0f19]/80 border border-[#1a2536] rounded-xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-2">The Opportunity Matrix Heatmap</h3>
            <p className="text-[11px] text-slate-400 mb-4 font-sans leading-relaxed">
              Grid intersections show density of existing literature. Select dark boxes (less dense, low value) to uncover potential patent voids.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-center border-collapse text-[10px] font-mono">
                <thead>
                  <tr>
                    <th className="p-1 text-slate-550 border-r border-b border-[#1b2c45]"></th>
                    {colHeaders.map((col, cIdx) => (
                      <th key={col} className="p-1 px-1.5 text-slate-400 font-medium border-b border-[#1b2c45] text-[9px] truncate max-w-[70px]">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {heatmapData.map((row, rIdx) => (
                    <tr key={rIdx}>
                      <td className="p-1 text-slate-400 text-left border-r border-[#1b2c45] font-semibold text-[8px] max-w-[80px] truncate">
                        {rowHeaders[rIdx]}
                      </td>
                      {row.map((density, cIdx) => {
                        const isChosen = selectedCell?.r === rIdx && selectedCell?.c === cIdx;
                        let cellBg = "bg-emerald-950/80 text-emerald-300"; // Rich Density
                        if (density < 20) {
                          cellBg = "bg-rose-950/40 text-rose-400 hover:bg-rose-900/60"; // Sparsity Gap
                        } else if (density < 50) {
                          cellBg = "bg-amber-950/40 text-amber-400 hover:bg-amber-900/60"; // Moderate
                        } else {
                          cellBg = "bg-slate-900/50 text-slate-400 hover:bg-slate-800";
                        }

                        return (
                          <td 
                            key={cIdx} 
                            onClick={() => setSelectedCell({ r: rIdx, c: cIdx, density, gap: getCellGapText(rIdx, cIdx, density) })}
                            className={`p-2 cursor-pointer transition-all border border-[#142033] ${cellBg} ${isChosen ? "ring-2 ring-cyan-400 ring-offset-2 ring-offset-black z-10" : ""}`}
                          >
                            {density}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {selectedCell && (
            <div className="mt-4 p-3 bg-[#060a12] rounded-lg border border-[#f43f5e]/20 text-xs flex items-start space-x-2">
              <ShieldAlert className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-mono text-[#f43f5e] uppercase tracking-wider block font-bold">FRONTIEST INTERSECTION DIAGNOSIS</span>
                <p className="text-slate-300 font-sans mt-1 leading-relaxed">
                  {selectedCell.gap}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* AI Crystalline concept card */}
        <div id="ai-conceptions-panel" className="lg:col-span-5 bg-[#0b0f19]/80 border border-[#1a2536] rounded-xl p-5 shadow-lg flex flex-col justify-between border-r-cyan-400/30">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[9px] tracking-wider uppercase font-mono text-cyan-400 font-bold">AI Crystalline Conceptions</span>
              <Sparkles className="h-4 w-4 text-cyan-400" />
            </div>

            <div className="p-4 bg-gradient-to-br from-[#060a12] to-[#12233f]/30 rounded-xl border border-[#192b45] relative overflow-hidden group">
              <div className="absolute top-0 right-0 h-8 w-8 bg-cyan-500/10 rounded-bl-full flex items-center justify-center border-l border-b border-cyan-500/20">
                <span className="text-[8px] text-cyan-400 font-mono">COREv4</span>
              </div>

              {isCalculatingConcept ? (
                <div className="flex flex-col items-center justify-center py-6 space-y-3 font-mono">
                  <div className="h-6 w-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-[10px] text-cyan-400 animate-pulse uppercase">Crystallizing Neural Gaps...</span>
                </div>
              ) : (
                <div className="space-y-2">
                  <h4 className="text-sm font-mono font-bold text-white uppercase tracking-wide">{crystallizedConcept}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">{conceptDescription}</p>
                </div>
              )}
            </div>

            <p className="text-[10px] text-slate-500 font-sans leading-relaxed">
              Integrates topological warnings detected in the contours and the Opportunity Heatmap grid into actionable neuromorphic patents.
            </p>
          </div>

          <button 
            disabled={isCalculatingConcept}
            onClick={handleCrystallizeNewConcept}
            className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-black font-semibold rounded-lg font-mono text-xs shadow-lg uppercase transition-all disabled:opacity-50 mt-4 active:scale-98"
          >
            {isCalculatingConcept ? "CALCULATING CONCEPTS..." : "Crystallize New Concept"}
          </button>
        </div>
      </div>
    </div>
  );
}
