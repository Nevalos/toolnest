import React, { useState } from 'react';
import { Menu, X, Sparkles, User, LogOut, LayoutDashboard, Bookmark, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { User as UserType } from '../types';

interface NavbarProps {
  user: UserType | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  favoritesCount: number;
  currentTab: string;
  setTab: (tab: string) => void;
  onUpgradeToPro: () => void;
}

export default function Navbar({
  user,
  onOpenAuth,
  onLogout,
  favoritesCount,
  currentTab,
  setTab,
  onUpgradeToPro,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const tabs = [
    { id: 'tools', label: 'Tools' },
    { id: 'blog', label: 'Blog' },
    { id: 'pricing', label: 'Pricing' },
    ...(user ? [{ id: 'dashboard', label: 'Dashboard' }] : []),
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#111827]/60 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <div 
              onClick={() => { setTab('tools'); setIsOpen(false); }}
              className="flex cursor-pointer items-center gap-2.5 transition-opacity hover:opacity-90"
              id="navbar-logo"
            >
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md shadow-blue-500/20">
                <div className="absolute inset-0.5 rounded-[10px] bg-[#111827] flex items-center justify-center">
                  <div className="relative h-5 w-5 flex items-center justify-center">
                    <span className="absolute block h-1.5 w-4 rounded-full bg-blue-500 transform -rotate-12 translate-y-[-3px]"></span>
                    <span className="absolute block h-1.5 w-4 rounded-full bg-indigo-500 transform rotate-12"></span>
                    <span className="absolute block h-1.5 w-3 rounded-full bg-blue-400 transform -rotate-12 translate-y-[3px]"></span>
                  </div>
                </div>
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-white">Tool<span className="text-blue-500 font-extrabold">Nest</span></span>
                <span className="block text-[9px] font-medium tracking-widest text-gray-400 uppercase">Beta Platform</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1.5">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setTab(tab.id)}
                  id={`nav-tab-${tab.id}`}
                  className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    currentTab === tab.id
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {currentTab === tab.id && (
                    <motion.div
                      layoutId="active-nav-indicator"
                      className="absolute inset-0 rounded-lg bg-gray-800/60 border border-gray-700/30"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Right side */}
          <div className="hidden md:flex items-center gap-4">
            {/* Favorites Indicator */}
            {user && (
              <button 
                onClick={() => setTab('dashboard')} 
                className="flex items-center gap-2 rounded-lg bg-gray-900 border border-gray-800 px-3 py-1.5 text-xs text-gray-400 hover:text-white transition-colors"
                id="favorites-shortcut"
              >
                <Bookmark className="h-3.5 w-3.5 text-blue-500 fill-blue-500/20" />
                <span>Favorites</span>
                <AnimatePresence mode="popLayout">
                  {favoritesCount > 0 && (
                    <motion.span
                      key={favoritesCount}
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.6, opacity: 0 }}
                      className="flex h-4 min-w-[16px] items-center justify-center rounded-full bg-blue-500 px-1 text-[10px] font-bold text-white"
                    >
                      {favoritesCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            )}

            {/* User Profile / Auth Action */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2.5 rounded-lg border border-gray-800 bg-gray-950 p-1 pr-3 hover:bg-gray-900 transition-all text-left"
                  id="user-profile-menu-button"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-7 w-7 rounded-md object-cover border border-gray-800"
                  />
                  <div>
                    <div className="text-xs font-semibold text-white leading-tight">{user.name}</div>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[9px] font-bold px-1 py-0.2 rounded uppercase ${
                        user.plan === 'pro' 
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                          : 'bg-gray-800 text-gray-400'
                      }`}>
                        {user.plan}
                      </span>
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {showDropdown && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-52 origin-top-right rounded-xl border border-gray-800 bg-gray-950 p-1.5 shadow-xl shadow-black/40 z-20"
                      >
                        <div className="px-3 py-2 border-b border-gray-800">
                          <p className="text-xs text-gray-500">Logged in as</p>
                          <p className="text-xs font-medium text-white truncate">{user.email}</p>
                        </div>
                        <div className="p-1 space-y-0.5">
                          <button
                            onClick={() => { setTab('dashboard'); setShowDropdown(false); }}
                            className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-gray-400 hover:text-white hover:bg-gray-900 transition-colors"
                          >
                            <LayoutDashboard className="h-3.5 w-3.5 text-blue-500" />
                            Dashboard Console
                          </button>
                          {user.plan === 'free' && (
                            <button
                              onClick={() => { onUpgradeToPro(); setShowDropdown(false); }}
                              className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-amber-400 hover:text-amber-300 hover:bg-amber-500/5 transition-colors"
                            >
                              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                              Upgrade to Pro
                            </button>
                          )}
                          <button
                            onClick={() => { onLogout(); setShowDropdown(false); }}
                            className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-colors"
                          >
                            <LogOut className="h-3.5 w-3.5" />
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:translate-y-[-1px] active:translate-y-0"
                id="login-button"
              >
                <User className="h-3.5 w-3.5" />
                <span>Launch Console</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            {user && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white md:hidden">
                {favoritesCount}
              </span>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none"
              id="mobile-menu-toggle"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-800 bg-[#111827] overflow-hidden"
          >
            <div className="space-y-1 px-4 py-3">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setTab(tab.id); setIsOpen(false); }}
                  className={`flex w-full items-center rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                    currentTab === tab.id
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}

              <div className="pt-4 mt-2 border-t border-gray-800 space-y-2">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 px-3 py-2">
                      <img src={user.avatar} alt="" className="h-9 w-9 rounded-md border border-gray-700" />
                      <div>
                        <div className="text-xs font-semibold text-white">{user.name}</div>
                        <div className="text-[10px] text-gray-400">{user.email}</div>
                      </div>
                    </div>
                    {user.plan === 'free' && (
                      <button
                        onClick={() => { onUpgradeToPro(); setIsOpen(false); }}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 px-3 py-2 text-xs font-semibold"
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                        Upgrade to Pro
                      </button>
                    )}
                    <button
                      onClick={() => { onLogout(); setIsOpen(false); }}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-2 text-xs font-semibold"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => { onOpenAuth(); setIsOpen(false); }}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 text-white px-3 py-2 text-xs font-semibold shadow-md shadow-blue-500/10"
                  >
                    <User className="h-3.5 w-3.5" />
                    Launch Console
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
