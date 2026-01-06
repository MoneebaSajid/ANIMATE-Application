import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Github, Chrome, Loader2 } from 'lucide-react';
import Logo from './Logo';

interface AuthScreenProps {
  onLogin: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('animate_user', JSON.stringify({ 
        name: formData.name || 'Creative User', 
        email: formData.email 
      }));
      setLoading(false);
      onLogin();
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-dark-950 flex items-center justify-center overflow-auto custom-scrollbar p-4">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-500/10 rounded-full blur-[80px] sm:blur-[120px] animate-blob" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[80px] sm:blur-[120px] animate-blob" style={{ animationDelay: '2s' }} />
      
      <div className="w-full max-w-md relative z-10 py-8">
        {/* Logo & Header */}
        <div className="flex flex-col items-center mb-6 sm:mb-10 animate-in slide-in-from-top duration-700">
          <Logo size={48} animated className="mb-4 sm:size-16" />
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tighter">
            Ani<span className="text-brand-500">Mate</span>
          </h1>
          <p className="text-gray-500 text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] mt-1">
            Studio Gateway
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-dark-900/40 backdrop-blur-2xl border border-white/5 rounded-2xl sm:rounded-[32px] p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-500">
          <div className="flex justify-center mb-6 sm:mb-8 bg-black/20 p-1 rounded-xl sm:rounded-2xl w-fit mx-auto border border-white/5">
            <button 
              onClick={() => setIsLogin(true)}
              className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all ${isLogin ? 'bg-brand-500 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
            >
              Sign In
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all ${!isLogin ? 'bg-brand-500 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            {!isLogin && (
              <div className="space-y-1 animate-in slide-in-from-left duration-300">
                <label className="text-[9px] sm:text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative group">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-400 transition-colors" />
                  <input 
                    type="text" 
                    name="name"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-black/30 border border-white/5 rounded-xl sm:rounded-2xl py-3 sm:py-4 pl-12 pr-4 text-sm text-white outline-none focus:border-brand-500/50 focus:ring-4 focus:ring-brand-500/5 transition-all"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[9px] sm:text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-400 transition-colors" />
                <input 
                  type="email" 
                  name="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-black/30 border border-white/5 rounded-xl sm:rounded-2xl py-3 sm:py-4 pl-12 pr-4 text-sm text-white outline-none focus:border-brand-500/50 focus:ring-4 focus:ring-brand-500/5 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[9px] sm:text-[10px] font-black text-gray-500 uppercase tracking-widest">Password</label>
                {isLogin && <button type="button" className="text-[9px] sm:text-[10px] font-bold text-brand-500 hover:text-brand-400">Forgot?</button>}
              </div>
              <div className="relative group">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-400 transition-colors" />
                <input 
                  type="password" 
                  name="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full bg-black/30 border border-white/5 rounded-xl sm:rounded-2xl py-3 sm:py-4 pl-12 pr-4 text-sm text-white outline-none focus:border-brand-500/50 focus:ring-4 focus:ring-brand-500/5 transition-all"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-brand-500 hover:bg-brand-400 disabled:opacity-70 text-white font-black uppercase tracking-widest py-3 sm:py-4 rounded-xl sm:rounded-2xl mt-4 shadow-xl shadow-brand-500/20 transition-all flex items-center justify-center gap-2 group text-xs sm:text-sm"
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Enter Studio' : 'Create Account'}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 sm:mt-8">
            <div className="flex items-center gap-4 mb-4 sm:mb-6">
              <div className="h-px bg-white/5 flex-1" />
              <span className="text-[8px] sm:text-[10px] font-bold text-gray-600 uppercase tracking-widest whitespace-nowrap">Or Continue With</span>
              <div className="h-px bg-white/5 flex-1" />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/5 py-2 sm:py-3 rounded-xl transition-all">
                <Chrome size={16} className="text-gray-400" />
                <span className="text-[10px] sm:text-xs font-bold text-gray-300">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/5 py-2 sm:py-3 rounded-xl transition-all">
                <Github size={16} className="text-gray-400" />
                <span className="text-[10px] sm:text-xs font-bold text-gray-300">GitHub</span>
              </button>
            </div>
          </div>
        </div>

        <p className="text-center mt-6 sm:mt-8 text-[10px] sm:text-xs text-gray-600 leading-relaxed">
          By continuing, you agree to AniMate's <br/>
          <span className="text-gray-400 cursor-pointer hover:text-white transition-colors">Terms of Service</span> and <span className="text-gray-400 cursor-pointer hover:text-white transition-colors">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default AuthScreen;