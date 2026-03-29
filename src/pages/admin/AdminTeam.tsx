import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Building } from 'lucide-react';
import { mockTeam } from '@/data/mockData';
import { toast } from 'sonner';

const roleBadge = {
  admin: 'bg-gradient-to-r from-purple-500/20 to-violet-500/20 text-purple-400 border border-purple-500/20',
  manager: 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 border border-blue-500/20',
  employee: 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/20',
};

const AdminTeam = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('employee');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`${name} added as ${role}`);
    setName('');
    setEmail('');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-bold text-[28px] gradient-text">Team Management</h1>
        <p className="text-muted-foreground text-sm font-body mt-1">Add and manage team members</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Create form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 card-surface rounded-xl p-6"
        >
          <h2 className="font-display font-medium text-[15px] text-foreground mb-5 flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-primary" /> Add Team Member
          </h2>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="label-upper block mb-1.5">Full Name</label>
              <input className="input-surface w-full" value={name} onChange={e => setName(e.target.value)} placeholder="Enter name" />
            </div>
            <div>
              <label className="label-upper block mb-1.5">Email</label>
              <input className="input-surface w-full" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@company.com" />
            </div>
            <div>
              <label className="label-upper block mb-1.5">Role</label>
              <select className="input-surface w-full" value={role} onChange={e => setRole(e.target.value)}>
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
              </select>
            </div>
            <button type="submit"
              className="w-full py-2.5 rounded-lg font-body font-medium text-sm bg-gradient-to-r from-emerald-400 to-cyan-500 text-primary-foreground glow-primary hover:scale-[1.02] active:scale-[0.98] transition-all">
              Add Member
            </button>
          </form>
        </motion.div>

        {/* Team grid */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {mockTeam.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="card-surface rounded-xl p-4 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-info/20 flex items-center justify-center text-sm font-bold text-foreground ring-2 ring-primary/20">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">{member.name}</div>
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Mail className="w-3 h-3" /> {member.email}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium capitalize ${roleBadge[member.role as keyof typeof roleBadge]}`}>
                  {member.role}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Building className="w-3 h-3" /> {member.department}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminTeam;
