import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Shield, Zap, RefreshCw, Star } from 'lucide-react';

interface HeroProps {
  onSearchFocus: () => void;
  onExploreClick: () => void;
}

export default function Hero({ onSearchFocus, onExploreClick }: HeroProps) {
  const stats = [
    { label: 'Uptime', value: '99.99%', icon: Shield, color: 'text-emerald-500' },
    { label: 'Average Latency', value: '< 24ms', icon: Zap, color: 'text-amber-500' },
    { label: 'Operations/Day', value: '184k+', icon: RefreshCw, color: 'text-blue-500' },
  ];

  return (
    <div className="relative overflow-hidden pt-16 pb-12 sm:pt-24 sm:pb-20">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -z-10 h-[600px] w-[1000px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.08),transparent_50%)]" />
      <div className="absolute top-1/4 left-1/4 -z-10 h-[250px] w-[250px] rounded-full bg-blue-500/5 blur-[120px]" />
      <div className="absolute top-1/3 right-1/4 -z-10 h-[250px] w-[250px] rounded-full bg-indigo-500/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Subtle dynamic trust badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-sm"
          id="hero-trust-badge"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          New Tools Added Daily
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
          id="hero-title"
        >
          <span className="block text-gray-100">Every tool you need.</span>
          <span className="block mt-1 bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500 bg-clip-text text-transparent pb-2 font-black">
            Nothing you don't.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-base text-gray-400 sm:text-lg md:text-xl leading-relaxed"
          id="hero-subtitle"
        >
          Simple, fast and AI-powered online tools for creators, students and professionals. Completely secure, private, and running entirely at the edge.
        </motion.p>

        {/* Hero Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <button
            onClick={onSearchFocus}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all hover:translate-y-[-1px]"
            id="hero-search-action-btn"
          >
            <span>Start Quick Search</span>
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-gray-800 bg-gray-950 px-6 py-3.5 text-sm font-semibold text-gray-300 hover:text-white hover:bg-gray-900 transition-all"
            id="hero-explore-btn"
          >
            <span>Explore Categories</span>
          </button>
        </motion.div>

        {/* Tech Platform Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 sm:mt-24 border-y border-gray-800/60 bg-gray-950/20 backdrop-blur-xs py-8"
        >
          <div className="mx-auto max-w-5xl px-4">
            <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-3 sm:gap-x-12 sm:gap-y-0 text-center">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="flex flex-col items-center justify-center">
                    <div className="flex items-center gap-2">
                      <Icon className={`h-4 w-4 ${stat.color}`} />
                      <span className="text-sm font-medium text-gray-500 uppercase tracking-widest">{stat.label}</span>
                    </div>
                    <span className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">
                      {stat.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
