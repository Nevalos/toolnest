import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowUpRight, X } from 'lucide-react';

interface AdPlaceholderProps {
  userPlan: 'free' | 'pro';
  onUpgradeToPro: () => void;
  position?: 'sidebar' | 'footer' | 'inline';
}

export default function AdPlaceholder({ userPlan, onUpgradeToPro, position = 'inline' }: AdPlaceholderProps) {
  // If user is pro, ads are completely hidden! Excellent monetization model validation.
  if (userPlan === 'pro') return null;

  if (position === 'sidebar') {
    return (
      <div className="rounded-xl border border-white/5 bg-[#1F2937]/15 p-4 text-center space-y-3 backdrop-blur-xs" id="sidebar-ad">
        <span className="text-[8px] font-extrabold tracking-wider text-slate-500 uppercase">Sponsor Ad</span>
        <div className="space-y-1">
          <p className="text-xs font-bold text-white">Scale programmatically</p>
          <p className="text-[10px] text-slate-400">Unlock infinite compute lines, dedicated SLAs, and team seats on ToolNest.</p>
        </div>
        <button
          onClick={onUpgradeToPro}
          className="w-full rounded-lg bg-blue-600 hover:bg-blue-500 py-2 text-[10px] font-bold text-white transition-colors"
        >
          Remove Ads
        </button>
      </div>
    );
  }

  if (position === 'footer') {
    return (
      <div className="rounded-2xl border border-white/5 bg-[#1F2937]/15 p-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left" id="footer-ad">
        <div className="space-y-1">
          <div className="flex items-center justify-center md:justify-start gap-1.5">
            <span className="text-[9px] font-extrabold tracking-wider bg-white/5 px-1.5 py-0.5 rounded text-slate-400 uppercase">Partner</span>
            <p className="text-xs font-bold text-white">Deploy directly to Google Cloud Run</p>
          </div>
          <p className="text-[10px] text-slate-400">Deploy high-performance web servers with near-instant scale-to-zero cold starts. Built by AI Studio developers.</p>
        </div>
        <button
          onClick={onUpgradeToPro}
          className="shrink-0 flex items-center gap-1.5 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-slate-300 transition-colors"
        >
          <span>Support ToolNest Premium</span>
          <ArrowUpRight className="h-3.5 w-3.5 text-blue-500" />
        </button>
      </div>
    );
  }

  // Default Inline Ad
  return (
    <div className="rounded-2xl border border-white/5 bg-[#1F2937]/15 p-4 flex items-center justify-between gap-4 backdrop-blur-xs" id="inline-ad">
      <div className="flex items-center gap-3">
        <span className="text-[8px] font-bold tracking-wider text-slate-500 border border-white/5 px-1.5 py-0.5 rounded uppercase">
          Sponsor
        </span>
        <p className="text-[11px] text-slate-400">
          Want to integrate custom ToolNest APIs directly into your local workflows? <button onClick={onUpgradeToPro} className="text-blue-400 hover:underline font-semibold">Consult Pro licensing.</button>
        </p>
      </div>
    </div>
  );
}
