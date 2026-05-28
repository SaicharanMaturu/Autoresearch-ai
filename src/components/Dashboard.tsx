import React, { useState, useEffect } from 'react';
import { Search, Upload, Brain, TrendingUp, Clock, FileText, Zap, Settings, LogOut, Cpu, Shield, Activity, Target, Network, Layers, Bell, Mic, GitBranch, Radio } from 'lucide-react';
import apiFetch from '../utils/api';

export function Dashboard({ 
  userName = 'Researcher', 
  onNavigate,
  onLogout
}: { 
  userName?: string; 
  onNavigate: (page: string) => void;
  onLogout: () => void;
}) {
  const [systemStatus, setSystemStatus] = useState('Synchronizing...');
  const [searchQuery, setSearchQuery] = useState('');
  const [bootProgress, setBootProgress] = useState(0);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    '[00:00] Core bootstrap initialized...',
    '[00:01] Neural mesh synchronized.',
    '[00:02] Waiting for operator command.',
  ]);
  const [processingQueue, setProcessingQueue] = useState([
    { id: 'p1', name: 'PINN_Grid_Study.pdf', stage: 'Uploading...', progress: 24 },
    { id: 'p2', name: 'Federated_Energy_Model.docx', stage: 'Extracting text...', progress: 51 },
    { id: 'p3', name: 'SmartCityVectors.txt', stage: 'Vectorizing...', progress: 78 },
  ]);
  const [systemHealth, setSystemHealth] = useState({
    cpu: 34,
    embeddingSpeed: 142,
    activeVectors: 12840,
    storage: 58,
  });
  const [notifications] = useState([
    'New research gap detected in Smart Grid forecasting',
    'Presentation deck generated successfully',
    'Data packet upload completed: PINN_Grid_Study.pdf',
  ]);

  // Simulate status updates and boot sequence
  useEffect(() => {
    const statuses = ['Active', 'Optimizing Vectors', 'Learning Patterns', 'Analyzing Topologies', 'Stable'];
    const statusInterval = setInterval(() => {
      setSystemStatus(statuses[Math.floor(Math.random() * statuses.length)]);
    }, 4000);

    const bootInterval = setInterval(() => {
      setBootProgress(prev => {
        if (prev >= 100) {
          clearInterval(bootInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => {
      clearInterval(statusInterval);
      clearInterval(bootInterval);
    };
  }, []);

  useEffect(() => {
    const logTemplates = [
      'Processing paper payload...',
      'Extracting semantic vectors...',
      'Detecting frontier research gaps...',
      'Generating topology embeddings...',
      'Refreshing retrieval memory index...',
      'Compiling operator insight summary...',
    ];

    const logInterval = setInterval(() => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const nextLog = `[${hh}:${mm}] ${logTemplates[Math.floor(Math.random() * logTemplates.length)]}`;
      setTerminalLogs((prev) => [...prev.slice(-5), nextLog]);
    }, 3200);

    const queueInterval = setInterval(() => {
      setProcessingQueue((prev) =>
        prev.map((item) => {
          const nextProgress = item.progress + Math.floor(Math.random() * 8 + 2);
          if (nextProgress >= 100) {
            return { ...item, progress: 100, stage: 'Completed' };
          }
          if (nextProgress > 75) return { ...item, progress: nextProgress, stage: 'Creating vectors...' };
          if (nextProgress > 45) return { ...item, progress: nextProgress, stage: 'Analyzing...' };
          return { ...item, progress: nextProgress, stage: 'Uploading...' };
        })
      );
    }, 2200);

    const healthInterval = setInterval(() => {
      setSystemHealth((prev) => ({
        cpu: Math.max(12, Math.min(95, prev.cpu + Math.floor(Math.random() * 11) - 5)),
        embeddingSpeed: Math.max(90, Math.min(220, prev.embeddingSpeed + Math.floor(Math.random() * 15) - 7)),
        activeVectors: Math.max(10000, prev.activeVectors + Math.floor(Math.random() * 240) - 80),
        storage: Math.max(28, Math.min(91, prev.storage + Math.floor(Math.random() * 7) - 3)),
      }));
    }, 3500);

    return () => {
      clearInterval(logInterval);
      clearInterval(queueInterval);
      clearInterval(healthInterval);
    };
  }, []);

  const [recentPapers, setRecentPapers] = useState<any[]>([
    { id: 'mock-1', title: 'Bio-Digital Neural Optimization', date: '2024-05-23', type: 'ENCRYPTED-PDF', integrity: '99.8%' },
    { id: 'mock-2', title: 'Non-Euclidean Data Structures', date: '2024-05-22', type: 'RAW-DATA', integrity: '94.2%' },
    { id: 'mock-3', title: 'Quantum Synaptic Bridges', date: '2024-05-21', type: 'ANALYSIS', integrity: '100%' },
  ]);
  const [papersUploadedCount, setPapersUploadedCount] = useState<number>(3);
  const [researchVectorsCount, setResearchVectorsCount] = useState<number>(12);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiFetch('/api/profile');
        if (res.ok) {
          const data = await res.json();
          if (data && data.profile) {
            setPapersUploadedCount(data.profile.papersUploaded || 0);
            setResearchVectorsCount(data.profile.researchTopics || 12);
            if (data.files && data.files.length > 0) {
              const mappedFiles = data.files.map((file: any) => ({
                id: file.id,
                title: file.name,
                date: file.uploadedAt || file.date,
                type: file.type || 'FILE',
                integrity: '100%'
              }));
              // Combine user uploads with some fallback mocks
              const defaultMocks = [
                { id: 'mock-1', title: 'Bio-Digital Neural Optimization', date: '2024-05-23', type: 'ENCRYPTED-PDF', integrity: '99.8%' },
                { id: 'mock-2', title: 'Non-Euclidean Data Structures', date: '2024-05-22', type: 'RAW-DATA', integrity: '94.2%' },
              ];
              setRecentPapers([...mappedFiles, ...defaultMocks].slice(0, 3));
            }
          }
        }
      } catch (err) {
        console.error('Failed to load profile telemetry', err);
      }
    })();
  }, []);

  const navigationItems = [
    { id: 'universe', label: 'Research Universe', icon: Network, color: 'cyan' },
    { id: 'gap-lab', label: 'Gap Lab Topology', icon: Target, color: 'rose' },
    { id: 'streams', label: 'Live Data Streams', icon: Activity, color: 'emerald' },
    { id: 'chamber', label: 'Memory Chamber', icon: Clock, color: 'purple' },
    { id: 'studio', label: 'Holographic Studio', icon: FileText, color: 'amber' },
    { id: 'agents', label: 'Agent Monitor', icon: Radio, color: 'emerald' },
    { id: 'profile', label: 'Operator Profile', icon: Shield, color: 'blue' },
    { id: 'settings', label: 'System Settings', icon: Settings, color: 'slate' },
  ];

  const agentStates = [
    { name: 'Research Agent', status: 'Active', tone: 'emerald' },
    { name: 'Memory Agent', status: 'Learning', tone: 'amber' },
    { name: 'OCR Agent', status: 'Scanning', tone: 'emerald' },
    { name: 'Gap Agent', status: 'Analyzing', tone: 'amber' },
    { name: 'PPT Agent', status: 'Idle', tone: 'rose' },
  ];

  const modelStates = [
    { name: 'Gemini 3.5 Flash', status: 'Online', tone: 'emerald' },
    { name: 'DeepSeek Engine', status: 'Active', tone: 'cyan' },
    { name: 'RAG Engine', status: 'Connected', tone: 'emerald' },
    { name: 'ChromaDB', status: 'Synced', tone: 'cyan' },
  ];

  const getColorClasses = (color: string) => {
    const classes = {
      cyan: 'text-cyan-400 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] border-cyan-500/30 group-hover:border-cyan-400',
      rose: 'text-rose-400 group-hover:shadow-[0_0_20px_rgba(244,63,94,0.5)] border-rose-500/30 group-hover:border-rose-400',
      emerald: 'text-emerald-400 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] border-emerald-500/30 group-hover:border-emerald-400',
      purple: 'text-purple-400 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] border-purple-500/30 group-hover:border-purple-400',
      amber: 'text-amber-400 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] border-amber-500/30 group-hover:border-amber-400',
      blue: 'text-blue-400 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] border-blue-500/30 group-hover:border-blue-400',
      slate: 'text-slate-400 group-hover:shadow-[0_0_20px_rgba(148,163,184,0.5)] border-slate-500/30 group-hover:border-slate-400',
    };
    return classes[color as keyof typeof classes] || classes.cyan;
  };

  return (
    <div className="min-h-screen w-full bg-[#050811] text-slate-300 font-sans relative overflow-x-hidden">
      
      {/* Immersive Deep Space & Grid Background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjMTUyMDM2IiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIG9wYWNpdHk9IjAuMiI+PHBhdGggZD0iTTAgNjBoNjBNNjAgMGYtNjAgNjAiLz48L2c+PC9zdmc+')] pointer-events-none z-0"></div>
      
      {/* Dynamic Background Orbs */}
      <div className="fixed top-[-10%] right-[-5%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none animate-[pulse_10s_ease-in-out_infinite] z-0" />
      <div className="fixed bottom-[-10%] left-[-5%] w-[700px] h-[700px] bg-purple-500/10 rounded-full blur-[150px] pointer-events-none animate-[pulse_14s_ease-in-out_infinite] z-0" />
      <div className="fixed top-[40%] left-[30%] w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none animate-[pulse_8s_ease-in-out_infinite] z-0" />

      {/* Header Console */}
      <header className="relative z-40 bg-[#090d1a]/80 backdrop-blur-xl border-b border-[#1e2d4a] shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 group cursor-default">
            <div className="relative w-12 h-12 flex items-center justify-center bg-[#050811] rounded-xl border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <div className="absolute inset-0 rounded-xl bg-cyan-400/10 group-hover:bg-cyan-400/20 transition-colors"></div>
              <Cpu className="text-cyan-400 w-6 h-6 group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-[#050811] animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold font-display text-white tracking-widest uppercase drop-shadow-[0_0_10px_rgba(6,182,212,0.4)]">
                Aethelgard OS
              </h1>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping"></span>
                  Neural Core v7.0
                </span>
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest border-l border-[#1e2d4a] pl-3">
                  Uplink: Secure
                </span>
              </div>
            </div>
          </div>
          
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 bg-[#050811] border border-[#1e2d4a] text-slate-400 hover:text-rose-400 hover:border-rose-500/50 rounded-xl transition-all duration-300 shadow-lg group font-mono text-[10px] uppercase tracking-widest"
          >
            <LogOut size={14} className="group-hover:-translate-x-1 transition-transform" />
            Sever Connection
          </button>
        </div>
        {/* Scanning header line */}
        <div className="absolute bottom-0 left-0 h-[1px] w-full bg-transparent overflow-hidden">
          <div className="h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent w-1/3 animate-[slide_3s_ease-in-out_infinite]"></div>
        </div>
      </header>

      {/* Main Content Dashboard */}
      <main className="max-w-7xl mx-auto px-6 py-10 relative z-10 animate-[fadeIn_0.5s_ease-out]">
        
        {/* Operator Welcome Panel */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6 bg-[#090d1a]/60 backdrop-blur-md border border-[#1e2d4a] p-8 rounded-2xl shadow-[inset_0_0_30px_rgba(0,0,0,0.5)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-cyan-500/10 to-transparent pointer-events-none"></div>
          
          <div className="space-y-3 relative z-10">
            <h2 className="text-3xl font-display font-bold text-white tracking-wide">
              Operator: <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 animate-[gradient_3s_linear_infinite] bg-[length:200%_auto] uppercase">{userName}</span>
            </h2>
            <p className="text-xs font-mono text-slate-400 uppercase tracking-widest">
              Welcome to the Aethelgard Neural Research Environment. All systems optimal.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto relative z-10">
            {/* Search Input */}
            <div className="relative group flex-1 md:w-[28rem]">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative flex items-center bg-[#050811] border border-[#1e2d4a] rounded-xl px-4 py-3">
                <Search size={16} className="text-cyan-400 mr-3" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Query Aethelgard DB..." 
                  className="bg-transparent border-none outline-none text-slate-200 placeholder-slate-600 text-sm font-mono w-full"
                />
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {['Papers', 'Chats', 'Topics', 'Datasets', 'Research Ideas'].map((scope) => (
                  <span key={scope} className="text-[9px] font-mono uppercase tracking-widest text-slate-500 border border-[#1e2d4a] bg-[#050811] px-2 py-1 rounded">
                    {scope}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Upload Button */}
            <button 
              onClick={() => onNavigate('upload')}
              className="relative group overflow-hidden rounded-xl p-[1px]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 opacity-70 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]"></span>
              <div className="relative bg-[#050811] px-6 py-3 rounded-xl flex items-center justify-center gap-2 group-hover:bg-[#050811]/50 transition-colors duration-300 h-full">
                <Upload size={16} className="text-cyan-400 group-hover:text-white transition-colors group-hover:-translate-y-1 group-hover:scale-110 duration-300" />
                <span className="text-cyan-400 font-bold group-hover:text-white transition-colors text-xs uppercase tracking-widest font-mono">
                  Inject Data
                </span>
              </div>
            </button>

            <button className="h-fit relative group overflow-hidden rounded-xl p-[1px]">
              <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 opacity-60 group-hover:opacity-100 transition-opacity duration-500"></span>
              <div className="relative bg-[#050811] p-3 rounded-xl border border-[#1e2d4a] text-slate-300 group-hover:text-white transition-colors">
                <Bell size={16} />
                <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-rose-400 animate-pulse"></span>
              </div>
            </button>
          </div>
        </div>

        {/* Neural Core & Telemetry Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* AI Neural Core Visualization */}
          <div className="lg:col-span-5 bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] rounded-2xl p-8 shadow-xl relative overflow-hidden flex flex-col items-center justify-center min-h-[360px] group">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-[60px] group-hover:bg-cyan-500/20 transition-colors duration-700"></div>
            
            <div className="relative w-40 h-40 flex items-center justify-center mb-8">
              {/* Spinning Rings */}
              <div className="absolute inset-0 border-[2px] border-cyan-500/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute inset-2 border-[2px] border-dashed border-purple-500/30 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
              <div className="absolute inset-6 border-[2px] border-emerald-500/20 rounded-full animate-[spin_8s_linear_infinite]"></div>
              
              {/* Core Brain */}
              <div className="relative z-10 w-16 h-16 bg-[#050811] rounded-2xl border border-cyan-400/50 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.3)] animate-pulse">
                <Brain size={32} className="text-cyan-400" />
              </div>

              {/* Connecting Nodes */}
              <div className="absolute top-0 right-1/2 w-1 h-4 bg-cyan-400 shadow-[0_0_10px_#00ffcc]"></div>
              <div className="absolute bottom-0 right-1/2 w-1 h-4 bg-cyan-400 shadow-[0_0_10px_#00ffcc]"></div>
              <div className="absolute top-1/2 right-0 w-4 h-1 bg-purple-400 shadow-[0_0_10px_#a855f7]"></div>
              <div className="absolute top-1/2 left-0 w-4 h-1 bg-purple-400 shadow-[0_0_10px_#a855f7]"></div>
            </div>

            <h3 className="text-xl font-bold font-display uppercase tracking-widest text-white mb-2 relative z-10">Aethelgard Core</h3>
            
            <div className="flex items-center gap-2 mb-6 relative z-10">
              <Activity size={14} className="text-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">{systemStatus}</span>
            </div>

            <div className="w-full max-w-xs relative z-10">
              <div className="flex justify-between text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1.5">
                <span>Boot Sequence</span>
                <span className="text-cyan-400">{bootProgress}%</span>
              </div>
              <div className="h-1.5 w-full bg-[#050811] rounded-full overflow-hidden border border-[#1e2d4a]">
                <div className="h-full bg-cyan-400 shadow-[0_0_10px_#00ffcc] transition-all duration-75" style={{ width: `${bootProgress}%` }}></div>
              </div>
            </div>
          </div>

          {/* Telemetry Stats Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] rounded-2xl p-6 relative overflow-hidden group hover:border-cyan-500/50 transition-colors">
              <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/10 rounded-bl-full"></div>
              <FileText className="text-cyan-400 mb-4" size={24} />
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block mb-1">Data Packets Uploaded</span>
              <span className="text-3xl font-display font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">{papersUploadedCount}</span>
            </div>

            <div className="bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] rounded-2xl p-6 relative overflow-hidden group hover:border-purple-500/50 transition-colors">
              <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/10 rounded-bl-full"></div>
              <Target className="text-purple-400 mb-4" size={24} />
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block mb-1">Research Vectors</span>
              <span className="text-3xl font-display font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">{researchVectorsCount}</span>
            </div>

            <div className="bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] rounded-2xl p-6 relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
              <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-bl-full"></div>
              <Zap className="text-emerald-400 mb-4" size={24} />
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block mb-1">Active AI Nodes</span>
              <span className="text-3xl font-display font-bold text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">7<span className="text-sm text-slate-600">/7</span></span>
            </div>

            <div className="bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] rounded-2xl p-6 relative overflow-hidden group hover:border-amber-500/50 transition-colors">
              <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/10 rounded-bl-full"></div>
              <Clock className="text-amber-400 mb-4" size={24} />
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block mb-1">System Uptime</span>
              <span className="text-3xl font-display font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">99.9<span className="text-sm text-slate-600">%</span></span>
            </div>
          </div>
        </div>

        {/* Orchestration + Intelligence Panels */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mb-12">
          <div className="xl:col-span-5 space-y-6">
            <div className="bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold font-display uppercase tracking-widest text-white flex items-center gap-2">
                  <Radio size={14} className="text-emerald-400" /> AI Agent Orchestration
                </h3>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">Live</span>
              </div>
              <div className="space-y-2.5">
                {agentStates.map((agent) => (
                  <div key={agent.name} className="flex items-center justify-between px-3 py-2 rounded-lg border border-[#1e2d4a] bg-[#050811]">
                    <span className="text-xs font-mono text-slate-300">{agent.name}</span>
                    <span className={`text-[10px] font-mono uppercase tracking-widest flex items-center gap-2 ${agent.tone === 'emerald' ? 'text-emerald-400' : agent.tone === 'amber' ? 'text-amber-400' : 'text-rose-400'}`}>
                      <span className={`h-2 w-2 rounded-full ${agent.tone === 'emerald' ? 'bg-emerald-400' : agent.tone === 'amber' ? 'bg-amber-400' : 'bg-rose-400'} animate-pulse`}></span>
                      {agent.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] rounded-2xl p-6">
              <h3 className="text-sm font-bold font-display uppercase tracking-widest text-white mb-4 flex items-center gap-2">
                <Zap size={14} className="text-cyan-400" /> AI Model Status
              </h3>
              <div className="space-y-2.5">
                {modelStates.map((model) => (
                  <div key={model.name} className="flex items-center justify-between px-3 py-2 rounded-lg border border-[#1e2d4a] bg-[#050811]">
                    <span className="text-xs font-mono text-slate-300">{model.name}</span>
                    <span className={`text-[10px] font-mono uppercase tracking-widest ${model.tone === 'emerald' ? 'text-emerald-400' : 'text-cyan-400'}`}>
                      {model.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="xl:col-span-7 space-y-6">
            <div className="bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] rounded-2xl p-6">
              <h3 className="text-sm font-bold font-display uppercase tracking-widest text-white mb-4 flex items-center gap-2">
                <Cpu size={14} className="text-cyan-400" /> Live AI Activity Terminal
              </h3>
              <div className="rounded-xl border border-[#1e2d4a] bg-[#04060d] p-4 font-mono text-xs space-y-2 min-h-[190px]">
                {terminalLogs.map((log, idx) => (
                  <div key={`${log}-${idx}`} className="text-cyan-300/90">{log}</div>
                ))}
              </div>
            </div>

            <div className="bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] rounded-2xl p-6">
              <h3 className="text-sm font-bold font-display uppercase tracking-widest text-white mb-4 flex items-center gap-2">
                <Upload size={14} className="text-purple-400" /> File Processing Status
              </h3>
              <div className="space-y-3">
                {processingQueue.map((item) => (
                  <div key={item.id} className="rounded-xl border border-[#1e2d4a] bg-[#050811] p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono text-slate-200">{item.name}</span>
                      <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">{item.stage}</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-[#0a1121] border border-[#1e2d4a] overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-500" style={{ width: `${item.progress}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Insights + Health + Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] rounded-2xl p-6">
            <h3 className="text-sm font-bold font-display uppercase tracking-widest text-white mb-4 flex items-center gap-2">
              <TrendingUp size={14} className="text-emerald-400" /> Recent AI Insights
            </h3>
            <div className="space-y-3 text-xs font-mono">
              <div className="rounded-lg border border-[#1e2d4a] bg-[#050811] p-3"><span className="text-slate-500">Most common topic:</span> <span className="text-cyan-400">PINN</span></div>
              <div className="rounded-lg border border-[#1e2d4a] bg-[#050811] p-3"><span className="text-slate-500">Trending domain:</span> <span className="text-purple-400">Smart Energy</span></div>
              <div className="rounded-lg border border-[#1e2d4a] bg-[#050811] p-3"><span className="text-slate-500">Detected opportunity:</span> <span className="text-emerald-400">Federated Learning</span></div>
            </div>
          </div>

          <div className="bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] rounded-2xl p-6">
            <h3 className="text-sm font-bold font-display uppercase tracking-widest text-white mb-4 flex items-center gap-2">
              <Activity size={14} className="text-cyan-400" /> System Health
            </h3>
            <div className="space-y-4 text-xs font-mono">
              <div>
                <div className="flex justify-between text-slate-400 mb-1"><span>CPU Usage</span><span>{systemHealth.cpu}%</span></div>
                <div className="h-1.5 rounded-full bg-[#0a1121] border border-[#1e2d4a]"><div className="h-full bg-cyan-400" style={{ width: `${systemHealth.cpu}%` }}></div></div>
              </div>
              <div>
                <div className="flex justify-between text-slate-400 mb-1"><span>Embedding Speed</span><span>{systemHealth.embeddingSpeed} tok/s</span></div>
                <div className="h-1.5 rounded-full bg-[#0a1121] border border-[#1e2d4a]"><div className="h-full bg-emerald-400" style={{ width: `${Math.min(100, Math.round((systemHealth.embeddingSpeed / 220) * 100))}%` }}></div></div>
              </div>
              <div>
                <div className="flex justify-between text-slate-400 mb-1"><span>Active Vectors</span><span>{systemHealth.activeVectors.toLocaleString()}</span></div>
                <div className="h-1.5 rounded-full bg-[#0a1121] border border-[#1e2d4a]"><div className="h-full bg-purple-400" style={{ width: `${Math.min(100, Math.round((systemHealth.activeVectors / 20000) * 100))}%` }}></div></div>
              </div>
              <div>
                <div className="flex justify-between text-slate-400 mb-1"><span>Storage Usage</span><span>{systemHealth.storage}%</span></div>
                <div className="h-1.5 rounded-full bg-[#0a1121] border border-[#1e2d4a]"><div className="h-full bg-amber-400" style={{ width: `${systemHealth.storage}%` }}></div></div>
              </div>
            </div>
          </div>

          <div className="bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] rounded-2xl p-6">
            <h3 className="text-sm font-bold font-display uppercase tracking-widest text-white mb-4 flex items-center gap-2">
              <Mic size={14} className="text-purple-400" /> Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-3 text-[10px] font-mono uppercase tracking-widest">
              <button onClick={() => onNavigate('upload')} className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 p-3 hover:border-cyan-400">Upload Paper</button>
              <button onClick={() => onNavigate('chat')} className="rounded-lg border border-purple-500/30 bg-purple-500/10 text-purple-300 p-3 hover:border-purple-400">Start Analysis</button>
              <button onClick={() => onNavigate('studio')} className="rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-300 p-3 hover:border-amber-400">Generate PPT</button>
              <button onClick={() => onNavigate('universe')} className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 p-3 hover:border-emerald-400">Open Universe</button>
              <button onClick={() => onNavigate('gap-lab')} className="col-span-2 rounded-lg border border-rose-500/30 bg-rose-500/10 text-rose-300 p-3 hover:border-rose-400">Run Gap Scan</button>
            </div>
          </div>
        </div>

        {/* Knowledge Graph + Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <button onClick={() => onNavigate('universe')} className="lg:col-span-2 text-left bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] rounded-2xl p-6 hover:border-cyan-500/50 transition-colors">
            <h3 className="text-sm font-bold font-display uppercase tracking-widest text-white mb-4 flex items-center gap-2">
              <GitBranch size={14} className="text-cyan-400" /> Knowledge Graph Preview
            </h3>
            <div className="relative rounded-xl border border-[#1e2d4a] bg-[#050811] p-6 min-h-[170px]">
              <svg viewBox="0 0 520 170" className="w-full h-[140px]">
                <line x1="100" y1="30" x2="250" y2="85" stroke="#22d3ee" strokeOpacity="0.6" strokeWidth="2" />
                <line x1="250" y1="85" x2="420" y2="40" stroke="#a855f7" strokeOpacity="0.6" strokeWidth="2" />
                <line x1="250" y1="85" x2="430" y2="130" stroke="#34d399" strokeOpacity="0.6" strokeWidth="2" />
                <line x1="100" y1="30" x2="90" y2="125" stroke="#22d3ee" strokeOpacity="0.4" strokeWidth="1.5" />
                <circle cx="100" cy="30" r="8" fill="#22d3ee" />
                <circle cx="250" cy="85" r="9" fill="#a855f7" />
                <circle cx="420" cy="40" r="8" fill="#34d399" />
                <circle cx="430" cy="130" r="8" fill="#f59e0b" />
                <circle cx="90" cy="125" r="8" fill="#fb7185" />
                <text x="72" y="20" fill="#cbd5e1" fontSize="12">PINN</text>
                <text x="215" y="75" fill="#cbd5e1" fontSize="12">Smart Grid</text>
                <text x="380" y="30" fill="#cbd5e1" fontSize="12">Forecasting</text>
                <text x="380" y="156" fill="#cbd5e1" fontSize="12">Federated Learning</text>
                <text x="35" y="145" fill="#cbd5e1" fontSize="12">Optimization</text>
              </svg>
            </div>
          </button>

          <div className="bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] rounded-2xl p-6">
            <h3 className="text-sm font-bold font-display uppercase tracking-widest text-white mb-4 flex items-center gap-2">
              <Bell size={14} className="text-rose-400" /> Notification Center
            </h3>
            <div className="space-y-3">
              {notifications.map((note, idx) => (
                <div key={`${note}-${idx}`} className="rounded-lg border border-[#1e2d4a] bg-[#050811] px-3 py-2 text-xs text-slate-300 font-mono">
                  {note}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Database Logs (Recent Papers) */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6 border-b border-[#1e2d4a] pb-4">
            <div className="w-8 h-8 rounded-lg bg-[#050811] border border-cyan-500/30 flex items-center justify-center">
              <Network size={16} className="text-cyan-400" />
            </div>
            <h3 className="text-lg font-bold font-display uppercase tracking-widest text-white">Recent Data Ingestions</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentPapers.map((paper, idx) => (
              <div 
                key={paper.id} 
                className="bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] rounded-xl p-5 hover:border-cyan-500/50 hover:-translate-y-1 transition-all duration-300 group cursor-pointer relative overflow-hidden"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Scan line effect on hover */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-cyan-400/50 opacity-0 group-hover:opacity-100 group-hover:animate-[scanDown_2s_linear_infinite] shadow-[0_0_10px_#00ffcc]"></div>
                
                <div className="flex items-start justify-between mb-4">
                  <span className="text-[9px] font-mono text-cyan-400 border border-cyan-500/30 bg-cyan-500/10 px-2 py-1 rounded">
                    {paper.type}
                  </span>
                  <span className="text-[9px] font-mono text-slate-500">{paper.date}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-200 group-hover:text-cyan-400 transition-colors mb-4">{paper.title}</h4>
                <div className="flex justify-between items-center text-[10px] font-mono border-t border-[#1e2d4a] pt-3">
                  <span className="text-slate-500">Integrity Match</span>
                  <span className="text-emerald-400">{paper.integrity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Grid */}
        <div>
          <div className="flex items-center gap-3 mb-6 border-b border-[#1e2d4a] pb-4">
            <div className="w-8 h-8 rounded-lg bg-[#050811] border border-purple-500/30 flex items-center justify-center">
              <Layers size={16} className="text-purple-400" />
            </div>
            <h3 className="text-lg font-bold font-display uppercase tracking-widest text-white">System Modules</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
            {navigationItems.map((item, idx) => {
              const Icon = item.icon;
              const colorClasses = getColorClasses(item.color);
              
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`group relative bg-[#090d1a]/80 backdrop-blur-md border rounded-xl p-5 flex flex-col items-center justify-center gap-3 hover:-translate-y-1 transition-all duration-300 ${colorClasses}`}
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity"></div>
                  <Icon className="w-8 h-8 relative z-10 transition-transform group-hover:scale-110 duration-300" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-200 transition-colors text-center">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </main>

      <style>{`
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes scanDown {
          0% { transform: translateY(0); opacity: 1; }
          90% { transform: translateY(120px); opacity: 1; }
          100% { transform: translateY(120px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
