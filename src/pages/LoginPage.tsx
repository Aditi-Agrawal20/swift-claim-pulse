import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useRole } from '@/hooks/useRole';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setIsLoggedIn } = useRole();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-background">
      {/* Ambient orbs */}
      <div className="absolute w-[600px] h-[600px] rounded-full pointer-events-none opacity-100"
        style={{
          background: 'radial-gradient(circle, rgba(0,229,160,0.08) 0%, transparent 70%)',
          top: '-200px', left: '-100px',
          animation: 'float-orb 20s ease-in-out infinite alternate',
        }}
      />
      <div className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)',
          bottom: '-100px', right: '-50px',
          animation: 'float-orb 15s ease-in-out infinite alternate-reverse',
        }}
      />

      {/* Login card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="glass-strong rounded-2xl p-8">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center mb-4 glow-primary">
              <Zap className="w-6 h-6 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <h1 className="font-display font-bold text-2xl gradient-text-accent">ClearClaim</h1>
            <p className="text-muted-foreground text-sm mt-1 font-body">From receipt to reimbursement — in minutes</p>
          </div>

          {/* Tabs */}
          <div className="flex bg-layer-4 rounded-lg p-1 mb-6">
            {['Login', 'Sign Up'].map((tab, i) => (
              <button
                key={tab}
                onClick={() => setIsSignup(i === 1)}
                className={`flex-1 py-2 rounded-md text-sm font-body font-medium transition-all ${
                  (i === 0 && !isSignup) || (i === 1 && isSignup)
                    ? 'bg-layer-2 text-foreground shadow-sm'
                    : 'text-muted-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {isSignup && (
                <motion.div
                  key="signup-fields"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 overflow-hidden"
                >
                  <div>
                    <label className="label-upper block mb-1.5">Company Name</label>
                    <input className="input-surface w-full" placeholder="Acme Corp" />
                  </div>
                  <div>
                    <label className="label-upper block mb-1.5">Full Name</label>
                    <input className="input-surface w-full" placeholder="Arjun Mehta" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="label-upper block mb-1.5">Email</label>
              <input className="input-surface w-full" type="email" placeholder="you@company.com" defaultValue="demo@clearclaim.io" />
            </div>
            <div>
              <label className="label-upper block mb-1.5">Password</label>
              <div className="relative">
                <input className="input-surface w-full pr-10" type={showPassword ? 'text' : 'password'} placeholder="••••••••" defaultValue="demo1234" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit"
              className="w-full py-3 rounded-lg font-body font-medium text-sm bg-gradient-to-r from-emerald-400 to-cyan-500 text-primary-foreground glow-primary glow-primary-hover transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group">
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSignup ? 'Create Account' : 'Sign In'}
                <ArrowRight className="w-4 h-4" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>
          </form>

          <p className="text-center text-[11px] text-muted-foreground mt-6 font-body">
            Demo mode — click Sign In to explore all roles
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
