import React, { useState, useRef, useEffect } from 'react';
import { Upload, File, CheckCircle, Trash2, X, Zap, Cpu, Scan, Lock, Shield, ArrowUpRight, Search } from 'lucide-react';
import { GlassCard, NeonButton, SectionTitle, HolographicLine } from './UI';

export function ResearchUpload({ onUpload, onBack }: { onUpload: (files: File[]) => void; onBack: () => void }) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [scanPosition, setScanPosition] = useState(0);

  const supportedFormats = ['PDF', 'DOCX', 'TXT', 'PNG', 'JPG', 'JPEG'];
  const uploadZoneRef = useRef<HTMLDivElement>(null);

  // Scanning line animation effect
  useEffect(() => {
    let animationFrameId: number;
    const animateScan = () => {
      setScanPosition((prev) => (prev >= 100 ? 0 : prev + 0.5));
      animationFrameId = requestAnimationFrame(animateScan);
    };
    animateScan();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files) as File[];
    addFiles(droppedFiles);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files) as File[];
      addFiles(selectedFiles);
    }
  };

  const addFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter((file) => {
      const ext = file.name.split('.').pop()?.toUpperCase() || '';
      return supportedFormats.includes(ext);
    });
    setFiles([...files, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    setIsUploading(true);
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2500));
    onUpload(files);
    setIsUploading(false);
    setFiles([]);
  };

  return (
    <div className="min-h-screen w-full bg-[#050811] text-slate-300 font-sans flex flex-col relative overflow-hidden">
      {/* Immersive Deep Space & Grid Background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgc3Ryb2tlPSIjMTUyMDM2IiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIG9wYWNpdHk9IjAuNSI+PHBhdGggZD0iTTAgNjBoNjBNNjAgMGYtNjAgNjAiLz48L2c+PC9zdmc+')] opacity-20 pointer-events-none"></div>
      
      {/* Ambient Orbs */}
      <div className="fixed top-[-10%] right-[-5%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDuration: '10s' }} />

      <div className="max-w-5xl mx-auto w-full px-6 py-12 relative z-10 flex-1 flex flex-col">
        {/* Header Console */}
        <div className="flex items-center justify-between mb-8 bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] p-6 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Cpu className="text-cyan-400 w-6 h-6 animate-pulse" />
              <h1 className="text-2xl font-bold text-white tracking-widest uppercase font-display drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">
                Data Ingestion Protocol
              </h1>
            </div>
            <p className="text-xs text-slate-500 font-mono tracking-widest uppercase">Secure node uplink initialized • Aethelgard encrypted channel</p>
          </div>
          <button
            onClick={onBack}
            className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#050811] border border-[#1e2d4a] text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all group"
          >
            <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* Upload Terminal */}
        <div className="flex-1 flex flex-col md:flex-row gap-8">
          
          {/* LEFT COL: Upload Zone */}
          <div className="flex-1 flex flex-col">
            <div
              ref={uploadZoneRef}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`
                relative flex-1 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-12 text-center transition-all duration-500 overflow-hidden group
                ${isDragging 
                  ? 'border-cyan-400 bg-cyan-500/10 scale-[1.02] shadow-[0_0_40px_rgba(6,182,212,0.2)]' 
                  : 'border-[#1e2d4a] bg-[#090d1a]/60 hover:border-cyan-500/50 hover:bg-[#152036]/80 hover:shadow-[inset_0_0_30px_rgba(6,182,212,0.05)]'
                }
              `}
            >
              {/* Decorative Tech Corners */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/30 group-hover:border-cyan-400 transition-colors"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/30 group-hover:border-cyan-400 transition-colors"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500/30 group-hover:border-cyan-400 transition-colors"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/30 group-hover:border-cyan-400 transition-colors"></div>

              {/* Scanning Laser Effect (visible on hover or drag) */}
              <div 
                className="absolute left-0 right-0 h-[2px] bg-cyan-400/50 shadow-[0_0_10px_#00ffcc] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{ top: `${scanPosition}%` }}
              ></div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="relative mb-8">
                  <div className={`absolute inset-0 bg-cyan-500 rounded-full blur-[20px] transition-opacity duration-500 ${isDragging ? 'opacity-60' : 'opacity-20 group-hover:opacity-40'}`}></div>
                  <div className="w-24 h-24 rounded-full bg-[#050811] border border-cyan-500/30 flex items-center justify-center relative z-10 shadow-inner group-hover:scale-110 transition-transform duration-500">
                    <Upload className={`w-10 h-10 transition-colors duration-300 ${isDragging ? 'text-white' : 'text-cyan-400 group-hover:text-white'}`} />
                  </div>
                  {/* Orbiting ring */}
                  <div className="absolute inset-[-10px] border border-dashed border-cyan-500/40 rounded-full animate-[spin_10s_linear_infinite]"></div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2 font-display tracking-wider">INITIATE UPLOAD SEQUENCE</h3>
                <p className="text-slate-400 mb-8 font-mono text-sm uppercase tracking-widest">Drag & Drop raw data matrix or initialize manual browser</p>
                
                <label className="cursor-pointer relative group/btn">
                  <div className="absolute inset-[-4px] bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl blur opacity-30 group-hover/btn:opacity-60 transition duration-500"></div>
                  <div className="relative px-8 py-4 bg-[#050811] border border-[#1e2d4a] group-hover/btn:border-cyan-500/50 rounded-xl flex items-center gap-3 transition-colors overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 translate-x-[-100%] group-hover/btn:translate-x-[0%] transition-transform duration-500"></div>
                    <Search className="w-5 h-5 text-cyan-400 relative z-10" />
                    <span className="text-white font-bold tracking-wider relative z-10">BROWSE FILES</span>
                  </div>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileInput}
                    className="hidden"
                    accept={supportedFormats.map(f => f === 'JPG' ? '.jpg' : f === 'JPEG' ? '.jpeg' : `.${f.toLowerCase()}`).join(',')}
                  />
                </label>
                
                <div className="mt-8 flex gap-2 justify-center flex-wrap max-w-sm">
                  {supportedFormats.map(ext => (
                    <span key={ext} className="text-[10px] font-mono text-slate-500 border border-[#1e2d4a] px-2 py-1 rounded bg-[#050811]">
                      {ext}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COL: Status & List */}
          <div className="w-full md:w-[400px] flex flex-col gap-6">
            
            {/* System Info Panel */}
            <div className="bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] rounded-2xl p-6 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[40px] pointer-events-none"></div>
              
              <h4 className="text-[11px] font-mono uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2 border-b border-[#1e2d4a] pb-3">
                <Shield size={14} className="text-purple-400" /> Security Parameters
              </h4>
              
              <ul className="space-y-4 text-xs font-mono text-slate-400">
                <li className="flex items-start gap-3 group">
                  <div className="mt-0.5 text-cyan-400"><CheckCircle size={14} /></div>
                  <div>
                    <span className="text-slate-300 block mb-0.5">End-to-End Encryption</span>
                    <span className="text-[10px] opacity-70">AES-256 standard applied to all payloads</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="mt-0.5 text-cyan-400"><Zap size={14} /></div>
                  <div>
                    <span className="text-slate-300 block mb-0.5">Quantum Indexing</span>
                    <span className="text-[10px] opacity-70">Automated semantic embedding vectorization</span>
                  </div>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="mt-0.5 text-cyan-400"><Lock size={14} /></div>
                  <div>
                    <span className="text-slate-300 block mb-0.5">Size Limitations</span>
                    <span className="text-[10px] opacity-70">50MB max per neural packet</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Upload Queue */}
            <div className={`flex-1 flex flex-col bg-[#090d1a]/80 backdrop-blur-md border border-[#1e2d4a] rounded-2xl p-6 relative shadow-xl transition-all duration-500 ${files.length > 0 ? 'opacity-100 translate-y-0' : 'opacity-50 pointer-events-none'}`}>
              <h4 className="text-[11px] font-mono uppercase tracking-widest text-slate-400 mb-4 flex items-center justify-between border-b border-[#1e2d4a] pb-3">
                <span className="flex items-center gap-2"><Scan size={14} className="text-emerald-400" /> Payload Queue</span>
                <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">{files.length}</span>
              </h4>

              <div className="flex-1 overflow-y-auto pr-2 space-y-3 max-h-[250px] custom-scrollbar">
                {files.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-slate-600 text-xs font-mono italic">
                    Awaiting data packets...
                  </div>
                ) : (
                  files.map((file, index) => (
                    <div key={index} className="group flex items-center justify-between bg-[#050811] border border-[#1e2d4a] hover:border-cyan-500/50 p-3 rounded-xl transition-all duration-300 relative overflow-hidden">
                      {isUploading && (
                        <div className="absolute inset-0 bg-cyan-500/5 origin-left animate-[pulse_1.5s_ease-in-out_infinite]" style={{ width: '100%' }}></div>
                      )}
                      <div className="flex items-center gap-3 relative z-10 w-full min-w-0 pr-2">
                        <div className="w-8 h-8 rounded bg-[#152036] flex items-center justify-center shrink-0 border border-[#1e2d4a] group-hover:border-cyan-500/30 transition-colors">
                          <File size={14} className="text-cyan-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-slate-200 truncate group-hover:text-white transition-colors">{file.name}</p>
                          <p className="text-[10px] text-slate-500 font-mono mt-0.5">{(file.size / 1024).toFixed(1)} KB</p>
                        </div>
                      </div>
                      <button
                        onClick={() => !isUploading && removeFile(index)}
                        disabled={isUploading}
                        className={`relative z-10 p-2 rounded-lg transition-colors shrink-0 ${isUploading ? 'opacity-50 cursor-not-allowed' : 'text-slate-500 hover:text-rose-400 hover:bg-rose-500/10'}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-[#1e2d4a] flex gap-3">
                <button
                  onClick={() => setFiles([])}
                  disabled={isUploading || files.length === 0}
                  className="px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider font-mono text-slate-400 bg-[#050811] border border-[#1e2d4a] hover:text-white hover:border-slate-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Clear
                </button>
                <button
                  onClick={handleUpload}
                  disabled={isUploading || files.length === 0}
                  className="flex-1 relative group overflow-hidden rounded-xl p-[1px] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]"></span>
                  <div className="relative bg-[#050811] px-4 py-3 rounded-xl flex items-center justify-center gap-2 group-hover:bg-transparent transition-colors duration-300">
                    {isUploading ? (
                      <>
                        <Scan size={16} className="text-cyan-400 group-hover:text-white animate-spin" />
                        <span className="text-cyan-400 font-bold group-hover:text-white text-xs uppercase tracking-widest">Processing...</span>
                      </>
                    ) : (
                      <>
                        <ArrowUpRight size={16} className="text-cyan-400 group-hover:text-white" />
                        <span className="text-cyan-400 font-bold group-hover:text-white text-xs uppercase tracking-widest">Transmit Data</span>
                      </>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Global styles for this component's custom scrollbar and animations */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(30, 45, 74, 0.2);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(30, 45, 74, 0.8);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(6, 182, 212, 0.5);
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
