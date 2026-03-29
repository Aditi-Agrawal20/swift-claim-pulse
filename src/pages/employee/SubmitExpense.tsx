import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Camera, Plane, Utensils, Building, Car, Laptop, Monitor, Briefcase, MoreHorizontal, Sparkles, Check } from 'lucide-react';
import { categories, currencies, formatCurrency } from '@/data/mockData';
import { toast } from 'sonner';

const iconMap: Record<string, React.ElementType> = {
  plane: Plane, utensils: Utensils, building: Building, car: Car,
  laptop: Laptop, monitor: Monitor, briefcase: Briefcase, 'more-horizontal': MoreHorizontal,
};

const SubmitExpense = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currency, setCurrency] = useState('INR');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [hasReceipt, setHasReceipt] = useState(false);

  const simulateOCR = useCallback(() => {
    setIsScanning(true);
    setHasReceipt(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
      // Auto-fill with realistic data
      setAmount('8500');
      setDescription('IndiGo Airlines - Delhi to Bangalore (6E 2341)');
      setSelectedCategory('Travel');
      setCurrency('INR');
      toast.success('Receipt scanned successfully!');
    }, 2500);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Expense submitted for approval!');
  };

  const selectedCurr = currencies.find(c => c.code === currency);
  const convertedAmount = amount ? (parseFloat(amount) * (selectedCurr?.rate || 1) / currencies[0].rate) : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-bold text-[28px] gradient-text">Submit Expense</h1>
        <p className="text-muted-foreground text-sm font-body mt-1">Upload a receipt or fill manually</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Receipt upload */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-surface rounded-xl p-6 relative overflow-hidden"
          >
            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: 'radial-gradient(ellipse 400px 300px at 50% 50%, rgba(99,102,241,0.05) 0%, transparent 70%)',
            }} />

            <h2 className="font-display font-medium text-[15px] text-foreground mb-4 flex items-center gap-2 relative">
              <Camera className="w-4 h-4 text-primary" /> Receipt Scanner
              <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-body">AI Powered</span>
            </h2>

            <div className="relative">
              <AnimatePresence mode="wait">
                {isScanning ? (
                  <motion.div
                    key="scanning"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-48 rounded-lg bg-layer-4 relative overflow-hidden flex items-center justify-center"
                  >
                    <div className="absolute inset-0 bg-foreground/5" />
                    <div className="absolute left-0 right-0 h-0.5" style={{
                      background: 'linear-gradient(90deg, transparent 0%, #00e5a0 50%, transparent 100%)',
                      animation: 'scan-line 1s ease-in-out infinite',
                    }} />
                    <div className="text-center z-10">
                      <Sparkles className="w-8 h-8 text-primary mx-auto mb-2 animate-pulse" />
                      <p className="text-sm text-foreground font-body">Reading receipt...</p>
                    </div>
                  </motion.div>
                ) : scanComplete ? (
                  <motion.div
                    key="complete"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-48 rounded-lg bg-success/5 border border-success/20 flex items-center justify-center"
                  >
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-2">
                        <Check className="w-6 h-6 text-success" />
                      </div>
                      <p className="text-sm text-success font-medium">Receipt scanned!</p>
                      <p className="text-xs text-muted-foreground mt-1">Form auto-filled below</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="upload"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={simulateOCR}
                    className="h-48 rounded-lg border-2 border-dashed border-border hover:border-primary/40 cursor-pointer flex items-center justify-center transition-all group relative overflow-hidden"
                  >
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-muted-foreground group-hover:text-primary mx-auto mb-2 transition-colors" style={{
                        animation: 'float-orb 3s ease-in-out infinite',
                      }} />
                      <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Click to scan receipt</p>
                      <p className="text-[11px] text-muted-foreground mt-1">AI will auto-fill the form</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Category selector */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <label className="label-upper block mb-2">Category</label>
            <div className="grid grid-cols-4 gap-2">
              {categories.map((cat) => {
                const Icon = iconMap[cat.icon] || MoreHorizontal;
                const isSelected = selectedCategory === cat.name;
                return (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`p-3 rounded-lg text-center transition-all ${
                      isSelected
                        ? 'bg-primary/10 border border-primary/30 scale-105'
                        : 'bg-layer-4 border border-transparent hover:border-border'
                    }`}
                  >
                    <Icon className={`w-4 h-4 mx-auto mb-1 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className={`text-[10px] ${isSelected ? 'text-primary font-medium' : 'text-muted-foreground'}`}>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Amount + Currency */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="label-upper block mb-1.5">Amount</label>
              <input className="input-surface w-full font-mono" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" />
            </div>
            <div>
              <label className="label-upper block mb-1.5">Currency</label>
              <select className="input-surface w-full" value={currency} onChange={e => setCurrency(e.target.value)}>
                {currencies.map(c => <option key={c.code} value={c.code}>{c.flag} {c.code}</option>)}
              </select>
            </div>
            {amount && currency !== 'INR' && (
              <p className="col-span-3 text-xs text-muted-foreground font-mono">
                ≈ {formatCurrency(convertedAmount)} (company currency)
              </p>
            )}
          </motion.div>

          {/* Description + Date */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="space-y-4">
            <div>
              <label className="label-upper block mb-1.5">Description</label>
              <input className="input-surface w-full" value={description} onChange={e => setDescription(e.target.value)} placeholder="Brief description" />
            </div>
            <div>
              <label className="label-upper block mb-1.5">Date</label>
              <input className="input-surface w-full" type="date" value={date} onChange={e => setDate(e.target.value)} />
            </div>
          </motion.div>

          <button type="submit"
            className="w-full py-3 rounded-lg font-body font-medium text-sm bg-gradient-to-r from-emerald-400 to-cyan-500 text-primary-foreground glow-primary hover:scale-[1.02] active:scale-[0.98] transition-all">
            Submit Expense
          </button>
        </form>

        {/* Live preview card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="card-elevated rounded-xl p-6 h-fit sticky top-8"
        >
          <h2 className="font-display font-medium text-[15px] text-foreground mb-5">Preview</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="label-upper">Amount</span>
              <span className="font-mono font-bold text-2xl gradient-text-accent">
                {amount ? formatCurrency(parseFloat(amount), currency) : '—'}
              </span>
            </div>
            <div className="h-px bg-border" />
            <div className="flex justify-between">
              <span className="label-upper">Category</span>
              <span className="text-sm text-foreground">{selectedCategory || '—'}</span>
            </div>
            <div className="flex justify-between">
              <span className="label-upper">Description</span>
              <span className="text-sm text-foreground text-right max-w-[200px] truncate">{description || '—'}</span>
            </div>
            <div className="flex justify-between">
              <span className="label-upper">Date</span>
              <span className="text-sm text-foreground">{date}</span>
            </div>
            <div className="flex justify-between">
              <span className="label-upper">Receipt</span>
              <span className={`text-sm ${hasReceipt ? 'text-success' : 'text-muted-foreground'}`}>
                {hasReceipt ? '✓ Scanned' : 'Not uploaded'}
              </span>
            </div>
            {amount && currency !== 'INR' && (
              <>
                <div className="h-px bg-border" />
                <div className="flex justify-between">
                  <span className="label-upper">Converted (INR)</span>
                  <span className="font-mono text-sm text-foreground">{formatCurrency(convertedAmount)}</span>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SubmitExpense;
