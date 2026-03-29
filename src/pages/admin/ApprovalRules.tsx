import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GripVertical, Plus, Percent, UserCheck, GitBranch } from 'lucide-react';
import { mockApprovalChain } from '@/data/mockData';
import { toast } from 'sonner';

const ruleTypes = [
  { id: 'sequential', icon: GitBranch, title: 'Sequential', desc: 'Each approver in order' },
  { id: 'percentage', icon: Percent, title: 'Percentage', desc: 'Required % to approve' },
  { id: 'specific', icon: UserCheck, title: 'Specific Person', desc: 'Named approver auto-clears' },
];

const ApprovalRules = () => {
  const [selectedRule, setSelectedRule] = useState('sequential');
  const [percentage, setPercentage] = useState(60);
  const [chain, setChain] = useState(mockApprovalChain);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-bold text-[28px] gradient-text">Approval Rules</h1>
        <p className="text-muted-foreground text-sm font-body mt-1">Configure approval chain and conditions</p>
      </div>

      {/* Rule type selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ruleTypes.map((rule) => (
          <motion.button
            key={rule.id}
            onClick={() => setSelectedRule(rule.id)}
            whileTap={{ scale: 0.98 }}
            className={`p-5 rounded-xl text-left transition-all ${
              selectedRule === rule.id
                ? 'card-elevated border-primary/40 shadow-[0_0_0_1px_rgba(0,229,160,0.15),0_0_24px_rgba(0,229,160,0.08)]'
                : 'card-surface'
            }`}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
              selectedRule === rule.id ? 'bg-gradient-to-br from-emerald-400 to-cyan-500' : 'bg-muted'
            }`}>
              <rule.icon className={`w-5 h-5 ${selectedRule === rule.id ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
            </div>
            <h3 className="font-display font-medium text-sm text-foreground">{rule.title}</h3>
            <p className="text-[11px] text-muted-foreground mt-1">{rule.desc}</p>
          </motion.button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Approval chain */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-surface rounded-xl p-6"
        >
          <h2 className="font-display font-medium text-[15px] text-foreground mb-5">Approval Chain</h2>
          <div className="space-y-3 relative">
            {/* Connecting line */}
            <div className="absolute left-[18px] top-6 bottom-6 w-[2px] border-l-2 border-dashed border-primary/30" />
            
            {chain.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-layer-4 relative"
              >
                <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-[11px] font-bold text-primary-foreground">
                  {step.order}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">{step.name}</div>
                  <div className="text-[11px] text-muted-foreground">{step.role}</div>
                </div>
              </motion.div>
            ))}

            <button
              onClick={() => toast.info('Drag to reorder steps')}
              className="w-full py-2.5 rounded-lg border-2 border-dashed border-border hover:border-primary/30 text-muted-foreground hover:text-primary text-sm flex items-center justify-center gap-2 transition-all"
            >
              <Plus className="w-4 h-4" /> Add Step
            </button>
          </div>
        </motion.div>

        {/* Percentage slider */}
        {selectedRule === 'percentage' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-surface rounded-xl p-6"
          >
            <h2 className="font-display font-medium text-[15px] text-foreground mb-5">Approval Threshold</h2>
            <div className="space-y-6">
              <div className="text-center">
                <span className="font-display font-bold text-[48px] gradient-text-accent">{percentage}%</span>
                <p className="text-sm text-muted-foreground mt-1">of approvers must approve</p>
              </div>
              <input
                type="range"
                min={10}
                max={100}
                step={10}
                value={percentage}
                onChange={e => setPercentage(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
          </motion.div>
        )}

        {selectedRule !== 'percentage' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-surface rounded-xl p-6 flex items-center justify-center"
          >
            <div className="text-center">
              <GitBranch className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">
                {selectedRule === 'sequential' ? 'Expenses will flow through each step in order' : 'Select a specific approver whose approval auto-clears'}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ApprovalRules;
