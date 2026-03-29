import React from 'react';
import { motion } from 'framer-motion';
import { mockExpenses, mockTeam, formatCurrency } from '@/data/mockData';

const TeamOverview = () => {
  const totalPending = mockExpenses.filter(e => e.status === 'pending').reduce((s, e) => s + e.convertedAmount, 0);
  const totalApproved = mockExpenses.filter(e => e.status === 'approved').reduce((s, e) => s + e.convertedAmount, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-bold text-[28px] gradient-text">Team Overview</h1>
        <p className="text-muted-foreground text-sm font-body mt-1">Expense summary across your team</p>
      </div>

      {/* Summary pills */}
      <div className="flex gap-4">
        {[
          { label: 'Pending Total', value: formatCurrency(totalPending), color: 'text-warning' },
          { label: 'Approved Total', value: formatCurrency(totalApproved), color: 'text-success' },
          { label: 'Team Size', value: mockTeam.filter(m => m.role === 'employee').length.toString(), color: 'text-info' },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="card-surface rounded-xl p-5 flex-1"
          >
            <div className={`font-mono font-bold text-xl ${item.color}`}>{item.value}</div>
            <div className="label-upper mt-1">{item.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card-surface rounded-xl overflow-hidden"
      >
        <div className="px-5 py-4 border-b border-border">
          <h2 className="font-display font-medium text-[15px] text-foreground">All Team Expenses</h2>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="label-upper px-5 py-3 text-left">Employee</th>
              <th className="label-upper px-5 py-3 text-left">Description</th>
              <th className="label-upper px-5 py-3 text-left">Amount</th>
              <th className="label-upper px-5 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockExpenses.map(expense => (
              <tr key={expense.id} className="border-t border-border table-row-hover transition-all">
                <td className="px-5 py-3 text-sm text-foreground">{expense.employee}</td>
                <td className="px-5 py-3 text-sm text-muted-foreground">{expense.description}</td>
                <td className="px-5 py-3 text-sm font-mono text-foreground">{formatCurrency(expense.convertedAmount)}</td>
                <td className="px-5 py-3">
                  <span className={`text-xs px-2 py-1 rounded-md font-medium capitalize ${
                    expense.status === 'approved' ? 'bg-success/10 text-success' :
                    expense.status === 'rejected' ? 'bg-destructive/10 text-destructive' :
                    'bg-warning/10 text-warning'
                  }`}>{expense.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default TeamOverview;
