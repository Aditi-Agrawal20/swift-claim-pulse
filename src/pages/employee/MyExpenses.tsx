import React from 'react';
import { motion } from 'framer-motion';
import { mockExpenses, formatCurrency } from '@/data/mockData';
import { ApprovalProgress } from '@/components/ApprovalProgress';

const statusBorder = {
  pending: 'border-l-warning',
  approved: 'border-l-success',
  rejected: 'border-l-destructive',
};

const MyExpenses = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-bold text-[28px] gradient-text">My Expenses</h1>
        <p className="text-muted-foreground text-sm font-body mt-1">Track your expense claims</p>
      </div>

      {/* Summary pills */}
      <div className="flex gap-3">
        {[
          { label: 'Pending', count: mockExpenses.filter(e => e.status === 'pending').length, color: 'bg-warning/10 text-warning' },
          { label: 'Approved', count: mockExpenses.filter(e => e.status === 'approved').length, color: 'bg-success/10 text-success' },
          { label: 'Rejected', count: mockExpenses.filter(e => e.status === 'rejected').length, color: 'bg-destructive/10 text-destructive' },
        ].map(p => (
          <span key={p.label} className={`px-3 py-1.5 rounded-full text-xs font-medium ${p.color}`}>
            {p.label}: {p.count}
          </span>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical gradient line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/40 via-info/20 to-transparent" />

        <div className="space-y-4">
          {mockExpenses.map((expense, i) => (
            <motion.div
              key={expense.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex gap-4"
            >
              {/* Timeline dot */}
              <div className="relative flex-shrink-0 w-12 flex justify-center pt-5">
                <div className={`w-3 h-3 rounded-full ${
                  expense.status === 'approved' ? 'bg-success' :
                  expense.status === 'rejected' ? 'bg-destructive' :
                  'bg-warning animate-pulse'
                }`} />
              </div>

              {/* Card */}
              <div className={`flex-1 card-surface rounded-xl p-5 border-l-2 ${statusBorder[expense.status]}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-medium text-foreground">{expense.description}</h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{expense.date} · {expense.category}</p>
                  </div>
                  <span className="font-mono font-bold text-lg text-foreground">
                    {formatCurrency(expense.convertedAmount)}
                  </span>
                </div>
                <ApprovalProgress
                  currentStep={expense.step}
                  totalSteps={expense.totalSteps}
                  approvers={expense.approvers}
                  status={expense.status}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyExpenses;
