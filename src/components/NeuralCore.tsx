import React, { useState, useEffect } from "react";
import { Cpu, Server, Activity, Flame, ShieldCheck, Zap, Terminal, Plus, RefreshCw, Layers, Database, Radio, Network } from "lucide-react";
import { AgentNode } from "../types";

export function NeuralCore() {
  const [globalLoad, setGlobalLoad] = useState(42.8);
  const [throughput, setThroughput] = useState(1.23);
  const [selectedAgentId, setSelectedAgentId] = useState<string>("master");
  const [logs, setLogs] = useState<Array<{ id: string; time: string; from: string; to: string; msg: string; type: string }>>([
    { id: "1", time: "10:14:02", from: "OCR", to: "Master", msg: "Aetheris research paper scan completed with 99.8% semantic accuracy.", type: "success" },
    { id: "2", time: "10:14:15", from: "Master", to: "Research", msg: "Triggering deep simulation on non-Euclidean quantum decay arrays.", type: "info" },
    { id: "3", time: "10:14:28", from: "Gap Detection", to: "System", msg: "Identified high-relevance frontier in bio-digital osmosis pathway.", type: "warning" },
    { id: "4", time: "10:14:45", from: "PPT Agent", to: "Master", msg: "Presentation slide-deck 04: 'Methodology' vector layers optimized.", type: "success" },
  ]);

  const [inputLog, setInputLog] = useState("");

  // Live simulation ticks
  useEffect(() => {
    const timer = setInterval(() => {
      setGlobalLoad(prev => {
        const delta = (Math.random() - 0.5) * 4;
        return parseFloat(MathsClamp(prev + delta, 35, 55).toFixed(1));
      });
      setThroughput(prev => {
        const delta = (Math.random() - 0.5) * 0.15;
        return parseFloat(MathsClamp(prev + delta, 0.9, 1.6).toFixed(2));
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const MathsClamp = (val: number, min: number, max: number) => {
    return Math.max(min, Math.min(val, max));
  };

  const agents: AgentNode[] = [
    { id: "master", name: "Aethelgard OS Master", role: "Coordination & Task Synthesis", load: 24.1, status: "active", description: "Direct oversight of all sub-agent neural pathways. Manages memory triggers, semantic search index, and runs the main orchestrator loop." },
    { id: "research", name: "Research Core", role: "Hypothesis Modeling", load: 68.4, status: "active", description: "Generates high-fidelity research trails and suggests paper synopses. Specialized in Bio-Digital Convergence metrics and non-linear regression models." },
    { id: "memory", name: "Vector Memory Chamber", role: "Episodic Vector Embeddings", load: 12.0, status: "idle", description: "Calculates live user-alignment scores. Synchronizes previous context histories, preferred vocabulary, and Dr. Vance's historical design outlines." },
    { id: "ppt", name: "PPT Presentation Studio", role: "Slide Deck Layout Composer", load: 84.1, status: "syncing", description: "Transpiles scientific findings into elegant modular presentation graphics. Generates slide ratios, layout matrices, and handles SVG rendering." },
    { id: "ocr", name: "OCR Scanner Core", role: "Analytic Material Transcriber", load: 5.4, status: "idle", description: "Processes physical paper images or standard PDFs, transforming technical charts and chemical structures into digital semantic structures." }
  ];

  const selectedAgent = agents.find(a => a.id === selectedAgentId) || agents[0];

  const handleSendCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputLog.trim()) return;
    const now = new Date();
    const timeStr = now.toTimeString().split(" ")[0];
    setLogs(prev => [
      {
        id: Date.now().toString(),
        time: timeStr,
        from: "Dr. Vance (User)",
        to: selectedAgent.name,
        msg: inputLog,
        type: "user"
      },
      ...prev
    ]);
    setInputLog("");

    // Simulated back-and-forth automated response tick
    setTimeout(() => {
      const respTimeStr = new Date().toTimeString().split(" ")[0];
      setLogs(prev => [
        {
          id: (Date.now() + 1).toString(),
          time: respTimeStr,
          from: selectedAgent.name,
          to: "System Logs",
          msg: `Command accepted. Running process optimization on: "${inputLog.substring(0, 30)}..."`,
          type: "success"
        },
        ...prev
      ]);
    }, 1200);
  };

  return (
    <div id="neural-core-screen" className="min-h-screen w-full bg-[#050811] text-slate-300 font-sans relative overflow-x-hidden p-6 flex flex-col gap-6">
      {/* Immersive Background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjMTUyMDM2IiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIG9wYWNpdHk9IjAuMiI+PHBhdGggZD0iTTAgNjBoNjBNNjAgMGYtNjAgNjAiLz48L2c+PC9zdmc+')] pointer-events-none z-0 opacity-40"></div>
      
      {/* Ambient Orbs */}
      <div className="fixed top-[-10%] left-[20%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none animate-[pulse_10s_infinite] z-0" />
      <div className="fixed bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none animate-[pulse_15s_infinite] z-0" />

      {/* 1. Header KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10" id="core-kpis-grid">
        <div id="kpi-load-card" className="bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] rounded-2xl p-6 flex items-center justify-between shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden group">
          <div className="absolute top-0 left-0 h-[2px] bg-cyan-400 w-1/3 group-hover:w-full transition-all duration-700 shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
          <div className="absolute right-0 bottom-0 w-32 h-32 bg-cyan-500/10 rounded-tl-full blur-xl pointer-events-none transition-opacity opacity-50 group-hover:opacity-100"></div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-slate-500 block font-mono font-bold">Global Load</span>
            <span className="text-4xl font-display font-bold text-white block mt-2 tracking-wide">{globalLoad}%</span>
          </div>
          <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20 shadow-[inset_0_0_15px_rgba(6,182,212,0.1)] group-hover:shadow-[inset_0_0_20px_rgba(6,182,212,0.3)] transition-all">
            <Cpu className="h-8 w-8 text-cyan-400 animate-[pulse_2s_infinite]" />
          </div>
        </div>

        <div id="kpi-throughput-card" className="bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] rounded-2xl p-6 flex items-center justify-between shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden group">
          <div className="absolute top-0 left-0 h-[2px] bg-emerald-400 w-1/3 group-hover:w-full transition-all duration-700 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
          <div className="absolute right-0 bottom-0 w-32 h-32 bg-emerald-500/10 rounded-tl-full blur-xl pointer-events-none transition-opacity opacity-50 group-hover:opacity-100"></div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-slate-500 block font-mono font-bold">Throughput</span>
            <span className="text-4xl font-display font-bold text-white block mt-2 tracking-wide">{throughput} <span className="text-lg text-emerald-400">GB/s</span></span>
          </div>
          <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20 shadow-[inset_0_0_15px_rgba(16,185,129,0.1)] group-hover:shadow-[inset_0_0_20px_rgba(16,185,129,0.3)] transition-all">
            <Activity className="h-8 w-8 text-emerald-400" />
          </div>
        </div>

        <div id="kpi-time-card" className="bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] rounded-2xl p-6 flex items-center justify-between shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden group">
          <div className="absolute top-0 left-0 h-[2px] bg-purple-400 w-1/3 group-hover:w-full transition-all duration-700 shadow-[0_0_10px_rgba(168,85,247,0.8)]"></div>
          <div className="absolute right-0 bottom-0 w-32 h-32 bg-purple-500/10 rounded-tl-full blur-xl pointer-events-none transition-opacity opacity-50 group-hover:opacity-100"></div>
          <div>
            <span className="text-[10px] uppercase tracking-widest text-slate-500 block font-mono font-bold">Active Instance IP</span>
            <span className="text-2xl font-mono font-bold text-white block mt-2 tracking-widest">AETHEL.NODE</span>
          </div>
          <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20 shadow-[inset_0_0_15px_rgba(168,85,247,0.1)] group-hover:shadow-[inset_0_0_20px_rgba(168,85,247,0.3)] transition-all">
            <Server className="h-8 w-8 text-purple-400" />
          </div>
        </div>
      </div>

      {/* 2. Orbit Map / Core Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10 flex-1" id="core-main-interactive">
        <div id="orbit-graph-panel" className="lg:col-span-8 bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] rounded-2xl p-6 shadow-[0_0_40px_rgba(0,0,0,0.5)] flex flex-col justify-between min-h-[500px] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none mix-blend-overlay"></div>
          
          <div className="flex justify-between items-center mb-6 relative z-10">
            <div>
              <h2 className="text-lg font-bold font-display text-white tracking-wide flex items-center gap-3">
                <Network className="text-cyan-400" size={24} /> Central Agent Web Visualization
              </h2>
              <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest block mt-1">Dynamic multi-relay orchestration map</span>
            </div>
            <div className="flex items-center space-x-2 text-[9px] bg-cyan-500/10 text-cyan-400 px-3 py-1.5 rounded-lg border border-cyan-500/30 font-mono uppercase tracking-widest font-bold shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span>Synapses Active</span>
            </div>
          </div>

          {/* SVG Orbit Graphic */}
          <div className="flex-1 flex items-center justify-center relative min-h-[380px] z-10">
            <svg viewBox="0 0 500 400" className="w-full max-w-[500px] h-auto drop-shadow-[0_0_20px_rgba(6,182,212,0.1)]">
              <defs>
                <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#00f3ff" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#0b0f19" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="cyber-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f3ff" />
                  <stop offset="100%" stopColor="#0ea5e9" />
                </linearGradient>
                <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Pulsing Glow behind master core */}
              <circle cx="250" cy="200" r="140" fill="url(#glow)" className="animate-[pulse_4s_infinite]" />

              {/* Orbiting Ring Trails */}
              <circle cx="250" cy="200" r="130" fill="none" stroke="#1e2d4a" strokeWidth="1.5" strokeDasharray="5 10" className="animate-[spin_60s_linear_infinite]" style={{ transformOrigin: '250px 200px' }} />
              <circle cx="250" cy="200" r="160" fill="none" stroke="#2d3f61" strokeWidth="0.5" className="animate-[spin_90s_linear_infinite_reverse]" style={{ transformOrigin: '250px 200px' }} />

              {/* Laser Synapse connection lines syncing with agent detail */}
              {/* Line: Master -> Knowledge */}
              <line x1="250" y1="200" x2="380" y2="110" stroke={selectedAgentId === "ocr" ? "#00f3ff" : "#1e2d4a"} strokeWidth={selectedAgentId === "ocr" ? "2" : "1"} strokeDasharray="4 4" />
              {/* Line: Master -> Research */}
              <line x1="250" y1="200" x2="370" y2="290" stroke={selectedAgentId === "research" ? "#10b981" : "#1e2d4a"} strokeWidth={selectedAgentId === "research" ? "2" : "1"} />
              {/* Line: Master -> Vector Memory */}
              <line x1="250" y1="200" x2="130" y2="290" stroke={selectedAgentId === "memory" ? "#f59e0b" : "#1e2d4a"} strokeWidth={selectedAgentId === "memory" ? "2" : "1"} />
              {/* Line: Master -> PPT Studio */}
              <line x1="250" y1="200" x2="120" y2="110" stroke={selectedAgentId === "ppt" ? "#a855f7" : "#1e2d4a"} strokeWidth={selectedAgentId === "ppt" ? "2" : "1"} />

              {/* Dynamic glowing particles flowing along synapses */}
              <circle cx="250" cy="200" r="3" fill="#00f3ff" filter="url(#neon-glow)">
                <animateMotion path="M 250 200 L 380 110" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="250" cy="200" r="3" fill="#10b981" filter="url(#neon-glow)">
                <animateMotion path="M 250 200 L 370 290" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="250" cy="200" r="3" fill="#a855f7" filter="url(#neon-glow)">
                <animateMotion path="M 250 200 L 120 110" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="250" cy="200" r="3" fill="#f59e0b" filter="url(#neon-glow)">
                <animateMotion path="M 250 200 L 130 290" dur="2.8s" repeatCount="indefinite" />
              </circle>

              {/* Central Master Node */}
              <g className="cursor-pointer transition-all hover:scale-110" style={{ transformOrigin: '250px 200px' }} onClick={() => setSelectedAgentId("master")}>
                <circle cx="250" cy="200" r="38" fill="#050811" stroke={selectedAgentId === "master" ? "#00f3ff" : "#0ea5e9"} strokeWidth="2" filter="url(#neon-glow)" />
                <circle cx="250" cy="200" r="32" fill="none" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="8 4" className="animate-[spin_10s_linear_infinite]" style={{ transformOrigin: '250px 200px' }} />
                <Cpu x="236" y="186" width="28" height="28" className="text-cyan-400" />
                <text x="250" y="258" fill="#fff" fontSize="11" fontFamily="monospace" textAnchor="middle" className="font-bold tracking-widest drop-shadow-md">MASTER OS</text>
              </g>

              {/* Satellite 1: OCR Scanner (Top Right) */}
              <g className="cursor-pointer transition-all hover:scale-110" style={{ transformOrigin: '380px 110px' }} onClick={() => setSelectedAgentId("ocr")}>
                <circle cx="380" cy="110" r="22" fill="#050811" stroke={selectedAgentId === "ocr" ? "#00f3ff" : "#1e2d4a"} strokeWidth="2" filter={selectedAgentId === "ocr" ? "url(#neon-glow)" : ""} />
                <Database x="368" y="98" width="24" height="24" className={selectedAgentId === "ocr" ? "text-cyan-400" : "text-slate-500"} />
                <text x="380" y="148" fill={selectedAgentId === "ocr" ? "#fff" : "#94a3b8"} fontSize="10" fontFamily="monospace" textAnchor="middle" className="tracking-wider font-bold">OCR Scanner</text>
              </g>

              {/* Satellite 2: Research Core (Bottom Right) */}
              <g className="cursor-pointer transition-all hover:scale-110" style={{ transformOrigin: '370px 290px' }} onClick={() => setSelectedAgentId("research")}>
                <circle cx="370" cy="290" r="22" fill="#050811" stroke={selectedAgentId === "research" ? "#10b981" : "#1e2d4a"} strokeWidth="2" filter={selectedAgentId === "research" ? "url(#neon-glow)" : ""} />
                <Activity x="358" y="278" width="24" height="24" className={selectedAgentId === "research" ? "text-emerald-400 animate-pulse" : "text-slate-500"} />
                <text x="370" y="328" fill={selectedAgentId === "research" ? "#fff" : "#94a3b8"} fontSize="10" fontFamily="monospace" textAnchor="middle" className="tracking-wider font-bold">Research Core</text>
              </g>

              {/* Satellite 3: Vector Memory (Bottom Left) */}
              <g className="cursor-pointer transition-all hover:scale-110" style={{ transformOrigin: '130px 290px' }} onClick={() => setSelectedAgentId("memory")}>
                <circle cx="130" cy="290" r="22" fill="#050811" stroke={selectedAgentId === "memory" ? "#f59e0b" : "#1e2d4a"} strokeWidth="2" filter={selectedAgentId === "memory" ? "url(#neon-glow)" : ""} />
                <Layers x="118" y="278" width="24" height="24" className={selectedAgentId === "memory" ? "text-amber-400" : "text-slate-500"} />
                <text x="130" y="328" fill={selectedAgentId === "memory" ? "#fff" : "#94a3b8"} fontSize="10" fontFamily="monospace" textAnchor="middle" className="tracking-wider font-bold">Memory</text>
              </g>

              {/* Satellite 4: PPT presentation Studio (Top Left) */}
              <g className="cursor-pointer transition-all hover:scale-110" style={{ transformOrigin: '120px 110px' }} onClick={() => setSelectedAgentId("ppt")}>
                <circle cx="120" cy="110" r="22" fill="#050811" stroke={selectedAgentId === "ppt" ? "#a855f7" : "#1e2d4a"} strokeWidth="2" filter={selectedAgentId === "ppt" ? "url(#neon-glow)" : ""} />
                <Zap x="108" y="98" width="24" height="24" className={selectedAgentId === "ppt" ? "text-purple-400" : "text-slate-500"} />
                <text x="120" y="148" fill={selectedAgentId === "ppt" ? "#fff" : "#94a3b8"} fontSize="10" fontFamily="monospace" textAnchor="middle" className="tracking-wider font-bold">PPT Agent</text>
              </g>
            </svg>

            {/* Quick interactive floating tutorial hand */}
            <div className="absolute bottom-0 left-4 text-[9px] text-slate-500 font-mono uppercase tracking-widest flex items-center space-x-2 bg-[#050811] px-3 py-1.5 rounded-lg border border-[#1e2d4a]">
              <Radio size={12} className="text-cyan-400 animate-pulse" />
              <span>Click satellite node for diagnostics</span>
            </div>
          </div>
        </div>

        {/* Selected Agent Details Card */}
        <div id="agent-diagnostics-panel" className="lg:col-span-4 bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] rounded-2xl p-6 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col justify-between border-t-4 transition-colors duration-500" 
             style={{ borderTopColor: selectedAgent.id === 'research' ? '#10b981' : selectedAgent.id === 'ppt' ? '#a855f7' : selectedAgent.id === 'memory' ? '#f59e0b' : '#00f3ff' }}>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-400 tracking-widest font-bold uppercase flex items-center gap-2">
                <Terminal size={14} /> Agent Diagnostic
              </span>
              <span className={`text-[9px] font-mono px-3 py-1 rounded-md uppercase font-bold tracking-widest ${
                selectedAgent.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                selectedAgent.status === 'syncing' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30 animate-pulse' :
                'bg-slate-800/50 text-slate-400 border border-slate-700'
              }`}>
                {selectedAgent.status}
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white font-display tracking-wide">{selectedAgent.name}</h3>
              <p className="text-sm text-cyan-400 font-mono mt-1">{selectedAgent.role}</p>
            </div>

            <div className="pt-4 border-t border-[#1e2d4a]">
              <div className="flex justify-between items-center mb-2 text-xs">
                <span className="text-slate-400 font-mono uppercase tracking-widest text-[9px]">Quantum Synaptic Flow</span>
                <span className="text-white font-bold font-mono text-sm">{selectedAgent.load}%</span>
              </div>
              <div className="w-full bg-[#050811] rounded-full h-2.5 overflow-hidden border border-[#1e2d4a] shadow-inner">
                <div 
                  className={`h-full transition-all duration-1000 relative`}
                  style={{ 
                    width: `${selectedAgent.load}%`,
                    backgroundColor: selectedAgent.id === 'research' ? '#10b981' : selectedAgent.id === 'ppt' ? '#a855f7' : selectedAgent.id === 'memory' ? '#f59e0b' : '#00f3ff'
                  }}
                >
                  <div className="absolute inset-0 bg-white/20 w-full animate-[slide_2s_linear_infinite]" style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)' }}></div>
                </div>
              </div>
            </div>

            <div className="bg-[#050811] p-4 rounded-xl border border-[#1e2d4a] shadow-[inset_0_0_15px_rgba(0,0,0,0.5)]">
              <span className="text-[9px] font-mono font-bold text-slate-500 block uppercase tracking-widest mb-2 border-b border-[#1e2d4a] pb-2">Functional Topology Profile</span>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">{selectedAgent.description}</p>
            </div>
          </div>

          <div className="pt-6 mt-4 border-t border-[#1e2d4a]" id="agent-quick-actions">
            <button 
              onClick={() => {
                alert(`Target agent cycle refreshed: Synchronizing neural links in ${selectedAgent.name}...`);
              }}
              className="w-full flex items-center justify-center space-x-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:border-cyan-400 py-3 rounded-xl text-[10px] font-mono font-bold tracking-widest uppercase transition-all shadow-[0_0_15px_rgba(6,182,212,0.1)] hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Optimise Handshake Index</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Third Row: Inter-Agent Live Relay Logs & Mini Holographic Health */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10" id="core-bottom-grid">
        {/* Terminal Logger */}
        <div id="agent-logger-terminal" className="lg:col-span-8 bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] rounded-2xl p-6 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col justify-between h-[300px]">
          <div className="flex justify-between items-center mb-4 border-b border-[#1e2d4a] pb-4">
            <div className="flex items-center space-x-3">
              <Terminal className="h-5 w-5 text-cyan-400" />
              <h3 className="text-sm font-mono font-bold text-white uppercase tracking-widest">Inter-Agent Communications</h3>
            </div>
            <span className="text-[9px] font-mono text-slate-500 bg-[#050811] px-2 py-1 rounded border border-[#1e2d4a] uppercase tracking-widest">Sys. Reboot: 6 Days Ago</span>
          </div>

          {/* Logs Area */}
          <div className="flex-1 overflow-y-auto mb-4 font-mono text-xs pr-2 custom-scrollbar space-y-3">
            {logs.map((log) => (
              <div key={log.id} className="p-3 rounded-xl bg-[#050811] border border-[#1e2d4a] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-cyan-500/30 transition-all group">
                <div className="flex items-center space-x-3 min-w-0">
                  <span className="text-slate-600 text-[10px]">{log.time}</span>
                  <div className="flex items-center space-x-2 bg-[#090d1a] px-2 py-1 rounded-md border border-[#1e2d4a]">
                    <span className="text-white font-bold text-[10px]">{log.from}</span>
                    <span className="text-slate-600 text-[10px]">➜</span>
                    <span className="text-cyan-400 font-bold text-[10px]">{log.to}</span>
                  </div>
                </div>
                <p className="text-slate-300 truncate text-xs sm:max-w-[400px] font-sans group-hover:text-white transition-colors">{log.msg}</p>
                <span className={`text-[9px] px-2 py-1 rounded-md uppercase tracking-widest font-bold shrink-0 ${
                  log.type === "success" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                  log.type === "warning" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
                  log.type === "user" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" :
                  "bg-slate-800/50 text-slate-400 border border-slate-700"
                }`}>
                  {log.type}
                </span>
              </div>
            ))}
          </div>

          {/* Prompt Submission */}
          <form onSubmit={handleSendCommand} className="flex gap-3 mt-2 relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <input 
              type="text" 
              placeholder={`Transmit instruction packet to ${selectedAgent.name}...`}
              value={inputLog}
              onChange={(e) => setInputLog(e.target.value)}
              className="flex-1 bg-[#050811] relative z-10 border border-[#1e2d4a] text-white placeholder-slate-600 text-sm px-4 py-3 rounded-xl focus:outline-none focus:border-cyan-500/50 font-sans shadow-inner"
            />
            <button 
              type="submit"
              className="relative z-10 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:border-cyan-400 px-6 py-3 rounded-xl text-[10px] font-mono font-bold uppercase tracking-widest flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(6,182,212,0.1)] hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]"
            >
              <Plus size={14} />
              <span>Dispatch</span>
            </button>
          </form>
        </div>

        {/* Right side: Circular holographic health */}
        <div id="holographic-health-panel" className="lg:col-span-4 bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] rounded-2xl p-6 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col justify-between h-[300px] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-cyan-500/20 transition-colors duration-700"></div>
          
          <div>
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
              <Activity size={16} className="text-cyan-400" /> Holographic Health
            </h3>
            
            <div className="flex items-center justify-center relative">
              {/* Radial Meter with SVG */}
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                  <circle cx="64" cy="64" r="54" fill="transparent" stroke="#1e2d4a" strokeWidth="6" />
                  <circle cx="64" cy="64" r="54" fill="transparent" stroke="#00f3ff" strokeWidth="6" strokeDasharray="339" strokeDashoffset="84" className="transition-all duration-1000" />
                  {/* Decorative inner ring */}
                  <circle cx="64" cy="64" r="42" fill="transparent" stroke="#1e2d4a" strokeWidth="1" strokeDasharray="4 4" className="animate-[spin_20s_linear_infinite]" style={{ transformOrigin: 'center' }} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-display font-bold text-white leading-none tracking-wide">75%</span>
                  <span className="text-[8px] text-cyan-400 font-mono mt-1 uppercase tracking-widest font-bold">Optimized</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 font-mono text-[10px] pt-4 border-t border-[#1e2d4a] uppercase tracking-widest">
            <div className="flex justify-between items-center text-slate-400 bg-[#050811] p-2 rounded-lg border border-[#1e2d4a]">
              <span>Neural Temp</span>
              <span className="text-white flex items-center gap-1 font-bold">
                <Flame size={12} className="text-amber-500" />
                32°C
              </span>
            </div>
            <div className="flex justify-between items-center text-slate-400 bg-[#050811] p-2 rounded-lg border border-[#1e2d4a]">
              <span>Sync Accuracy</span>
              <span className="text-emerald-400 flex items-center gap-1 font-bold">
                <ShieldCheck size={12} className="text-emerald-400" />
                99.8%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
