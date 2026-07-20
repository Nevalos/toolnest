import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, Play, Sparkles, Download, Copy, RefreshCw, 
  CheckCircle2, FileText, Upload, Sliders, Shield, AlertTriangle 
} from 'lucide-react';
import { Tool } from '../types';

interface ToolSandboxProps {
  tool: Tool;
  onClose: () => void;
  userPlan: 'free' | 'pro';
  onUpgradeToPro: () => void;
  onRecordUsage: (toolId: string) => void;
}

export default function ToolSandbox({
  tool,
  onClose,
  userPlan,
  onUpgradeToPro,
  onRecordUsage,
}: ToolSandboxProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const [progress, setProgress] = useState(0);

  // Form states for customization
  const [promptInput, setPromptInput] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [simulatedLimitReached, setSimulatedLimitReached] = useState(false);

  const handleRunTool = () => {
    setIsRunning(true);
    setProgress(0);
    setHasRun(false);

    // Simulate pipeline processing speed
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          setHasRun(true);
          onRecordUsage(tool.id);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8" id={`sandbox-${tool.id}`}>
      
      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-6 mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/5 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white tracking-tight">{tool.name}</h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase">
                {tool.category}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">{tool.description}</p>
          </div>
        </div>

        {/* Action Trigger */}
        <button
          onClick={handleRunTool}
          disabled={isRunning}
          className="flex items-center justify-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:translate-y-[-1px]"
        >
          {isRunning ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>Processing... {progress}%</span>
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              <span>Run Sandbox Pipeline</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Left Side: Parameters / Input Panel */}
        <div className="rounded-2xl border border-white/5 bg-[#1F2937]/35 p-6 backdrop-blur-md space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <span className="text-xs font-bold text-white flex items-center gap-2">
              <Sliders className="h-4 w-4 text-blue-500" />
              <span>Configure Input Fields</span>
            </span>
            <span className="text-[10px] font-mono text-slate-500 uppercase">LOCAL PROCESS</span>
          </div>

          {/* Dynamic input configurations matching tool types */}
          {tool.category === 'AI Tools' && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase">Target Prompt</label>
                <textarea
                  placeholder="e.g., Write a high-converting social copy describing a dynamic server platform."
                  rows={4}
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white placeholder-slate-500 outline-hidden focus:border-blue-500/50 focus:bg-white/10 transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase">LLM Engine</label>
                <select className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white outline-hidden focus:border-blue-500/50 focus:bg-white/10 transition-all">
                  <option>gemini-3.5-flash (Fast & Crisp)</option>
                  <option>gemini-3.1-pro-preview (Deep Analysis)</option>
                </select>
              </div>
            </div>
          )}

          {(tool.category === 'PDF Tools' || tool.category === 'Image Tools') && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase">File Attachment</label>
                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all flex flex-col items-center justify-center gap-3 cursor-pointer ${
                    dragActive 
                      ? 'border-blue-500 bg-blue-500/5' 
                      : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <Upload className="h-8 w-8 text-slate-500" />
                  {uploadFile ? (
                    <div>
                      <p className="text-xs font-bold text-white">{uploadFile.name}</p>
                      <p className="text-[10px] text-gray-500 mt-1">{(uploadFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs font-bold text-white">Drag and drop file, or select locally</p>
                      <p className="text-[10px] text-gray-500 mt-1">Supports PNG, WebP, JPG, PDF up to 12MB</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {(tool.category === 'Developer Tools' || tool.category === 'SEO Tools') && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase font-mono">Payload Source Code</label>
                <textarea
                  placeholder={tool.id === 'json-formatter' ? '{\n  "status": "active",\n  "count": 140\n}' : 'Paste raw token string or code here...'}
                  rows={6}
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white placeholder-slate-500 outline-hidden font-mono focus:border-blue-500/50 focus:bg-white/10 transition-all"
                />
              </div>
            </div>
          )}

          {tool.category === 'Business Tools' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Billing From</label>
                <input type="text" placeholder="Your Agency Ltd." className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white outline-hidden focus:border-blue-500/50 focus:bg-white/10 transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Billing To</label>
                <input type="text" placeholder="Client Inc." className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white outline-hidden focus:border-blue-500/50 focus:bg-white/10 transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Amount ($)</label>
                <input type="number" placeholder="1200" className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white outline-hidden focus:border-blue-500/50 focus:bg-white/10 transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Due Date</label>
                <input type="date" className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white outline-hidden focus:border-blue-500/50 focus:bg-white/10 transition-all" />
              </div>
            </div>
          )}

          {tool.category === 'Productivity' && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Session Duration (minutes)</label>
                <input type="number" defaultValue={25} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white outline-hidden focus:border-blue-500/50 focus:bg-white/10 transition-all" />
              </div>
            </div>
          )}

          {tool.category === 'Text Tools' && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Input Paragraph</label>
                <textarea
                  placeholder="Paste paragraph content to analyze or check differences..."
                  rows={4}
                  className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white outline-hidden focus:border-blue-500/50 focus:bg-white/10 transition-all"
                />
              </div>
            </div>
          )}

          {/* Privacy disclaimer */}
          <div className="flex gap-2 rounded-xl bg-white/5 p-3.5 border border-white/5">
            <Shield className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
            <p className="text-[10px] text-slate-400 leading-relaxed">
              **Edge Security Policy**: All computation runs locally inside your sandboxed browser. No files, logs, or custom tokens are transmitted to our servers.
            </p>
          </div>
        </div>

        {/* Right Side: Result Output Console */}
        <div className="rounded-2xl border border-white/5 bg-[#1F2937]/15 p-6 backdrop-blur-md min-h-[350px] flex flex-col justify-between relative overflow-hidden">
          
          <div className="absolute top-0 left-1/3 h-24 w-24 rounded-full bg-blue-500/5 blur-[50px] pointer-events-none" />

          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-500" />
                <span>Console Pipelines</span>
              </span>
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">RESULT SCREEN</span>
            </div>

            <AnimatePresence mode="wait">
              {isRunning ? (
                /* Processing State */
                <motion.div
                  key="running"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-16 text-center space-y-4"
                >
                  <RefreshCw className="h-8 w-8 text-blue-500 animate-spin" />
                  <div>
                    <h4 className="text-xs font-bold text-white">Running core computations</h4>
                    <p className="text-[10px] text-slate-400 mt-1">Compressing payload layers at the edge</p>
                  </div>
                  <div className="w-full max-w-xs h-1.5 rounded-full bg-white/5 overflow-hidden border border-white/5">
                    <motion.div
                      className="h-full bg-blue-500"
                      initial={{ width: '0%' }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                </motion.div>
              ) : hasRun ? (
                /* Success Result Rendering customized per category */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4 py-4"
                >
                  <div className="flex items-center gap-2 rounded-xl bg-emerald-500/5 border border-emerald-500/10 p-3.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <div>
                      <p className="text-xs font-bold text-white">Operations resolved successfully</p>
                      <p className="text-[10px] text-slate-400">Pipeline runtime: 12.4ms</p>
                    </div>
                  </div>

                  {/* Curated visual mock results */}
                  {tool.category === 'AI Tools' && (
                    <div className="rounded-xl border border-white/5 bg-white/5 p-4 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                      Generated copy output based on prompt specifications successfully. Optimizations rendered. Ready to copy.
                    </div>
                  )}

                  {tool.category === 'PDF Tools' && (
                    <div className="rounded-xl border border-white/5 bg-white/5 p-4 space-y-3">
                      <div className="flex justify-between text-xs text-slate-300 font-mono">
                        <span>Original Size:</span>
                        <span>8.24 MB</span>
                      </div>
                      <div className="flex justify-between text-xs text-emerald-400 font-mono font-bold">
                        <span>Compressed Size:</span>
                        <span>1.48 MB (-82%)</span>
                      </div>
                    </div>
                  )}

                  {tool.category === 'Image Tools' && (
                    <div className="rounded-xl border border-white/5 bg-white/5 p-4 space-y-3">
                      <div className="flex justify-between text-xs text-slate-300 font-mono">
                        <span>Conversion Format:</span>
                        <span>WebP Edge Optimization</span>
                      </div>
                      <div className="flex justify-between text-xs text-emerald-400 font-mono font-bold">
                        <span>Quality Index:</span>
                        <span>High Grade (92/100)</span>
                      </div>
                    </div>
                  )}

                  {(tool.category === 'Developer Tools' || tool.category === 'SEO Tools') && (
                    <div className="rounded-xl border border-white/5 bg-white/5 p-4 font-mono text-[11px] text-blue-400 bg-black/10 overflow-x-auto max-h-48 leading-relaxed">
                      {"{\n  \"status\": \"success\",\n  \"validatedSchema\": true,\n  \"cachedAt\": 1700231900\n}"}
                    </div>
                  )}

                  {tool.category === 'Business Tools' && (
                    <div className="rounded-xl border border-white/5 bg-white/5 p-4 space-y-2 text-xs">
                      <div className="flex justify-between"><span className="text-slate-400">Invoice Number:</span><span className="text-white font-mono">#INV-928A</span></div>
                      <div className="flex justify-between"><span className="text-slate-400">Aggregate Due:</span><span className="text-white font-bold">$1,200.00 USD</span></div>
                    </div>
                  )}

                  {tool.category === 'Productivity' && (
                    <div className="text-center py-4">
                      <p className="text-2xl font-black text-white font-mono">25:00</p>
                      <p className="text-[10px] text-gray-500 mt-1">Pomodoro block active. Ambient stream connected.</p>
                    </div>
                  )}

                  {tool.category === 'Text Tools' && (
                    <div className="rounded-xl border border-gray-800 bg-gray-950 p-4 space-y-2 text-xs font-mono">
                      <div className="flex justify-between"><span className="text-gray-500">Character count:</span><span className="text-white">1,482</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Reading complexity:</span><span className="text-white">Grade 8</span></div>
                    </div>
                  )}

                  {/* Actions on Result */}
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-gray-900 hover:bg-gray-800 border border-gray-800 text-xs font-semibold text-white py-2 transition-colors">
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Payload</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white py-2 transition-colors">
                      <Download className="h-3.5 w-3.5" />
                      <span>Download Output</span>
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* Idle Waiting State */
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-20 text-center text-gray-500"
                >
                  <FileText className="h-10 w-10 text-gray-700" />
                  <h4 className="mt-4 text-xs font-semibold text-gray-400">Sandbox result is empty</h4>
                  <p className="mt-2 text-[10px] text-gray-500 max-w-xs leading-relaxed">
                    Set up your parameters and input details in the configurations, then trigger "Run Sandbox Pipeline" to render outputs.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Ad banner on Free Plan */}
          {userPlan === 'free' && (
            <div className="border-t border-gray-900 pt-4 flex items-center justify-between gap-4 text-[10px]">
              <span className="text-gray-500">Premium integrations require custom keys.</span>
              <button
                onClick={onUpgradeToPro}
                className="text-amber-400 hover:underline font-bold flex items-center gap-1"
              >
                <span>Sponsor Pro</span>
                <Sparkles className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
