import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Building, MoreVertical } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { mockTeam } from '@/data/mockData';
import { roleColors, roleLabels } from '@/hooks/useRole';
import { toast } from 'sonner';

const AdminTeam = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('employee');
  const [manager, setManager] = useState('');
  const [department, setDepartment] = useState('');

  const managers = mockTeam.filter(m => m.role === 'manager');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`${name} added as ${role}. Temporary password sent to ${email}`);
    setName(''); setEmail(''); setDepartment('');
  };

  return (
    <div>
      <PageHeader title="Team Management" subtitle="Add and manage team members" />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Create form */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 card-surface rounded-xl p-6">
          <h2 className="font-display font-medium text-[15px] text-foreground mb-5 flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-primary" /> Add Team Member
          </h2>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="label-upper block mb-1.5">Full Name</label>
              <input className="input-surface w-full" value={name} onChange={e => setName(e.target.value)} placeholder="Enter name" required />
            </div>
            <div>
              <label className="label-upper block mb-1.5">Email</label>
              <input className="input-surface w-full" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@company.com" required />
            </div>
            <div>
              <label className="label-upper block mb-1.5">Role</label>
              <select className="input-surface w-full" value={role} onChange={e => setRole(e.target.value)}>
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
                <option value="finance">Finance</option>
                <option value="director">Director</option>
              </select>
            </div>
            {role === 'employee' && (
              <div>
                <label className="label-upper block mb-1.5">Assign Manager</label>
                <select className="input-surface w-full" value={manager} onChange={e => setManager(e.target.value)}>
                  <option value="">Select a manager</option>
                  {managers.map(m => <option key={m.id} value={m.name}>{m.name}</option>)}
                </select>
              </div>
            )}
            <div>
              <label className="label-upper block mb-1.5">Department <span className="text-muted-foreground">(optional)</span></label>
              <input className="input-surface w-full" value={department} onChange={e => setDepartment(e.target.value)} placeholder="e.g. Engineering" />
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-3 h-3 rounded bg-primary/30" />
              <span>Temporary password will be sent to their email</span>
            </div>
            <button type="submit" className="w-full btn-primary">Add Member</button>
          </form>
        </motion.div>

        {/* Team grid */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {mockTeam.length === 0 ? (
            <div className="col-span-2 text-center py-16">
              <UserPlus className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground">No team members yet. Add your first one →</p>
            </div>
          ) : mockTeam.map((member, i) => {
            const color = roleColors[member.role as keyof typeof roleColors] || '#64748b';
            return (
              <motion.div key={member.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="card-surface rounded-xl p-4 group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-foreground"
                    style={{ background: `${color}15`, boxShadow: `0 0 0 2px ${color}30` }}>
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">{member.name}</div>
                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Mail className="w-3 h-3" /> {member.email}
                    </div>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-medium capitalize" style={{ background: `${color}15`, color }}>
                    {member.role}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Building className="w-3 h-3" /> {member.department}
                  </span>
                  {member.manager && (
                    <span className="text-[10px] text-muted-foreground">Mgr: {member.manager}</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminTeam;
