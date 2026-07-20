import React, { useState } from 'react';
import { Mail, Lock, User, X, LogIn, Sparkles, AlertCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (name: string, email: string) => void;
}

export default function AuthModal({ isOpen, onClose, onLoginSuccess }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill out all required fields.');
      return;
    }

    if (isSignUp && !name) {
      setError('Please specify your developer name.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(
        isSignUp ? name : email.split('@')[0], 
        email
      );
      onClose();
    }, 1200);
  };

  const handleOAuthLogin = (provider: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(
        provider === 'google' ? 'Alex Rivera' : 'dev-github-user',
        provider === 'google' ? 'alex.rivera@gmail.com' : 'dev@github.com'
      );
      onClose();
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#111827]/95 p-6 shadow-2xl shadow-black/80 overflow-hidden backdrop-blur-2xl"
            id="auth-modal-portal"
          >
            {/* Design accents */}
            <div className="absolute top-0 left-1/4 -z-10 h-32 w-32 rounded-full bg-blue-500/5 blur-[50px]" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-5">
              <div className="flex items-center gap-2">
                <LogIn className="h-4 w-4 text-blue-500" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  {isSignUp ? 'Create Sandbox Credentials' : 'Developer Console Sign-in'}
                </span>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-1 text-gray-500 hover:text-white hover:bg-gray-900 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Error notifications */}
            {error && (
              <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-xs text-red-400">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Main Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Developer Name</label>
                  <div className="relative">
                    <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Alex Rivera"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-lg border border-white/10 bg-white/5 pl-10 pr-3 py-2 text-xs text-white focus:border-blue-500/50 outline-hidden focus:bg-white/10 transition-all"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Email Address</label>
                <div className="relative">
                  <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    placeholder="you@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/5 pl-10 pr-3 py-2 text-xs text-white focus:border-blue-500/50 outline-hidden focus:bg-white/10 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Secret Key / Password</label>
                  {!isSignUp && (
                    <button type="button" className="text-[10px] text-slate-500 hover:text-white">
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/5 pl-10 pr-3 py-2 text-xs text-white focus:border-blue-500/50 outline-hidden focus:bg-white/10 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 py-3 text-xs font-semibold text-white transition-all shadow-md shadow-blue-500/15"
              >
                <span>{isLoading ? 'Decrypting Workspace...' : isSignUp ? 'Initialize Profile' : 'Authenticate Session'}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </form>

            {/* Divider line */}
            <div className="relative my-6 flex items-center">
              <div className="flex-grow border-t border-white/5" />
              <span className="mx-3 text-[9px] font-bold text-slate-500 uppercase tracking-widest font-mono">Secure OAuth Bridges</span>
              <div className="flex-grow border-t border-white/5" />
            </div>

            {/* Social logins */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleOAuthLogin('google')}
                className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 py-2.5 text-xs text-slate-300 transition-colors"
                type="button"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.578-7.859-8s3.53-8 7.86-8c2.46 0 4.102 1.025 5.044 1.926l2.427-2.334C17.955 2.192 15.34 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c6.478 0 10.793-4.537 10.793-10.985 0-.737-.08-1.3-.176-1.86H12.24z" />
                </svg>
                <span>Google</span>
              </button>
              <button
                onClick={() => handleOAuthLogin('github')}
                className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 py-2.5 text-xs text-slate-300 transition-colors"
                type="button"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub</span>
              </button>
            </div>

            {/* Switch sign up */}
            <div className="mt-6 text-center text-xs text-gray-500">
              {isSignUp ? (
                <span>
                  Already registered?{' '}
                  <button onClick={() => setIsSignUp(false)} className="text-blue-400 hover:underline" type="button">
                    Authenticate Session
                  </button>
                </span>
              ) : (
                <span>
                  New developer?{' '}
                  <button onClick={() => setIsSignUp(true)} className="text-blue-400 hover:underline" type="button">
                    Create Sandbox Profile
                  </button>
                </span>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
