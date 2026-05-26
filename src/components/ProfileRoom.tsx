import React, { useState, useEffect, useRef } from "react";
import { Send, FileText, Plus, UserCheck, ShieldCheck, Activity, Award, Bookmark, Settings, Eye } from "lucide-react";
import { Message } from "../types";

export function ProfileRoom() {
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

    try {
      // Fetch from our full-stack server Gemini API endpoint!
      const activePaperNames = uploadedPapers.filter(p => p.active).map(p => p.name).join(", ");
      
      const promptContext = 
        `[CONTEXT: Dr. Vance is utilizing uploaded papers: [${activePaperNames}]. Active notes state: "${activeNotes}"]\n\n` + 
        userMsg.text;

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: promptContext,
          history: messages.slice(-4).map(m => ({ sender: m.sender, text: m.text }))
        })
      });

      const data = await response.json();
      
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "agent",
          text: data.text || "Handshake complete. No further insights generated.",
          timestamp: new Date().toTimeString().split(" ")[0].substring(0, 5)
        }
      ]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "agent",
          text: "**[HANDSHAKE FAILURE]** Offline backup system active. Re-routing through local synapset arrays. Coherence model looks fully optimized at ambient ranges.",
          timestamp: new Date().toTimeString().split(" ")[0].substring(0, 5)
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div id="profile-room-screen" className="space-y-6">
      {/* Top Profile Card Header & Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="profile-metrics-card">
        {/* Human Profile Hero Details */}
        <div className="lg:col-span-8 bg-[#0b0f19]/80 border border-[#1a2536] p-5 rounded-xl shadow-lg relative flex flex-col justify-between overflow-hidden border-l-cyan-400 border-l-2">
          <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-radial-gradient from-cyan-400/5 to-transparent pointer-events-none"></div>
          
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="h-16 w-16 bg-[#121c2e] border-2 border-cyan-400 rounded-xl flex items-center justify-center font-mono text-2xl font-bold text-white relative shadow-lg">
              EV
              <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 bg-emerald-400 rounded-full border-2 border-[#0c1220] flex items-center justify-center" title="Online alignment">
                <span className="h-1.5 w-1.5 bg-white rounded-full animate-ping"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-bold font-sans text-white">Dr. Elara Vance</h1>
                <span className="text-[9px] font-mono bg-purple-950/40 text-purple-300 border border-purple-500/20 py-0.5 px-2 rounded-full uppercase">Lead AI Architect</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">Specialized in quantum-molecular biological synapses and continuous neuromorphic gate structures.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-6 text-[10px] font-mono pt-3 border-t border-[#162334]">
            <div className="flex items-center text-slate-400">
              <UserCheck className="h-3.5 w-3.5 text-cyan-400 mr-1" />
              TRUST RATIO: <span className="text-white font-bold ml-1">98.4/100</span>
            </div>
            <div className="flex items-center text-slate-400">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 mr-1" />
              INTEGRITY MATRIX: <span className="text-emerald-400 font-bold ml-1">STABLE</span>
            </div>
            <div className="flex items-center text-slate-400">
              <Activity className="h-3.5 w-3.5 text-purple-400 mr-1" />
              COGNITIVE SYNC: <span className="text-purple-300 font-bold ml-1">99.8% ACCURATE</span>
            </div>
          </div>
        </div>

        {/* Radar of skills or active credentials mapping */}
        <div className="lg:col-span-4 bg-[#0b0f19]/80 border border-[#1a2536] p-4 rounded-xl shadow-lg flex flex-col justify-between">
          <span className="text-[9px] uppercase tracking-wider font-mono text-slate-500 block">Neural Skill Matrices</span>
          
          <div className="flex justify-center py-2 relative">
            {/* Custom SVG Skills polygon polygon chart represent */}
            <svg viewBox="0 0 120 120" className="h-24 w-24">
              <polygon points="60,10 110,40 110,90 60,110 10,90 10,40" fill="none" stroke="#1d2e46" strokeWidth="1" />
              <polygon points="60,25 95,48 95,83 60,98 25,83 25,48" fill="none" stroke="#2a4162" strokeWidth="0.5" />
              {/* Colored active score */}
              <polygon points="60,22 105,42 98,85 60,95 24,78 18,48" fill="rgba(6, 185, 129, 0.15)" stroke="#10b981" strokeWidth="1.5" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-[8px] font-mono text-emerald-400">
              <span>98.4 COGN</span>
            </div>
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono text-slate-450 border-t border-[#1a2536] pt-1">
            <span>BIO-COMPUTING EXP</span>
            <span className="text-white font-bold uppercase">LEVEL 8 SENIOR</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Row: Scientific AI Chat & Sidebar document indexes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="profile-main-interaction">
        {/* Chatbot module representing Doctor-Core Handshake */}
        <div id="ai-handshake-chat" className="lg:col-span-8 bg-[#04070e] border border-[#1a2536] rounded-xl p-5 shadow-lg flex flex-col justify-between min-h-[420px]">
          <div>
            <div className="flex justify-between items-center border-b border-[#162334] pb-3 mb-4">
              <div>
                <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Aethelgard OS Neural Researcher AI</h3>
                <span className="text-[10px] text-slate-400 font-sans">Active feedback and collaborative hypothesis loop</span>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 animate-pulse">● FEEDBACK CORE ONLINE</span>
            </div>

            {/* Messages stage */}
            <div className="space-y-4 max-h-[260px] overflow-y-auto mb-4 font-sans text-xs scrollbar-thin scrollbar-thumb-cyan-950 pr-1 select-text">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`p-3 rounded-xl max-w-[85%] border shadow-md relative ${
                    m.sender === "user" ? "bg-cyan-950/20 border-cyan-500/30 text-white" : "bg-[#0b0f19] border-[#1a2336] text-slate-300"
                  }`}>
                    <span className="text-[9px] font-mono text-slate-500 block mb-1">
                      {m.sender === "user" ? "Doctor Vance" : "Neural OS Core"} ({m.timestamp})
                    </span>
                    <p className="leading-relaxed whitespace-pre-wrap select-text font-sans">{m.text}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="p-3 bg-[#0b0f19] border border-[#1a2336] rounded-xl text-slate-400">
                    <span className="text-[9px] font-mono text-cyan-400 block mb-1">Neural Core</span>
                    <div className="flex space-x-1.5 py-1">
                      <span className="h-1.5 w-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="h-1.5 w-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="h-1.5 w-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messageEndRef}></div>
            </div>
          </div>

          {/* Submission bar */}
          <form onSubmit={handleSendMessage} className="flex space-x-2 mt-2">
            <input 
              type="text" 
              placeholder="Query the Neural Universe regarding biological coherence, synapses, logic gates..."
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              className="flex-1 bg-[#090d15] border border-[#1b2b40] text-white placeholder-slate-500 text-xs px-3.5 py-3 rounded-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
            />
            <button 
              type="submit"
              disabled={isTyping}
              className="bg-cyan-500 hover:bg-cyan-600 text-black px-5 py-3 rounded-lg text-xs font-mono font-bold flex items-center space-x-1 transition disabled:opacity-40"
            >
              <Send className="h-3.5 w-3.5" />
              <span>HANDSHAKE</span>
            </button>
          </form>
        </div>

        {/* Left Sidebars: Uploaded Papers & Active Notes context values */}
        <div id="ai-papers-context-sidebar" className="lg:col-span-4 space-y-6">
          {/* Active Workstation notes panel */}
          <div className="bg-[#0b0f19]/80 border border-[#1a2536] p-4 rounded-xl shadow-lg space-y-3">
            <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider block">Active Notes Workspace</span>
            <textarea 
              value={activeNotes}
              onChange={e => setActiveNotes(e.target.value)}
              className="w-full bg-[#070b13] border border-[#182334] rounded-lg p-2.5 text-xs text-slate-350 leading-relaxed font-sans focus:outline-none focus:border-cyan-500 h-24 resize-none"
              placeholder="Incorporate active scientific notes to append to contextual chatbot handshakes..."
            />
            <p className="text-[9px] text-slate-500 font-mono">* Adjusting these notes appended inline automatically to prompt generation calls.</p>
          </div>

          {/* Uploaded Papers toggle checkbox list columns */}
          <div className="bg-[#0b0f19]/80 border border-[#1a2536] p-4 rounded-xl shadow-lg space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-wider">Semantic PDF Sources</span>
              <button 
                onClick={handleUploadPaperMock}
                className="p-1.5 bg-[#121c2e] hover:bg-cyan-950 border border-cyan-500/30 text-cyan-400 hover:text-white rounded transition text-[10px] font-mono flex items-center space-x-1"
              >
                <Plus className="h-3 w-3" />
                <span>UPLOAD</span>
              </button>
            </div>

            <div className="space-y-2" id="papers-checkbox-group">
              {uploadedPapers.map((paper) => (
                <div 
                  key={paper.id}
                  onClick={() => handleTogglePaper(paper.id)}
                  className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                    paper.active ? "bg-cyan-950/20 border-cyan-500/30 hover:border-cyan-400/50" : "bg-[#060a12]/50 border-[#142031] hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center space-x-2 min-w-0">
                    <FileText className={`h-4 w-4 shrink-0 ${paper.active ? "text-cyan-400" : "text-slate-500"}`} />
                    <div className="truncate pr-2">
                      <span className={`text-[11px] font-medium block truncate ${paper.active ? "text-white" : "text-slate-500"}`}>{paper.name}</span>
                      <span className="text-[9px] text-slate-500 block font-mono">{paper.size} • {paper.citations} cits Mapped</span>
                    </div>
                  </div>

                  {/* Toggle Indicator indicator */}
                  <div className={`h-3.5 w-3.5 rounded border flex items-center justify-center shrink-0 ${
                    paper.active ? "bg-cyan-500 border-cyan-500" : "border-[#1c2e45]"
                  }`}>
                    {paper.active && <span className="h-1.5 w-1.5 bg-black rounded-full"></span>}
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
