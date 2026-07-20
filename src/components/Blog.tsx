import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, ArrowLeft, ArrowRight, BookOpen, Share2 } from 'lucide-react';
import { BLOG_POSTS } from '../registry';

interface BlogProps {
  onBackToTools: () => void;
}

export default function Blog({ onBackToTools }: BlogProps) {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const activePost = BLOG_POSTS.find((p) => p.id === selectedPostId);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12" id="blog-root">
      <AnimatePresence mode="wait">
        {!selectedPostId ? (
          /* Blog Listing View */
          <motion.div
            key="listing"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-12"
          >
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-400">
                <BookOpen className="h-3.5 w-3.5" />
                <span>ToolNest Chronicles</span>
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Insights on SEO, AI UX & Programmatic Scaling.
              </h1>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                Learn how we scale our edge servers, optimize schemas, and engineer highly performant utility catalogs that convert.
              </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
              {BLOG_POSTS.map((post, idx) => (
                <motion.div
                  key={post.id}
                  whileHover={{ y: -4 }}
                  className="group flex flex-col justify-between rounded-2xl border border-white/5 bg-[#1F2937]/15 p-6 backdrop-blur-md hover:border-blue-500/25 transition-all duration-300"
                >
                  <div>
                    {/* Editorial tech abstract cover placeholders */}
                    <div className="aspect-video w-full rounded-xl bg-gradient-to-tr from-gray-900 to-slate-900 border border-white/5 flex items-center justify-center p-8 overflow-hidden relative">
                      <div className="absolute inset-0 bg-radial-gradient(ellipse_at_center,rgba(59,130,246,0.1),transparent_70%)" />
                      <div className="text-center space-y-3 z-10">
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">CASE STUDY</span>
                        <h3 className="text-lg font-bold text-slate-200 line-clamp-2 px-4 group-hover:text-white transition-colors">
                          {post.title}
                        </h3>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center gap-3 text-xs text-slate-500">
                      <span className="font-semibold text-blue-400 uppercase tracking-wider text-[10px]">{post.category}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {post.date}
                      </span>
                    </div>

                    <h2 className="mt-4 text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-xs text-slate-400 leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img src={post.author.avatar} alt="" className="h-6 w-6 rounded-full border border-white/10" />
                      <span className="text-xs font-semibold text-slate-300">{post.author.name}</span>
                    </div>
                    <button
                      onClick={() => setSelectedPostId(post.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Sponsor Bottom CTA */}
            <div className="rounded-2xl border border-white/5 bg-[#1F2937]/15 p-8 text-center max-w-xl mx-auto space-y-4 backdrop-blur-md">
              <h3 className="text-sm font-bold text-white">Subscribe to Technical Releases</h3>
              <p className="text-xs text-slate-400">Get bi-weekly notifications when we push new tools and server blueprints.</p>
              <div className="flex gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white focus:border-blue-500/50 outline-hidden focus:bg-white/10 transition-all"
                />
                <button className="rounded-lg bg-blue-600 hover:bg-blue-500 px-4 py-2 text-xs font-semibold text-white">
                  Join List
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Full Article View */
          <motion.div
            key="article"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="max-w-3xl mx-auto space-y-8"
          >
            <button
              onClick={() => setSelectedPostId(null)}
              className="inline-flex items-center gap-2 rounded-lg border border-white/5 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Articles</span>
            </button>

            <article className="space-y-6">
              <div className="space-y-4">
                <span className="inline-flex items-center rounded-full bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 text-xs font-semibold text-blue-400">
                  {activePost?.category}
                </span>
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                  {activePost?.title}
                </h1>

                {/* Author Metadata bar */}
                <div className="flex flex-wrap items-center gap-6 border-y border-white/5 py-4 text-xs text-slate-400">
                  <div className="flex items-center gap-2.5">
                    <img src={activePost?.author.avatar} alt="" className="h-7 w-7 rounded-full border border-white/10" />
                    <div>
                      <p className="font-bold text-white">{activePost?.author.name}</p>
                      <p className="text-[10px] text-slate-500">Author</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{activePost?.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{activePost?.readTime}</span>
                  </div>
                  <button className="ml-auto flex items-center gap-1.5 hover:text-white transition-colors" title="Share link">
                    <Share2 className="h-3.5 w-3.5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>

              {/* Main article body rendering beautifully formatted paragraphs */}
              <div className="text-gray-300 leading-relaxed text-sm sm:text-base space-y-6 pt-4 font-sans prose prose-invert">
                {activePost?.content.split('\n\n').map((para, i) => {
                  if (para.startsWith('###')) {
                    return (
                      <h3 key={i} className="text-xl sm:text-2xl font-bold text-white pt-4">
                        {para.replace('###', '').trim()}
                      </h3>
                    );
                  }
                  if (para.startsWith('-')) {
                    return (
                      <ul key={i} className="list-disc pl-5 space-y-2 text-gray-400 text-sm">
                        {para.split('\n').map((item, j) => (
                          <li key={j}>{item.replace('-', '').trim()}</li>
                        ))}
                      </ul>
                    );
                  }
                  return <p key={i} className="text-gray-300 whitespace-pre-wrap">{para}</p>;
                })}
              </div>
            </article>

            {/* Author Footer Card */}
            <div className="border-t border-white/5 pt-8 mt-12 flex items-center gap-4">
              <img src={activePost?.author.avatar} alt="" className="h-12 w-12 rounded-full border border-white/10" />
              <div>
                <h4 className="text-sm font-bold text-white">Written by {activePost?.author.name}</h4>
                <p className="text-xs text-gray-500">Core system developer and UI coordinator at ToolNest.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
