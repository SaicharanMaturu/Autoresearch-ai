import React, { useState, useEffect } from "react";
import { Cpu, Server, Activity, Flame, ShieldCheck, Zap, Terminal, Plus, RefreshCw, Layers } from "lucide-react";
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
    <div id="neural-core-screen" className="space-y-6">
      {/* 1. Header KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="core-kpis-grid">
        <div id="kpi-load-card" className="bg-[#0b0f19]/80 border border-[#1a2536] rounded-xl p-4 flex items-center justify-between shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 left-0 h-[2px] bg-cyan-400 w-1/3 group-hover:w-full transition-all duration-700"></div>
          <div>
            <span className="text-xs uppercase tracking-wider text-slate-400 block font-mono">GLOBAL LOAD</span>
            <span className="text-3xl font-mono font-bold text-white block mt-1">{globalLoad}%</span>
          </div>
          <div className="p-3 bg-cyan-950/40 rounded-lg border border-cyan-500/20">
            <Cpu className="h-6 w-6 text-cyan-400 animate-pulse" />
          </div>
        </div>

        <div id="kpi-throughput-card" className="bg-[#0b0f19]/80 border border-[#1a2536] rounded-xl p-4 flex items-center justify-between shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 left-0 h-[2px] bg-emerald-400 w-1/3 group-hover:w-full transition-all duration-700"></div>
          <div>
            <span className="text-xs uppercase tracking-wider text-slate-400 block font-mono">THROUGHPUT</span>
            <span className="text-3xl font-mono font-bold text-white block mt-1">{throughput} GB/s</span>
          </div>
          <div className="p-3 bg-emerald-950/40 rounded-lg border border-emerald-500/20">
            <Activity className="h-6 w-6 text-emerald-400" />
          </div>
        </div>

        <div id="kpi-time-card" className="bg-[#0b0f19]/80 border border-[#1a2536] rounded-xl p-4 flex items-center justify-between shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 left-0 h-[2px] bg-purple-400 w-1/3 group-hover:w-full transition-all duration-700"></div>
          <div>
            <span className="text-xs uppercase tracking-wider text-slate-400 block font-mono">ACTIVE INSTANCE IP</span>
            <span className="text-2xl font-mono font-bold text-white block mt-1">AETHEL.NODE.LOCAL</span>
          </div>
          <div className="p-3 bg-purple-950/40 rounded-lg border border-purple-500/20">
            <Server className="h-6 w-6 text-purple-400" />
          </div>
        </div>
      </div>

      {/* 2. Orbit Map / Core Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="core-main-interactive">
        <div id="orbit-graph-panel" className="lg:col-span-8 bg-[#0b0f19]/80 border border-[#1a2536] rounded-xl p-6 shadow-lg flex flex-col justify-between min-h-[440px] relative">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-sm font-semibold tracking-wide text-white uppercase font-mono">Central Agent Web Visualization</h2>
              <span className="text-xs text-slate-400 font-mono">Dynamic multi-relay orchestration map</span>
            </div>
            <div className="flex items-center space-x-2 text-[10px] bg-[#141b2b] text-slate-400 px-2 py-1 rounded border border-[#1e2a3c] font-mono">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span>SYNAPSES ACTIVE</span>
            </div>
          </div>

          {/* SVG Orbit Graphic */}
          <div className="flex-1 flex items-center justify-center relative min-h-[280px]">
            <svg viewBox="0 0 500 400" className="w-full max-w-[460px] h-auto">
              <defs>
                <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#00f3ff" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#0b0f19" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="cyber-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f3ff" />
                  <stop offset="100%" stopColor="#0ea5e9" />
                </linearGradient>
              </defs>

              {/* Pulsing Glow behind master core */}
              <circle cx="250" cy="200" r="110" fill="url(#glow)" className="animate-pulse" />

              {/* Orbiting Ring Trails */}
              <circle cx="250" cy="200" r="120" fill="none" stroke="#1d2e47" strokeWidth="1" strokeDasharray="5 7" />
              <circle cx="250" cy="200" r="140" fill="none" stroke="#253a59" strokeWidth="0.5" />

              {/* Laser Synapse connection lines syncing with agent detail */}
              {/* Line: Master -> Knowledge */}
              <line x1="250" y1="200" x2="360" y2="130" stroke={selectedAgentId === "ocr" ? "#00f3ff" : "#1e3350"} strokeWidth="1.5" strokeDasharray="3 3" />
              {/* Line: Master -> Research */}
              <line x1="250" y1="200" x2="350" y2="280" stroke={selectedAgentId === "research" ? "#22c55e" : "#1e3350"} strokeWidth="1.5" />
              {/* Line: Master -> Vector Memory */}
              <line x1="250" y1="200" x2="150" y2="280" stroke={selectedAgentId === "memory" ? "#b7791f" : "#1e3350"} strokeWidth="1.5" />
              {/* Line: Master -> PPT Studio */}
              <line x1="250" y1="200" x2="140" y2="130" stroke={selectedAgentId === "ppt" ? "#a855f7" : "#1e3350"} strokeWidth="1.5" />

              {/* Dynamic glowing particles flowing along synapses */}
              <circle cx="250" cy="200" r="4" fill="#00f3ff">
                <animateMotion path="M 250 200 L 360 130" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="250" cy="200" r="4" fill="#10b981">
                <animateMotion path="M 250 200 L 350 280" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="250" cy="200" r="4" fill="#a855f7">
                <animateMotion path="M 250 200 L 140 130" dur="3s" repeatCount="indefinite" />
              </circle>

              {/* Central Master Node */}
              <g className="cursor-pointer" onClick={() => setSelectedAgentId("master")}>
                <circle cx="250" cy="200" r="32" fill="#091424" stroke="#00f3ff" strokeWidth="2" className="transition-all duration-300 hover:r-35" />
                <circle cx="250" cy="200" r="26" fill="none" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="4 2" className="animate-spin" style={{ transformOrigin: 'center', animationDuration: '10s' }} />
                <Cpu x="238" y="188" width="24" height="24" className="text-cyan-400" />
                <text x="250" y="248" fill="#fff" fontSize="10" fontFamily="monospace" textAnchor="middle" className="font-bold">MASTER OS</text>
              </g>

              {/* Satellite 1: OCR Scanner (Top Right) */}
              <g className="cursor-pointer" onClick={() => setSelectedAgentId("ocr")}>
                <circle cx="360" cy="130" r="18" fill="#0c111e" stroke={selectedAgentId === "ocr" ? "#00f3ff" : "#1e2a40"} strokeWidth="1.5" />
                <Server x="351" y="121" width="18" height="18" className={selectedAgentId === "ocr" ? "text-cyan-400" : "text-slate-400"} />
                <text x="360" y="160" fill="#cbd5e1" fontSize="9" fontFamily="monospace" textAnchor="middle">OCR Scanner</text>
              </g>

              {/* Satellite 2: Research Core (Bottom Right) */}
              <g className="cursor-pointer" onClick={() => setSelectedAgentId("research")}>
                <circle cx="350" cy="280" r="18" fill="#0c111e" stroke={selectedAgentId === "research" ? "#22c55e" : "#1e2a40"} strokeWidth="1.5" />
                <Activity x="341" y="271" width="18" height="18" className={selectedAgentId === "research" ? "text-emerald-400 animate-bounce" : "text-slate-400"} />
                <text x="350" y="310" fill="#cbd5e1" fontSize="9" fontFamily="monospace" textAnchor="middle">Research Core</text>
              </g>

              {/* Satellite 3: Vector Memory (Bottom Left) */}
              <g className="cursor-pointer" onClick={() => setSelectedAgentId("memory")}>
                <circle cx="150" cy="280" r="18" fill="#0c111e" stroke={selectedAgentId === "memory" ? "#eab308" : "#1e2a40"} strokeWidth="1.5" />
                <Layers x="141" y="271" width="18" height="18" className={selectedAgentId === "memory" ? "text-yellow-400" : "text-slate-400"} />
                <text x="150" y="310" fill="#cbd5e1" fontSize="9" fontFamily="monospace" textAnchor="middle">Memory</text>
              </g>

              {/* Satellite 4: PPT presentation Studio (Top Left) */}
              <g className="cursor-pointer" onClick={() => setSelectedAgentId("ppt")}>
                <circle cx="140" cy="130" r="18" fill="#0c111e" stroke={selectedAgentId === "ppt" ? "#a855f7" : "#1e2a40"} strokeWidth="1.5" />
                <Zap x="131" y="121" width="18" height="18" className={selectedAgentId === "ppt" ? "text-purple-400" : "text-slate-400"} />
                <text x="140" y="160" fill="#cbd5e1" fontSize="9" fontFamily="monospace" textAnchor="middle">PPT Agent</text>
              </g>
            </svg>

            {/* Quick interactive floating tutorial hand */}
            <div className="absolute bottom-2 left-6 text-[10px] text-slate-500 font-mono flex items-center space-x-1">
              <span>* Click on any orbiting satellite node to view detailed diagnostics</span>
            </div>
          </div>
        </div>

        {/* Selected Agent Details Card */}
        <div id="agent-diagnostics-panel" className="lg:col-span-4 bg-[#0b0f19]/80 border border-[#1a2536] rounded-xl p-5 shadow-lg flex flex-col justify-between border-l-cyan-500/40">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-cyan-400 tracking-wider font-semibold uppercase">AGENT WORKSPACE DETECTED</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-semibold ${
                selectedAgent.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                selectedAgent.status === 'syncing' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30 animate-pulse' :
                'bg-slate-500/10 text-slate-400 border border-slate-500/30'
              }`}>
                {selectedAgent.status}
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white font-mono">{selectedAgent.name}</h3>
              <p className="text-xs text-slate-400 mt-1">{selectedAgent.role}</p>
            </div>

            <div className="pt-2 border-t border-[#1e2a3c]">
              <div className="flex justify-between items-center mb-1 text-xs">
                <span className="text-slate-400 font-mono">Quantum Synaptic Flow Level</span>
                <span className="text-white font-bold font-mono">{selectedAgent.load}%</span>
              </div>
              <div className="w-full bg-[#111827] rounded-full h-2 overflow-hidden border border-[#1e2a3c]">
                <div 
                  className={`h-full transition-all duration-1000 ${
                    selectedAgent.id === 'research' ? 'bg-emerald-400' :
                    selectedAgent.id === 'ppt' ? 'bg-purple-400' :
                    selectedAgent.id === 'memory' ? 'bg-yellow-400' :
                    'bg-cyan-400'
                  }`} 
                  style={{ width: `${selectedAgent.load}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-2 mt-4 bg-[#060a13] p-3 rounded-lg border border-[#182236]">
              <span className="text-[10px] font-mono font-medium text-slate-500 block uppercase">Functional Topology Profile</span>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">{selectedAgent.description}</p>
            </div>
          </div>

          <div className="pt-5" id="agent-quick-actions">
            <button 
              onClick={() => {
                alert(`Target agent cycle refreshed: Synchronizing neural links in ${selectedAgent.name}...`);
              }}
              className="w-full flex items-center justify-center space-x-2 bg-[#121c2c] hover:bg-[#1a293f] text-cyan-300 hover:text-white border border-cyan-500/30 hover:border-cyan-400 py-2.5 rounded-lg text-xs font-mono font-medium transition-all"
            >
              <RefreshCw className="h-4 w-4 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Optimise Handshake Index</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Third Row: Inter-Agent Live Relay Logs & Mini Holographic Health */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="core-bottom-grid">
        {/* Terminal Logger */}
        <div id="agent-logger-terminal" className="lg:col-span-8 bg-[#070b13] border border-[#1a2536] rounded-xl p-5 shadow-lg flex flex-col justify-between">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center space-x-2">
              <Terminal className="h-4 w-4 text-cyan-400" />
              <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Inter-Agent Communications</h3>
            </div>
            <span className="text-[10px] font-mono text-slate-500">SYSTEM REBOOT: 6 Days Ago</span>
          </div>

          {/* Logs Area */}
          <div className="space-y-2 max-h-[180px] overflow-y-auto mb-4 font-mono text-xs pr-1 scrollbar-thin scrollbar-thumb-cyan-950">
            {logs.map((log) => (
              <div key={log.id} className="p-2.5 rounded bg-[#0b0f19] border border-[#151f2f] flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 hover:border-cyan-500/25 transition-all">
                <div className="flex items-center space-x-2 min-w-0">
                  <span className="text-slate-500 text-[10px]">{log.time}</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-white font-semibold">{log.from}</span>
                    <span className="text-slate-500">➜</span>
                    <span className="text-cyan-400">{log.to}</span>
                  </div>
                </div>
                <p className="text-slate-300 truncate text-[11px] sm:max-w-[420px]">{log.msg}</p>
                <span className={`text-[9px] px-1.5 py-0.5 rounded self-start sm:self-center shrink-0 ${
                  log.type === "success" ? "bg-emerald-950/40 text-emerald-400 border border-emerald-500/10" :
                  log.type === "warning" ? "bg-amber-950/40 text-amber-400 border border-amber-500/10" :
                  log.type === "user" ? "bg-cyan-950/40 text-cyan-300 border border-cyan-500/30" :
                  "bg-[#131d2b] text-slate-300"
                }`}>
                  {log.type}
                </span>
              </div>
            ))}
          </div>

          {/* Prompt Submission */}
          <form onSubmit={handleSendCommand} className="flex space-x-2 mt-1">
            <input 
              type="text" 
              placeholder={`Send instructions to ${selectedAgent.name}...`}
              value={inputLog}
              onChange={(e) => setInputLog(e.target.value)}
              className="flex-1 bg-[#101726]/80 border border-[#1d2a3f] text-white placeholder-slate-500 text-xs px-3 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-500/50 focus:border-cyan-500 text-sans"
            />
            <button 
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-600 text-black px-4 py-2 rounded-lg text-xs font-mono font-medium flex items-center space-x-1 transition-all"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>DISPATCH</span>
            </button>
          </form>
        </div>

        {/* Right side: Circular holographic health */}
        <div id="holographic-health-panel" className="lg:col-span-4 bg-[#0b0f19]/80 border border-[#1a2536] rounded-xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4">Holographic Health Index</h3>
            
            <div className="flex items-center justify-center p-6 relative">
              {/* Radial Meter with SVG */}
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="56" cy="56" r="48" fill="transparent" stroke="#101726" strokeWidth="6" />
                  <circle cx="56" cy="56" r="48" fill="transparent" stroke="#06b6d4" strokeWidth="6" strokeDasharray="301" strokeDashoffset="75" className="transition-all duration-1000" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-mono font-bold text-white leading-none">75%</span>
                  <span className="text-[9px] text-slate-400 font-mono mt-0.5 uppercase tracking-wide">OPTIMIZED</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2 font-mono text-[11px] pt-2 border-t border-[#1a2536]">
            <div className="flex justify-between text-slate-400">
              <span>NEURAL TEMP:</span>
              <span className="text-white flex items-center space-x-1">
                <Flame className="h-3 w-3 text-amber-500 mr-0.5" />
                32°C
              </span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>SYNC SYNAPSE ACCURACY:</span>
              <span className="text-emerald-400 flex items-center space-x-1">
                <ShieldCheck className="h-3 w-3 text-emerald-400 mr-0.5" />
                99.8%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
