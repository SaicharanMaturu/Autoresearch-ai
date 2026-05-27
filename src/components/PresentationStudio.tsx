import React, { useState, useEffect, useRef } from "react";
import { ListTodo, Sliders, Presentation, ArrowLeft, ArrowRight, Download, Edit2, Check, RefreshCw, Zap, Hexagon, Maximize, Layers } from "lucide-react";
import { Slide } from "../types";

export function PresentationStudio({ onBack }: { onBack?: () => void }) {
  const [slides, setSlides] = useState<Slide[]>([
    { id: "1", title: "Project Alpha: Bio-Digital Synaptic Architecture", subtitle: "Doctor Elara Vance | Lead AI Architect", bullets: ["Executive summary of quantum cellular interfaces", "Bridging neuromorphic substrates with cytoplasmic loops", "Key telemetry parameters defined"], layout: "Standard Widescreen" },
    { id: "2", title: "Methodology & Structural Modeling", subtitle: "Ternary biological gate pathways", bullets: ["Mitosis frequency modulation logic mapping", "Thermal decay mitigation inside synthetic structures", "Quantifying continuous non-linear double integrations"], layout: "Asymmetric Split" },
    { id: "3", title: "Intelligence Data Streams Flux & Topology", subtitle: "Real-time citation velocity analysis", bullets: ["Optimized citation throughput stabilizing at 1.2 GB/s", "Semantic density clouds mapping the Opportunity Matrix", "Active research nodes: Zurich, Tokyo, Silicon Valley"], layout: "3-Column Grid" },
    { id: "4", title: "Ethical AI Guardrails & Human Calibration", subtitle: "Doctor-Core feedback alignment", bullets: ["Human-in-the-loop validation under strict Vance protocol", "Restricting automated core revisions to non-mitigating matrices", "Long-term persistence limits on synthetic memories"], layout: "Standard Widescreen" }
  ]);

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [outlineEditingId, setOutlineEditingId] = useState<string | null>(null);
  const [editTitleBuffer, setEditTitleBuffer] = useState<string>("");

  const [activeTheme, setActiveTheme] = useState<'etheric' | 'monolith'>('etheric');
  const [activeGeometry, setActiveGeometry] = useState<'grid' | 'asymmetric' | 'fluid'>('asymmetric');
  
  // Real-time slide painting progress simulation
  const [generationProgress, setGenerationProgress] = useState(84);
  const [currentPainterTask, setCurrentPainterTask] = useState("Painting slide 03: Data Streams...");

  const activeSlide = slides[activeIndex] || slides[0];

  // Magnetic 3D tilt calculations based on mouse coordinates on the slide component
  const slideRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!slideRef.current) return;
    const rect = slideRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Cap tilt angles
    setTilt({
      x: (x / rect.width) * 15, // max 15deg
      y: -(y / rect.height) * 15
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          const tasks = [
            "Structuring outline methodologies...",
            "Polishing typography constraints...",
            "Validating citation metadata arrays...",
            "Synchronizing vector memory timelines..."
          ];
          setCurrentPainterTask(tasks[Math.floor(Math.random() * tasks.length)]);
          return 0;
        }
        return prev + 1;
      });
    }, 400);
    return () => clearInterval(timer);
  }, []);

  const handleNextSlide = () => {
    setActiveIndex(prev => Math.min(prev + 1, slides.length - 1));
  };

  const handlePrevSlide = () => {
    setActiveIndex(prev => Math.max(prev - 0, 0));
  };

  const handleStartRename = (slide: Slide) => {
    setOutlineEditingId(slide.id);
    setEditTitleBuffer(slide.title);
  };

  const handleSaveRename = () => {
    setSlides(prev => prev.map(s => s.id === outlineEditingId ? { ...s, title: editTitleBuffer } : s));
    setOutlineEditingId(null);
  };

  const handleRefineStrategy = () => {
    setGenerationProgress(0);
    setCurrentPainterTask("Regenerating entire slide outline matrix standard values...");
  };

  return (
    <div id="presentation-studio-screen" className="min-h-screen w-full bg-[#050811] text-slate-300 font-sans relative overflow-x-hidden p-6 flex flex-col gap-6">
      
      {/* Immersive Deep Space & Grid Background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjMTUyMDM2IiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIG9wYWNpdHk9IjAuMiI+PHBhdGggZD0iTTAgNjBoNjBNNjAgMGYtNjAgNjAiLz48L2c+PC9zdmc+')] pointer-events-none z-0"></div>
      
      {/* Ambient Orbs */}
      <div className="fixed top-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none animate-pulse z-0" style={{ animationDuration: '10s' }} />
      <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none animate-[pulse_14s_infinite] z-0" />

      {/* Header Dashboard HUD */}
      <div className="bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] p-6 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)] relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
        
        <div className="relative z-10 flex items-start gap-4">
          <div className="w-14 h-14 rounded-xl bg-[#050811] border border-cyan-500/30 flex items-center justify-center shadow-[inset_0_0_20px_rgba(6,182,212,0.1)] relative">
            <div className="absolute inset-0 bg-cyan-400/20 rounded-xl animate-ping opacity-30"></div>
            <Presentation className="text-cyan-400 w-8 h-8" />
          </div>
          <div>
            <h2 className="text-[10px] font-mono tracking-[0.3em] text-cyan-400 uppercase font-bold mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span> Presentation Studio
            </h2>
            <h1 className="text-2xl font-bold font-display text-white tracking-wide drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Project Alpha v2 Workspace</h1>
            <p className="text-xs text-slate-400 font-mono mt-1 uppercase tracking-widest flex items-center gap-2">
               Aethelgard Neural Generator <Zap size={10} className="text-amber-400"/>
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3 z-10">
          {onBack && (
            <button onClick={onBack} className="px-5 py-2.5 bg-[#050811] border border-[#1e2d4a] hover:border-cyan-500/50 text-slate-400 hover:text-cyan-400 rounded-xl transition-all duration-300 shadow-lg flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest group/btn">
              Return to Core
            </button>
          )}
          <div className="flex items-center space-x-2 bg-[#050811] p-1.5 px-3 rounded-lg border border-[#1e2d4a] font-mono text-[9px] uppercase tracking-widest font-bold">
            <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_5px_rgba(16,185,129,0.8)]"></span>
            <span className="text-emerald-400">Orchestrator Link Stable</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10 flex-1">
        
        {/* Left Neural Outline Steps Sidebar */}
        <div className="lg:col-span-3 bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] rounded-2xl p-5 shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-[40px] pointer-events-none"></div>
          
          <div className="space-y-4 relative z-10">
            <span className="text-[10px] font-mono text-purple-400 tracking-widest uppercase block font-bold flex items-center gap-2 border-b border-[#1e2d4a] pb-3">
              <Layers size={14} /> Neural Outline
            </span>
            
            <div className="space-y-2 max-h-[calc(100vh-350px)] overflow-y-auto pr-1 custom-scrollbar">
              {slides.map((s, idx) => {
                const isActive = idx === activeIndex;
                const isEditing = s.id === outlineEditingId;

                return (
                  <div 
                    key={s.id}
                    onClick={() => !isEditing && setActiveIndex(idx)}
                    className={`p-3 rounded-xl border transition-all duration-300 cursor-pointer group flex flex-col justify-between relative overflow-hidden ${
                      isActive ? "bg-purple-500/10 border-purple-500/50 shadow-[inset_0_0_20px_rgba(168,85,247,0.05)]" : "bg-[#050811] border-[#1e2d4a] hover:border-purple-500/30"
                    }`}
                  >
                    {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-400"></div>}
                    
                    <div className="flex items-start justify-between pl-1">
                      <span className="text-[9px] font-mono text-slate-500 font-bold block tracking-widest uppercase">
                        Slide 0{idx + 1} // {idx === 0 ? "Focus" : idx === 1 ? "Suggested" : "Inferred"}
                      </span>
                      {!isEditing && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleStartRename(s); }}
                          className="opacity-0 group-hover:opacity-100 p-1 hover:text-purple-400 text-slate-500 transition-colors"
                        >
                          <Edit2 className="h-3 w-3" />
                        </button>
                      )}
                    </div>

                    {isEditing ? (
                      <div className="inline-flex space-x-2 items-center mt-2 w-full" onClick={e => e.stopPropagation()}>
                        <input 
                          type="text" 
                          value={editTitleBuffer}
                          onChange={e => setEditTitleBuffer(e.target.value)}
                          className="bg-[#050811] border border-purple-500/50 text-white font-sans text-xs px-2 py-1.5 rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-purple-500/50"
                          autoFocus
                          onKeyDown={e => e.key === 'Enter' && handleSaveRename()}
                        />
                        <button onClick={handleSaveRename} className="p-1.5 bg-purple-500/20 rounded-lg text-purple-400 hover:bg-purple-500 hover:text-white transition-colors border border-purple-500/30">
                          <Check className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ) : (
                      <span className={`text-[11px] font-sans font-bold mt-2 leading-relaxed line-clamp-2 pl-1 transition-colors ${isActive ? "text-white" : "text-slate-300 group-hover:text-white"}`}>
                        {s.title}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <button 
            onClick={handleRefineStrategy}
            className="w-full text-center py-3 bg-[#050811] text-purple-400 text-[10px] uppercase tracking-widest font-mono font-bold rounded-xl border border-[#1e2d4a] hover:border-purple-500/50 hover:bg-purple-500/10 transition-all mt-6 relative overflow-hidden group flex items-center justify-center gap-2"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <RefreshCw size={12} className="group-hover:rotate-180 transition-transform duration-500" />
            Refine Strategy Array
          </button>
        </div>

        {/* Center Slides Previewer Widescreen with Magnetic properties */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
          <div 
            ref={slideRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`bg-[#050811]/95 backdrop-blur-md rounded-2xl p-10 aspect-video flex flex-col justify-between shadow-2xl relative overflow-hidden transition-all duration-200 border ${activeTheme === 'monolith' ? 'border-amber-500/20' : 'border-cyan-500/20'}`}
            style={{
              transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
              boxShadow: tilt.x !== 0 ? (activeTheme === 'monolith' ? "0 25px 50px -12px rgba(245, 158, 11, 0.15)" : "0 25px 50px -12px rgba(6, 182, 212, 0.15)") : "0 10px 30px -10px rgba(0,0,0,0.8)"
            }}
          >
            {/* Slide decoration elements */}
            {activeTheme === 'etheric' && (
              <>
                <div className="absolute top-0 right-0 h-64 w-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 h-64 w-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none"></div>
              </>
            )}
            
            {activeTheme === 'monolith' && (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 via-black to-black pointer-events-none"></div>
                <div className="absolute top-10 right-10 opacity-10 pointer-events-none">
                   <Hexagon size={120} className="text-amber-500 animate-[spin_60s_linear_infinite]"/>
                </div>
              </>
            )}
            
            {/* Slide Header */}
            <div className="flex justify-between items-start relative z-10">
              <span className={`text-[9px] font-mono uppercase tracking-widest font-bold flex items-center gap-2 ${activeTheme === 'monolith' ? 'text-amber-500' : 'text-cyan-400'}`}>
                {activeTheme === 'etheric' && <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></div>}
                Aethelgard Neural Pitch Array
              </span>
              <span className={`text-[10px] font-mono font-bold ${activeTheme === 'monolith' ? 'text-amber-500/50' : 'text-slate-500'}`}>0{activeIndex + 1} / 0{slides.length}</span>
            </div>

            {/* Slide Body */}
            <div className={`relative z-10 my-auto ${activeGeometry === 'fluid' ? 'text-center max-w-[80%] mx-auto' : 'max-w-[90%]'}`}>
              <h1 className={`font-bold tracking-tight leading-tight ${
                activeTheme === 'monolith' ? 'text-4xl text-amber-50/90 font-serif' : 'text-4xl text-white font-display'
              } ${activeGeometry === 'fluid' ? 'text-center' : ''}`}>
                {activeSlide.title}
              </h1>
              <p className={`text-sm mt-3 ${activeTheme === 'monolith' ? 'text-amber-200/50 font-serif italic' : 'text-cyan-400 font-mono tracking-widest uppercase text-[10px]'}`}>
                {activeSlide.subtitle}
              </p>

              {/* Dynamic Geometry Bullet layouts */}
              <div className={`mt-8 space-y-3 ${
                activeGeometry === 'grid' ? 'grid grid-cols-2 gap-x-6 gap-y-3 space-y-0' : 
                activeGeometry === 'fluid' ? 'inline-block text-left mx-auto' : ''
              }`}>
                {activeSlide.bullets.map((b, i) => (
                  <div key={i} className="flex items-start space-x-3 bg-white/5 p-3 rounded-lg border border-white/5 backdrop-blur-sm">
                    <span className={`h-1.5 w-1.5 rounded-full mt-1.5 shrink-0 shadow-[0_0_8px_currentColor] ${activeTheme === 'monolith' ? 'bg-amber-500 text-amber-500' : 'bg-cyan-400 text-cyan-400'}`}></span>
                    <span className={`leading-relaxed text-xs font-sans ${activeTheme === 'monolith' ? 'text-slate-300' : 'text-slate-200'}`}>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Slide Footer */}
            <div className={`flex justify-between items-center text-[8px] font-mono uppercase tracking-widest pt-4 relative z-10 border-t ${activeTheme === 'monolith' ? 'border-amber-900/30 text-amber-500/50' : 'border-[#1e2d4a] text-slate-500'}`}>
              <span>Confidential // Vance Protocol</span>
              <span>Patent No: 778-9B2</span>
            </div>
          </div>

          {/* Slide Navigation Pointers HUD */}
          <div className="flex justify-between items-center bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] p-4 rounded-2xl shadow-xl">
            <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest font-bold">Slide {activeIndex + 1} of {slides.length}</span>
            <div className="flex space-x-3">
              <button 
                onClick={handlePrevSlide} 
                disabled={activeIndex === 0}
                className="p-2.5 bg-[#050811] border border-[#1e2d4a] text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 rounded-xl disabled:opacity-30 disabled:hover:border-[#1e2d4a] disabled:hover:text-slate-400 transition-all duration-300"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button 
                onClick={handleNextSlide} 
                disabled={activeIndex === slides.length - 1}
                className="p-2.5 bg-[#050811] border border-[#1e2d4a] text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 rounded-xl disabled:opacity-30 disabled:hover:border-[#1e2d4a] disabled:hover:text-slate-400 transition-all duration-300"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Layout & Style sidebar */}
        <div className="lg:col-span-3 bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] rounded-2xl p-5 shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-[40px] pointer-events-none"></div>
          
          <div className="space-y-6 relative z-10">
            <span className="text-[10px] uppercase tracking-widest font-mono text-cyan-400 block font-bold flex items-center gap-2 border-b border-[#1e2d4a] pb-3">
              <Sliders size={14} /> Design Matrix
            </span>
            
            {/* Themes Selector */}
            <div className="space-y-2">
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-bold">Slide Core Theme</span>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <button 
                  onClick={() => setActiveTheme('etheric')}
                  className={`py-2.5 px-3 text-[10px] uppercase tracking-widest font-mono font-bold rounded-xl border transition-all duration-300 ${activeTheme === 'etheric' ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400 shadow-[inset_0_0_15px_rgba(6,182,212,0.1)]' : 'bg-[#050811] border-[#1e2d4a] text-slate-500 hover:border-slate-600 hover:text-slate-300'}`}
                >
                  Etheric
                </button>
                <button 
                  onClick={() => setActiveTheme('monolith')}
                  className={`py-2.5 px-3 text-[10px] uppercase tracking-widest font-mono font-bold rounded-xl border transition-all duration-300 ${activeTheme === 'monolith' ? 'bg-amber-500/10 border-amber-500/50 text-amber-400 shadow-[inset_0_0_15px_rgba(245,158,11,0.1)]' : 'bg-[#050811] border-[#1e2d4a] text-slate-500 hover:border-slate-600 hover:text-slate-300'}`}
                >
                  Monolith
                </button>
              </div>
            </div>

            {/* Geometry Selector */}
            <div className="space-y-2">
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-bold">Geometry Alignment</span>
              <div className="grid grid-cols-3 gap-2 mt-2 text-[9px] uppercase tracking-widest font-mono font-bold">
                <button 
                  onClick={() => setActiveGeometry('grid')}
                  className={`py-2.5 rounded-xl border transition-all duration-300 ${activeGeometry === 'grid' ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400' : 'bg-[#050811] border-[#1e2d4a] text-slate-500 hover:border-slate-600 hover:text-slate-300'}`}
                >
                  Grid
                </button>
                <button 
                  onClick={() => setActiveGeometry('asymmetric')}
                  className={`py-2.5 rounded-xl border transition-all duration-300 ${activeGeometry === 'asymmetric' ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400' : 'bg-[#050811] border-[#1e2d4a] text-slate-500 hover:border-slate-600 hover:text-slate-300'}`}
                >
                  Asym
                </button>
                <button 
                  onClick={() => setActiveGeometry('fluid')}
                  className={`py-2.5 rounded-xl border transition-all duration-300 ${activeGeometry === 'fluid' ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400' : 'bg-[#050811] border-[#1e2d4a] text-slate-500 hover:border-slate-600 hover:text-slate-300'}`}
                >
                  Fluid
                </button>
              </div>
            </div>

            {/* Export Materializations list */}
            <div className="pt-6 border-t border-[#1e2d4a] space-y-2">
              <span className="text-[9px] uppercase font-mono text-slate-500 block font-bold mb-3">Export Materializations</span>
              {["Standard Vector PDF", "Native Microsoft PPTX", "Spatial Hologram Array"].map((elem) => (
                <button 
                  key={elem}
                  onClick={() => {
                    alert(`Compiling presentations. Downloading spatial file: Project_Alpha_${elem.split(" ").join("_")}.bin...`);
                  }}
                  className="w-full text-left py-3 px-4 bg-[#050811] hover:bg-cyan-500/5 border border-[#1e2d4a] hover:border-cyan-500/30 rounded-xl flex items-center justify-between text-slate-400 hover:text-cyan-400 transition-all duration-300 group"
                >
                  <span className="font-mono text-[9px] font-bold uppercase tracking-widest">{elem}</span>
                  <Download className="h-3.5 w-3.5 group-hover:scale-125 transition-transform duration-300" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Painting generator bar */}
      <div className="bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] rounded-2xl p-5 shadow-xl relative z-10 overflow-hidden group">
        <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
        <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest font-bold mb-3">
          <span className="text-slate-400 flex items-center space-x-2">
            <RefreshCw className="h-3.5 w-3.5 animate-spin text-cyan-400" />
            <span className="text-cyan-400">{currentPainterTask}</span>
          </span>
          <span className="text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">{generationProgress}% Synced</span>
        </div>
        <div className="w-full bg-[#050811] h-1.5 rounded-full overflow-hidden border border-[#1e2d4a]">
          <div 
            className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 transition-all duration-300 relative"
            style={{ width: `${generationProgress}%` }}
          >
            <div className="absolute top-0 right-0 bottom-0 w-10 bg-white/50 blur-[5px] animate-[slide_1s_linear_infinite]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
