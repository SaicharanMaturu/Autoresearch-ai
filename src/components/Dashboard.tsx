import React, { useState, useEffect } from 'react';
import { Search, Upload, Brain, TrendingUp, Clock, FileText, Zap, Settings, LogOut } from 'lucide-react';
import { GlassCard, NeonButton, StatDisplay, PulsingCore, SectionTitle, HolographicLine, LoadingSpinner, FloatingPanel, AIInput } from './UI';

export function Dashboard({ 
  userName = 'Researcher', 
  onNavigate,
  onLogout
}: { 
  userName?: string; 
  onNavigate: (page: string) => void;
  onLogout: () => void;
}) {
  const [systemStatus, setSystemStatus] = useState('Active');
  const [searchQuery, setSearchQuery] = useState('');

  // Simulate status updates
  useEffect(() => {
    const statuses = ['Active', 'Optimizing', 'Learning', 'Analyzing'];
    const interval = setInterval(() => {
      setSystemStatus(statuses[Math.floor(Math.random() * statuses.length)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const recentPapers = [
    { id: 1, title: 'Physics-Informed Neural Networks', date: '2024-05-23', type: 'PDF' },
    { id: 2, title: 'Quantum Computing Applications', date: '2024-05-22', type: 'PDF' },
    { id: 3, title: 'AI Safety Framework', date: '2024-05-21', type: 'DOCX' },
  ];

  const navigationItems = [
    { id: 'universe', label: 'Research Universe', icon: Brain },
    { id: 'gap-lab', label: 'Gap Lab', icon: TrendingUp },
    { id: 'streams', label: 'Data Streams', icon: Zap },
    { id: 'chamber', label: 'Memory', icon: Clock },
    { id: 'studio', label: 'Studio', icon: FileText },
    { id: 'profile', label: 'Profile', icon: Settings },
  ];

  return (
    <div className="min-h-screen w-full bg-space-black relative overflow-hidden">
      {/* Neural Network Background Effect */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-electric-cyan/5 to-neon-purple/5 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-to-r from-neon-purple/5 to-hot-pink/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-gradient-to-r from-electric-cyan/3 to-emerald-green/3 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header with Enhanced Neural Effects */}
      <header className="border-b border-electric-cyan/20 backdrop-blur-lg sticky top-0 z-40 bg-space-black/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 group">
            <div className="w-10 h-10 relative">
              <PulsingCore size="sm" />
              <div className="absolute inset-0 rounded-full border border-electric-cyan/30 animate-pulse-glow" />
            </div>
            <div className="hover:translate-x-1 transition-transform">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-electric-cyan via-neon-purple to-hot-pink bg-clip-text text-transparent animate-brain-glow font-display">AutoResearch</h1>
              <p className="text-xs text-ai-text-secondary font-body">Neural Interface v2035</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 text-ai-text-secondary hover:text-electric-cyan transition-all duration-300 hover:shadow-neon-cyan rounded-lg group"
          >
            <LogOut size={18} />
            <span className="text-sm font-body">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {/* Welcome Section with Enhanced Styling */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-2">
              <h2 className="text-4xl font-bold font-display mb-2">
                Welcome back, <span className="bg-gradient-to-r from-electric-cyan via-neon-purple to-hot-pink bg-clip-text text-transparent animate-brain-glow">{userName}</span>
              </h2>
              <p className="text-ai-text-secondary font-body">Your neural research interface is ready</p>
            </div>
          </div>

          {/* Search and Action with Enhanced Effects */}
          <div className="flex gap-4 mb-8">
            <AIInput
              placeholder="Search research, papers, concepts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={Search}
              className="flex-1"
            />
            <NeonButton
              onClick={() => onNavigate('upload')}
              variant="primary"
              className="flex items-center gap-2 font-display"
            >
              <Upload size={20} />
              Upload
            </NeonButton>
          </div>
        </div>

        {/* AI Neural Core Section */}
        <div className="grid grid-cols-12 gap-6 mb-12">
          {/* Central AI Core with Enhanced Visuals */}
          <div className="col-span-12 lg:col-span-6">
            <GlassCard className="p-12 flex flex-col items-center justify-center min-h-96 border-electric-cyan/40 relative overflow-hidden group">
              {/* Animated background effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-electric-cyan/5 via-transparent to-neon-purple/5" />
              </div>
              
              <div className="mb-8 relative z-10 group-hover:scale-110 transition-transform duration-300">
                <PulsingCore size="lg" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-electric-cyan to-neon-purple bg-clip-text text-transparent mb-2 font-display">Neural Core</h3>
              <p className="text-ai-text-secondary text-center mb-4 font-body">System Status</p>
              <p className="text-lg font-semibold font-display bg-gradient-to-r from-electric-cyan to-neon-purple bg-clip-text text-transparent mb-6 animate-holographic">{systemStatus}</p>
              <div className="flex gap-4 relative z-10">
                <NeonButton variant="ghost" className="text-sm font-body">
                  View Agents
                </NeonButton>
                <NeonButton variant="ghost" className="text-sm font-body">
                  System Logs
                </NeonButton>
              </div>
            </GlassCard>
          </div>

          {/* Enhanced Stats Grid */}
          <div className="col-span-12 lg:col-span-6 space-y-4">
            <StatDisplay label="Papers Uploaded" value={3} icon={FileText} />
            <StatDisplay label="Research Topics" value={12} icon={Brain} />
            <StatDisplay label="AI Agents Active" value={7} unit="/7" icon={Zap} />
            <StatDisplay label="Last Activity" value="5m" unit="ago" icon={Clock} />
          </div>
        </div>

        <HolographicLine className="mb-12" />

        {/* Recent Papers with Enhanced Effects */}
        <div className="mb-12">
          <h3 className="text-xl font-bold bg-gradient-to-r from-electric-cyan to-neon-purple bg-clip-text text-transparent mb-6 flex items-center gap-2 font-display">
            <FileText size={24} />
            Recent Research Papers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentPapers.map((paper, idx) => (
              <GlassCard key={paper.id} className="p-4 hover:shadow-deep-glow hover:border-electric-cyan/50 group cursor-pointer transition-all duration-300" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="flex items-start justify-between mb-2">
                  <p className="text-electric-cyan text-xs font-mono bg-electric-cyan/10 px-2 py-1 rounded border border-electric-cyan/30 group-hover:bg-electric-cyan/20 transition-colors">
                    {paper.type}
                  </p>
                  <span className="text-ai-text-secondary text-xs">{paper.date}</span>
                </div>
                <p className="text-ai-text-primary font-semibold line-clamp-2 group-hover:text-electric-cyan transition-colors font-body">{paper.title}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        <HolographicLine className="mb-12" />

        {/* Enhanced Quick Navigation */}
        <div>
          <h3 className="text-xl font-bold bg-gradient-to-r from-neon-purple to-hot-pink bg-clip-text text-transparent mb-6 font-display">Quick Navigation</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {navigationItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="group relative"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <GlassCard className="p-6 h-full flex flex-col items-center text-center hover:shadow-deep-glow hover:border-neon-purple/50 transition-all duration-300 relative overflow-hidden">
                    {/* Hover gradient effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-neon-purple/10 to-transparent" />
                    <Icon className="w-8 h-8 bg-gradient-to-r from-neon-purple to-hot-pink bg-clip-text text-transparent mb-3 group-hover:animate-pulse relative z-10 transition-transform group-hover:scale-110 duration-300" />
                    <p className="text-sm font-semibold text-ai-text-primary group-hover:text-electric-cyan transition-colors font-body relative z-10">{item.label}</p>
                  </GlassCard>
                </button>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
