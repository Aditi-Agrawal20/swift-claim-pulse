import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, CheckCircle, Users } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  'receipt': TrendingUp,
  'clock': Clock,
  'check-circle': CheckCircle,
  'users': Users,
};

interface StatCardProps {
  label: string;
  value: number;
  prefix?: string;
  icon: string;
  sparkline: number[];
  index: number;
}

const MiniSparkline = ({ data }: { data: number[] }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 80, h = 32;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="opacity-40">
      <polyline fill="none" stroke="hsl(164, 100%, 45%)" strokeWidth="1.5" points={points} />
    </svg>
  );
};

export const StatCard = ({ label, value, prefix = '', icon, sparkline, index }: StatCardProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const Icon = iconMap[icon] || TrendingUp;

  useEffect(() => {
    const duration = 800;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="card-surface rounded-xl p-5 relative overflow-hidden group"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" style={{
        background: 'radial-gradient(ellipse 300px 200px at 50% 100%, rgba(0,229,160,0.06) 0%, transparent 70%)',
      }} />
      <div className="flex items-start justify-between relative">
        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
        </div>
        <MiniSparkline data={sparkline} />
      </div>
      <div className="mt-4 relative">
        <div className="stat-number font-mono">
          {prefix}{displayValue.toLocaleString('en-IN')}
        </div>
        <div className="label-upper mt-1">{label}</div>
      </div>
    </motion.div>
  );
};
