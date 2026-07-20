import React from 'react';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { Tool } from '../types';

interface ToolCardProps {
  tool: Tool;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onOpenTool: (tool: Tool) => void;
  key?: string | number;
}

export default function ToolCard({ tool, isFavorite, onToggleFavorite, onOpenTool }: ToolCardProps) {
  // Dynamically resolve icon, fallback to HelpCircle if missing
  const IconComponent = (Icons as any)[tool.iconName] || Icons.HelpCircle;

  return (
    <motion.div
      layout
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="group relative flex flex-col justify-between rounded-2xl border border-white/5 bg-[#1F2937]/35 p-6 backdrop-blur-md shadow-lg transition-all duration-300 hover:border-blue-500/30 hover:bg-[#1F2937]/60 hover:shadow-2xl hover:shadow-blue-500/10"
      id={`tool-card-${tool.id}`}
    >
      {/* Dynamic light rays inside cards on hover */}
      <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(150px_circle_at_var(--x,0px)_var(--y,0px),rgba(59,130,246,0.06),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        {/* Top bar with icon and favorite state */}
        <div className="flex items-center justify-between">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-slate-300 group-hover:text-blue-400 group-hover:border-blue-500/25 transition-all duration-300">
            <IconComponent className="h-5 w-5" />
            <div className="absolute inset-0 rounded-xl bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-all blur-xs" />
          </div>

          <div className="flex items-center gap-1.5">
            {tool.isPopular && (
              <span className="inline-flex items-center rounded-full bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-[9px] font-bold text-blue-400 uppercase tracking-wider">
                Popular
              </span>
            )}
            {tool.isNew && (
              <span className="inline-flex items-center rounded-full bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 text-[9px] font-bold text-indigo-400 uppercase tracking-wider">
                New
              </span>
            )}

            <button
              onClick={(e) => onToggleFavorite(tool.id, e)}
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/5 bg-white/5 text-gray-400 hover:text-red-400 hover:border-red-500/25 transition-all duration-250 active:scale-90"
              title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            >
              <Icons.Star className={`h-3.5 w-3.5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Name and description */}
        <div className="mt-5">
          <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors duration-200 flex items-center gap-1.5">
            {tool.name}
          </h3>
          <p className="mt-2 text-xs text-gray-400 line-clamp-2 leading-relaxed">
            {tool.description}
          </p>
        </div>
      </div>

      {/* Action / Trigger Button */}
      <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
        <span className="text-[10px] font-mono font-medium text-slate-400 flex items-center gap-1.5 uppercase">
          <Icons.Activity className="h-3 w-3 text-slate-500" />
          {tool.usageCount.toLocaleString()} Uses
        </span>

        <button
          onClick={() => onOpenTool(tool)}
          className="inline-flex items-center gap-1.5 rounded-full bg-white/5 hover:bg-blue-600 border border-white/10 hover:border-blue-500 px-4 py-1.5 text-xs font-bold text-slate-300 hover:text-white shadow-md transition-all active:scale-95 group-hover:shadow-lg group-hover:shadow-blue-500/15"
        >
          <span>Launch</span>
          <Icons.ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </motion.div>
  );
}
