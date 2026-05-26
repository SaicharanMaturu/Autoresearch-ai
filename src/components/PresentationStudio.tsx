import React, { useState, useEffect, useRef } from "react";
import { ListTodo, Sliders, Presentation, ArrowLeft, ArrowRight, Download, Edit2, Check, RefreshCw } from "lucide-react";
import { Slide } from "../types";

export function PresentationStudio() {
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
    alert("Running generative strategy refinement across the PPT agent network...");
    setGenerationProgress(0);
    setCurrentPainterTask("Regenerating entire slide outline matrix standard values...");
  };

  return (
    <div id="presentation-studio-screen" className="space-y-6">
      {/* 1. Subheader dashboard HUD */}
      <div className="bg-[#0b0f19]/80 border border-[#1a2536] p-4 rounded-xl shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">Presentation Studio</h2>
          <h1 className="text-lg font-bold text-white font-sans mt-0.5">Project_Alpha_v2 Presentation Workspace</h1>
        </div>

        <div className="flex items-center space-x-2 bg-[#070b13] p-1 px-3 rounded-lg border border-[#182334] font-mono text-[10px]">
          <span className="h-1.5 w-1.5 bg-purple-500 rounded-full animate-ping"></span>
          <span className="text-slate-400">PPT_ORCHESTRATOR LINK STABLE</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="presentation-main-workspace col">
        {/* Left Neural Outline Steps Sidebar */}
        <div id="outline-sidebar" className="lg:col-span-3 bg-[#0b0f19]/85 border border-[#1a2536] rounded-xl p-4 shadow-lg flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-cyan-400 tracking-wider block font-bold">Neural Presentation Outline</span>
            
            <div className="space-y-2 max-h-[300px] overflow-y-auto" id="outline-steps-list">
              {slides.map((s, idx) => {
                const isActive = idx === activeIndex;
                const isEditing = s.id === outlineEditingId;

                return (
                  <div 
                    key={s.id}
                    onClick={() => !isEditing && setActiveIndex(idx)}
                    className={`p-2.5 rounded-lg border transition-all cursor-pointer group flex flex-col justify-between ${
                      isActive ? "bg-cyan-950/20 border-cyan-500/40" : "bg-[#070b13]/60 border-[#1a2336] hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span className="text-[9px] font-mono text-slate-500 font-bold block">
                        STEP 0{idx + 1} {idx === 0 ? "Focus" : idx === 1 ? "Suggested" : "Inferred"}
                      </span>
                      {!isEditing && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleStartRename(s); }}
                          className="opacity-0 group-hover:opacity-100 p-1 hover:text-cyan-400 text-slate-500 transition"
                        >
                          <Edit2 className="h-3 w-3" />
                        </button>
                      )}
                    </div>

                    {isEditing ? (
                      <div className="inline-flex space-x-1.5 items-center mt-1" onClick={e => e.stopPropagation()}>
                        <input 
                          type="text" 
                          value={editTitleBuffer}
                          onChange={e => setEditTitleBuffer(e.target.value)}
                          className="bg-[#050810] border border-[#223956] text-white text-xs px-2 py-1 rounded w-full focus:outline-none"
                        />
                        <button onClick={handleSaveRename} className="p-1.5 bg-cyan-500 rounded text-black hover:bg-cyan-400 transition">
                          <Check className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ) : (
                      <span className={`text-[11px] font-sans font-medium mt-1 leading-snug line-clamp-2 ${isActive ? "text-cyan-300" : "text-slate-300 group-hover:text-white"}`}>
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
            className="w-full text-center py-2.5 bg-[#121c2d] text-cyan-400 text-xs font-mono font-bold rounded-lg border border-cyan-500/20 hover:bg-[#1a2b44] hover:text-white transition mt-4"
          >
            Refine Outline Strategy
          </button>
        </div>

        {/* Center Slides Previewer Widescreen with Magnetic properties */}
        <div id="slide-stage-preview-column" className="lg:col-span-6 flex flex-col justify-between space-y-4">
          <div 
            ref={slideRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="bg-[#05080e]/95 border border-[#1b283e] rounded-xl p-8 aspect-video flex flex-col justify-between shadow-2xl relative overflow-hidden transition-all duration-150"
            style={{
              transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
              boxShadow: tilt.x !== 0 ? "0 25px 50px -12px rgba(13, 242, 201, 0.08)" : "none"
            }}
          >
            {/* Slide decoration corners */}
            <div className={`absolute top-0 right-0 h-40 w-40 bg-radial-gradient from-cyan-500/80 to-transparent pointer-events-none opacity-10 transition-all ${activeTheme === 'monolith' ? 'scale-0' : 'scale-100'}`}></div>
            <div className={`absolute -bottom-8 -left-8 h-32 w-32 rounded-full border border-dashed border-cyan-500/10 pointer-events-none ${activeGeometry === 'fluid' ? 'animate-spin' : ''}`} style={{ animationDuration: '40s' }}></div>

            {/* Slide Header */}
            <div className="flex justify-between items-start z-15">
              <span className={`text-[10px] font-mono uppercase tracking-widest ${activeTheme === 'monolith' ? 'text-amber-500 font-bold' : 'text-cyan-400'}`}>
                Aethelgard Neural Pitch Array
              </span>
              <span className="text-[10px] text-slate-500 font-mono">0{activeIndex + 1} / 0{slides.length}</span>
            </div>

            {/* Slide Body */}
            <div className="z-15 my-auto max-w-[90%]">
              <h1 className={`font-bold font-sans tracking-tight leading-tight ${activeTheme === 'monolith' ? 'text-2xl text-slate-100 font-serif' : 'text-3xl text-white'}`}>
                {activeSlide.title}
              </h1>
              <p className={`text-xs mt-2 ${activeTheme === 'monolith' ? 'text-slate-400' : 'text-slate-350'}`}>
                {activeSlide.subtitle}
              </p>

              {/* Dynamic Geometry Bullet layouts */}
              <div className={`mt-6 space-y-2 text-xs ${activeGeometry === 'grid' ? 'grid grid-cols-2 gap-4 space-y-0' : ''}`}>
                {activeSlide.bullets.map((b, i) => (
                  <div key={i} className="flex items-start space-x-2 text-slate-300">
                    <span className="h-1 w-1 bg-cyan-400 rounded-full mt-1.5 shrink-0"></span>
                    <span className="leading-relaxed text-[11px] font-sans">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Slide Footer */}
            <div className="flex justify-between items-center text-[9px] font-mono text-slate-500 border-t border-slate-900 pt-3 z-15">
              <span>CONFIDENTIAL // DOCTOR ELARA VANCE</span>
              <span>PATENT NO 778-9B2</span>
            </div>
          </div>

          {/* Slide Navigation Pointers HUD */}
          <div className="flex justify-between items-center bg-[#0b0f19]/80 border border-[#1a2536] p-3 rounded-xl shadow-lg">
            <span className="text-xs text-slate-400 font-mono">Slide {activeIndex + 1} of {slides.length}</span>
            <div className="flex space-x-3">
              <button 
                onClick={handlePrevSlide} 
                disabled={activeIndex === 0}
                className="p-2 bg-[#0c121e] border border-cyan-500/20 text-cyan-300 hover:text-white rounded-lg disabled:opacity-30 transition"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button 
                onClick={handleNextSlide} 
                disabled={activeIndex === slides.length - 1}
                className="p-2 bg-[#0c121e] border border-cyan-500/20 text-cyan-300 hover:text-white rounded-lg disabled:opacity-30 transition"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Layout & Style sidebar */}
        <div id="palette-sidebar" className="lg:col-span-3 bg-[#0b0f19]/85 border border-[#1a2536] rounded-xl p-4 shadow-lg flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-wider font-mono text-cyan-400 block font-bold">Design Palette</span>
            
            {/* Themes Selector */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase">Slide Theme template</span>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <button 
                  onClick={() => setActiveTheme('etheric')}
                  className={`py-2 px-3 text-xs font-mono rounded-lg border transition ${activeTheme === 'etheric' ? 'bg-cyan-500/10 border-cyan-500 text-white' : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-white'}`}
                >
                  Etheric Glow
                </button>
                <button 
                  onClick={() => setActiveTheme('monolith')}
                  className={`py-2 px-3 text-xs font-mono rounded-lg border transition ${activeTheme === 'monolith' ? 'bg-amber-500/10 border-amber-500 text-white' : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-white'}`}
                >
                  Monolith Dark
                </button>
              </div>
            </div>

            {/* Geometry Selector */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-slate-500 uppercase">Geometry alignment</span>
              <div className="grid grid-cols-3 gap-1.5 mt-1 text-[10px] font-mono">
                <button 
                  onClick={() => setActiveGeometry('grid')}
                  className={`py-2 rounded-lg border transition ${activeGeometry === 'grid' ? 'bg-cyan-500/10 border-cyan-400 text-white' : 'bg-slate-950/40 border-slate-800 text-slate-400'}`}
                >
                  Grid
                </button>
                <button 
                  onClick={() => setActiveGeometry('asymmetric')}
                  className={`py-2 rounded-lg border transition ${activeGeometry === 'asymmetric' ? 'bg-cyan-500/10 border-cyan-400 text-white' : 'bg-slate-950/40 border-slate-800 text-slate-400'}`}
                >
                  Asym
                </button>
                <button 
                  onClick={() => setActiveGeometry('fluid')}
                  className={`py-2 rounded-lg border transition ${activeGeometry === 'fluid' ? 'bg-cyan-500/10 border-cyan-400 text-white' : 'bg-slate-950/40 border-slate-800 text-slate-400'}`}
                >
                  Fluid
                </button>
              </div>
            </div>

            {/* Export Materializations list */}
            <div className="pt-4 border-t border-[#1a2536] space-y-1.5">
              <span className="text-[10px] uppercase font-mono text-slate-450 block">Export Materializations</span>
              {["Standard Vector PDF", "Native Microsoft PPTX", "Spatial Hologram Array"].map((elem) => (
                <button 
                  key={elem}
                  onClick={() => {
                    alert(`Compiling presentations. Downloading spatial file: Project_Alpha_${elem.split(" ").join("_")}.bin...`);
                  }}
                  className="w-full text-left py-2 px-3 bg-[#0a0f18] hover:bg-[#152238] border border-[#1b2b42] hover:border-slate-600 rounded-lg flex items-center justify-between text-xs text-slate-300 hover:text-white transition group"
                >
                  <span className="font-sans text-[11px]">{elem}</span>
                  <Download className="h-3.5 w-3.5 text-cyan-400 group-hover:scale-110 transition" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Painting generator bar */}
      <div id="slide-generation-status-bar" className="bg-[#0b0f19]/80 border border-[#1a2536] rounded-xl p-4 shadow-lg">
        <div className="flex justify-between items-center text-xs font-mono mb-2">
          <span className="text-slate-400 flex items-center space-x-1">
            <RefreshCw className="h-3 w-3 animate-spin text-cyan-400" />
            <span className="text-cyan-300 font-semibold">{currentPainterTask}</span>
          </span>
          <span className="text-white font-bold">{generationProgress}% Synced</span>
        </div>
        <div className="w-full bg-[#050912] h-2.5 rounded-full overflow-hidden border border-[#1e2a3c]">
          <div 
            className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300"
            style={{ width: `${generationProgress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
