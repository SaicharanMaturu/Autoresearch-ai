import React, { useState, useEffect } from 'react';
import { Trash2, Download, Calendar, X, MessageSquare, File, Clock } from 'lucide-react';
import { GlassCard, NeonButton, SectionTitle, HolographicLine } from './UI';
import apiFetch from '../utils/api';

export function HistoryPage({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<'uploads' | 'chats'>('uploads');
  const [uploads, setUploads] = useState<any[]>([]);
  const [isLoadingUploads, setIsLoadingUploads] = useState(true);
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    (async () => {
      setIsLoadingUploads(true);
      setUploadError('');
      try {
        const res = await apiFetch('/api/history');
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(data?.error || data?.message || 'Failed to fetch history');
        }
        const mappedFiles = Array.isArray(data?.files)
          ? data.files.map((file: any) => ({
              id: file.id,
              name: file.name,
              date: file.uploadedAt || file.date,
              size: file.size,
              status: file.status || 'Analyzed',
            }))
          : [];
        setUploads(mappedFiles);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load history';
        setUploadError(message);
      } finally {
        setIsLoadingUploads(false);
      }
    })();
  }, []);

  const chatHistory = [
    { id: 1, title: 'Research Gap Analysis', date: '2024-05-23', messages: 12 },
    { id: 2, title: 'Paper Summarization Discussion', date: '2024-05-22', messages: 8 },
    { id: 3, title: 'Methodology Comparison', date: '2024-05-21', messages: 15 },
    { id: 4, title: 'Hypothesis Generation', date: '2024-05-20', messages: 10 },
    { id: 5, title: 'Citation Analysis', date: '2024-05-19', messages: 6 },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-ai-bg via-ai-surface to-ai-bg">
      {/* Background orbs */}
      <div className="fixed top-20 right-20 w-96 h-96 bg-ai-accent-cyan/10 rounded-full blur-3xl opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <SectionTitle>History & Archive</SectionTitle>
          <button
            onClick={onBack}
            className="text-ai-text-secondary hover:text-ai-accent-cyan transition p-2"
          >
            <X size={24} />
          </button>
        </div>

        <HolographicLine className="mb-8" />

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('uploads')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === 'uploads'
                ? 'bg-gradient-to-r from-ai-accent-cyan to-ai-accent-blue text-ai-bg'
                : 'border-2 border-ai-accent-cyan text-ai-accent-cyan hover:bg-ai-accent-cyan/10'
            }`}
          >
            <File className="inline mr-2" size={18} />
            Uploaded Files
          </button>
          <button
            onClick={() => setActiveTab('chats')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === 'chats'
                ? 'bg-gradient-to-r from-ai-accent-purple to-ai-accent-pink text-white'
                : 'border-2 border-ai-accent-purple text-ai-accent-purple hover:bg-ai-accent-purple/10'
            }`}
          >
            <MessageSquare className="inline mr-2" size={18} />
            Chat History
          </button>
        </div>

        {/* Content */}
        {activeTab === 'uploads' && (
          <div className="space-y-3">
            {isLoadingUploads && (
              <GlassCard className="p-6 text-sm text-ai-text-secondary">
                Loading upload history...
              </GlassCard>
            )}

            {!isLoadingUploads && !!uploadError && (
              <GlassCard className="p-6 text-sm text-rose-400 border border-rose-500/30 bg-rose-500/10">
                {uploadError}
              </GlassCard>
            )}

            {!isLoadingUploads && !uploadError && uploads.length === 0 && (
              <GlassCard className="p-6 text-sm text-ai-text-secondary">
                No uploaded files found yet.
              </GlassCard>
            )}

            {!isLoadingUploads && !uploadError && uploads.map((file) => (
              <GlassCard key={file.id} className="p-6 hover:shadow-neon-cyan transition">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <File className="w-8 h-8 text-ai-accent-cyan mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="text-ai-text-primary font-semibold mb-1">{file.name}</h4>
                      <div className="flex flex-wrap gap-4 text-sm text-ai-text-secondary">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {file.date}
                        </span>
                        <span>{file.size}</span>
                        <span className="px-2 py-1 bg-ai-accent-cyan/20 text-ai-accent-cyan rounded text-xs font-mono">
                          {file.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-ai-text-secondary hover:text-ai-accent-blue transition">
                      <Download size={18} />
                    </button>
                    <button className="p-2 text-ai-text-secondary hover:text-ai-accent-pink transition">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        )}

        {activeTab === 'chats' && (
          <div className="space-y-3">
            {chatHistory.map((chat) => (
              <GlassCard key={chat.id} className="p-6 hover:shadow-neon-purple transition cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-ai-text-primary font-semibold mb-2">{chat.title}</h4>
                    <div className="flex gap-4 text-sm text-ai-text-secondary">
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {chat.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare size={14} />
                        {chat.messages} messages
                      </span>
                    </div>
                  </div>
                  <NeonButton variant="ghost" className="text-sm">
                    Continue
                  </NeonButton>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
