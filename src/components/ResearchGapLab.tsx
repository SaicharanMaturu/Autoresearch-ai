import React, { useState } from "react";
import { Sparkles, BarChart2, ShieldAlert, Cpu, Layers, Activity, Target, Zap, ChevronLeft } from "lucide-react";

export function ResearchGapLab({ onBack }: { onBack?: () => void }) {
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number; density: number; gap: string } | null>({
    r: 1, c: 3, density: 12, gap: "High latency in bio-osmosis synapses under electromagnetic perturbation."
  });

  const [crystallizedConcept, setCrystallizedConcept] = useState<string>("Neural Osmosis Theory");
  const [conceptDescription, setConceptDescription] = useState<string>(
    "Hypothesizes continuous fluid-state semantic transfers across synthetic cell membranes, minimizing decoherence dissipation."
  );
  const [isCalculatingConcept, setIsCalculatingConcept] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState(0);

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
    setScanProgress(0);
    
    // Simulate progress bar
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 50);

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
    <div id="gap-lab-screen" className="min-h-screen w-full bg-[#050811] text-slate-300 font-sans p-6 overflow-x-hidden relative flex flex-col gap-6">
      
      {/* Immersive Deep Space & Grid Background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjMTUyMDM2IiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIG9wYWNpdHk9IjAuMiI+PHBhdGggZD0iTTAgNjBoNjBNNjAgMGYtNjAgNjAiLz48L2c+PC9zdmc+')] pointer-events-none"></div>
      
      {/* Ambient Orbs */}
      <div className="fixed top-[10%] right-[10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '7s' }} />
      <div className="fixed bottom-[10%] left-[5%] w-[600px] h-[600px] bg-rose-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDuration: '9s' }} />

      {/* Top Header Console */}
      <div className="bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] p-6 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)] relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
        <div className="relative z-10 flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-[#050811] border border-emerald-500/30 flex items-center justify-center shadow-[inset_0_0_20px_rgba(16,185,129,0.1)] relative">
            <div className="absolute inset-0 bg-emerald-400/20 rounded-xl animate-ping opacity-30"></div>
            <Target className="text-emerald-400 w-8 h-8" />
          </div>
          <div>
            <h2 className="text-[10px] font-mono tracking-[0.3em] text-emerald-400 uppercase font-bold mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Research Gap Lab
            </h2>
            <h1 className="text-2xl font-bold font-display text-white tracking-wide drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Multi-Dimensional Boundary Topology Analyzer</h1>
            <p className="text-xs text-slate-400 font-mono mt-1">Scanning unmapped boundary gaps across scientific matrices to formulate pristine digital hypotheses.</p>
          </div>
        </div>
        {onBack && (
          <button onClick={onBack} className="relative z-10 px-5 py-3 bg-[#050811] border border-[#1e2d4a] hover:border-emerald-500/50 text-slate-400 hover:text-emerald-400 rounded-xl transition-all duration-300 shadow-lg flex items-center gap-2 font-mono text-xs uppercase tracking-widest group/btn">
            <ChevronLeft size={16} className="group-hover/btn:-translate-x-1 transition-transform" />
            Abort Uplink
          </button>
        )}
      </div>

      {/* Middle Tier: Topography & KPIs */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 relative z-10">
        
        {/* Terrain Topography Map */}
        <div className="xl:col-span-8 bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] rounded-2xl p-6 shadow-[inset_0_0_30px_rgba(0,0,0,0.5)] relative flex flex-col justify-between overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[50px] pointer-events-none"></div>
          
          <div className="flex justify-between items-start z-10 mb-4">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-mono text-emerald-400 font-bold block flex items-center gap-2">
                <Activity size={12} /> Topological Terrain Model
              </span>
              <span className="text-[10px] text-slate-500 font-mono mt-1 block uppercase">Simulating unexplored biological logic depths</span>
            </div>
            <div className="flex items-center space-x-2 bg-[#050811] border border-rose-500/30 px-3 py-1.5 rounded-lg text-[10px] font-mono text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.15)]">
              <span className="h-1.5 w-1.5 bg-rose-500 rounded-full animate-ping"></span>
              <span className="tracking-widest font-bold">GAP ALERTS: 3 LOCATIONS</span>
            </div>
          </div>

          {/* Interactive Terrain Graphic */}
          <div className="flex-1 flex items-center justify-center relative min-h-[280px]">
            <svg viewBox="0 0 540 220" className="w-full h-full max-w-[600px] overflow-visible">
              <defs>
                <linearGradient id="terrain-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(16, 185, 129, 0.4)" />
                  <stop offset="50%" stopColor="rgba(5, 150, 105, 0.15)" />
                  <stop offset="100%" stopColor="rgba(2, 6, 23, 0.9)" />
                </linearGradient>
                <filter id="svg-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Concentric rings */}
              <g className="origin-center animate-[spin_40s_linear_infinite]" style={{ transformOrigin: '270px 110px' }}>
                <ellipse cx="270" cy="110" rx="190" ry="80" fill="none" stroke="#10b981" strokeWidth="0.5" strokeDasharray="4 8" opacity="0.2" />
                <ellipse cx="270" cy="110" rx="160" ry="65" fill="none" stroke="#10b981" strokeWidth="1" strokeDasharray="10 5" opacity="0.3" />
                <ellipse cx="270" cy="110" rx="130" ry="50" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2 4" opacity="0.4" />
                <ellipse cx="220" cy="100" rx="70" ry="32" fill="none" stroke="#10b981" strokeWidth="2" opacity="0.5" filter="url(#svg-glow)" />
                <ellipse cx="220" cy="100" rx="40" ry="18" fill="rgba(16,185,129,0.05)" stroke="#10b981" strokeWidth="2" opacity="0.7" filter="url(#svg-glow)" />
              </g>

              {/* Saturated High Plateau */}
              <ellipse cx="340" cy="120" rx="50" ry="25" fill="rgba(168, 85, 247, 0.15)" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.6" filter="url(#svg-glow)" />

              {/* Radar Sweep Line */}
              <g className="origin-center animate-[spin_4s_linear_infinite]" style={{ transformOrigin: '270px 110px' }}>
                <line x1="270" y1="110" x2="460" y2="110" stroke="url(#terrain-grad)" strokeWidth="2" opacity="0.5" />
              </g>

              {/* Warning gaps anchors */}
              {/* Gap 1 */}
              <g className="cursor-pointer group" onClick={() => setSelectedCell({ r: 2, c: 1, density: 9, gap: "Underproductive bio-digital logical gateways using wetware membranes." })}>
                <circle cx="150" cy="80" r="15" fill="rgba(244,63,94,0.1)" className="group-hover:fill-[rgba(244,63,94,0.3)] transition-colors" />
                <circle cx="150" cy="80" r="8" fill="none" stroke="#f43f5e" strokeWidth="1" className="animate-ping" />
                <circle cx="150" cy="80" r="4" fill="#f43f5e" filter="url(#svg-glow)" />
                <path d="M150 80 L170 40 L230 40" fill="none" stroke="#f43f5e" strokeWidth="1" strokeDasharray="2 2" opacity="0.8" />
                <rect x="235" y="32" width="160" height="16" fill="#050811" stroke="#f43f5e" strokeWidth="0.5" rx="2" />
                <text x="242" y="43" fill="#f43f5e" fontSize="7" fontFamily="monospace" fontWeight="bold">CELL BRAIN COUPLING ERROR [GAP-01]</text>
              </g>

              {/* Gap 2 */}
              <g className="cursor-pointer group" onClick={() => setSelectedCell({ r: 4, c: 4, density: 10, gap: "High thermal decay rate on silicon synaptic channels." })}>
                <circle cx="390" cy="140" r="15" fill="rgba(244,63,94,0.1)" className="group-hover:fill-[rgba(244,63,94,0.3)] transition-colors" />
                <circle cx="390" cy="140" r="8" fill="none" stroke="#f43f5e" strokeWidth="1" className="animate-ping" style={{ animationDelay: '0.5s' }} />
                <circle cx="390" cy="140" r="4" fill="#f43f5e" filter="url(#svg-glow)" />
                <path d="M390 140 L410 170 L480 170" fill="none" stroke="#f43f5e" strokeWidth="1" strokeDasharray="2 2" opacity="0.8" />
                <rect x="485" y="162" width="160" height="16" fill="#050811" stroke="#f43f5e" strokeWidth="0.5" rx="2" />
                <text x="492" y="173" fill="#f43f5e" fontSize="7" fontFamily="monospace" fontWeight="bold">HEAT CONVENT FRONTIER [GAP-02]</text>
              </g>

              {/* Central stabilized research point */}
              <circle cx="270" cy="110" r="10" fill="rgba(0,255,204,0.2)" className="animate-pulse" />
              <circle cx="270" cy="110" r="4" fill="#00ffcc" filter="url(#svg-glow)" />
              <text x="270" y="132" fill="#00ffcc" fontSize="8" fontFamily="monospace" textAnchor="middle" fontWeight="bold" filter="url(#svg-glow)">CORE STABLE RANGE</text>
            </svg>
          </div>

          <div className="text-[9px] font-mono text-slate-500 flex justify-between uppercase mt-4 border-t border-[#1e2d4a] pt-3">
            <span className="flex items-center gap-1"><ChevronLeft size={10}/> AXIS LATERAL: QUANTUM SPIN COUPLING</span>
            <span className="flex items-center gap-1">AXIS MEDIAL: SYNAPTIC COGNITION THETA <ChevronLeft size={10} className="rotate-180"/></span>
          </div>
        </div>

        {/* Telemetry KPIs */}
        <div className="xl:col-span-4 bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] rounded-2xl p-6 shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-[40px] pointer-events-none"></div>
          
          <div className="space-y-6 relative z-10">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-mono text-cyan-400 block font-bold flex items-center gap-2 mb-4">
                <BarChart2 size={12} /> Discovery Indices
              </span>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#050811] p-4 rounded-xl border border-[#1e2d4a] relative group overflow-hidden">
                  <div className="absolute inset-0 bg-cyan-500/10 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300"></div>
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest relative z-10">Confidence</span>
                  <span className="text-2xl font-display font-bold text-white block mt-1 relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">8.92<span className="text-xs text-slate-500">/10</span></span>
                </div>
                <div className="bg-[#050811] p-4 rounded-xl border border-[#1e2d4a] relative group overflow-hidden">
                  <div className="absolute inset-0 bg-emerald-500/10 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300"></div>
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest relative z-10">Data Integrity</span>
                  <span className="text-2xl font-display font-bold text-emerald-400 block mt-1 relative z-10 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">99.4<span className="text-xs">%</span></span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1e2d4a] space-y-4">
              <span className="text-[10px] uppercase tracking-widest font-mono text-slate-400 font-bold block flex items-center gap-2">
                <Zap size={12} className="text-amber-400" /> Future Bio-tech Trends
              </span>
              <div className="space-y-3">
                {trendStats.map((stat, idx) => (
                  <div key={idx} className="group flex justify-between items-start bg-[#050811] p-3 rounded-lg border border-[#1e2d4a] hover:border-cyan-500/30 transition-colors">
                    <div>
                      <span className="text-slate-200 font-bold text-xs block mb-0.5 group-hover:text-cyan-400 transition-colors">{stat.label}</span>
                      <span className="text-[10px] text-slate-500 block font-mono">{stat.desc}</span>
                    </div>
                    <span className="text-emerald-400 font-mono font-bold text-xs bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Tier: Matrix & AI Concepts */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 relative z-10">
        
        {/* Heatmap Grid */}
        <div className="xl:col-span-7 bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] rounded-2xl p-6 shadow-[inset_0_0_30px_rgba(0,0,0,0.5)] flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[40px] pointer-events-none"></div>
          
          <div className="relative z-10">
            <h3 className="text-[11px] font-mono font-bold text-purple-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <Layers size={14} /> The Opportunity Matrix Heatmap
            </h3>
            <p className="text-xs text-slate-400 mb-6 font-sans leading-relaxed">
              Intersections show global literature density. <span className="text-rose-400 font-bold">Red zones</span> indicate massive scientific voids with high patent potential.
            </p>

            <div className="overflow-x-auto rounded-xl border border-[#1e2d4a] bg-[#050811] p-1">
              <table className="w-full text-center border-collapse text-[10px] font-mono">
                <thead>
                  <tr>
                    <th className="p-2 border-r border-b border-[#1e2d4a] bg-[#090d1a]"></th>
                    {colHeaders.map((col) => (
                      <th key={col} className="p-2 px-3 text-slate-400 font-bold border-b border-[#1e2d4a] bg-[#090d1a] tracking-widest uppercase text-[9px] min-w-[80px]">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {heatmapData.map((row, rIdx) => (
                    <tr key={rIdx}>
                      <td className="p-2 px-3 text-slate-400 text-left border-r border-[#1e2d4a] font-bold text-[9px] uppercase tracking-widest bg-[#090d1a] whitespace-nowrap">
                        {rowHeaders[rIdx]}
                      </td>
                      {row.map((density, cIdx) => {
                        const isChosen = selectedCell?.r === rIdx && selectedCell?.c === cIdx;
                        
                        let cellBg = "bg-[#090d1a] text-slate-500 border-[#1e2d4a]"; // Saturated
                        let glowStyle = {};
                        
                        if (density < 20) {
                          cellBg = "bg-rose-950/40 text-rose-400 border-rose-900/50 hover:bg-rose-900/60";
                          glowStyle = { textShadow: '0 0 8px rgba(244,63,94,0.6)' };
                        } else if (density < 50) {
                          cellBg = "bg-amber-950/30 text-amber-500 border-amber-900/40 hover:bg-amber-900/50";
                          glowStyle = { textShadow: '0 0 8px rgba(245,158,11,0.6)' };
                        } else {
                          cellBg = "bg-emerald-950/20 text-emerald-500 border-emerald-900/30 hover:bg-emerald-900/40";
                        }

                        return (
                          <td 
                            key={cIdx} 
                            onClick={() => setSelectedCell({ r: rIdx, c: cIdx, density, gap: getCellGapText(rIdx, cIdx, density) })}
                            className={`p-3 cursor-pointer transition-all duration-300 border font-bold text-xs relative overflow-hidden
                              ${cellBg} 
                              ${isChosen ? "ring-2 ring-cyan-400 ring-offset-2 ring-offset-[#050811] z-10 scale-[1.05] shadow-[0_0_20px_rgba(6,182,212,0.4)]" : "hover:scale-[1.02]"}
                            `}
                            style={glowStyle}
                          >
                            {isChosen && <div className="absolute inset-0 bg-cyan-400/10 animate-pulse"></div>}
                            <span className="relative z-10">{density}</span>
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
            <div className="mt-6 p-4 bg-[#050811] rounded-xl border border-rose-500/30 text-xs flex items-start space-x-4 shadow-[0_0_20px_rgba(244,63,94,0.1)] relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
              <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center shrink-0 border border-rose-500/20">
                <ShieldAlert className="h-5 w-5 text-rose-500 animate-pulse" />
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-mono text-rose-400 uppercase tracking-widest block font-bold mb-1">Intersection Diagnosis: {rowHeaders[selectedCell.r]} × {colHeaders[selectedCell.c]}</span>
                <p className="text-slate-300 font-sans leading-relaxed text-sm">
                  {selectedCell.gap}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* AI Concept Card */}
        <div className="xl:col-span-5 bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] rounded-2xl p-6 shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[60px] pointer-events-none"></div>
          
          <div className="space-y-6 relative z-10">
            <div className="flex justify-between items-center border-b border-[#1e2d4a] pb-4">
              <span className="text-[11px] tracking-widest uppercase font-mono text-cyan-400 font-bold flex items-center gap-2">
                <Sparkles size={14} /> AI Crystalline Conceptions
              </span>
              <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded text-[9px] font-mono font-bold tracking-widest uppercase">Engine: COREv4</span>
            </div>

            <div className="p-6 bg-[#050811] rounded-xl border border-[#1e2d4a] relative overflow-hidden min-h-[160px] flex flex-col justify-center shadow-inner group">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-cyan-500/50"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-cyan-500/50"></div>

              {isCalculatingConcept ? (
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="relative w-12 h-12 flex items-center justify-center">
                    <div className="absolute inset-0 border-2 border-cyan-500/20 rounded-full"></div>
                    <div className="absolute inset-0 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                    <Cpu size={16} className="text-cyan-400 animate-pulse" />
                  </div>
                  <div className="w-full max-w-[200px] h-1.5 bg-[#152036] rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-400 shadow-[0_0_10px_#00ffcc] transition-all duration-75" style={{ width: `${scanProgress}%` }}></div>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest animate-pulse">Synthesizing Neural Gaps...</span>
                </div>
              ) : (
                <div className="space-y-3 relative z-10">
                  <h4 className="text-lg font-display font-bold text-white uppercase tracking-wide drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] leading-tight">{crystallizedConcept}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed font-sans">{conceptDescription}</p>
                </div>
              )}
            </div>

            <p className="text-[10px] text-slate-500 font-mono leading-relaxed uppercase tracking-widest">
              Integrates topological warnings detected in the contours and the Opportunity Heatmap grid into actionable neuromorphic patents.
            </p>
          </div>

          <button 
            disabled={isCalculatingConcept}
            onClick={handleCrystallizeNewConcept}
            className="mt-6 w-full relative group overflow-hidden rounded-xl p-[1px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 opacity-70 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]"></span>
            <div className="relative bg-[#050811] px-6 py-4 rounded-xl flex items-center justify-center gap-3 group-hover:bg-[#050811]/50 transition-colors duration-300">
              <Sparkles size={16} className="text-cyan-400 group-hover:text-white transition-colors" />
              <span className="text-cyan-400 font-bold group-hover:text-white transition-colors text-xs uppercase tracking-widest font-mono">
                {isCalculatingConcept ? "Processing Data..." : "Crystallize New Concept"}
              </span>
            </div>
          </button>
        </div>
      </div>
      
      {/* Global Animation Styles */}
      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}

