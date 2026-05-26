import React, { useState } from 'react';
import { Upload, File, CheckCircle, Trash2, X } from 'lucide-react';
import { GlassCard, NeonButton, SectionTitle, HolographicLine } from './UI';

export function ResearchUpload({ onUpload, onBack }: { onUpload: (files: File[]) => void; onBack: () => void }) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const supportedFormats = ['PDF', 'DOCX', 'TXT', 'PNG', 'JPG', 'JPEG'];

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
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
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
    await new Promise(resolve => setTimeout(resolve, 1500));
    onUpload(files);
    setIsUploading(false);
    setFiles([]);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-ai-bg via-ai-surface to-ai-bg">
      {/* Background orbs */}
      <div className="fixed top-20 right-20 w-96 h-96 bg-ai-accent-cyan/10 rounded-full blur-3xl opacity-20 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <SectionTitle>Research Upload Center</SectionTitle>
          <button
            onClick={onBack}
            className="text-ai-text-secondary hover:text-ai-accent-cyan transition p-2"
          >
            <X size={24} />
          </button>
        </div>

        <HolographicLine className="mb-8" />

        {/* Upload Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 mb-8
            ${isDragging 
              ? 'border-ai-accent-cyan bg-ai-accent-cyan/10' 
              : 'border-white/20 bg-white/5 hover:border-ai-accent-cyan hover:bg-ai-accent-cyan/5'
            }
          `}
        >
          <div className="flex flex-col items-center">
            <Upload className="w-16 h-16 text-ai-accent-cyan mb-4 opacity-70" />
            <h3 className="text-2xl font-bold text-ai-accent-cyan mb-2">Drag & Drop Your Research</h3>
            <p className="text-ai-text-secondary mb-6">Or click to browse files</p>
            <label className="cursor-pointer">
              <input
                type="file"
                multiple
                onChange={handleFileInput}
                className="hidden"
                accept={supportedFormats.map(f => 
                  f === 'JPG' ? '.jpg' : f === 'JPEG' ? '.jpeg' : `.${f.toLowerCase()}`
                ).join(',')}
              />
              <NeonButton variant="primary">
                Select Files
              </NeonButton>
            </label>
            <p className="text-ai-text-secondary text-sm mt-4">
              Supported: {supportedFormats.join(', ')}
            </p>
          </div>
        </div>

        {/* Files List */}
        {files.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-ai-accent-blue mb-4 flex items-center gap-2">
              <File size={20} />
              Selected Files ({files.length})
            </h3>
            <div className="space-y-2">
              {files.map((file, index) => (
                <GlassCard key={index} className="p-4 flex items-center justify-between hover:bg-white/15 transition">
                  <div className="flex items-center gap-3 flex-1">
                    <CheckCircle className="w-5 h-5 text-ai-accent-cyan" />
                    <div className="min-w-0">
                      <p className="text-ai-text-primary font-semibold truncate">{file.name}</p>
                      <p className="text-ai-text-secondary text-sm">{(file.size / 1024).toFixed(2)} KB</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-ai-text-secondary hover:text-ai-accent-pink transition p-2"
                  >
                    <Trash2 size={18} />
                  </button>
                </GlassCard>
              ))}
            </div>

            <div className="flex gap-4 mt-8">
              <NeonButton
                onClick={handleUpload}
                variant="primary"
                className="flex-1"
                disabled={isUploading}
              >
                {isUploading ? 'Processing...' : `Upload ${files.length} File${files.length !== 1 ? 's' : ''}`}
              </NeonButton>
              <NeonButton
                onClick={() => setFiles([])}
                variant="ghost"
                className="flex-1"
              >
                Clear
              </NeonButton>
            </div>
          </div>
        )}

        {/* Info Box */}
        <GlassCard className="p-6">
          <h4 className="text-ai-accent-purple font-semibold mb-3">📋 Upload Requirements</h4>
          <ul className="space-y-2 text-ai-text-secondary text-sm">
            <li>✓ Maximum file size: 50 MB per file</li>
            <li>✓ Multiple files can be uploaded at once</li>
            <li>✓ Files will be processed and indexed for analysis</li>
            <li>✓ All uploaded content is encrypted and private</li>
          </ul>
        </GlassCard>
      </div>
    </div>
  );
}
