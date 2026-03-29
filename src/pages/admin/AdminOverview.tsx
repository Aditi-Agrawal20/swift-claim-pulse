import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis } from 'recharts';
import { StatCard } from '@/components/StatCard';
import { PageHeader } from '@/components/PageHeader';
import { ApprovalProgress } from '@/components/ApprovalProgress';
import { mockStats, mockExpenses, formatCurrency } from '@/data/mockData';

const statusColors = {
  pending: 'bg-warning/10 text-warning',
  approved: 'bg-success/10 text-success',
  rejected: 'bg-destructive/10 text-destructive',
};

const monthlyData = [
  { name: 'Jan', amount: 45000 },
  { name: 'Feb', amount: 62000 },
  { name: 'Mar', amount: 38000 },
  { name: 'Apr', amount: 71000 },
  { name: 'May', amount: 55000 },
  { name: 'Jun', amount: 84000 },
  { name: 'Jul', amount: 68000 },
];

const categoryData = [
  { name: 'Travel', value: 35, color: 'hsl(210, 70%, 55%)' },
  { name: 'Food', value: 20, color: 'hsl(38, 80%, 52%)' },
  { name: 'Hotel', value: 25, color: 'hsl(250, 60%, 58%)' },
  { name: 'Other', value: 20, color: 'hsl(152, 55%, 48%)' },
];

const weeklyData = [
  { day: 'Mon', count: 5 },
  { day: 'Tue', count: 8 },
  { day: 'Wed', count: 3 },
  { day: 'Thu', count: 12 },
  { day: 'Fri', count: 7 },
  { day: 'Sat', count: 2 },
  { day: 'Sun', count: 1 },
];

const AdminOverview = () => {
  return (
    <div>
      <PageHeader title="Overview" subtitle="Company expense dashboard" />

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {mockStats.admin.map((stat, i) => (
          <StatCard key={stat.label} {...stat} index={i} />
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        {/* Area chart - Monthly expenses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 card-surface rounded-xl p-5"
        >
          <h3 className="font-display font-medium text-[15px] text-foreground mb-1">Monthly Expenses</h3>
          <p className="text-xs text-muted-foreground mb-4">Last 7 months trend</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(250, 60%, 58%)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(250, 60%, 58%)" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <Tooltip
                contentStyle={{
                  background: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                formatter={(value: number) => [formatCurrency(value), 'Amount']}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="hsl(250, 60%, 58%)"
                strokeWidth={2}
                fill="url(#areaGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie chart - Category split */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="card-surface rounded-xl p-5"
        >
          <h3 className="font-display font-medium text-[15px] text-foreground mb-1">By Category</h3>
          <p className="text-xs text-muted-foreground mb-2">Expense distribution</p>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={35} outerRadius={55} dataKey="value" strokeWidth={0}>
                {categoryData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                formatter={(value: number) => [`${value}%`, 'Share']}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-2">
            {categoryData.map(c => (
              <div key={c.name} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <div className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                {c.name}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Weekly bar chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.38 }}
        className="card-surface rounded-xl p-5 mb-8"
      >
        <h3 className="font-display font-medium text-[15px] text-foreground mb-1">Weekly Activity</h3>
        <p className="text-xs text-muted-foreground mb-4">Expenses submitted this week</p>
        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={weeklyData}>
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(215, 15%, 55%)' }} />
            <Tooltip
              contentStyle={{
                background: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                fontSize: '12px',
              }}
            />
            <Bar dataKey="count" fill="hsl(250, 60%, 58%)" radius={[4, 4, 0, 0]} barSize={28} opacity={0.8} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Expense table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="card-surface rounded-xl overflow-hidden"
      >
        <div className="px-5 py-4 flex items-center justify-between border-b border-border">
          <h2 className="font-display font-medium text-[15px] text-foreground">Recent Expenses</h2>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input className="input-surface pl-9 py-1.5 text-xs w-48" placeholder="Search expenses..." />
            </div>
            <button className="input-surface px-3 py-1.5 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
              <Filter className="w-3.5 h-3.5" /> Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th className="label-upper px-5 py-3">Employee</th>
                <th className="label-upper px-5 py-3">Description</th>
                <th className="label-upper px-5 py-3">Amount</th>
                <th className="label-upper px-5 py-3">Category</th>
                <th className="label-upper px-5 py-3">Status</th>
                <th className="label-upper px-5 py-3">Progress</th>
              </tr>
            </thead>
            <tbody>
              {mockExpenses.map((expense) => (
                <tr key={expense.id} className="border-t border-border table-row-hover transition-all">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center text-[10px] font-bold text-accent-foreground">
                        {expense.avatar}
                      </div>
                      <span className="text-sm text-foreground font-medium">{expense.employee}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-muted-foreground max-w-[200px] truncate">{expense.description}</td>
                  <td className="px-5 py-3.5 text-sm font-mono font-medium text-foreground">{formatCurrency(expense.convertedAmount)}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground">{expense.category}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs px-2 py-1 rounded-md font-medium capitalize ${statusColors[expense.status]}`}>
                      {expense.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <ApprovalProgress
                      currentStep={expense.step}
                      totalSteps={expense.totalSteps}
                      approvers={expense.approvers}
                      status={expense.status}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminOverview;
