import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AppSidebar } from './AppSidebar';
import { useRole } from '@/hooks/useRole';

const ambientColors: Record<string, string> = {
  admin: 'radial-gradient(ellipse 800px 400px at 80% -50px, rgba(124,58,237,0.04) 0%, transparent 70%)',
  manager: 'radial-gradient(ellipse 800px 400px at 80% -50px, rgba(59,130,246,0.04) 0%, transparent 70%)',
  employee: 'radial-gradient(ellipse 800px 400px at 50% -50px, rgba(0,229,160,0.04) 0%, transparent 70%)',
};

export const AppLayout = () => {
  const { role } = useRole();

  return (
    <div className="min-h-screen bg-background flex">
      <AppSidebar />
      <main className="flex-1 ml-64 relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: ambientColors[role] }} />
        <div className="relative p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={role}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};
