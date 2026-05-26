import React, { useState, useEffect, useRef } from 'react';
import { Send, Mic, Copy, ThumbsUp, ThumbsDown, X, Loader } from 'lucide-react';
import { GlassCard, NeonButton, HolographicLine, LoadingSpinner } from './UI';

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
      content: 'Hello! I\'m your AI Research Assistant. Ask me anything about your uploaded papers, research topics, or analysis needs.',
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
    setMessages([...messages, userMessage]);
    setInputValue('');

    // Simulate AI response
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const mockResponses = [
      'Based on your query, I found 3 relevant papers discussing this topic. Would you like me to summarize them?',
      'This is an interesting research direction. I detected a potential gap in the current literature. Shall I analyze it further?',
      'The papers you uploaded suggest strong correlations in this area. I can generate a detailed comparative analysis.',
      'I\'m processing your request. This involves cross-referencing multiple documents and building a knowledge graph.',
      'Excellent question! I\'ve identified the key concepts and will now create a comprehensive research report.',
    ];

    const aiMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: mockResponses[Math.floor(Math.random() * mockResponses.length)],
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
  };

  const handleVoiceInput = async () => {
    setIsListening(!isListening);
    if (isListening) {
      // Mock voice input
      await new Promise(resolve => setTimeout(resolve, 2000));
      setInputValue('Summarize the main findings from the uploaded papers');
      setIsListening(false);
    }
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gradient-to-br from-ai-bg via-ai-surface to-ai-bg">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-ai-accent-cyan to-ai-accent-blue bg-clip-text text-transparent">
            Research Analysis Chat
          </h1>
          <button
            onClick={onBack}
            className="text-ai-text-secondary hover:text-ai-accent-cyan transition p-2"
          >
            <X size={24} />
          </button>
        </div>
      </header>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto max-w-6xl mx-auto w-full px-6 py-8">
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-2xl ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-ai-accent-cyan to-ai-accent-blue text-ai-bg'
                    : 'bg-white/10 border border-white/20 text-ai-text-primary'
                } rounded-2xl px-6 py-4 backdrop-blur-lg`}
              >
                <p className="text-base leading-relaxed mb-2">{message.content}</p>
                <p className={`text-xs ${
                  message.role === 'user' 
                    ? 'text-ai-bg/70' 
                    : 'text-ai-text-secondary'
                }`}>
                  {message.timestamp.toLocaleTimeString()}
                </p>

                {/* Action buttons for assistant messages */}
                {message.role === 'assistant' && (
                  <div className="flex gap-2 mt-3 pt-3 border-t border-white/10">
                    <button
                      onClick={() => copyMessage(message.content)}
                      className="text-ai-text-secondary hover:text-ai-accent-cyan transition p-1"
                      title="Copy"
                    >
                      <Copy size={16} />
                    </button>
                    <button
                      className="text-ai-text-secondary hover:text-green-400 transition p-1"
                      title="Helpful"
                    >
                      <ThumbsUp size={16} />
                    </button>
                    <button
                      className="text-ai-text-secondary hover:text-red-400 transition p-1"
                      title="Not helpful"
                    >
                      <ThumbsDown size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <GlassCard className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <Loader className="w-5 h-5 text-ai-accent-cyan animate-spin" />
                  <span className="text-ai-text-secondary">AI is analyzing...</span>
                </div>
              </GlassCard>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <HolographicLine />

      {/* Input Area */}
      <div className="border-t border-white/10 backdrop-blur-lg p-6">
        <div className="max-w-6xl mx-auto">
          {/* Thinking indicator */}
          {isListening && (
            <div className="mb-4 flex items-center gap-2 text-ai-accent-cyan text-sm">
              <Loader size={16} className="animate-spin" />
              <span>Listening...</span>
            </div>
          )}

          <div className="flex gap-4">
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                placeholder="Ask about your research, papers, or analysis..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !isLoading) {
                    handleSendMessage();
                  }
                }}
                className={`
                  flex-1 px-4 py-3 rounded-lg
                  bg-white/10 border border-white/20
                  text-ai-text-primary placeholder-ai-text-secondary
                  backdrop-blur-lg focus:outline-none focus:border-ai-accent-cyan focus:bg-white/20
                  transition-all duration-300
                `}
              />
              <button
                onClick={handleVoiceInput}
                className={`
                  px-4 py-3 rounded-lg border-2 transition-all duration-300
                  ${isListening
                    ? 'border-ai-accent-cyan bg-ai-accent-cyan/20 text-ai-accent-cyan'
                    : 'border-white/20 text-ai-text-secondary hover:border-ai-accent-cyan hover:text-ai-accent-cyan'
                  }
                `}
                title="Voice input"
              >
                <Mic size={20} />
              </button>
            </div>
            <NeonButton
              onClick={handleSendMessage}
              variant="primary"
              disabled={isLoading || !inputValue.trim()}
              className="flex items-center gap-2"
            >
              <Send size={20} />
              <span>Send</span>
            </NeonButton>
          </div>
        </div>
      </div>
    </div>
  );
}
