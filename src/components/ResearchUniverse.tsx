import React, { useState, useRef } from "react";
import { Search, ZoomIn, ZoomOut, Compass, Plus, Sparkles, BookOpen, ExternalLink, HelpCircle } from "lucide-react";
import { ResearchPaper } from "../types";

export function ResearchUniverse() {
  const [nodes, setNodes] = useState<ResearchPaper[]>([
    { id: "1", title: "Quantum Biophysical Coherence", category: "Topic Cluster", citations: 452, field: "Quantum Biology", confidence: 9.8, abstract: "Explores coherence times in photosynthetic biological systems under high electromagnetic noise.", x: 250, y: 140 },
    { id: "2", title: "Synthetic Synaptic Weight Triggers", category: "Research Paper", citations: 312, field: "Neuromorphic CPU", confidence: 8.6, abstract: "Investigates localized thermal fluctuations within CMOS-fabricated synapses modeled on dendritic spinule pathways.", x: 120, y: 220 },
    { id: "3", title: "Bio-osmosis Logic Cascades", category: "AI Recommendation", citations: 184, field: "Bio-processors", confidence: 9.1, abstract: "Formulates cellular diffusion rates as dynamic ternary gate signals, expanding logic density by 140%.", x: 380, y: 250 },
    { id: "4", title: "Decoherence Minimization in Wetware", category: "Research Paper", citations: 89, field: "Quantum Biology", confidence: 7.9, abstract: "Applying micro-shielding cells in biological neuro-arrays to preserve quantum spin states at 37°C.", x: 260, y: 300 },
    { id: "5", title: "Aetheris Neural Coupling Array", category: "AI Recommendation", citations: 521, field: "Deep Learning", confidence: 9.9, abstract: "Architectural specification of the Aethelgard operating loop combining neural outlines with dynamic priority buffers.", x: 160, y: 80 },
    { id: "6", title: "Non-linear Dendritic Summation", category: "Topic Cluster", citations: 210, field: "Neuromorphic CPU", confidence: 8.4, abstract: "Proves that wetware synaptic junctions calculate continuous double-integrals under localized ambient temperature loops.", x: 340, y: 90 },
  ]);

  const [selectedNodeId, setSelectedNodeId] = useState<string>("1");
  const [scale, setScale] = useState<number>(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const [searchQuery, setSearchQuery] = useState("");
  const [newPaperTitle, setNewPaperTitle] = useState("");
  const [newPaperCategory, setNewPaperCategory] = useState<'Paper' | 'Topic' | 'AI Recommendation'>("AI Recommendation");

  const svgRef = useRef<SVGSVGElement>(null);

  // Drag interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.15, 2));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.15, 0.5));
  const handleRecenter = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  // Add new paper simulated
  const handleAddCustomNode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPaperTitle.trim()) return;

    const categoriesMap: { [key: string]: 'Paper' | 'Topic' | 'AI Recommendation' } = {
      "Paper": "Research Paper" as any,
      "Topic": "Topic Cluster" as any,
      "AI Recommendation": "AI Recommendation"
    };

    const newNode: ResearchPaper = {
      id: Date.now().toString(),
      title: newPaperTitle,
      category: categoriesMap[newPaperCategory] || ("AI Recommendation" as any),
      citations: Math.floor(Math.random() * 80) + 5,
      field: "Frontier Bio-Computing",
      confidence: parseFloat((Math.random() * 2 + 8).toFixed(1)),
      abstract: "Injected dynamically under Vance protocol. Mapping localized topological nodes to discover unseen research linkages.",
      x: Math.floor(Math.random() * 180) + 160,
      y: Math.floor(Math.random() * 180) + 110
    };

    setNodes(prev => [...prev, newNode]);
    setSelectedNodeId(newNode.id);
    setNewPaperTitle("");
  };

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[0];

  // Filter nodes by query
  const filteredNodes = nodes.filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    n.field.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div id="research-universe-screen" className="space-y-6">
      {/* 1. Header Navigation and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0b0f19]/80 border border-[#1a2536] p-4 rounded-xl shadow-lg">
        <div>
          <h2 className="text-base font-bold text-white font-mono uppercase tracking-wide flex items-center">
            <Compass className="h-5 w-5 text-cyan-400 mr-2 animate-spin" style={{ animationDuration: '40s' }} />
            The Research Universe
          </h2>
          <span className="text-xs text-slate-400 font-sans">Multi-dimensional semantic network topology of interconnected biophysics studies</span>
        </div>

        {/* HUD Statistics */}
        <div className="flex items-center space-x-4 bg-[#070b13] p-2 rounded-lg border border-[#1b273b] font-mono text-[10px]">
          <div className="text-center px-2 py-0.5 border-r border-[#1b273b]">
            <span className="text-slate-500 block uppercase">OS STATUS</span>
            <span className="text-emerald-400 font-bold block">AUTO-RESEARCH COMPLETE</span>
          </div>
          <div className="text-center px-2 py-0.5 border-r border-[#1b273b]">
            <span className="text-slate-500 block uppercase">CORES LOCKED</span>
            <span className="text-white font-bold block">128 THREADS</span>
          </div>
          <div className="text-center px-2">
            <span className="text-slate-500 block uppercase">NODES MAPPED</span>
            <span className="text-cyan-400 font-bold block">{nodes.length} SATELLITES</span>
          </div>
        </div>
      </div>

      {/* 2. Constellation Interactive Stage and HUD Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="universe-interactive-stage">
        {/* Massive SVG stage layout */}
        <div 
          id="galaxy-render-stage" 
          className="lg:col-span-8 bg-[#04070e] border border-[#1e2a3c] rounded-xl relative overflow-hidden h-[480px] cursor-grab select-none shadow-inner"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* HUD Overlay Map Navigation */}
          <div className="absolute top-4 left-4 z-10 flex space-x-1.5" id="hud-nav-buttons">
            <button onClick={handleZoomIn} title="Zoom In" className="p-2 bg-[#0d1424] hover:bg-cyan-950 border border-cyan-500/30 text-cyan-400 rounded-lg hover:text-white transition">
              <ZoomIn className="h-4 w-4" />
            </button>
            <button onClick={handleZoomOut} title="Zoom Out" className="p-2 bg-[#0d1424] hover:bg-cyan-950 border border-cyan-500/30 text-cyan-400 rounded-lg hover:text-white transition">
              <ZoomOut className="h-4 w-4" />
            </button>
            <button onClick={handleRecenter} title="Reset Matrix Position" className="p-2 bg-[#0d1424] hover:bg-cyan-950 border border-cyan-500/30 text-cyan-400 rounded-lg hover:text-white transition">
              <Compass className="h-4 w-4" />
            </button>
          </div>

          <div className="absolute top-4 right-4 z-10 flex items-center space-x-2">
            <div className="bg-[#090d16] border border-[#1b283d] rounded-lg p-1 flex items-center">
              <Search className="h-3.5 w-3.5 text-slate-400 ml-2 mr-1.5" />
              <input 
                type="text" 
                placeholder="Search paper or topic..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-transparent border-none text-white focus:outline-none placeholder-slate-500 text-xs w-36 py-1 pr-2 font-mono"
              />
            </div>
          </div>

          {/* Draggable Universe Viewport */}
          <div 
            className="w-full h-full"
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
              transformOrigin: '0 0',
              transition: isDragging ? 'none' : 'transform 0.15s ease-out'
            }}
          >
            <svg 
              ref={svgRef}
              width="600" 
              height="480" 
              viewBox="0 0 600 480" 
              className="absolute inset-0"
            >
              {/* Universe Grid Backdrop */}
              <defs>
                <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0a1224" strokeWidth="0.5" />
                  <circle cx="40" cy="40" r="1" fill="#1b2a47" opacity="0.4" />
                </pattern>
                
                {/* Neon Glimmers */}
                <radialGradient id="nebula-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#083344" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#020617" stopOpacity="0" />
                </radialGradient>
              </defs>

              <rect width="100%" height="100%" fill="url(#grid-pattern)" />
              <circle cx="300" cy="240" r="220" fill="url(#nebula-glow)" />

              {/* Linking Constellation Lines */}
              {/* Draw connected synapses between nodes dynamically */}
              {filteredNodes.map((n1, i) => 
                filteredNodes.map((n2, j) => {
                  if (i < j && (Math.abs(n1.x - n2.x) < 160 && Math.abs(n1.y - n2.y) < 160)) {
                    const isFocus = n1.id === selectedNodeId || n2.id === selectedNodeId;
                    return (
                      <line
                        key={`link-${n1.id}-${n2.id}`}
                        x1={n1.x}
                        y1={n1.y}
                        x2={n2.x}
                        y2={n2.y}
                        stroke={isFocus ? "#00ffcc" : "#13233f"}
                        strokeWidth={isFocus ? 1.5 : 0.6}
                        strokeDasharray={isFocus ? "4 2" : "none"}
                        className={isFocus ? "animate-pulse" : ""}
                      />
                    );
                  }
                  return null;
                })
              )}

              {/* Node Circles */}
              {filteredNodes.map((node) => {
                const isSelected = node.id === selectedNodeId;
                const isRecomm = node.category.includes("AI");
                const isTopic = node.category.includes("Topic");
                
                // Set node color schemes matching mock graphics
                let dotColor = "#10b981"; // Emerald Topic
                let ringColor = "rgba(16, 185, 129, 0.2)";
                if (isRecomm) {
                  dotColor = "#06b6d4"; // Cyan AI Rec
                  ringColor = "rgba(6, 182, 212, 0.2)";
                } else if (!isRecomm && !isTopic) {
                  dotColor = "#a855f7"; // Purple Research Paper
                  ringColor = "rgba(168, 85, 247, 0.2)";
                }

                return (
                  <g 
                    key={node.id} 
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedNodeId(node.id);
                    }}
                  >
                    {/* Glowing background halo */}
                    <circle cx={node.x} cy={node.y} r={isSelected ? 18 : 12} fill={ringColor} className="transition-all duration-300" />
                    <circle cx={node.x} cy={node.y} r={isSelected ? 10 : 6} fill={dotColor} stroke="#04070e" strokeWidth="2" className="transition-all duration-300" />
                    
                    {/* Floating mini labels on nodes */}
                    <text 
                      x={node.x} 
                      y={node.y - 15} 
                      fill={isSelected ? "#fff" : "#94a3b8"} 
                      fontSize={isSelected ? "9" : "7"} 
                      fontFamily="monospace"
                      textAnchor="middle"
                      className="font-bold pointer-events-none transition-all drop-shadow-lg"
                    >
                      {node.title.substring(0, 15)}...
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Universe Class Legend absolute corner */}
          <div className="absolute bottom-4 right-4 bg-[#090d16]/90 border border-[#1d2d46] p-3 rounded-lg flex flex-col space-y-2 text-[10px] font-mono z-10">
            <span className="text-[9px] uppercase font-bold text-slate-500">Universe Legend</span>
            <div className="flex items-center space-x-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              <span className="text-slate-300">Topic Cluster Node</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="h-2 w-2 rounded-full bg-purple-400"></span>
              <span className="text-slate-300">Raw Research Paper</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
              <span className="text-slate-300">AI Recommendation Link</span>
            </div>
          </div>
        </div>

        {/* Selected Constellation Hub Node Side Drawer details */}
        <div id="universe-details-drawer" className="lg:col-span-4 bg-[#0b0f19]/80 border border-[#1a2536] rounded-xl p-5 shadow-lg flex flex-col justify-between border-t-cyan-400/40 border-t-2">
          <div className="space-y-4">
            <span className="text-[9px] font-mono tracking-widest text-cyan-400 uppercase font-bold">Selected Node Bio-Telemetry</span>
            
            <div className="bg-[#070b13] p-3 rounded-lg border border-[#142033]">
              <span className="text-[10px] font-mono text-cyan-400 block font-semibold">{selectedNode.field}</span>
              <h3 className="text-base font-bold text-white mt-1 leading-snug">{selectedNode.title}</h3>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-[10px] font-mono bg-cyan-950/40 text-cyan-300 px-1.5 py-0.5 rounded border border-cyan-500/20">{selectedNode.category}</span>
                <span className="text-xs text-slate-400 font-mono">Cits: {selectedNode.citations}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[11px] font-mono">
                <span className="text-slate-400">AI Confidence Score</span>
                <span className="text-white font-bold">{selectedNode.confidence} / 10</span>
              </div>
              <div className="w-full bg-[#111827] h-1.5 rounded-full overflow-hidden border border-[#1d2a3c]">
                <div className="bg-cyan-400 h-full" style={{ width: `${selectedNode.confidence * 10}%` }}></div>
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="text-xs font-mono font-bold text-slate-300 uppercase flex items-center">
                <BookOpen className="h-3.5 w-3.5 mr-1 text-cyan-400" />
                Document Abstract
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed font-sans mt-1">
                {selectedNode.abstract}
              </p>
            </div>
          </div>

          {/* Quick injection of Custom AI generated nodes under the constellation */}
          <form onSubmit={handleAddCustomNode} className="pt-4 border-t border-[#1a2536] space-y-2" id="add-constellation-form">
            <span className="text-[9px] font-mono text-slate-500 block uppercase">Manual Node Injection</span>
            <div className="flex flex-col space-y-2">
              <input 
                type="text" 
                placeholder="Name new target hypothesis..." 
                value={newPaperTitle}
                onChange={e => setNewPaperTitle(e.target.value)}
                className="bg-[#080d17] border border-[#1c2d46] text-white placeholder-slate-600 text-xs px-2.5 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
              <div id="category-selector-universe" className="flex items-center space-x-2">
                <select 
                  value={newPaperCategory}
                  onChange={e => setNewPaperCategory(e.target.value as any)}
                  className="bg-[#080d17] border border-[#1c2d46] text-slate-400 text-[10px] p-2 rounded-lg focus:outline-none font-mono"
                >
                  <option value="AI Recommendation">AI Recommend</option>
                  <option value="Topic">Topic Cluster</option>
                  <option value="Paper">Raw Paper</option>
                </select>
                <button 
                  type="submit" 
                  className="flex-1 bg-cyan-500 hover:bg-cyan-600 active:scale-95 text-black font-semibold text-[11px] font-mono py-2 rounded-lg flex items-center justify-center space-x-1 transition-all"
                >
                  <Sparkles className="h-3 w-3" />
                  <span>INJECT HYPOTHESIS</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
