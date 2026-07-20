import React, { useState, useMemo } from 'react';
import { Search, Grid, HelpCircle, Star, Filter, Sparkles, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Tool, ToolCategory } from '../types';
import ToolCard from './ToolCard';
import AiSearchAssistant from './AiSearchAssistant';

interface ToolShowcaseProps {
  tools: Tool[];
  favorites: string[];
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onOpenTool: (tool: Tool) => void;
  userPlan: 'free' | 'pro';
  onUpgradeToPro: () => void;
}

export default function ToolShowcase({
  tools,
  favorites,
  onToggleFavorite,
  onOpenTool,
  userPlan,
  onUpgradeToPro
}: ToolShowcaseProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | 'All'>('All');
  const [filterFavorites, setFilterFavorites] = useState(false);

  const categories: (ToolCategory | 'All')[] = [
    'All',
    'AI Tools',
    'PDF Tools',
    'Image Tools',
    'Business Tools',
    'Developer Tools',
    'SEO Tools',
    'Productivity',
    'Text Tools'
  ];

  // Filter tools dynamically
  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      const matchesFavorites = !filterFavorites || favorites.includes(tool.id);

      return matchesSearch && matchesCategory && matchesFavorites;
    });
  }, [tools, searchQuery, selectedCategory, filterFavorites, favorites]);

  const handleAiRecommendationSelected = (suggestedQuery: string) => {
    setSearchQuery(suggestedQuery);
    setSelectedCategory('All');
    setFilterFavorites(false);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10" id="tool-showcase-section">
      
      {/* Category Horizontal Filter Scroller */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-white/5 pb-6 mb-10">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Grid className="h-5 w-5 text-blue-500" />
            <span>Search & Filter Catalog</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Instantly query, sort, and launch your sandbox utilities at the edge.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setFilterFavorites(!filterFavorites)}
            className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-semibold transition-all ${
              filterFavorites
                ? 'bg-red-500/10 border-red-500/30 text-red-400'
                : 'bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Star className={`h-3.5 w-3.5 ${filterFavorites ? 'fill-red-400' : ''}`} />
            <span>{filterFavorites ? 'Showing Favorites' : 'Filter Favorites'}</span>
          </button>
        </div>
      </div>

      {/* AI Assistant Context Bar - Instantly builds trust */}
      <div className="mb-10">
        <AiSearchAssistant onRecommend={handleAiRecommendationSelected} />
      </div>

      {/* Classic Catalog Filters and Large Input Search */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Sidebar Category Filter List */}
        <div className="w-full lg:w-64 shrink-0 space-y-2 lg:sticky lg:top-24">
          <span className="text-[10px] font-bold tracking-wider text-gray-500 uppercase block mb-3 px-1">
            Categories ({categories.length - 1})
          </span>
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4 lg:grid-cols-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setFilterFavorites(false);
                }}
                className={`flex items-center justify-between rounded-full px-4 py-2.5 text-left text-xs font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{category}</span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                  selectedCategory === category 
                    ? 'bg-blue-700/50 border-blue-500/30 text-blue-100' 
                    : 'bg-white/5 border-white/5 text-slate-500'
                }`}>
                  {category === 'All' 
                    ? tools.length 
                    : tools.filter(t => t.category === category).length
                  }
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Search Input & Grid Area */}
        <div className="flex-1 w-full space-y-6">
          <div className="relative">
            <Search className="absolute top-1/2 left-4.5 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="What are you working on? (e.g. JWT, WebP Converter, metadata, invoices...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-[#1F2937]/50 pl-12 pr-10 py-4.5 text-sm text-white placeholder-slate-500 backdrop-blur-xl outline-hidden transition-all focus:border-blue-500/50 focus:bg-[#1F2937]/70 focus:ring-1 focus:ring-blue-500/30 shadow-2xl"
              id="platform-search-input"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute top-1/2 right-4.5 h-5 w-5 -translate-y-1/2 flex items-center justify-center rounded-full bg-white/10 text-slate-300 hover:text-white"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* Sponsoring / Ads Placeholder - Standard Google Adsense Style but highly aesthetic */}
          {userPlan === 'free' && (
            <div className="rounded-2xl border border-gray-800/80 bg-gray-950/40 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-xs">
              <div className="flex items-center gap-3">
                <span className="text-[9px] font-extrabold tracking-wider bg-gray-800 px-1.5 py-0.5 rounded text-gray-400 uppercase">
                  Ad
                </span>
                <div>
                  <p className="text-xs font-semibold text-white">Need unlimited, ad-free operations?</p>
                  <p className="text-[10px] text-gray-400">Unlock early access features, unlimited daily API limits, and dedicated support.</p>
                </div>
              </div>
              <button
                onClick={onUpgradeToPro}
                className="shrink-0 flex items-center gap-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 px-3.5 py-1.5 text-xs font-bold text-gray-950 transition-colors shadow-md shadow-amber-500/10"
              >
                <span>Go Pro</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {/* Stats Bar */}
          <div className="flex items-center justify-between text-xs text-gray-400 px-1">
            <span>Showing {filteredTools.length} of {tools.length} available utilities</span>
            {selectedCategory !== 'All' && (
              <button
                onClick={() => setSelectedCategory('All')}
                className="text-blue-400 hover:underline text-[11px]"
              >
                Reset Filter
              </button>
            )}
          </div>

          {/* Tools Grid Layout */}
          <AnimatePresence mode="popLayout">
            {filteredTools.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
              >
                {filteredTools.map((tool) => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    isFavorite={favorites.includes(tool.id)}
                    onToggleFavorite={onToggleFavorite}
                    onOpenTool={onOpenTool}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl border border-dashed border-gray-800 bg-gray-950/20 p-12 text-center"
              >
                <HelpCircle className="mx-auto h-12 w-12 text-gray-600" />
                <h3 className="mt-4 text-base font-bold text-white">No utilities matching criteria</h3>
                <p className="mt-2 text-xs text-gray-400 max-w-sm mx-auto leading-relaxed">
                  We currently do not have that exact tool in our sandbox, but you can suggest it to our developers or clear filters to look again.
                </p>
                <div className="mt-6 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                      setFilterFavorites(false);
                    }}
                    className="rounded-lg bg-gray-900 border border-gray-800 px-4 py-2 text-xs font-semibold text-white hover:bg-gray-800 transition-colors"
                  >
                    Reset Search Filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
