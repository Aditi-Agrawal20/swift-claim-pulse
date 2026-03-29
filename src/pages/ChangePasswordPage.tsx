import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { useRole } from '@/hooks/useRole';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const ChangePasswordPage = () => {
  const { setMustChangePassword } = useRole();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const strength = newPassword.length === 0 ? 0 :
    newPassword.length < 6 ? 1 :
    newPassword.length < 10 ? 2 : 3;

  const strengthColors = ['', '#ef4444', '#f59e0b', '#00e5a0'];
  const strengthLabels = ['', 'Weak', 'Medium', 'Strong'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setMustChangePassword(false);
      toast.success('Password updated successfully!');
      navigate('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-background">
      <div className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,229,160,0.06) 0%, transparent 70%)', top: '-200px', left: '-150px' }}
      />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md mx-4">
        <div className="glass-strong rounded-2xl p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-warning/20 flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-warning" strokeWidth={2} />
            </div>
            <h1 className="font-display font-bold text-xl text-foreground">Change Your Password</h1>
            <p className="text-muted-foreground text-sm mt-1 font-body text-center">You must set a new password before continuing</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label-upper block mb-1.5">Temporary Password</label>
              <input className="input-surface w-full" type="password" placeholder="Enter temp password" required />
            </div>
            <div>
              <label className="label-upper block mb-1.5">New Password</label>
              <input className="input-surface w-full" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Enter new password" required />
              {newPassword.length > 0 && (
                <div className="mt-2">
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(strength / 3) * 100}%` }}
                      style={{ background: strengthColors[strength] }}
                    />
                  </div>
                  <p className="text-[10px] mt-1 font-body" style={{ color: strengthColors[strength] }}>{strengthLabels[strength]}</p>
                </div>
              )}
            </div>
            <div>
              <label className="label-upper block mb-1.5">Confirm New Password</label>
              <input className="input-surface w-full" type="password" placeholder="Confirm new password" required />
            </div>

            <button type="submit" disabled={loading} className="w-full btn-primary flex items-center justify-center gap-2">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Update Password <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ChangePasswordPage;
