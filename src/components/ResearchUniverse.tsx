import React, { useState, useRef, useEffect } from "react";
import { 
  Search, ZoomIn, ZoomOut, Compass, Plus, Sparkles, BookOpen, 
  Home, FileText, Lightbulb, Link2, Settings as SettingsIcon, 
  Bot, Maximize, Filter, ChevronRight, Activity, Zap 
} from "lucide-react";
import { ResearchPaper } from "../types";

export function ResearchUniverse({ onBack }: { onBack?: () => void }) {
  const [nodes, setNodes] = useState<ResearchPaper[]>([
    { id: "1", title: "Quantum Biophysics", category: "Core Cluster", citations: 1248, field: "Quantum Biology", confidence: 9.9, abstract: "Explores the intersection of quantum mechanics and biological systems, including quantum coherence in photosynthesis, enzyme tunneling, and quantum effects in neural processes.", x: 400, y: 300 },
    { id: "2", title: "Synthetic Systems", category: "Raw Research Paper", citations: 74, field: "Neuromorphic CPU", confidence: 8.6, abstract: "Investigates localized thermal fluctuations within CMOS-fabricated synapses modeled on dendritic spinule pathways.", x: 150, y: 400 },
    { id: "3", title: "Biomolecular Logic", category: "AI Recommendation Link", citations: 112, field: "Bio-processors", confidence: 9.1, abstract: "Formulates cellular diffusion rates as dynamic ternary gate signals, expanding logic density.", x: 700, y: 350 },
    { id: "4", title: "Decoherence Mechanisms", category: "Raw Research Paper", citations: 88, field: "Quantum Biology", confidence: 7.9, abstract: "Applying micro-shielding cells in biological neuro-arrays to preserve quantum spin states.", x: 450, y: 500 },
    { id: "5", title: "Artheria Neural Interfaces", category: "AI Recommendation Link", citations: 128, field: "Deep Learning", confidence: 9.9, abstract: "Architectural specification of the Aethelgard operating loop combining neural outlines.", x: 250, y: 150 },
    { id: "6", title: "Non-linear Dynamics", category: "Topic Cluster Node", citations: 96, field: "Neuromorphic CPU", confidence: 8.4, abstract: "Proves that wetware synaptic junctions calculate continuous double-integrals.", x: 600, y: 150 },
  ]);

  const [activeTab, setActiveTab] = useState<"universe" | "cluster" | "timeline" | "dimension">("universe");
  const [selectedNodeId, setSelectedNodeId] = useState<string>("1");
  const [scale, setScale] = useState<number>(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState("");
  
  const [isMaximized, setIsMaximized] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([
    "Core Cluster", "Topic Cluster Node", "Raw Research Paper", "AI Recommendation Link"
  ]);
  const [mainRoute, setMainRoute] = useState<"universe" | "papers" | "insights" | "connections" | "discover" | "settings">("universe");
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const svgRef = useRef<SVGSVGElement>(null);

  // Generate starfield once
  const [stars, setStars] = useState<{x: number, y: number, r: number, opacity: number, color: string}[]>([]);
  useEffect(() => {
    const newStars = Array.from({ length: 250 }).map(() => ({
      x: Math.random() * 1200,
      y: Math.random() * 800,
      r: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.8 + 0.2,
      color: ['#00ffcc', '#a855f7', '#3b82f6', '#ffffff'][Math.floor(Math.random() * 4)]
    }));
    setStars(newStars);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setOffset({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };
  const handleMouseUp = () => setIsDragging(false);
  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.15, 2));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.15, 0.5));
  const handleRecenter = () => { setScale(1); setOffset({ x: 0, y: 0 }); };

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[0];
  const centralNode = nodes.find(n => n.id === "1") || nodes[0];

  const categoriesMap: Record<string, { color: string, glow: string }> = {
    "Core Cluster": { color: "#00ffcc", glow: "rgba(0, 255, 204, 0.3)" },
    "Topic Cluster Node": { color: "#10b981", glow: "rgba(16, 185, 129, 0.3)" },
    "Raw Research Paper": { color: "#a855f7", glow: "rgba(168, 85, 247, 0.3)" },
    "AI Recommendation Link": { color: "#3b82f6", glow: "rgba(59, 130, 246, 0.3)" },
  };

  return (
    <div className="fixed inset-0 bg-[#050811] text-slate-300 font-sans flex overflow-hidden z-[100]">
      
      {/* LEFT SIDEBAR */}
      <div className="w-20 bg-[#080d19] border-r border-[#152036] flex flex-col items-center py-6 justify-between z-20 shadow-[4px_0_24px_rgba(0,0,0,0.5)] shrink-0">
        <div className="space-y-8 flex flex-col items-center w-full">
          <button onClick={onBack} className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl hover:bg-cyan-500/20 hover:text-white transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] group relative border border-cyan-500/30">
            <Home size={22} />
            <span className="absolute left-14 bg-[#111a2e] border border-[#1e2d4a] text-white text-[10px] uppercase font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">Return to Dashboard</span>
          </button>
          
          <div className="w-8 h-[1px] bg-[#1e2d4a]"></div>
          
          <NavIcon icon={Compass} label="Universe" active />
          <NavIcon icon={FileText} label="Papers" />
          <NavIcon icon={Lightbulb} label="Insights" />
          <NavIcon icon={Link2} label="Connections" />
          <NavIcon icon={Search} label="Discover" />
          <NavIcon icon={SettingsIcon} label="Settings" />
        </div>

        <div className="flex flex-col items-center group cursor-pointer mt-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div className="p-2 border border-cyan-500/30 rounded-full bg-[#0a1222] text-cyan-400 relative">
              <Bot size={24} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#080d19]"></div>
          </div>
          <span className="text-[9px] font-bold text-cyan-400 uppercase mt-2 font-mono tracking-widest">Online</span>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>

        {/* TOP HEADER */}
        <header className="h-24 flex items-center justify-between px-8 border-b border-[#152036] bg-[#050811]/80 backdrop-blur-md z-20 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.15)] relative overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-cyan-400/20 to-transparent transition-opacity"></div>
              <Compass size={24} className="text-cyan-400 group-hover:animate-spin" style={{ animationDuration: '3s' }} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-wider font-display">THE RESEARCH UNIVERSE</h1>
              <p className="text-xs text-slate-400 mt-0.5">Multi-dimensional semantic network topology of interconnected biophysics studies</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <HeaderStat icon={FileText} value="1,248" label="Papers" sub="Across Universe" color="text-cyan-400" />
            <HeaderStat icon={Link2} value="356" label="Topics" sub="Interconnected" color="text-emerald-400" />
            <HeaderStat icon={Sparkles} value="89" label="AI Insights" sub="Generated" color="text-purple-400" />
            <HeaderStat icon={Activity} value="24" label="Disciplines" sub="Linked" color="text-blue-400" />
          </div>
        </header>

        {/* WORKSPACE ROW */}
        <div className="flex-1 flex overflow-hidden p-6 gap-6 z-10">
          
          {mainRoute === "universe" ? (
            <>
          {/* CENTER GRAPH AREA */}
          <div className={`bg-[#090d1a] border border-[#1e2d4a] relative overflow-hidden flex flex-col shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] transition-all duration-300 ${isMaximized ? 'fixed inset-4 z-[200] rounded-2xl shadow-[0_0_100px_rgba(0,0,0,0.9)]' : 'flex-1 rounded-2xl'}`}>
            {/* Top Toolbar inside Graph */}
            <div className="absolute top-6 left-6 z-20 flex items-center gap-2">
              <div className="flex bg-[#050811] border border-[#1e2d4a] rounded-lg p-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 shadow-lg">
                <button 
                  onClick={() => setActiveTab("universe")}
                  className={`px-4 py-2 rounded-md flex items-center gap-2 transition ${activeTab === "universe" ? "bg-[#152036] text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)] border border-cyan-500/20" : "hover:text-white hover:bg-[#152036]/50"}`}
                >
                  <Compass size={14} /> Universe Map
                </button>
                <button 
                  onClick={() => setActiveTab("cluster")}
                  className={`px-4 py-2 rounded-md flex items-center gap-2 transition ${activeTab === "cluster" ? "bg-[#152036] text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)] border border-cyan-500/20" : "hover:text-white hover:bg-[#152036]/50"}`}
                >
                  <Activity size={14} /> Cluster View
                </button>
                <button 
                  onClick={() => setActiveTab("timeline")}
                  className={`px-4 py-2 rounded-md flex items-center gap-2 transition ${activeTab === "timeline" ? "bg-[#152036] text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)] border border-cyan-500/20" : "hover:text-white hover:bg-[#152036]/50"}`}
                >
                  <ClockIcon size={14} /> Timeline
                </button>
                <button 
                  onClick={() => setActiveTab("dimension")}
                  className={`px-4 py-2 rounded-md flex items-center gap-2 transition ${activeTab === "dimension" ? "bg-[#152036] text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.2)] border border-cyan-500/20" : "hover:text-white hover:bg-[#152036]/50"}`}
                >
                  <LayersIcon size={14} /> Dimension View
                </button>
              </div>
            </div>

            <div className="absolute top-6 right-6 z-20 flex gap-2">
              <button 
                onClick={() => {
                  if (isMaximized) setIsMaximized(false);
                  setTimeout(() => searchInputRef.current?.focus(), 100);
                }}
                className="p-2.5 bg-[#050811] border border-[#1e2d4a] rounded-lg text-slate-400 hover:text-white hover:border-cyan-500/50 hover:shadow-[0_0_10px_rgba(6,182,212,0.2)] transition shadow-lg">
                <Search size={18} />
              </button>
              <div className="relative">
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className={`p-2.5 bg-[#050811] border rounded-lg transition shadow-lg ${showFilters ? 'border-cyan-500 text-cyan-400' : 'border-[#1e2d4a] text-slate-400 hover:text-white hover:border-cyan-500/50'}`}>
                  <Filter size={18} />
                </button>
                {showFilters && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-[#050811]/95 backdrop-blur-xl border border-[#1e2d4a] rounded-xl shadow-2xl p-3 flex flex-col gap-1">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 px-1">Filter Nodes</div>
                    {["Core Cluster", "Topic Cluster Node", "Raw Research Paper", "AI Recommendation Link"].map(cat => (
                      <label key={cat} className="flex items-center gap-3 px-2 py-1.5 hover:bg-[#152036] rounded-lg cursor-pointer transition-colors group">
                        <input type="checkbox" className="hidden" checked={activeFilters.includes(cat)} onChange={() => setActiveFilters(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])} />
                        <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border transition-colors ${activeFilters.includes(cat) ? 'bg-cyan-500/20 border-cyan-500' : 'border-slate-600'}`}>
                           {activeFilters.includes(cat) && <div className="w-1.5 h-1.5 rounded-sm bg-cyan-400"></div>}
                        </div>
                        <span className={`text-xs ${activeFilters.includes(cat) ? 'text-slate-300' : 'text-slate-500 group-hover:text-slate-400'}`}>{cat}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
              <button 
                onClick={() => setIsMaximized(!isMaximized)}
                className={`p-2.5 bg-[#050811] border rounded-lg transition shadow-lg ${isMaximized ? 'border-cyan-500 text-cyan-400' : 'border-[#1e2d4a] text-slate-400 hover:text-white hover:border-cyan-500/50 hover:shadow-[0_0_10px_rgba(6,182,212,0.2)]'}`}>
                <Maximize size={18} />
              </button>
            </div>

            {/* Canvas/SVG Area */}
            {activeTab === "universe" && (
              <>
                <div 
                  className="flex-1 cursor-grab active:cursor-grabbing relative bg-transparent"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
              <div 
                className="w-full h-full absolute inset-0"
                style={{
                  transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                  transformOrigin: 'center center',
                  transition: isDragging ? 'none' : 'transform 0.1s ease-out'
                }}
              >
                <svg width="100%" height="100%" viewBox="0 0 1000 800" className="absolute inset-0 overflow-visible">
                  <defs>
                    <radialGradient id="bg-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#0a1530" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#050811" stopOpacity="0" />
                    </radialGradient>
                    
                    {/* Link Gradients */}
                    {nodes.map(n => (
                      <linearGradient key={`grad-${n.id}`} id={`link-grad-${n.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={categoriesMap[centralNode.category]?.color || "#00ffcc"} stopOpacity="0.8" />
                        <stop offset="100%" stopColor={categoriesMap[n.category]?.color || "#fff"} stopOpacity="0.2" />
                      </linearGradient>
                    ))}
                    
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Central Background Glow */}
                  <circle cx="500" cy="400" r="400" fill="url(#bg-glow)" />

                  {/* Starfield */}
                  {stars.map((s, i) => (
                    <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={s.color} opacity={s.opacity} />
                  ))}

                  {/* Concentric Grid Lines around Center */}
                  <g opacity="0.25">
                    <circle cx={centralNode.x} cy={centralNode.y} r="100" fill="none" stroke="#00ffcc" strokeWidth="1" strokeDasharray="4 4" />
                    <circle cx={centralNode.x} cy={centralNode.y} r="200" fill="none" stroke="#00ffcc" strokeWidth="0.5" />
                    <circle cx={centralNode.x} cy={centralNode.y} r="300" fill="none" stroke="#00ffcc" strokeWidth="0.5" strokeDasharray="2 6" />
                    <circle cx={centralNode.x} cy={centralNode.y} r="400" fill="none" stroke="#00ffcc" strokeWidth="0.2" />
                    <circle cx={centralNode.x} cy={centralNode.y} r="500" fill="none" stroke="#00ffcc" strokeWidth="0.1" strokeDasharray="1 10" />
                  </g>

                  {/* Links from Central Node to Others */}
                  {nodes.filter(n => 
                    n.id !== "1" && 
                    activeFilters.includes(n.category) && 
                    activeFilters.includes(centralNode.category) &&
                    (!searchQuery || (n.title.toLowerCase().includes(searchQuery.toLowerCase()) || n.category.toLowerCase().includes(searchQuery.toLowerCase())))
                  ).map(n => {
                    const isSelected = selectedNodeId === n.id || selectedNodeId === "1";
                    return (
                      <g key={`line-${n.id}`}>
                        <line 
                          x1={centralNode.x} y1={centralNode.y} 
                          x2={n.x} y2={n.y} 
                          stroke={`url(#link-grad-${n.id})`}
                          strokeWidth={isSelected ? 3 : 1.5}
                          opacity={isSelected ? 0.9 : 0.5}
                          filter="url(#glow)"
                        />
                        {/* Dot pattern along line */}
                        <line 
                          x1={centralNode.x} y1={centralNode.y} 
                          x2={n.x} y2={n.y} 
                          stroke="#ffffff"
                          strokeWidth="2"
                          strokeDasharray="1 25"
                          opacity="0.5"
                        />
                      </g>
                    );
                  })}

                  {/* Draw Nodes */}
                  {nodes.map(node => {
                    if (!activeFilters.includes(node.category)) return null;
                    if (searchQuery && !node.title.toLowerCase().includes(searchQuery.toLowerCase()) && !node.category.toLowerCase().includes(searchQuery.toLowerCase())) return null;

                    const isSelected = selectedNodeId === node.id;
                    const cat = categoriesMap[node.category] || categoriesMap["Raw Research Paper"];
                    const isCenter = node.id === "1";

                    return (
                      <g 
                        key={node.id} 
                        onClick={(e) => { e.stopPropagation(); setSelectedNodeId(node.id); }}
                        className="cursor-pointer group"
                      >
                        {/* Hover/Selection Halo */}
                        <circle cx={node.x} cy={node.y} r={isCenter ? 55 : (isSelected ? 35 : 25)} fill={cat.glow} className="transition-all duration-500" filter="url(#glow)" />
                        
                        {/* Ambient outer aura */}
                        {isCenter && <circle cx={node.x} cy={node.y} r={80} fill={cat.glow} opacity="0.3" filter="url(#glow)" className="animate-pulse" style={{animationDuration: '3s'}} />}

                        {/* Outer rotating dashed ring */}
                        <circle 
                          cx={node.x} cy={node.y} 
                          r={isCenter ? 40 : 20} 
                          fill="none" 
                          stroke={cat.color} 
                          strokeWidth={1.5} 
                          strokeDasharray={isCenter ? "8 6" : "4 4"} 
                          className="origin-center" 
                          style={{ transformOrigin: `${node.x}px ${node.y}px`, animation: 'spin 20s linear infinite' }} 
                        />
                        
                        {/* Second counter-rotating ring for center */}
                        {isCenter && (
                           <circle 
                           cx={node.x} cy={node.y} 
                           r={32} 
                           fill="none" 
                           stroke={cat.color} 
                           strokeWidth={1} 
                           strokeDasharray="2 4" 
                           className="origin-center" 
                           style={{ transformOrigin: `${node.x}px ${node.y}px`, animation: 'spin 15s linear infinite reverse' }} 
                         />
                        )}

                        {/* Solid Inner Core */}
                        <circle cx={node.x} cy={node.y} r={isCenter ? 14 : 7} fill={cat.color} filter="url(#glow)" className="transition-all duration-300 group-hover:scale-110 origin-center" style={{ transformOrigin: `${node.x}px ${node.y}px` }} />
                        
                        {/* Inner bright spot */}
                        <circle cx={node.x} cy={node.y} r={isCenter ? 6 : 3} fill="#ffffff" />

                        {/* Label Box */}
                        <g transform={`translate(${node.x}, ${node.y + (isCenter ? 65 : 40)})`}>
                          <text 
                            x="0" y="0" 
                            textAnchor="middle" 
                            fill={isSelected ? "#fff" : "#cbd5e1"} 
                            fontSize={isCenter ? "14" : "12"} 
                            fontWeight="bold" 
                            className="font-sans drop-shadow-lg tracking-wide"
                          >
                            {node.title.toUpperCase()}
                          </text>
                          <text 
                            x="0" y="16" 
                            textAnchor="middle" 
                            fill={cat.color} 
                            fontSize={isCenter ? "11" : "10"} 
                            className="font-mono drop-shadow-lg opacity-80"
                          >
                            {isCenter ? node.category : `${node.citations} Papers`}
                          </text>
                        </g>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Bottom Overlay Area inside Map */}
            
            {/* Minimap (Bottom Left) */}
            <div className="absolute bottom-6 left-6 z-20 bg-[#050811]/90 border border-[#1e2d4a] rounded-xl p-3 w-40 h-40 backdrop-blur-md flex flex-col shadow-2xl">
              <div className="flex-1 relative border border-[#1e2d4a] rounded bg-[#0a1222] mb-2 overflow-hidden shadow-inner">
                {/* Simplified mini-nodes relative to 1000x800 viewBox -> scaled to minimap */}
                {nodes.map(n => {
                  const mx = (n.x / 1000) * 100;
                  const my = (n.y / 800) * 100;
                  const isCenter = n.id === "1";
                  const color = categoriesMap[n.category]?.color || "#fff";
                  return (
                    <div key={`mini-${n.id}`} className="absolute rounded-full" 
                         style={{ 
                           left: `${mx}%`, top: `${my}%`, 
                           width: isCenter ? '6px' : '4px', height: isCenter ? '6px' : '4px',
                           backgroundColor: color,
                           transform: 'translate(-50%, -50%)',
                           boxShadow: `0 0 5px ${color}`
                         }}
                    />
                  )
                })}
                
                {/* Viewport Box (Simulated position based on scale/offset) */}
                <div className="absolute border border-white/40 bg-white/5 transition-all duration-100 pointer-events-none"
                     style={{
                       left: `${Math.max(0, -offset.x / (1000 * scale) * 100)}%`,
                       top: `${Math.max(0, -offset.y / (800 * scale) * 100)}%`,
                       width: `${100 / scale}%`,
                       height: `${100 / scale}%`,
                       maxWidth: '100%',
                       maxHeight: '100%'
                     }}
                ></div>
              </div>
              <div className="flex justify-between gap-1">
                <button onClick={handleZoomIn} className="flex-1 bg-[#152036] hover:bg-[#1e2d4a] hover:text-cyan-400 text-slate-300 py-1 rounded text-xs transition flex justify-center"><Plus size={14} /></button>
                <button onClick={handleZoomOut} className="flex-1 bg-[#152036] hover:bg-[#1e2d4a] hover:text-cyan-400 text-slate-300 py-1 rounded text-xs transition flex justify-center"><ZoomOut size={14} /></button>
                <button onClick={handleRecenter} className="flex-1 bg-[#152036] hover:bg-[#1e2d4a] hover:text-cyan-400 text-slate-300 py-1 rounded text-xs transition flex justify-center"><Maximize size={14} /></button>
              </div>
            </div>

            {/* Legend (Bottom Center) */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-6 bg-[#050811]/90 border border-[#1e2d4a] px-6 py-3 rounded-full backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-slate-400 shadow-2xl">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div> Topic Cluster Node</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-[#a855f7] shadow-[0_0_8px_rgba(168,85,247,0.5)]"></div> Raw Research Paper</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-[#3b82f6] shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div> AI Recommendation Link</div>
              <div className="flex items-center gap-2"><div className="w-4 h-[2px] bg-white/40"></div> Semantic Connection</div>
            </div>
              </>
            )}

            {activeTab === "cluster" && (
              <div className="flex-1 relative overflow-hidden bg-transparent">
                <svg width="100%" height="100%" viewBox="0 0 1000 800" className="absolute inset-0">
                  {/* Background grid or circles */}
                  <circle cx="500" cy="400" r="300" fill="none" stroke="#1e2d4a" strokeWidth="1" strokeDasharray="4 4" />
                  <circle cx="500" cy="400" r="200" fill="none" stroke="#1e2d4a" strokeWidth="1" strokeDasharray="4 4" />
                  <circle cx="500" cy="400" r="100" fill="none" stroke="#1e2d4a" strokeWidth="1" strokeDasharray="4 4" />
                  
                  {/* Clusters */}
                  {/* Cluster 1: Quantum Biology */}
                  <g transform="translate(300, 300)">
                    <circle cx="0" cy="0" r="120" fill="rgba(0, 255, 204, 0.05)" stroke="#00ffcc" strokeWidth="1" strokeDasharray="2 2" className="animate-spin" style={{ animationDuration: '20s' }} />
                    <text x="0" y="-130" textAnchor="middle" fill="#00ffcc" fontSize="12" className="font-mono uppercase tracking-widest">Quantum Biology</text>
                    <circle cx="-30" cy="-20" r="15" fill="#00ffcc" filter="url(#glow)" />
                    <circle cx="40" cy="10" r="25" fill="#00ffcc" opacity="0.6" />
                    <circle cx="-10" cy="40" r="10" fill="#00ffcc" opacity="0.8" />
                    <circle cx="20" cy="-40" r="12" fill="#00ffcc" opacity="0.4" />
                    <line x1="-30" y1="-20" x2="40" y2="10" stroke="#00ffcc" opacity="0.5" />
                    <line x1="-30" y1="-20" x2="-10" y2="40" stroke="#00ffcc" opacity="0.5" />
                  </g>

                  {/* Cluster 2: Neuromorphic */}
                  <g transform="translate(700, 450)">
                    <circle cx="0" cy="0" r="150" fill="rgba(168, 85, 247, 0.05)" stroke="#a855f7" strokeWidth="1" strokeDasharray="2 2" className="animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />
                    <text x="0" y="-165" textAnchor="middle" fill="#a855f7" fontSize="12" className="font-mono uppercase tracking-widest">Neuromorphic CPU</text>
                    <circle cx="20" cy="-30" r="30" fill="#a855f7" filter="url(#glow)" />
                    <circle cx="-40" cy="20" r="20" fill="#a855f7" opacity="0.7" />
                    <circle cx="50" cy="40" r="15" fill="#a855f7" opacity="0.5" />
                    <circle cx="-20" cy="-60" r="10" fill="#a855f7" opacity="0.9" />
                    <line x1="20" y1="-30" x2="-40" y2="20" stroke="#a855f7" opacity="0.5" />
                    <line x1="20" y1="-30" x2="50" y2="40" stroke="#a855f7" opacity="0.5" />
                  </g>

                  {/* Cluster 3: Deep Learning */}
                  <g transform="translate(450, 650)">
                    <circle cx="0" cy="0" r="90" fill="rgba(59, 130, 246, 0.05)" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2 2" className="animate-spin" style={{ animationDuration: '15s' }} />
                    <text x="0" y="115" textAnchor="middle" fill="#3b82f6" fontSize="12" className="font-mono uppercase tracking-widest">Deep Learning</text>
                    <circle cx="0" cy="0" r="20" fill="#3b82f6" filter="url(#glow)" />
                    <circle cx="-25" cy="-25" r="10" fill="#3b82f6" opacity="0.6" />
                    <circle cx="25" cy="25" r="12" fill="#3b82f6" opacity="0.8" />
                    <line x1="0" y1="0" x2="-25" y2="-25" stroke="#3b82f6" opacity="0.5" />
                    <line x1="0" y1="0" x2="25" y2="25" stroke="#3b82f6" opacity="0.5" />
                  </g>
                  
                  {/* Connect Clusters */}
                  <line x1="300" y1="300" x2="700" y2="450" stroke="#fff" opacity="0.2" strokeWidth="2" strokeDasharray="5 5" />
                  <line x1="700" y1="450" x2="450" y2="650" stroke="#fff" opacity="0.2" strokeWidth="2" strokeDasharray="5 5" />
                  <line x1="300" y1="300" x2="450" y2="650" stroke="#fff" opacity="0.2" strokeWidth="2" strokeDasharray="5 5" />
                </svg>
              </div>
            )}

            {activeTab === "timeline" && (
              <div className="flex-1 relative overflow-hidden bg-transparent flex flex-col items-center justify-center">
                <svg width="100%" height="400" viewBox="0 0 1000 400" className="overflow-visible">
                  {/* Main Timeline Axis */}
                  <line x1="50" y1="200" x2="950" y2="200" stroke="#1e2d4a" strokeWidth="4" />
                  <line x1="50" y1="200" x2="750" y2="200" stroke="#00ffcc" strokeWidth="4" filter="url(#glow)" />
                  
                  {/* Timeline Nodes */}
                  {[
                    { year: '2021', title: 'Quantum Coherence Theory', x: 150, y: -80, type: 'bottom', color: '#3b82f6' },
                    { year: '2022', title: 'Neural Micro-shielding', x: 350, y: 80, type: 'top', color: '#a855f7' },
                    { year: '2023', title: 'Synthetic Synapses', x: 550, y: -80, type: 'bottom', color: '#10b981' },
                    { year: '2024', title: 'Aethelgard OS Alpha', x: 750, y: 80, type: 'top', color: '#00ffcc' },
                  ].map((node, i) => (
                    <g key={i} className="group cursor-pointer">
                      <line x1={node.x} y1="200" x2={node.x} y2={200 + (node.type === 'top' ? node.y - 20 : node.y + 20)} stroke={node.color} strokeWidth="2" strokeDasharray="2 4" opacity="0.5" />
                      <circle cx={node.x} cy="200" r="8" fill="#050811" stroke={node.color} strokeWidth="3" />
                      <circle cx={node.x} cy="200" r="3" fill={node.color} filter="url(#glow)" className="group-hover:r-4 transition-all" />
                      
                      <g transform={`translate(${node.x}, ${200 + node.y})`}>
                        <rect x="-80" y={node.type === 'top' ? "-10" : "-40"} width="160" height="50" rx="8" fill="#090d1a" stroke="#1e2d4a" className="group-hover:border-cyan-500/50 transition-colors" />
                        <text x="0" y={node.type === 'top' ? "10" : "-20"} textAnchor="middle" fill={node.color} fontSize="14" fontWeight="bold" className="font-mono">{node.year}</text>
                        <text x="0" y={node.type === 'top' ? "26" : "-4"} textAnchor="middle" fill="#cbd5e1" fontSize="10" className="font-sans">{node.title}</text>
                      </g>
                    </g>
                  ))}
                  
                  <circle cx="950" cy="200" r="6" fill="none" stroke="#1e2d4a" strokeWidth="2" />
                </svg>
              </div>
            )}

            {activeTab === "dimension" && (
              <div className="flex-1 relative overflow-hidden bg-transparent flex items-center justify-center">
                <svg width="600" height="600" viewBox="-300 -300 600 600" className="overflow-visible">
                  {/* Radar Chart Grid */}
                  {[1, 2, 3, 4, 5].map(level => (
                    <polygon 
                      key={level}
                      points={Array.from({length: 6}).map((_, i) => {
                        const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
                        const r = level * 40;
                        return `${Math.cos(angle) * r},${Math.sin(angle) * r}`;
                      }).join(' ')}
                      fill={level % 2 === 0 ? "rgba(255,255,255,0.02)" : "none"}
                      stroke="#1e2d4a"
                      strokeWidth="1"
                    />
                  ))}
                  
                  {/* Axes */}
                  {Array.from({length: 6}).map((_, i) => {
                    const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
                    return (
                      <g key={`axis-${i}`}>
                        <line x1="0" y1="0" x2={Math.cos(angle) * 200} y2={Math.sin(angle) * 200} stroke="#1e2d4a" strokeWidth="1.5" strokeDasharray="4 4" />
                        <text 
                          x={Math.cos(angle) * 230} 
                          y={Math.sin(angle) * 230} 
                          textAnchor="middle" 
                          alignmentBaseline="middle"
                          fill="#64748b" 
                          fontSize="10" 
                          className="font-mono uppercase tracking-widest"
                        >
                          {["Semantic", "Temporal", "Citations", "Impact", "Novelty", "Relevance"][i]}
                        </text>
                      </g>
                    )
                  })}
                  
                  {/* Data Polygon 1 */}
                  <polygon 
                    points={Array.from({length: 6}).map((_, i) => {
                      const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
                      const r = [160, 120, 180, 150, 100, 190][i];
                      return `${Math.cos(angle) * r},${Math.sin(angle) * r}`;
                    }).join(' ')}
                    fill="rgba(0, 255, 204, 0.2)"
                    stroke="#00ffcc"
                    strokeWidth="2"
                    filter="url(#glow)"
                  />
                  {/* Data Polygon 2 */}
                  <polygon 
                    points={Array.from({length: 6}).map((_, i) => {
                      const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
                      const r = [110, 170, 130, 190, 150, 100][i];
                      return `${Math.cos(angle) * r},${Math.sin(angle) * r}`;
                    }).join(' ')}
                    fill="rgba(168, 85, 247, 0.2)"
                    stroke="#a855f7"
                    strokeWidth="2"
                    filter="url(#glow)"
                  />
                </svg>
              </div>
            )}

          </div>

          {/* RIGHT SIDEBAR - Analytics */}
          <div className="w-[380px] flex flex-col gap-4 z-10 shrink-0 overflow-hidden">
            {/* Search */}
            <div className="relative shadow-lg shrink-0">
              <input 
                ref={searchInputRef}
                type="text" 
                placeholder="Search paper or topic..." 
                className="w-full bg-[#090d1a] border border-[#1e2d4a] rounded-xl px-10 py-3 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors shadow-inner"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
                <span className="px-1.5 py-0.5 bg-[#152036] rounded text-[10px] text-slate-400 border border-[#1e2d4a]">⌘</span>
                <span className="px-1.5 py-0.5 bg-[#152036] rounded text-[10px] text-slate-400 border border-[#1e2d4a]">K</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 -mr-2 flex flex-col gap-4 pb-4" style={{ scrollbarWidth: 'thin', scrollbarColor: '#1e2d4a transparent' }}>
              {/* Topic Overview Card */}
              <div className="bg-[#090d1a] border border-[#1e2d4a] rounded-xl p-6 relative overflow-hidden flex flex-col shadow-[inset_0_0_30px_rgba(0,0,0,0.5)] shrink-0">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-[40px] pointer-events-none"></div>
              
              <h3 className="text-[10px] uppercase tracking-widest text-slate-500 mb-4 font-bold flex items-center gap-2">
                <Compass size={12} className="text-cyan-400" /> Topic Overview
              </h3>
              
              <div className="flex gap-4 mb-4 items-center">
                <div className="w-14 h-14 rounded-full border-2 border-cyan-500/30 flex items-center justify-center shrink-0 relative bg-[#050811]">
                  <div className="absolute inset-0 rounded-full border border-cyan-400 animate-ping opacity-20"></div>
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center shadow-[0_0_15px_#00ffcc]">
                    <div className="w-3 h-3 rounded-full bg-cyan-300"></div>
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white leading-tight font-display tracking-wide">{selectedNode.title}</h2>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 inline-block mt-1">{selectedNode.category}</span>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed mb-6 font-sans">
                {selectedNode.abstract}
              </p>

              <div className="space-y-3 mb-6 bg-[#050811] rounded-xl p-4 border border-[#1e2d4a] shadow-inner">
                <StatRow label="Related Papers" value={selectedNode.citations.toString()} icon={FileText} />
                <StatRow label="Sub-topics" value="12" icon={Lightbulb} />
                <StatRow label="Connections" value="5" icon={Link2} />
                <StatRow label="AI Insights" value="8" icon={Sparkles} />
                <StatRow label="First Discovered" value="2021" icon={Activity} border={false} />
              </div>

              {/* Cluster Analytics Chart */}
              <div className="mt-auto">
                <h3 className="text-[10px] uppercase tracking-widest text-slate-500 mb-3 font-bold flex items-center gap-2">
                  <Activity size={12} className="text-purple-400" /> Cluster Analytics
                </h3>
                <div className="h-20 w-full relative mb-4 bg-[#050811] rounded-lg border border-[#1e2d4a] overflow-hidden p-1">
                  <svg width="100%" height="100%" viewBox="0 0 300 80" preserveAspectRatio="none" className="overflow-visible">
                    <defs>
                      <linearGradient id="line-grad-1" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="50%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#00ffcc" />
                      </linearGradient>
                      <linearGradient id="line-grad-2" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#10b981" opacity="0.3" />
                        <stop offset="100%" stopColor="#3b82f6" opacity="0.8" />
                      </linearGradient>
                      <filter id="line-glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    {/* Grid lines */}
                    <path d="M0,20 L300,20 M0,40 L300,40 M0,60 L300,60" stroke="#1e2d4a" strokeWidth="0.5" strokeDasharray="2 2" />
                    
                    <path d="M0,60 C50,60 70,20 120,40 C170,60 200,10 250,30 C280,40 300,20 300,20" fill="none" stroke="url(#line-grad-1)" strokeWidth="2.5" filter="url(#line-glow)" />
                    <path d="M0,70 C60,70 90,40 150,50 C210,60 240,30 300,40" fill="none" stroke="url(#line-grad-2)" strokeWidth="1.5" strokeDasharray="4 4" />
                  </svg>
                </div>
                <div className="flex justify-between px-2">
                  <div className="text-center">
                    <div className="text-white font-bold text-sm">118</div>
                    <div className="text-[9px] text-slate-500 uppercase mt-0.5">Total Nodes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white font-bold text-sm">2.4K</div>
                    <div className="text-[9px] text-slate-500 uppercase mt-0.5">Connections</div>
                  </div>
                  <div className="text-center">
                    <div className="text-white font-bold text-sm">7D</div>
                    <div className="text-[9px] text-slate-500 uppercase mt-0.5">Dimensions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-cyan-400 font-bold text-sm drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]">98%</div>
                    <div className="text-[9px] text-slate-500 uppercase mt-0.5">Confidence</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Recommendations */}
            <div className="bg-[#090d1a] border border-[#1e2d4a] rounded-xl p-5 shadow-xl shrink-0">
              <div className="flex justify-between items-center mb-4 border-b border-[#152036] pb-3">
                <h3 className="text-[10px] uppercase tracking-widest text-slate-500 font-bold flex items-center gap-2">
                  <Sparkles size={12} className="text-emerald-400" /> Top Recommendations
                </h3>
                <span className="text-[10px] bg-[#152036] text-cyan-400 px-2 py-1 rounded hover:text-white cursor-pointer transition border border-[#1e2d4a]">View All</span>
              </div>

              <div className="space-y-4">
                <RecommendationItem title="Quantum Coherence in Photosynthetic Complexes" score={98} />
                <RecommendationItem title="Entanglement in Biological Systems" score={95} />
                <RecommendationItem title="Quantum Tunneling in Enzymes" score={93} />
              </div>
            </div>

            </div>
          </div>
          </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-500">
              <Compass size={48} className="mb-4 text-cyan-500/20" />
              <div className="text-xl font-display text-white capitalize">{mainRoute}</div>
              <div className="text-xs">Module initialization pending...</div>
            </div>
          )}
        </div>

        {/* BOTTOM TELEMETRY BAR */}
        <div className="h-14 border-t border-[#152036] bg-[#050811] flex items-center px-8 z-20 justify-between text-[11px] font-mono text-slate-400 shrink-0">
          <div className="flex gap-8 items-center h-full">
            <div className="flex items-center gap-2 bg-[#090d1a] px-3 py-1.5 rounded-md border border-[#152036]">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </div>
              <div>
                <span className="block text-slate-500 text-[8px] uppercase tracking-wider">Network Status</span>
                <span className="text-emerald-400 font-bold text-[10px]">ACTIVE</span>
              </div>
            </div>
            
            {/* Miniature waveform SVG */}
            <svg width="100" height="24" className="opacity-70">
              <path d="M0,12 L10,12 L15,4 L20,20 L25,12 L40,12 L45,8 L50,16 L55,12 L100,12" fill="none" stroke="#10b981" strokeWidth="1.5" />
            </svg>

            <div className="flex items-center gap-3 ml-4">
              <Zap size={14} className="text-slate-500" />
              <div>
                <span className="block text-slate-500 text-[8px] uppercase tracking-wider">Updates</span>
                <span className="text-white text-[10px]">2m ago</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 ml-4">
              <Compass size={14} className="text-cyan-400" />
              <div>
                <span className="block text-slate-500 text-[8px] uppercase tracking-wider">Dimensions</span>
                <span className="text-cyan-400 text-[10px] font-bold drop-shadow-[0_0_2px_#00ffcc]">7D Active</span>
              </div>
            </div>
          </div>

          <div className="flex gap-8 items-center h-full">
            <div>
              <span className="block text-slate-500 text-[8px] uppercase tracking-wider">Velocity</span>
              <span className="text-white text-[10px]">98.7%</span>
            </div>
            <div>
              <span className="block text-slate-500 text-[8px] uppercase tracking-wider">Density</span>
              <span className="text-white text-[10px]">High</span>
            </div>
            {/* Smooth Sine Wave */}
            <svg width="150" height="24" className="opacity-70 ml-2">
              <defs>
                <linearGradient id="wave-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#00ffcc" />
                </linearGradient>
              </defs>
              <path d="M0,12 Q20,2 40,12 T80,12 T120,12 T150,12" fill="none" stroke="url(#wave-grad)" strokeWidth="1.5" />
              <path d="M0,12 Q15,22 30,12 T60,12 T90,12 T150,12" fill="none" stroke="url(#wave-grad)" strokeWidth="1" opacity="0.5" />
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
}

// Subcomponents

function NavIcon({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) {
  return (
    <div className={`flex flex-col items-center gap-1.5 group cursor-pointer w-full py-2 relative`}>
      {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-8 bg-cyan-400 rounded-r shadow-[0_0_10px_#00ffcc]"></div>}
      <Icon size={20} className={`${active ? 'text-cyan-400' : 'text-slate-500 group-hover:text-cyan-400/70'} transition-colors duration-300`} />
      <span className={`text-[9px] font-sans tracking-wide ${active ? 'text-cyan-400 font-bold drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]' : 'text-slate-500 group-hover:text-slate-300'} transition-colors duration-300`}>{label}</span>
    </div>
  );
}

function HeaderStat({ icon: Icon, value, label, sub, color }: { icon: any, value: string, label: string, sub: string, color: string }) {
  return (
    <div className="flex items-center gap-3 bg-[#090d1a]/50 border border-[#152036] px-4 py-2.5 rounded-xl shadow-inner min-w-[160px]">
      <div className={`p-2.5 rounded-lg bg-[#111a2e] border border-[#1e2d4a] ${color} shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]`}>
        <Icon size={18} />
      </div>
      <div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl font-bold text-white leading-none font-display">{value}</span>
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{label}</span>
        </div>
        <span className="text-[9px] text-slate-500 block mt-0.5">{sub}</span>
      </div>
    </div>
  );
}

function StatRow({ label, value, icon: Icon, border = true }: { label: string, value: string, icon: any, border?: boolean }) {
  return (
    <div className={`flex items-center justify-between text-xs pb-2 ${border ? 'border-b border-[#1e2d4a]' : ''}`}>
      <div className="flex items-center gap-2 text-slate-400">
        <Icon size={14} className="text-slate-500" />
        <span>{label}</span>
      </div>
      <span className="text-cyan-400 font-mono font-bold drop-shadow-[0_0_2px_rgba(6,182,212,0.8)]">{value}</span>
    </div>
  );
}

function RecommendationItem({ title, score }: { title: string, score: number }) {
  return (
    <div className="space-y-2 cursor-pointer group bg-[#050811] p-3 rounded-lg border border-[#1e2d4a] hover:border-cyan-500/30 transition-colors">
      <div className="flex items-start gap-2">
        <FileText size={14} className="text-slate-500 mt-0.5 group-hover:text-cyan-400 transition-colors shrink-0" />
        <span className="text-[11px] text-slate-300 leading-snug group-hover:text-white transition-colors line-clamp-2 pr-2 font-sans">{title}</span>
        <span className="text-xs font-mono font-bold text-emerald-400 ml-auto shrink-0">{score}%</span>
      </div>
      <div className="w-full h-1.5 bg-[#152036] rounded-full overflow-hidden ml-6 max-w-[calc(100%-24px)] border border-[#050811]">
        <div className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 shadow-[0_0_5px_#00ffcc]" style={{ width: `${score}%` }}></div>
      </div>
    </div>
  );
}

// Missing icons from lucide-react mapping 
// Since we can't import them if they aren't provided by lucide-react standardly, I'll use inline SVGs or substitute.
function ClockIcon({ size = 24 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  );
}

function LayersIcon({ size = 24 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 12 12 17 22 12"/><polyline points="2 17 12 22 22 17"/></svg>
  );
}
