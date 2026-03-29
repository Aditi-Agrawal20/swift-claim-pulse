import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, Loader2 } from 'lucide-react';
import { useRole } from '@/hooks/useRole';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { currencies } from '@/data/mockData';

const countries = [
  { name: 'India', flag: '🇮🇳', currency: 'INR' },
  { name: 'United States', flag: '🇺🇸', currency: 'USD' },
  { name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP' },
  { name: 'UAE', flag: '🇦🇪', currency: 'AED' },
  { name: 'Germany', flag: '🇪🇺', currency: 'EUR' },
];

const SetupPage = () => {
  const { companyExists, setIsLoggedIn, setCompanyExists } = useRole();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState('India');

  const selectedCountry = countries.find(c => c.name === country);

  if (companyExists) {
    toast.info('Setup already complete. Please log in.');
    navigate('/');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setCompanyExists(true);
      setIsLoggedIn(true);
      navigate('/dashboard');
      toast.success('Company created! Welcome to ClearClaim.');
    }, 800);
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-background">
      <div className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,229,160,0.08) 0%, transparent 70%)', top: '-200px', left: '-150px', animation: 'float-orb 20s ease-in-out infinite alternate' }}
      />
      <div className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)', bottom: '-100px', right: '-50px', animation: 'float-orb 20s ease-in-out infinite alternate-reverse' }}
      />

      <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="relative z-10 w-full max-w-lg mx-4">
        <div className="glass-strong rounded-2xl p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)', boxShadow: '0 0 40px rgba(124,58,237,0.2)' }}>
              <Zap className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <h1 className="font-display font-bold text-2xl text-foreground">Set Up Your Company</h1>
            <p className="text-muted-foreground text-sm mt-1 font-body">One-time admin account setup</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label-upper block mb-1.5">Admin Full Name</label>
              <input className="input-surface w-full" placeholder="Arjun Mehta" required />
            </div>
            <div>
              <label className="label-upper block mb-1.5">Company Name</label>
              <input className="input-surface w-full" placeholder="Acme Corp" required />
            </div>
            <div>
              <label className="label-upper block mb-1.5">Country</label>
              <select className="input-surface w-full" value={country} onChange={e => setCountry(e.target.value)}>
                {countries.map(c => <option key={c.name} value={c.name}>{c.flag} {c.name}</option>)}
              </select>
              {selectedCountry && (
                <p className="text-xs text-muted-foreground mt-1 font-mono">Default currency: {selectedCountry.flag} {selectedCountry.currency}</p>
              )}
            </div>
            <div>
              <label className="label-upper block mb-1.5">Admin Email</label>
              <input className="input-surface w-full" type="email" placeholder="admin@company.com" required />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label-upper block mb-1.5">Password</label>
                <input className="input-surface w-full" type="password" placeholder="••••••••" required />
              </div>
              <div>
                <label className="label-upper block mb-1.5">Confirm Password</label>
                <input className="input-surface w-full" type="password" placeholder="••••••••" required />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full btn-primary flex items-center justify-center gap-2 mt-2">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Create Company <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <button onClick={() => navigate('/')} className="w-full text-center text-[11px] text-muted-foreground hover:text-foreground mt-4 font-body transition-colors">
            ← Back to login
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SetupPage;
