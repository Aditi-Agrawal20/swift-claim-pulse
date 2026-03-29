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
      {/* Soft decorative shapes */}
      <div className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(250, 60%, 58%, 0.06) 0%, transparent 70%)',
          top: '-150px', left: '-100px',
        }}
      />
      <div className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(210, 70%, 55%, 0.05) 0%, transparent 70%)',
          bottom: '-100px', right: '-50px',
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="glass-strong rounded-2xl p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <h1 className="font-display font-bold text-2xl text-foreground">ClearClaim</h1>
            <p className="text-muted-foreground text-sm mt-1 font-body">From receipt to reimbursement — in minutes</p>
          </div>

          <div className="flex bg-muted rounded-lg p-1 mb-6">
            {['Login', 'Sign Up'].map((tab, i) => (
              <button key={tab} onClick={() => setIsSignup(i === 1)}
                className={`flex-1 py-2 rounded-md text-sm font-body font-medium transition-all ${
                  (i === 0 && !isSignup) || (i === 1 && isSignup)
                    ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'
                }`}>{tab}</button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {isSignup && (
                <motion.div key="signup-fields" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="space-y-4 overflow-hidden">
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
              className="w-full py-3 rounded-lg font-body font-medium text-sm bg-primary text-primary-foreground hover:opacity-90 transition-all duration-200 active:scale-[0.98]">
              <span className="flex items-center justify-center gap-2">
                {isSignup ? 'Create Account' : 'Sign In'}
                <ArrowRight className="w-4 h-4" />
              </span>
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
