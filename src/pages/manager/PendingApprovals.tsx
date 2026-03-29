import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, MessageSquare } from 'lucide-react';
import { mockExpenses, formatCurrency } from '@/data/mockData';
import { ApprovalProgress } from '@/components/ApprovalProgress';
import { toast } from 'sonner';

const PendingApprovals = () => {
  const [expenses, setExpenses] = useState(mockExpenses.filter(e => e.status === 'pending'));
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [rejectingId, setRejectingId] = useState<string | null>(null);

  const handleApprove = (id: string) => {
    setRemovingId(id);
    setTimeout(() => {
      setExpenses(prev => prev.filter(e => e.id !== id));
      setRemovingId(null);
      toast.success('Expense approved!');
    }, 500);
  };

  const handleReject = (id: string) => {
    setRejectingId(id);
    setTimeout(() => {
      setExpenses(prev => prev.filter(e => e.id !== id));
      setRejectingId(null);
      toast.error('Expense rejected');
    }, 600);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-bold text-[28px] gradient-text">Pending Approvals</h1>
        <p className="text-muted-foreground text-sm font-body mt-1">{expenses.length} expenses awaiting your review</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence>
          {expenses.map((expense, i) => (
            <motion.div
              key={expense.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: removingId === expense.id ? 0 : rejectingId === expense.id ? 1 : 1,
                y: 0,
                x: removingId === expense.id ? 100 : rejectingId === expense.id ? 0 : 0,
                scale: removingId === expense.id ? 1.02 : 1,
                backgroundColor: rejectingId === expense.id ? 'rgba(239,68,68,0.08)' : undefined,
              }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.4 }}
              style={rejectingId === expense.id ? { animation: 'shake 0.4s ease-in-out' } : undefined}
              className="card-elevated rounded-xl p-5"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-info/20 flex items-center justify-center text-sm font-bold text-foreground">
                  {expense.avatar}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">{expense.employee}</div>
                  <div className="text-[11px] text-muted-foreground">{expense.date}</div>
                </div>
              </div>

              {/* Amount */}
              <div className="mb-3">
                <span className="font-mono font-bold text-2xl gradient-text-accent">
                  {formatCurrency(expense.convertedAmount)}
                </span>
                {expense.currency !== 'INR' && (
                  <span className="text-xs text-muted-foreground ml-2">
                    ({formatCurrency(expense.amount, expense.currency)})
                  </span>
                )}
              </div>

              {/* Details */}
              <p className="text-sm text-muted-foreground mb-3">{expense.description}</p>
              <div className="flex gap-2 mb-4">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{expense.category}</span>
              </div>

              <ApprovalProgress
                currentStep={expense.step}
                totalSteps={expense.totalSteps}
                approvers={expense.approvers}
                status={expense.status}
              />

              {/* Comment */}
              <div className="mt-4">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <MessageSquare className="w-3 h-3 text-muted-foreground" />
                  <span className="label-upper">Comment</span>
                </div>
                <input className="input-surface w-full text-xs" placeholder="Add a comment (optional)" />
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleApprove(expense.id)}
                  className="flex-1 py-2.5 rounded-lg font-body font-medium text-sm bg-gradient-to-r from-emerald-400 to-teal-500 text-primary-foreground glow-primary hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4" /> Approve
                </button>
                <button
                  onClick={() => handleReject(expense.id)}
                  className="flex-1 py-2.5 rounded-lg font-body font-medium text-sm bg-destructive/10 border border-destructive/30 text-destructive hover:bg-destructive/20 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
                >
                  <X className="w-4 h-4" /> Reject
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {expenses.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-2 text-center py-16">
            <Check className="w-12 h-12 text-success/30 mx-auto mb-3" />
            <p className="text-muted-foreground">All caught up! No pending approvals.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PendingApprovals;
