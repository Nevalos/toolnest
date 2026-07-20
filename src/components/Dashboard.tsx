import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, Clock, Zap, Star, Shield, Lock, Trash2, 
  ChevronRight, ExternalLink, RefreshCw, BarChart2, Crown 
} from 'lucide-react';
import { User, Tool, UsageMetric } from '../types';
import * as Icons from 'lucide-react';

interface DashboardProps {
  user: User;
  tools: Tool[];
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onOpenTool: (tool: Tool) => void;
  onClearHistory: () => void;
}

export default function Dashboard({
  user,
  tools,
  onToggleFavorite,
  onOpenTool,
  onClearHistory,
}: DashboardProps) {
  const [activeMetricTab, setActiveMetricTab] = useState<'volume' | 'latency'>('volume');

  // Simulated metrics
  const metrics: UsageMetric[] = [
    { date: 'Mon', queries: 24, latency: 18 },
    { date: 'Tue', queries: 32, latency: 22 },
    { date: 'Wed', queries: 18, latency: 16 },
    { date: 'Thu', queries: 45, latency: 21 },
    { date: 'Fri', queries: 55, latency: 25 },
    { date: 'Sat', queries: 12, latency: 15 },
    { date: 'Sun', queries: 38, latency: 19 },
  ];

  // Map favorites list
  const favoriteTools = tools.filter((t) => user.favorites.includes(t.id));

  // Map history list with tools
  const historyList = user.history
    .map((item) => {
      const tool = tools.find((t) => t.id === item.toolId);
      return tool ? { ...tool, timestamp: item.timestamp } : null;
    })
    .filter(Boolean) as (Tool & { timestamp: string })[];

  // Total calculations
  const totalQueriesUsed = user.plan === 'pro' ? 245 : 34; // Mock calculations
  const queryLimit = user.plan === 'pro' ? 'Unlimited' : '100';

  // SVG Chart Math
  const padding = 30;
  const chartHeight = 150;
  const chartWidth = 500;
  const points = metrics.map((m, i) => {
    const x = padding + (i * (chartWidth - padding * 2)) / (metrics.length - 1);
    const value = activeMetricTab === 'volume' ? m.queries : m.latency;
    const maxVal = activeMetricTab === 'volume' ? 60 : 30;
    const y = chartHeight - padding - (value * (chartHeight - padding * 2)) / maxVal;
    return { x, y, label: m.date, value };
  });

  const pathD = points.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    // Draw smooth bezier curves
    const prev = points[i - 1];
    const cp1x = prev.x + (p.x - prev.x) / 2;
    const cp1y = prev.y;
    const cp2x = prev.x + (p.x - prev.x) / 2;
    const cp2y = p.y;
    return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p.x} ${p.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${chartHeight - padding} L ${points[0].x} ${chartHeight - padding} Z`;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10" id="dashboard-root">
      
      {/* Upper Panel Welcome and Plan status */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-white/5 pb-8 mb-10">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="h-16 w-16 rounded-2xl border-2 border-blue-500/30 object-cover shadow-lg shadow-blue-500/10"
          />
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Welcome back, {user.name}</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Active sandbox developer portal. Plan status: 
              <span className={`ml-1.5 font-bold px-2 py-0.5 rounded-full text-[10px] ${
                user.plan === 'pro' 
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase' 
                  : 'bg-white/5 text-slate-400 border border-white/5 uppercase'
              }`}>
                {user.plan} Active
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-white/5 bg-[#1F2937]/35 px-4 py-2.5 text-right backdrop-blur-md">
            <span className="block text-[10px] font-mono text-slate-500 uppercase">Limit Allotment</span>
            <span className="text-sm font-bold text-white font-mono">{totalQueriesUsed} / {queryLimit}</span>
          </div>
        </div>
      </div>

      {/* Grid of Dashboard stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="rounded-2xl border border-white/5 bg-[#1F2937]/15 p-5 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Total API Runs</span>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </div>
          <p className="mt-4 text-3xl font-black text-white font-mono">{totalQueriesUsed}</p>
          <p className="text-[10px] text-slate-500 mt-1">Across all active utilities</p>
        </div>

        <div className="rounded-2xl border border-white/5 bg-[#1F2937]/15 p-5 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Avg Response Time</span>
            <Zap className="h-4 w-4 text-amber-500" />
          </div>
          <p className="mt-4 text-3xl font-black text-white font-mono">19.4 ms</p>
          <p className="text-[10px] text-slate-500 mt-1">Under edge conditions</p>
        </div>

        <div className="rounded-2xl border border-white/5 bg-[#1F2937]/15 p-5 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Account Standing</span>
            <Shield className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="mt-4 text-3xl font-black text-white font-mono">Secure</p>
          <p className="text-[10px] text-slate-500 mt-1">SSL client verification active</p>
        </div>

        <div className="rounded-2xl border border-white/5 bg-[#1F2937]/15 p-5 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Uptime Grade</span>
            <Crown className="h-4 w-4 text-blue-500" />
          </div>
          <p className="mt-4 text-3xl font-black text-white font-mono">A+</p>
          <p className="text-[10px] text-slate-500 mt-1">Cloud Run SLA verified</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Core SVG Charts Area */}
        <div className="lg:col-span-2 rounded-2xl border border-white/5 bg-[#1F2937]/15 p-6 backdrop-blur-md space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart2 className="h-4 w-4 text-blue-500" />
                <span>Performance Analytics</span>
              </h2>
              <p className="text-[11px] text-slate-500 mt-0.5">Real-time edge telemetry and usage profiles</p>
            </div>
            <div className="flex items-center rounded-lg border border-white/5 bg-black/25 p-1">
              <button
                onClick={() => setActiveMetricTab('volume')}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                  activeMetricTab === 'volume' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Volume
              </button>
              <button
                onClick={() => setActiveMetricTab('latency')}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                  activeMetricTab === 'latency' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Latency
              </button>
            </div>
          </div>

          {/* Render Premium Handcrafted SVG Graph */}
          <div className="relative pt-2">
            <svg 
              viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
              className="w-full h-auto overflow-visible select-none"
            >
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1={padding} y1={padding} x2={chartWidth - padding} y2={padding} stroke="#1f2937" strokeWidth="0.5" strokeDasharray="4 4" />
              <line x1={padding} y1={(chartHeight) / 2} x2={chartWidth - padding} y2={(chartHeight) / 2} stroke="#1f2937" strokeWidth="0.5" strokeDasharray="4 4" />
              <line x1={padding} y1={chartHeight - padding} x2={chartWidth - padding} y2={chartHeight - padding} stroke="#374151" strokeWidth="0.8" />

              {/* Gradient Fill */}
              <path d={areaD} fill="url(#chartGradient)" />

              {/* Path Line */}
              <path d={pathD} fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />

              {/* Highlight Nodes */}
              {points.map((p, i) => (
                <g key={i} className="group/node">
                  <circle 
                    cx={p.x} 
                    cy={p.y} 
                    r="4" 
                    fill="#111827" 
                    stroke="#3B82F6" 
                    strokeWidth="2" 
                    className="cursor-pointer hover:r-[6px] transition-all duration-200" 
                  />
                  {/* Tooltips */}
                  <text 
                    x={p.x} 
                    y={p.y - 10} 
                    textAnchor="middle" 
                    fill="#3B82F6" 
                    fontSize="9" 
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    {p.value}
                  </text>
                  {/* X Axis label */}
                  <text 
                    x={p.x} 
                    y={chartHeight - padding + 15} 
                    textAnchor="middle" 
                    fill="#4b5563" 
                    fontSize="9" 
                    fontFamily="sans-serif"
                  >
                    {p.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Saved Favorites Column */}
        <div className="rounded-2xl border border-white/5 bg-[#1F2937]/15 p-6 backdrop-blur-md space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Star className="h-4 w-4 text-amber-500 fill-amber-500/20" />
            <span>Saved Favorites ({favoriteTools.length})</span>
          </h2>
          
          <div className="space-y-2.5 overflow-y-auto max-h-[190px]">
            {favoriteTools.length > 0 ? (
              favoriteTools.map((tool) => {
                const IconComponent = (Icons as any)[tool.iconName] || Icons.HelpCircle;
                return (
                  <div
                    key={tool.id}
                    className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-3 hover:bg-white/10 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/20 border border-white/5 text-slate-400 group-hover:text-blue-400 group-hover:border-blue-500/25 transition-colors">
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">{tool.name}</p>
                        <p className="text-[10px] text-slate-400">{tool.category}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => onOpenTool(tool)}
                      className="h-7 w-7 rounded-lg border border-white/5 bg-white/5 text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-500 flex items-center justify-center transition-all"
                    >
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8">
                <p className="text-xs text-gray-500">No tools favorited yet.</p>
                <p className="text-[10px] text-gray-600 mt-1">Star items from the catalog for quick launch.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recently Used Console List */}
      <div className="mt-10 rounded-2xl border border-white/5 bg-[#1F2937]/15 p-6 backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-400" />
              <span>Sandbox Run History</span>
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">Audit log of sandboxes launched under this container</p>
          </div>
          {historyList.length > 0 && (
            <button
              onClick={onClearHistory}
              className="flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/5 px-2.5 py-1.5 text-[10px] font-bold text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <Trash2 className="h-3 w-3" />
              <span>Clear History</span>
            </button>
          )}
        </div>

        <div className="space-y-3">
          {historyList.length > 0 ? (
            historyList.map((tool, index) => {
              const IconComponent = (Icons as any)[tool.iconName] || Icons.HelpCircle;
              return (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-white/5 bg-white/5 p-4 hover:border-white/10 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black/20 border border-white/5 text-slate-400">
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{tool.name}</p>
                      <p className="text-[10px] text-slate-400">{tool.category}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                    <span className="text-[10px] font-mono text-slate-500">{tool.timestamp}</span>
                    <button
                      onClick={() => onOpenTool(tool)}
                      className="flex items-center gap-1.5 rounded-lg border border-white/5 bg-white/5 hover:bg-blue-600 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-all"
                    >
                      <span>Relaunch</span>
                      <ExternalLink className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 border border-dashed border-white/5 rounded-xl bg-white/5">
              <Clock className="mx-auto h-8 w-8 text-slate-700" />
              <p className="mt-3 text-xs text-slate-500">Run history is empty.</p>
              <p className="text-[10px] text-slate-600 mt-1">Launched utilities will populate here for swift recovery.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
