import React, { useState, useEffect } from 'react';
import { Package, Plus, ChevronRight, AlertTriangle, CheckCircle, Info, Truck, TrendingUp, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { subscribeToResources } from '../../services/firestoreService';
import { chatWithGemini } from '../../services/geminiService';
import { StatusBadge } from '../../components/common/StatusBadge';
import { clsx } from 'clsx';

export const ResourceManagerScreen: React.FC = () => {
  const [resources, setResources] = useState<any[]>([]);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [loadingAI, setLoadingAI] = useState(false);
  const [activeTab, setActiveTab] = useState<'inventory' | 'logistics'>('inventory');

  useEffect(() => {
    const unsub = subscribeToResources(setResources);
    return unsub;
  }, []);

  const getAiInsights = async () => {
    setLoadingAI(true);
    try {
      const prompt = `Given these resource levels: ${resources.map(r => `${r.name}: ${r.quantity}${r.unit}`).join(', ')}. 
      And 3 active SOS alerts in Bandra East. Suggest top 3 logistics redistribution actions. Short sentences.`;
      const result = await chatWithGemini(prompt);
      setAiSuggestions(result.split('\n').filter(s => s.trim().length > 0).slice(0, 3));
    } catch (err) {
      setAiSuggestions([
        "Move 100 food packets from HQ to Bandra Camp.",
        "Alert NDRF Team 4 to standby for flood rescue.",
        "Request 50 additional water cans from neighbouring district."
      ]);
    } finally {
      setLoadingAI(false);
    }
  };

  const resourceGroups = [
    { title: 'Food & Water', count: 1200, unit: 'units', percent: 75, color: 'bg-safe' },
    { title: 'Medical Kits', count: 45, unit: 'kits', percent: 25, color: 'bg-danger' },
    { title: 'Rescue Gear', count: 180, unit: 'items', percent: 55, color: 'bg-warning' },
    { title: 'Field Staff', count: 24, unit: 'personnel', percent: 90, color: 'bg-safe' },
  ];

  return (
    <div className="min-h-screen bg-bg pb-24">
      <header className="bg-surface px-6 pt-12 pb-6 border-b border-border sticky top-0 z-[1001]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-display text-2xl font-black text-text">Logistics Command</h1>
          <button className="p-2 bg-primary/10 text-primary rounded-xl"><Plus size={24} /></button>
        </div>
        
        <div className="flex bg-bg p-1 rounded-2xl border border-border">
          <button 
            onClick={() => setActiveTab('inventory')}
            className={clsx(
              "flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
              activeTab === 'inventory' ? "bg-white text-primary shadow-sm" : "text-text-secondary"
            )}
          >
            Inventory
          </button>
          <button 
            onClick={() => setActiveTab('logistics')}
            className={clsx(
              "flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
              activeTab === 'logistics' ? "bg-white text-primary shadow-sm" : "text-text-secondary"
            )}
          >
            Logistics Flow
          </button>
        </div>
      </header>

      <main className="p-6 space-y-8">
        {/* Resource Dashboards */}
        <section className="space-y-4">
           <div className="flex items-center gap-2 px-1 mb-2">
              <TrendingUp size={16} className="text-primary" />
              <h2 className="font-display text-lg font-black text-text uppercase tracking-tight">Stock Levels</h2>
           </div>
           <div className="grid grid-cols-2 gap-4">
              {resourceGroups.map((group, i) => (
                <div key={i} className="bg-white p-5 rounded-3xl border border-border shadow-sm flex flex-col gap-4">
                   <div className="flex justify-between items-start">
                      <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest">{group.title}</span>
                      <span className={clsx("text-xs font-black", group.percent < 30 ? "text-danger" : "text-safe")}>{group.percent}%</span>
                   </div>
                   <div className="h-1.5 w-full bg-bg rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${group.percent}%` }}
                        className={`h-full ${group.color}`}
                      />
                   </div>
                   <div>
                      <p className="text-xl font-black text-text">{group.count}</p>
                      <p className="text-[9px] font-bold text-text-secondary uppercase">{group.unit}</p>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* AI Redistribution Insights */}
        <section className="bg-primary p-6 rounded-[40px] text-white shadow-xl shadow-primary/20 relative overflow-hidden">
           <div className="relative z-10">
              <div className="flex justify-between items-center mb-6">
                 <h2 className="text-lg font-black uppercase tracking-widest flex items-center gap-2">
                   <TrendingUp size={20} /> Sahara AI Supply Insights
                 </h2>
                 <button 
                   onClick={getAiInsights}
                   className="p-2 bg-white/20 rounded-xl hover:bg-white/30"
                 >
                    <RefreshCw size={18} className={loadingAI ? "animate-spin" : ""} />
                 </button>
              </div>

              <div className="space-y-3">
                 {aiSuggestions.length > 0 ? (
                   aiSuggestions.map((s, i) => (
                    <motion.div 
                      key={i}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex items-start gap-3"
                    >
                       <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0">{i+1}</div>
                       <p className="text-sm font-bold leading-snug">{s}</p>
                    </motion.div>
                   ))
                 ) : (
                    <div className="text-center py-6">
                       <p className="text-sm font-bold opacity-60">Tap the refresh icon for AI deployment analysis</p>
                    </div>
                 )}
              </div>
           </div>
           <div className="absolute right-[-20px] top-[-20px] w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        </section>

        {/* Operational List */}
        <section>
          <div className="flex justify-between items-center mb-4 px-1">
             <h2 className="font-display text-lg font-black text-text uppercase">Zone Inventory</h2>
             <button className="text-text-secondary"><Filter size={18} /></button>
          </div>
          <div className="space-y-3">
             {resources.length > 0 ? (
               resources.map(r => (
                 <div key={r.id} className="bg-white p-4 rounded-3xl border border-border shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-bg rounded-2xl flex items-center justify-center flex-shrink-0 text-text-secondary">
                       <Package size={20} />
                    </div>
                    <div className="flex-1">
                       <h4 className="font-bold text-sm text-text">{r.name}</h4>
                       <p className="text-[10px] font-bold text-text-secondary uppercase">{r.zone || "Main Center"}</p>
                    </div>
                    <div className="text-right">
                       <p className="font-black text-text text-base">{r.quantity}</p>
                       <StatusBadge status={r.status || 'Available'} />
                    </div>
                 </div>
               ))
             ) : (
                <div className="bg-surface p-12 rounded-[32px] text-center border-2 border-dashed border-border">
                   <Truck className="mx-auto text-gray-300 mb-2" size={40} />
                   <p className="text-sm font-bold text-text-secondary uppercase">No active logistics logs</p>
                </div>
             )}
          </div>
        </section>
      </main>
    </div>
  );
};

const RefreshCw = ({ className, size }: { className?: string, size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size || "24"} height={size || "24"} viewBox="0 0 24 24" fill="none" 
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" 
    strokeLinejoin="round" className={className}
  >
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
    <path d="M21 3v5h-5"/>
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
    <path d="M3 21v-5h5"/>
  </svg>
);
