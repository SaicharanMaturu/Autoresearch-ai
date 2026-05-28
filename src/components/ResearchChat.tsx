import React, { useState, useEffect, useRef } from 'react';
import { Send, Mic, Copy, ThumbsUp, ThumbsDown, X, Loader, Bot, Terminal, Shield, Zap, ChevronLeft, Volume2, Cpu } from 'lucide-react';
import apiFetch from '../utils/api';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function ResearchChat({ onBack }: { onBack: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Uplink established. I am your Aethelgard Research AI. How can I assist you in processing and analyzing your research data today?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue('');

    // Call backend API instead of hardcoded mock simulation
    setIsLoading(true);
    try {
      const response = await apiFetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          history: messages.map(m => ({
            role: m.role === 'user' ? 'user' : 'assistant',
            content: m.content
          }))
        })
      });

      if (!response.ok) {
        throw new Error(`Mainframe offline (HTTP ${response.status})`);
      }

      const data = await response.json();
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.text || 'No response received from AI Core.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err: any) {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `**[SYSTEM NOTICE]**\n\nCould not connect to external AI Core. Using offline analysis node.\n\nError details: ${err?.message || "Unknown Connection Interruption"}`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = async () => {
    setIsListening(!isListening);
    if (isListening) {
      // Mock voice input
      await new Promise(resolve => setTimeout(resolve, 2000));
      setInputValue('Synthesize the main bio-digital hypotheses from the latest data packet.');
      setIsListening(false);
    }
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="h-screen w-full flex flex-col bg-[#050811] text-slate-300 font-sans relative overflow-hidden">
      
      {/* Immersive Deep Space & Grid Background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjMTUyMDM2IiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIG9wYWNpdHk9IjAuMiI+PHBhdGggZD0iTTAgNjBoNjBNNjAgMGYtNjAgNjAiLz48L2c+PC9zdmc+')] pointer-events-none z-0"></div>
      
      {/* Ambient Orbs */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse z-0" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse z-0" style={{ animationDuration: '12s' }} />

      {/* Header Console */}
      <header className="relative z-20 bg-[#090d1a]/80 backdrop-blur-xl border-b border-[#1e2d4a] shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#050811] border border-cyan-500/30 flex items-center justify-center relative shadow-[inset_0_0_20px_rgba(6,182,212,0.1)] group">
              <div className="absolute inset-0 bg-cyan-400/20 rounded-xl animate-ping opacity-30"></div>
              <Bot className="text-cyan-400 w-6 h-6 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-display text-white tracking-widest uppercase drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                Aethelgard AI Core
              </h1>
              <div className="flex items-center gap-3 mt-1">
                <span className="flex items-center gap-1.5 text-[9px] font-mono text-cyan-400 uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                  Node Active
                </span>
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest border-l border-[#1e2d4a] pl-3">
                  Encrypted Channel
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#050811] border border-[#1e2d4a] text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300 shadow-lg group font-mono text-[10px] uppercase tracking-widest"
          >
            <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Disconnect
          </button>
        </div>
        
        {/* Scanning header line */}
        <div className="absolute bottom-0 left-0 h-[1px] w-full bg-[#1e2d4a]">
          <div className="h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent w-1/3 animate-[slide_3s_ease-in-out_infinite]"></div>
        </div>
      </header>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 relative z-10 custom-scrollbar">
        <div className="space-y-8 pb-10">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-[fadeIn_0.5s_ease-out]`}
            >
              <div className={`flex gap-4 max-w-3xl ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border shadow-lg relative ${
                  message.role === 'user' 
                    ? 'bg-gradient-to-br from-purple-600/20 to-purple-900/20 border-purple-500/30 text-purple-400' 
                    : 'bg-[#050811] border-cyan-500/30 text-cyan-400'
                }`}>
                  {message.role === 'user' ? <Terminal size={18} /> : <Bot size={18} />}
                  {message.role === 'assistant' && (
                    <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-[#050811] animate-pulse"></div>
                  )}
                </div>

                {/* Message Bubble */}
                <div className="flex flex-col gap-1.5">
                  <div className={`flex items-center gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500">
                      {message.role === 'user' ? 'Operator' : 'Aethelgard AI'}
                    </span>
                    <span className="text-[9px] font-mono text-slate-600">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                  </div>

                  <div
                    className={`relative px-6 py-4 rounded-2xl backdrop-blur-xl ${
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/30 text-slate-200 rounded-tr-none shadow-[0_0_20px_rgba(168,85,247,0.1)]'
                        : 'bg-[#090d1a]/80 border border-[#1e2d4a] text-slate-300 rounded-tl-none shadow-[0_0_20px_rgba(0,0,0,0.3)]'
                    }`}
                  >
                    {/* Decorative cyber corner for assistant */}
                    {message.role === 'assistant' && (
                      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500/50"></div>
                    )}

                    <p className="text-sm md:text-base leading-relaxed font-sans">{message.content}</p>

                    {/* Action buttons for assistant messages */}
                    {message.role === 'assistant' && (
                      <div className="flex gap-3 mt-4 pt-3 border-t border-[#1e2d4a]">
                        <button onClick={() => copyMessage(message.content)} className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest uppercase text-slate-500 hover:text-cyan-400 transition-colors">
                          <Copy size={12} /> Copy Data
                        </button>
                        <div className="w-[1px] h-3 bg-[#1e2d4a] my-auto"></div>
                        <button className="text-slate-500 hover:text-emerald-400 transition-colors" title="Optimize Weighting">
                          <ThumbsUp size={14} />
                        </button>
                        <button className="text-slate-500 hover:text-rose-400 transition-colors" title="Penalize Weighting">
                          <ThumbsDown size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex justify-start animate-[fadeIn_0.3s_ease-out]">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#050811] border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
                  <Bot size={18} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500">Aethelgard AI</span>
                  <div className="px-6 py-4 rounded-2xl rounded-tl-none bg-[#090d1a]/80 border border-cyan-500/20 backdrop-blur-xl flex items-center gap-4 min-w-[200px]">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-6 bg-cyan-400/80 rounded-full animate-[wave_1s_ease-in-out_infinite]"></div>
                      <div className="w-1.5 h-6 bg-cyan-400/80 rounded-full animate-[wave_1s_ease-in-out_infinite_0.2s]"></div>
                      <div className="w-1.5 h-6 bg-cyan-400/80 rounded-full animate-[wave_1s_ease-in-out_infinite_0.4s]"></div>
                    </div>
                    <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase animate-pulse">Processing...</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Floating Command Line (Input Area) */}
      <div className="relative z-20 pb-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto relative group">
          
          {/* Ambient glow behind input */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-lg group-hover:opacity-100 transition duration-500 opacity-70"></div>
          
          <div className="relative bg-[#050811]/90 backdrop-blur-xl border border-[#1e2d4a] group-hover:border-cyan-500/50 rounded-2xl p-2 shadow-[0_10px_40px_rgba(0,0,0,0.8)] transition-all duration-300">
            
            {/* Thinking indicator / Listening */}
            {isListening && (
              <div className="absolute -top-8 left-4 flex items-center gap-2 bg-[#090d1a] border border-cyan-500/30 px-3 py-1.5 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                <Volume2 size={12} className="text-cyan-400 animate-pulse" />
                <span className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase animate-pulse">Awaiting Audio Input...</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center gap-3 px-4 py-2">
                <Terminal size={18} className="text-slate-500 shrink-0" />
                <input
                  type="text"
                  placeholder="Execute query or command..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !isLoading) {
                      handleSendMessage();
                    }
                  }}
                  className="w-full bg-transparent border-none text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-0 font-sans text-sm md:text-base"
                />
              </div>

              <div className="flex items-center gap-2 pr-2">
                <button
                  onClick={handleVoiceInput}
                  className={`p-3 rounded-xl transition-all duration-300 flex items-center justify-center relative overflow-hidden ${
                    isListening 
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]' 
                      : 'bg-[#090d1a] text-slate-500 border border-[#1e2d4a] hover:text-cyan-400 hover:border-cyan-500/30'
                  }`}
                  title="Initialize Audio Receptor"
                >
                  {isListening && <span className="absolute inset-0 bg-cyan-400/20 animate-ping rounded-xl"></span>}
                  <Mic size={18} className="relative z-10" />
                </button>
                
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  className="relative group/btn overflow-hidden rounded-xl p-[1px] disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 opacity-70 group-hover/btn:opacity-100 transition-opacity duration-500 bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]"></span>
                  <div className="relative bg-[#050811] px-6 py-3 rounded-xl flex items-center justify-center gap-2 group-hover/btn:bg-[#050811]/50 transition-colors duration-300">
                    <Send size={16} className="text-cyan-400 group-hover/btn:text-white transition-colors group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transform duration-300" />
                    <span className="text-cyan-400 font-bold group-hover/btn:text-white transition-colors text-[11px] uppercase tracking-widest font-mono hidden sm:inline-block">
                      Transmit
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-2 text-center">
             <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest flex items-center justify-center gap-2">
               <Shield size={10} /> Aethelgard Neural Network operates with E2E Encryption
             </span>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(5, 8, 17, 0.5);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(30, 45, 74, 0.8);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(6, 182, 212, 0.5);
        }
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes wave {
          0%, 100% { transform: scaleY(0.5); opacity: 0.5; }
          50% { transform: scaleY(1.2); opacity: 1; }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
