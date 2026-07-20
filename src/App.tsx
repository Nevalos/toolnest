import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ToolShowcase from './components/ToolShowcase';
import Dashboard from './components/Dashboard';
import Blog from './components/Blog';
import Pricing from './components/Pricing';
import AuthModal from './components/AuthModal';
import ToolSandbox from './components/ToolSandbox';
import AdPlaceholder from './components/AdPlaceholder';
import { User, Tool } from './types';
import { TOOLS } from './registry';
import { Sparkles, Heart, Bot, FileText, Settings, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentTab, setTab] = useState<string>('tools');
  const [user, setUser] = useState<User | null>(null);
  const [activeTool, setActiveTool] = useState<Tool | null>(null);
  const [showAuth, setShowAuth] = useState(false);

  // Load user session from localStorage if available
  useEffect(() => {
    const savedSession = localStorage.getItem('toolnest_user_session');
    if (savedSession) {
      try {
        setUser(JSON.parse(savedSession));
      } catch (e) {
        console.error('Failed to parse session', e);
      }
    }
  }, []);

  // Save session changes
  const saveSession = (updatedUser: User | null) => {
    setUser(updatedUser);
    if (updatedUser) {
      localStorage.setItem('toolnest_user_session', JSON.stringify(updatedUser));
    } else {
      localStorage.removeItem('toolnest_user_session');
    }
  };

  const handleLoginSuccess = (name: string, email: string) => {
    const mockUser: User = {
      id: `usr-${Math.floor(Math.random() * 1000)}`,
      name,
      email,
      avatar: `https://images.unsplash.com/photo-${Math.random() > 0.5 ? '1534528741775-53994a69daeb' : '1472099645785-5658abf4ff4e'}?w=100&h=100&fit=crop`,
      plan: 'free',
      joinedAt: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      favorites: ['gemini-copywriter', 'webp-converter'],
      history: [
        { toolId: 'webp-converter', timestamp: '2 hours ago' },
        { toolId: 'gemini-copywriter', timestamp: 'Yesterday' }
      ]
    };
    saveSession(mockUser);
  };

  const handleLogout = () => {
    saveSession(null);
    setTab('tools');
    setActiveTool(null);
  };

  const handleToggleFavorite = (toolId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      setShowAuth(true);
      return;
    }

    const isFav = user.favorites.includes(toolId);
    const updatedFavorites = isFav
      ? user.favorites.filter((id) => id !== toolId)
      : [...user.favorites, toolId];

    saveSession({
      ...user,
      favorites: updatedFavorites,
    });
  };

  const handleRecordUsage = (toolId: string) => {
    if (!user) return;

    // Check if tool already in history and filter it out to avoid duplication
    const cleanHistory = user.history.filter((item) => item.toolId !== toolId);
    const updatedHistory = [
      { toolId, timestamp: 'Just now' },
      ...cleanHistory.slice(0, 7), // Keep last 8 entries
    ];

    saveSession({
      ...user,
      history: updatedHistory,
    });
  };

  const handleClearHistory = () => {
    if (!user) return;
    saveSession({
      ...user,
      history: [],
    });
  };

  const handleUpgradeSuccess = () => {
    if (!user) return;
    saveSession({
      ...user,
      plan: 'pro',
    });
    setTab('dashboard');
  };

  const handleOpenTool = (tool: Tool) => {
    setActiveTool(tool);
    setTab('tools'); // Ensure we are on the main tab when viewport changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0B0F1A] text-slate-100 font-sans selection:bg-blue-500/30 selection:text-white relative overflow-hidden">
      {/* Mesh Gradient Background Elements */}
      <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col flex-grow justify-between">
        <div>
          {/* Navbar */}
        <Navbar
          user={user}
          onOpenAuth={() => setShowAuth(true)}
          onLogout={handleLogout}
          favoritesCount={user ? user.favorites.length : 0}
          currentTab={currentTab}
          setTab={(tab) => {
            setTab(tab);
            setActiveTool(null);
          }}
          onUpgradeToPro={() => setTab('pricing')}
        />

        {/* Dynamic content layers */}
        {currentTab === 'tools' && (
          <>
            {activeTool ? (
              <ToolSandbox
                tool={activeTool}
                onClose={() => setActiveTool(null)}
                userPlan={user ? user.plan : 'free'}
                onUpgradeToPro={() => setTab('pricing')}
                onRecordUsage={handleRecordUsage}
              />
            ) : (
              <>
                <Hero
                  onSearchFocus={() => {
                    const input = document.getElementById('platform-search-input');
                    if (input) {
                      input.focus();
                      input.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }}
                  onExploreClick={() => {
                    const section = document.getElementById('tool-showcase-section');
                    if (section) {
                      section.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                />
                <ToolShowcase
                  tools={TOOLS}
                  favorites={user ? user.favorites : []}
                  onToggleFavorite={handleToggleFavorite}
                  onOpenTool={handleOpenTool}
                  userPlan={user ? user.plan : 'free'}
                  onUpgradeToPro={() => setTab('pricing')}
                />
              </>
            )}
          </>
        )}

        {currentTab === 'blog' && (
          <Blog onBackToTools={() => setTab('tools')} />
        )}

        {currentTab === 'pricing' && (
          <Pricing
            currentPlan={user ? user.plan : 'free'}
            onUpgradeSuccess={handleUpgradeSuccess}
          />
        )}

        {currentTab === 'dashboard' && user && (
          <Dashboard
            user={user}
            tools={TOOLS}
            onToggleFavorite={handleToggleFavorite}
            onOpenTool={handleOpenTool}
            onClearHistory={handleClearHistory}
          />
        )}
      </div>

      {/* Footer - Highly polished with programmatic SEO references */}
      <footer className="border-t border-gray-800 bg-gray-950/50 py-12 mt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Subtle Sponsor Ad placement if not pro */}
          <div className="mb-10">
            <AdPlaceholder
              userPlan={user ? user.plan : 'free'}
              onUpgradeToPro={() => setTab('pricing')}
              position="footer"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-900 pb-10">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
                  <div className="absolute inset-0.5 rounded-[6px] bg-gray-950 flex items-center justify-center">
                    <span className="block h-1.5 w-3 rounded-full bg-blue-500 transform -rotate-12 translate-y-[-2px]" />
                    <span className="block h-1.5 w-3 rounded-full bg-indigo-500 transform rotate-12" />
                  </div>
                </div>
                <span className="text-base font-extrabold tracking-tight text-white">ToolNest</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Premium edge-native sandboxes and utility suites. Private, secure, and lightning-fast developer tools powered by Google Gemini and Node server architectures.
              </p>
            </div>

            {/* Sitemap index */}
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-4">Sitemaps Catalog</span>
              <ul className="space-y-2 text-xs">
                <li><a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors flex items-center gap-1.5">Sitemap Index XML <FileText className="h-3 w-3 text-gray-600" /></a></li>
                <li><a href="/robots.txt" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors flex items-center gap-1.5">robots.txt Directives <Settings className="h-3 w-3 text-gray-600" /></a></li>
                <li><button onClick={() => setTab('blog')} className="text-gray-500 hover:text-white transition-colors text-left">SEO Articles Directory</button></li>
              </ul>
            </div>

            {/* Platform status */}
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-4">API Verification</span>
              <ul className="space-y-2 text-xs">
                <li className="text-gray-500 flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Cloud Run: Online</span>
                </li>
                <li className="text-gray-500 flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Gemini LLM: Optimal</span>
                </li>
                <li className="text-gray-500 flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Edge SSL: TLS 1.3 Active</span>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-4">Legal & Privacy</span>
              <ul className="space-y-2 text-xs text-gray-500">
                <li><button className="hover:text-white transition-colors text-left">Privacy Policy</button></li>
                <li><button className="hover:text-white transition-colors text-left">Terms of Service</button></li>
                <li><button className="hover:text-white transition-colors text-left">SLA Commitments</button></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-[11px] text-gray-600">
            <span>© 2026 ToolNest, Inc. All rights reserved. Registered trademark of AI Studio workspace.</span>
            <span className="flex items-center gap-1">
              <span>Made with</span>
              <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" />
              <span>for creators worldwide</span>
            </span>
          </div>
        </div>
      </footer>

      {/* Auth modal overlay */}
      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        onLoginSuccess={handleLoginSuccess}
      />
      </div>
    </div>
  );
}
