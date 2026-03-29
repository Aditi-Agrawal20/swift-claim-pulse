import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Users, GitBranch, Receipt, Clock,
  FileText, UsersRound, LogOut, Sun, Moon, Zap
} from 'lucide-react';
import { useRole, Role } from '@/hooks/useRole';
import { useTheme } from '@/hooks/useTheme';

const navItems: Record<Role, { label: string; path: string; icon: React.ElementType }[]> = {
  admin: [
    { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Team', path: '/dashboard/team', icon: Users },
    { label: 'Approval Rules', path: '/dashboard/rules', icon: GitBranch },
    { label: 'All Expenses', path: '/dashboard/expenses', icon: Receipt },
  ],
  employee: [
    { label: 'Submit Expense', path: '/dashboard', icon: FileText },
    { label: 'My Expenses', path: '/dashboard/my-expenses', icon: Receipt },
  ],
  manager: [
    { label: 'Pending Approvals', path: '/dashboard', icon: Clock },
    { label: 'Team Overview', path: '/dashboard/team-overview', icon: UsersRound },
  ],
};

const roleColors: Record<Role, string> = {
  admin: 'from-purple-500 to-violet-400',
  manager: 'from-blue-500 to-cyan-400',
  employee: 'from-emerald-400 to-teal-400',
};

const roleLabels: Record<Role, string> = {
  admin: 'Admin',
  manager: 'Manager',
  employee: 'Employee',
};

export const AppSidebar = () => {
  const { role, setRole, setIsLoggedIn } = useRole();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const items = navItems[role];

  const handleRoleSwitch = () => {
    const roles: Role[] = ['admin', 'manager', 'employee'];
    const next = roles[(roles.indexOf(role) + 1) % roles.length];
    setRole(next);
    navigate('/dashboard');
  };

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-layer-1 border-r border-border flex flex-col z-50">
      {/* Ambient glow behind logo */}
      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 200px 120px at 50% 0%, hsl(164 100% 45% / 0.08) 0%, transparent 70%)',
      }} />

      {/* Logo */}
      <div className="px-6 py-6 relative">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <span className="font-display font-bold text-lg gradient-text-accent">ClearClaim</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 mt-2 space-y-1">
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body transition-all duration-150 relative group ${
                isActive
                  ? 'text-foreground bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-gradient-to-b from-emerald-400 to-cyan-500"
                />
              )}
              <item.icon className="w-4 h-4" strokeWidth={1.5} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="px-3 pb-4 space-y-2">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" strokeWidth={1.5} /> : <Moon className="w-4 h-4" strokeWidth={1.5} />}
          <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>

        {/* Role switcher */}
        <button
          onClick={handleRoleSwitch}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body transition-all group hover:bg-muted/50"
        >
          <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${roleColors[role]} flex items-center justify-center`}>
            <span className="text-xs font-bold text-primary-foreground">
              {roleLabels[role][0]}
            </span>
          </div>
          <div className="flex-1 text-left">
            <div className="text-xs text-foreground font-medium">Demo User</div>
            <div className="text-[10px] text-muted-foreground">{roleLabels[role]} · Click to switch</div>
          </div>
        </button>

        {/* Logout */}
        <button
          onClick={() => { setIsLoggedIn(false); navigate('/'); }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
        >
          <LogOut className="w-4 h-4" strokeWidth={1.5} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
