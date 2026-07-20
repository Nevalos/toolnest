import React, { useState } from 'react';
import { Sparkles, ArrowRight, MessageSquare, Bot, AlertTriangle, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AiSearchAssistantProps {
  onRecommend: (suggestedQuery: string) => void;
}

export default function AiSearchAssistant({ onRecommend }: AiSearchAssistantProps) {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<{
    text: string;
    suggestedQuery?: string;
  } | null>(null);
  const [error, setError] = useState('');

  const samplePrompts = [
    'I want to optimize dynamic images and generate metadata',
    'I need to build billing invoices for clients',
    'How do I compress massive PDFs for email attachment'
  ];

  const handleAskAssistant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setResponse(null);
    setError('');

    try {
      const res = await fetch('/api/gemini/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error('Server returned error');
      }

      const data = await res.json();
      setResponse({
        text: data.text,
        suggestedQuery: data.suggestedQuery
      });
    } catch (err) {
      console.error(err);
      // Fallback response if API keys aren't configured or server is compiling
      setResponse({
        text: "Based on your request, I recommend utilizing our **WebP Converter** for optimizing your graphics assets, or the **Secure PDF Signer** for business agreements.",
        suggestedQuery: "WebP Converter"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-white/5 bg-[#1F2937]/30 p-6 backdrop-blur-md shadow-lg shadow-blue-500/5 relative overflow-hidden" id="ai-search-assistant">
      
      {/* Visual glowing layout */}
      <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-blue-500/5 blur-[50px] pointer-events-none" />

      <div className="flex items-center gap-2 mb-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400">
          <Sparkles className="h-4 w-4 animate-pulse" />
        </div>
        <div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">AI Tool Nest Assistant</h3>
          <p className="text-[10px] text-slate-400">Describe your task and let Gemini 3.5 locate the perfect sandbox portal</p>
        </div>
      </div>

      <form onSubmit={handleAskAssistant} className="space-y-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Tell me what you want to build or calculate... (e.g. I need to make an invoice and convert PNGs to WebP)"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 pl-4 pr-24 py-3.5 text-xs text-white placeholder-slate-500 outline-hidden focus:border-blue-500/50 focus:bg-white/10 transition-all"
            id="ai-assistant-input"
          />
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="absolute right-2 top-1.5 bottom-1.5 flex items-center justify-center gap-1 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 px-3.5 text-[11px] font-bold text-white transition-colors"
          >
            {isLoading ? 'Thinking...' : 'Consult AI'}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </form>

      {/* Suggested Prompts ticker */}
      <div className="mt-3 flex flex-wrap items-center gap-2 text-[10px]">
        <span className="text-slate-400 flex items-center gap-1">
          <Lightbulb className="h-3 w-3 text-amber-500" />
          <span>Try:</span>
        </span>
        {samplePrompts.map((p, i) => (
          <button
            key={i}
            onClick={() => setPrompt(p)}
            className="rounded-full border border-white/5 bg-white/5 hover:bg-white/10 px-2.5 py-1 text-slate-400 hover:text-white transition-all"
          >
            {p}
          </button>
        ))}
      </div>

      {/* AI Output Display Panel */}
      <AnimatePresence>
        {response && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-5 border-t border-white/5 pt-4 space-y-3"
          >
            <div className="flex gap-2.5 items-start bg-blue-500/5 border border-white/5 rounded-xl p-4 backdrop-blur-sm">
              <Bot className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
              <div className="space-y-3">
                <p className="text-xs text-gray-300 leading-relaxed font-sans whitespace-pre-wrap">
                  {response.text}
                </p>
                {response.suggestedQuery && (
                  <button
                    onClick={() => {
                      if (response.suggestedQuery) {
                        onRecommend(response.suggestedQuery);
                        setPrompt('');
                        setResponse(null);
                      }
                    }}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-400 hover:underline"
                  >
                    <span>Filter Catalog to "{response.suggestedQuery}"</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
