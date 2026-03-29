import React from 'react';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  gradient?: string;
  children?: React.ReactNode;
}

const gradientPresets: Record<string, string> = {
  purple: 'linear-gradient(135deg, hsl(250, 60%, 55%) 0%, hsl(280, 55%, 50%) 100%)',
  blue: 'linear-gradient(135deg, hsl(210, 70%, 50%) 0%, hsl(250, 60%, 55%) 100%)',
  teal: 'linear-gradient(135deg, hsl(170, 55%, 42%) 0%, hsl(210, 70%, 50%) 100%)',
  warm: 'linear-gradient(135deg, hsl(250, 60%, 55%) 0%, hsl(330, 50%, 50%) 100%)',
};

export const PageHeader = ({ title, subtitle, gradient = 'purple', children }: PageHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl px-8 py-8 mb-8 relative overflow-hidden"
      style={{ background: gradientPresets[gradient] || gradientPresets.purple }}
    >
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10" style={{
        background: 'radial-gradient(circle, white 0%, transparent 70%)',
        transform: 'translate(30%, -40%)',
      }} />
      <div className="absolute bottom-0 left-1/3 w-32 h-32 rounded-full opacity-[0.07]" style={{
        background: 'radial-gradient(circle, white 0%, transparent 70%)',
        transform: 'translate(0, 40%)',
      }} />

      <div className="relative flex items-end justify-between">
        <div>
          <h1 className="font-display font-bold text-[28px] text-white">{title}</h1>
          <p className="text-white/70 text-sm font-body mt-1">{subtitle}</p>
        </div>
        {children && <div>{children}</div>}
      </div>
    </motion.div>
  );
};
