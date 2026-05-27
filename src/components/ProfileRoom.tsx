import React, { useState, useEffect, useRef } from "react";
import { Send, FileText, Plus, UserCheck, ShieldCheck, Activity, Award, Bookmark, Settings, Eye, ChevronLeft, Fingerprint, Network, Radio } from "lucide-react";
import { Message } from "../types";

export function ProfileRoom({ onBack }: { onBack?: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { id: "msg-1", sender: "agent", text: "Welcome, Dr. Vance. I have indexed the topological voids in your Opportunity Matrix. Ready to process correlations between wetware photosynthesis pathways and quantum decay templates.", timestamp: "10:11" }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Active notes block
  const [activeNotes, setActiveNotes] = useState<string>(
    "Focusing on suppressing quantum decoherence spikes inside carbon-membrane cellular arrays at ambient temperatures. Vance-Protocol 77 active."
  );

  // Uploaded papers columns
  const [uploadedPapers, setUploadedPapers] = useState([
    { id: "p1", name: "Photo_Pathway_Coherence.pdf", size: "4.2 MB", active: true, citations: 452 },
    { id: "p2", name: "Quantum_Decay_Decoherence_Spec.pdf", size: "1.8 MB", active: true, citations: 89 },
    { id: "p3", name: "Ternary_Silicon_CMOS_Gates.pdf", size: "12.4 MB", active: false, citations: 312 },
  ]);

  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleTogglePaper = (id: string) => {
    setUploadedPapers(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));
  };

  const handleUploadPaperMock = (e: React.FormEvent) => {
    e.preventDefault();
    const mockFileNames = [
      "Biosynthesis_Mitosis_v2.pdf",
      "Neuromorphic_Dendrite_Tolerances.pdf",
      "Crystalline_Peptide_Synthesis.pdf",
      "Holographic_Spatial_Optima.pdf"
    ];
    const newName = mockFileNames[Math.floor(Math.random() * mockFileNames.length)];
    const newPaper = {
      id: Date.now().toString(),
      name: newName,
      size: `${(Math.random() * 8 + 1).toFixed(1)} MB`,
      active: true,
      citations: Math.floor(Math.random() * 200) + 10
    };
    setUploadedPapers(prev => [...prev, newPaper]);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: inputVal,
      timestamp: new Date().toTimeString().split(" ")[0].substring(0, 5)
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "agent",
          text: "Handshake complete. Correlating query with topological datasets in Vance-Protocol 77.",
          timestamp: new Date().toTimeString().split(" ")[0].substring(0, 5)
        }
      ]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div id="profile-room-screen" className="min-h-screen w-full bg-[#050811] text-slate-300 font-sans relative overflow-x-hidden p-6 flex flex-col gap-6">
      
      {/* Immersive Background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjMTUyMDM2IiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIG9wYWNpdHk9IjAuMiI+PHBhdGggZD0iTTAgNjBoNjBNNjAgMGYtNjAgNjAiLz48L2c+PC9zdmc+')] pointer-events-none z-0 opacity-40"></div>
      
      {/* Ambient Orbs */}
      <div className="fixed top-[-10%] right-[20%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none animate-[pulse_10s_infinite] z-0" />
      <div className="fixed bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none animate-[pulse_15s_infinite] z-0" />

      {/* Top Profile Card Header & Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10" id="profile-metrics-card">
        
        {/* Human Profile Hero Details */}
        <div className="lg:col-span-8 bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] p-6 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden group">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-cyan-500/10 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          
          <div className="flex flex-col sm:flex-row sm:items-start space-y-6 sm:space-y-0 sm:space-x-6 relative z-10">
            <div className="h-24 w-24 bg-[#050811] border-2 border-cyan-500/50 rounded-2xl flex items-center justify-center font-display text-3xl font-bold text-white relative shadow-[inset_0_0_20px_rgba(6,182,212,0.2)] group-hover:shadow-[inset_0_0_30px_rgba(6,182,212,0.4)] transition-all duration-500">
              <div className="absolute inset-0 bg-cyan-400/10 rounded-xl animate-ping opacity-20"></div>
              EV
              <span className="absolute -bottom-2 -right-2 h-5 w-5 bg-emerald-400 rounded-full border-[3px] border-[#090d1a] flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.5)]" title="Online alignment">
                <span className="h-2 w-2 bg-white rounded-full animate-pulse"></span>
              </span>
            </div>

            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold font-display text-white tracking-wide">Dr. Elara Vance</h1>
                <span className="text-[9px] font-mono bg-purple-500/10 text-purple-400 border border-purple-500/30 py-1 px-2.5 rounded-lg uppercase tracking-widest font-bold">Lead AI Architect</span>
              </div>
              <p className="text-sm text-slate-400 font-sans leading-relaxed max-w-2xl mb-4">
                Specialized in quantum-molecular biological synapses and continuous neuromorphic gate structures. Operator Clearance Level: <span className="text-cyan-400">Omega</span>
              </p>
              
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-[#050811] px-3 py-1.5 rounded-lg border border-[#1e2d4a]">
                  <Fingerprint size={12} className="text-cyan-400" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Identity: <span className="text-white font-bold">Verified</span></span>
                </div>
                <div className="flex items-center gap-2 bg-[#050811] px-3 py-1.5 rounded-lg border border-[#1e2d4a]">
                  <Radio size={12} className="text-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Status: <span className="text-emerald-400 font-bold">Online</span></span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 mt-8 pt-5 border-t border-[#1e2d4a] relative z-10">
            <div className="flex items-center gap-2 bg-cyan-500/5 px-4 py-2 rounded-xl border border-cyan-500/20">
              <UserCheck className="h-4 w-4 text-cyan-400" />
              <div className="flex flex-col">
                <span className="text-[8px] font-mono uppercase tracking-widest text-slate-500">Trust Ratio</span>
                <span className="text-sm font-mono font-bold text-white">98.4/100</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 bg-emerald-500/5 px-4 py-2 rounded-xl border border-emerald-500/20">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <div className="flex flex-col">
                <span className="text-[8px] font-mono uppercase tracking-widest text-slate-500">Integrity Matrix</span>
                <span className="text-sm font-mono font-bold text-emerald-400">Stable</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 bg-purple-500/5 px-4 py-2 rounded-xl border border-purple-500/20">
              <Activity className="h-4 w-4 text-purple-400" />
              <div className="flex flex-col">
                <span className="text-[8px] font-mono uppercase tracking-widest text-slate-500">Cognitive Sync</span>
                <span className="text-sm font-mono font-bold text-purple-400">99.8%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Radar of skills or active credentials mapping */}
        <div className="lg:col-span-4 bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] p-6 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-[40px] pointer-events-none"></div>
          
          <span className="text-[10px] uppercase tracking-widest font-mono text-emerald-400 font-bold flex items-center gap-2">
            <Network size={14} /> Neural Skill Matrices
          </span>
          
          <div className="flex justify-center py-6 relative flex-1">
            {/* Custom SVG Skills polygon polygon chart represent */}
            <svg viewBox="0 0 120 120" className="h-32 w-32 drop-shadow-[0_0_15px_rgba(16,185,129,0.3)] group-hover:scale-105 transition-transform duration-500">
              <polygon points="60,10 110,40 110,90 60,110 10,90 10,40" fill="none" stroke="#1e2d4a" strokeWidth="1" />
              <polygon points="60,25 95,48 95,83 60,98 25,83 25,48" fill="none" stroke="#334155" strokeWidth="0.5" />
              {/* Colored active score */}
              <polygon points="60,22 105,42 98,85 60,95 24,78 18,48" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" strokeWidth="1.5" className="animate-[pulse_4s_infinite]" />
              
              {/* Plot points */}
              <circle cx="60" cy="22" r="2" fill="#10b981" />
              <circle cx="105" cy="42" r="2" fill="#10b981" />
              <circle cx="98" cy="85" r="2" fill="#10b981" />
              <circle cx="60" cy="95" r="2" fill="#10b981" />
              <circle cx="24" cy="78" r="2" fill="#10b981" />
              <circle cx="18" cy="48" r="2" fill="#10b981" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-emerald-400 font-mono drop-shadow-[0_0_5px_rgba(0,0,0,0.8)]">
              <span className="text-xl font-bold">98.4</span>
              <span className="text-[8px] uppercase tracking-widest">Cognitive</span>
            </div>
          </div>

          <div className="flex justify-between items-center bg-[#050811] p-3 rounded-xl border border-[#1e2d4a]">
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Bio-Computing Exp</span>
            <span className="text-white font-mono font-bold text-[10px] uppercase tracking-widest">Level 8 Senior</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Row: Scientific AI Chat & Sidebar document indexes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10 flex-1" id="profile-main-interaction">
        
        {/* Chatbot module representing Doctor-Core Handshake */}
        <div className="lg:col-span-8 bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] rounded-2xl p-6 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col min-h-[500px]">
          
          <div className="flex justify-between items-center border-b border-[#1e2d4a] pb-4 mb-6">
            <div>
              <h3 className="text-sm font-mono font-bold text-white uppercase tracking-widest flex items-center gap-2">
                <Network size={16} className="text-cyan-400" /> Aethelgard Neural Handshake
              </h3>
              <span className="text-[10px] text-slate-400 font-mono uppercase tracking-widest block mt-1">Active feedback and collaborative hypothesis loop</span>
            </div>
            <div className="flex items-center gap-2 bg-cyan-500/10 px-3 py-1.5 rounded-lg border border-cyan-500/30">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest font-bold">Core Online</span>
            </div>
          </div>

          {/* Messages stage */}
          <div className="flex-1 overflow-y-auto mb-6 pr-2 custom-scrollbar space-y-6">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`p-4 rounded-2xl max-w-[85%] relative group ${
                  m.sender === "user" 
                    ? "bg-cyan-500/10 border border-cyan-500/30 text-white rounded-tr-sm" 
                    : "bg-[#050811] border border-[#1e2d4a] text-slate-300 rounded-tl-sm"
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`h-1.5 w-1.5 rounded-full ${m.sender === 'user' ? 'bg-cyan-400' : 'bg-purple-400'}`}></span>
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest font-bold flex-1">
                      {m.sender === "user" ? "Doctor Vance" : "Neural OS Core"}
                    </span>
                    <span className="text-[9px] font-mono text-slate-600">{m.timestamp}</span>
                  </div>
                  <p className="leading-relaxed whitespace-pre-wrap font-sans text-sm">{m.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="p-4 bg-[#050811] border border-[#1e2d4a] rounded-2xl rounded-tl-sm text-slate-400">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                    <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest font-bold">Processing</span>
                  </div>
                  <div className="flex space-x-2 py-2 px-1">
                    <span className="h-2 w-2 bg-cyan-400/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="h-2 w-2 bg-cyan-400/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="h-2 w-2 bg-cyan-400/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messageEndRef}></div>
          </div>

          {/* Submission bar */}
          <form onSubmit={handleSendMessage} className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative flex gap-3 bg-[#050811] p-2 rounded-xl border border-[#1e2d4a]">
              <input 
                type="text" 
                placeholder="Query the Neural Universe regarding biological coherence..."
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder-slate-600 text-sm px-4 py-2 focus:outline-none font-sans"
              />
              <button 
                type="submit"
                disabled={isTyping || !inputVal.trim()}
                className="bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:border-cyan-400 px-6 py-2 rounded-lg text-[10px] uppercase tracking-widest font-mono font-bold flex items-center space-x-2 transition-all disabled:opacity-40 disabled:hover:bg-cyan-500/10 disabled:hover:border-cyan-500/30"
              >
                <Send size={14} />
                <span>Transmit</span>
              </button>
            </div>
          </form>
        </div>

        {/* Left Sidebars: Uploaded Papers & Active Notes context values */}
        <div className="lg:col-span-4 space-y-6 flex flex-col h-full">
          
          {/* Active Workstation notes panel */}
          <div className="bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] p-6 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)] flex-1 flex flex-col">
            <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-4 flex items-center gap-2">
              <FileText size={14} /> Active Notes Workspace
            </span>
            <textarea 
              value={activeNotes}
              onChange={e => setActiveNotes(e.target.value)}
              className="w-full flex-1 min-h-[120px] bg-[#050811] border border-[#1e2d4a] rounded-xl p-4 text-sm text-slate-300 leading-relaxed font-sans focus:outline-none focus:border-cyan-500/50 resize-none custom-scrollbar"
              placeholder="Incorporate active scientific notes to append to contextual chatbot handshakes..."
            />
            <p className="text-[9px] text-slate-500 font-mono mt-3 uppercase tracking-widest flex items-center gap-1.5 bg-[#050811] p-2 rounded-lg border border-[#1e2d4a]">
              <Eye size={12} className="text-cyan-400" /> Notes act as context parameters.
            </p>
          </div>

          {/* Uploaded Papers toggle checkbox list columns */}
          <div className="bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] p-6 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                <Bookmark size={14} /> Semantic PDF Sources
              </span>
              <button 
                onClick={handleUploadPaperMock}
                className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-lg transition-all text-[9px] uppercase tracking-widest font-mono font-bold flex items-center space-x-1"
              >
                <Plus size={12} />
                <span>Upload</span>
              </button>
            </div>

            <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1 custom-scrollbar">
              {uploadedPapers.map((paper) => (
                <div 
                  key={paper.id}
                  onClick={() => handleTogglePaper(paper.id)}
                  className={`p-3 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-between group ${
                    paper.active ? "bg-emerald-500/10 border-emerald-500/40 shadow-[inset_0_0_15px_rgba(16,185,129,0.05)]" : "bg-[#050811] border-[#1e2d4a] hover:border-slate-600"
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className={`p-2 rounded-lg border ${paper.active ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400' : 'bg-[#090d1a] border-[#1e2d4a] text-slate-500'}`}>
                      <FileText size={14} />
                    </div>
                    <div className="truncate pr-2">
                      <span className={`text-xs font-sans font-bold block truncate transition-colors ${paper.active ? "text-white" : "text-slate-400 group-hover:text-slate-200"}`}>{paper.name}</span>
                      <span className="text-[9px] text-slate-500 block font-mono uppercase tracking-widest mt-0.5">{paper.size} • {paper.citations} Cits</span>
                    </div>
                  </div>

                  {/* Toggle Indicator */}
                  <div className={`h-4 w-4 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                    paper.active ? "bg-emerald-500/20 border-emerald-500/50" : "bg-[#090d1a] border-[#1e2d4a]"
                  }`}>
                    {paper.active && <span className="h-2 w-2 bg-emerald-400 rounded-sm shadow-[0_0_5px_rgba(16,185,129,0.8)]"></span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
