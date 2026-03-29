export const mockStats = {
  admin: [
    { label: 'Total Expenses', value: 284500, prefix: '₹', icon: 'receipt', sparkline: [20, 35, 28, 45, 38, 52, 48] },
    { label: 'Pending Approvals', value: 12, icon: 'clock', sparkline: [5, 8, 6, 12, 10, 15, 12] },
    { label: 'Approved This Month', value: 47, icon: 'check-circle', sparkline: [10, 15, 20, 30, 35, 42, 47] },
    { label: 'Team Members', value: 24, icon: 'users', sparkline: [18, 19, 20, 21, 22, 23, 24] },
  ],
};

export const mockExpenses = [
  { id: '1', employee: 'Arjun Mehta', avatar: 'AM', amount: 8500, currency: 'INR', convertedAmount: 8500, category: 'Travel', description: 'IndiGo Airlines - Delhi to Bangalore', date: '2026-03-28', status: 'pending' as const, step: 1, totalSteps: 3, approvers: ['Manager', 'Finance', 'Director'] },
  { id: '2', employee: 'Priya Sharma', avatar: 'PS', amount: 2300, currency: 'INR', convertedAmount: 2300, category: 'Food', description: 'Client dinner at Taj Palace', date: '2026-03-27', status: 'pending' as const, step: 2, totalSteps: 3, approvers: ['Manager', 'Finance', 'Director'] },
  { id: '3', employee: 'Rahul Verma', avatar: 'RV', amount: 15000, currency: 'INR', convertedAmount: 15000, category: 'Hotel', description: 'Hyatt Regency - 2 nights', date: '2026-03-26', status: 'approved' as const, step: 3, totalSteps: 3, approvers: ['Manager', 'Finance', 'Director'] },
  { id: '4', employee: 'Neha Gupta', avatar: 'NG', amount: 450, currency: 'USD', convertedAmount: 37800, category: 'Software', description: 'Annual Figma License', date: '2026-03-25', status: 'rejected' as const, step: 1, totalSteps: 3, approvers: ['Manager', 'Finance', 'Director'] },
  { id: '5', employee: 'Vikram Singh', avatar: 'VS', amount: 3200, currency: 'INR', convertedAmount: 3200, category: 'Transport', description: 'Uber rides - March', date: '2026-03-24', status: 'approved' as const, step: 3, totalSteps: 3, approvers: ['Manager', 'Finance', 'Director'] },
  { id: '6', employee: 'Ananya Reddy', avatar: 'AR', amount: 6800, currency: 'INR', convertedAmount: 6800, category: 'Equipment', description: 'Logitech MX Master 3S + Keychron K2', date: '2026-03-23', status: 'pending' as const, step: 1, totalSteps: 3, approvers: ['Manager', 'Finance', 'Director'] },
];

export const mockTeam = [
  { id: '1', name: 'Arjun Mehta', email: 'arjun@clearclaim.io', role: 'employee' as const, department: 'Engineering', manager: 'Vikram Singh' },
  { id: '2', name: 'Priya Sharma', email: 'priya@clearclaim.io', role: 'employee' as const, department: 'Design', manager: 'Neha Gupta' },
  { id: '3', name: 'Vikram Singh', email: 'vikram@clearclaim.io', role: 'manager' as const, department: 'Engineering', manager: null },
  { id: '4', name: 'Neha Gupta', email: 'neha@clearclaim.io', role: 'manager' as const, department: 'Design', manager: null },
  { id: '5', name: 'Rahul Verma', email: 'rahul@clearclaim.io', role: 'employee' as const, department: 'Sales', manager: 'Vikram Singh' },
  { id: '6', name: 'Ananya Reddy', email: 'ananya@clearclaim.io', role: 'employee' as const, department: 'Marketing', manager: 'Neha Gupta' },
];

export const mockApprovalChain = [
  { id: '1', role: 'Manager', name: 'Direct Manager', order: 1 },
  { id: '2', role: 'Finance', name: 'Finance Head', order: 2 },
  { id: '3', role: 'Director', name: 'Director', order: 3 },
];

export const categories = [
  { name: 'Travel', icon: 'plane', color: '#00b4d8' },
  { name: 'Food', icon: 'utensils', color: '#f59e0b' },
  { name: 'Hotel', icon: 'building', color: '#8b5cf6' },
  { name: 'Transport', icon: 'car', color: '#10b981' },
  { name: 'Software', icon: 'laptop', color: '#6366f1' },
  { name: 'Equipment', icon: 'monitor', color: '#ec4899' },
  { name: 'Office', icon: 'briefcase', color: '#14b8a6' },
  { name: 'Other', icon: 'more-horizontal', color: '#64748b' },
];

export const currencies = [
  { code: 'INR', symbol: '₹', flag: '🇮🇳', rate: 1 },
  { code: 'USD', symbol: '$', flag: '🇺🇸', rate: 84 },
  { code: 'EUR', symbol: '€', flag: '🇪🇺', rate: 91 },
  { code: 'GBP', symbol: '£', flag: '🇬🇧', rate: 106 },
  { code: 'AED', symbol: 'د.إ', flag: '🇦🇪', rate: 22.9 },
];

export const formatCurrency = (amount: number, currency = 'INR') => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
};
