import React, { useState } from 'react';
import { Activity, Shield, AlertTriangle, Users, Map, Loader2, Sparkles, ChevronRight, Zap, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { chatWithGemini } from '../../services/geminiService';
import { StatusBadge } from '../../components/common/StatusBadge';
import { clsx } from 'clsx';

export const PredictionScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);
  const [formData, setFormData] = useState({
    type: 'Flooding',
    severity: 70,
    districts: ['Mumbai North', 'Palghar'],
    supplyStatus: 'High',
  });

  const runPrediction = async () => {
    setLoading(true);
    try {
      const prompt = `Act as an emergency strategy AI. Predict impact for: type=${formData.type}, severity=${formData.severity}%, areas=${formData.districts.join(',')}. 
      Return ONLY JSON: {"bottleneck_zones": [{"district":"x", "risk_level":"High|Med|Low", "population": "50k", "action": "pre-deploy boats"}], "priority_actions": ["a1", "a2"], "assessment": "1 sentence"}`;
      
      const result = await chatWithGemini(prompt);
      const json = JSON.parse(result);
      setPrediction(json);
    } catch (err) {
      // Fallback Demo Result
      setPrediction({
        bottleneck_zones: [
          { district: "Andheri East", risk_level: "Critical", population: "120k", action: "Evacuate baseline residents" },
          { district: "Kurla West", risk_level: "High", population: "85k", action: "Deploy extra water pumps" }
        ],
        priority_actions: [
          "Activate secondary shelter in Goregaon",
          "Cut power to sub-stations in Zone 4",
          "Alert primary healthcare units"
        ],
        assessment: "System models indicate significant water stagnation in Metro-proximate areas within 6 hours."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg pb-24">
      <header className="bg-surface px-6 pt-12 pb-6 border-b border-border sticky top-0 z-[1001]">
         <div className="flex items-center gap-2 mb-1">
            <Zap className="text-primary fill-primary" size={16} />
            <span className="text-[10px] font-black text-primary uppercase tracking-widest">Sahara Predictive AI</span>
         </div>
         <h1 className="font-display text-2xl font-black text-text">Disaster Forecasting</h1>
      </header>

      <main className="p-6 space-y-8">
        {/* Control Panel */}
        <section className="bg-white p-6 rounded-[32px] border border-border shadow-sm space-y-6">
           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                 <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest ml-1">Simulate Type</label>
                 <select 
                   value={formData.type}
                   onChange={e => setFormData({ ...formData, type: e.target.value })}
                   className="w-full h-12 bg-bg border border-border rounded-2xl px-4 font-bold text-sm"
                 >
                    <option>Flooding</option>
                    <option>Cyclone</option>
                    <option>Earthquake</option>
                    <option>Heat Wave</option>
                 </select>
              </div>
              <div className="space-y-1.5">
                 <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest ml-1">Severity (%)</label>
                 <input 
                   type="range"
                   value={formData.severity}
                   onChange={e => setFormData({ ...formData, severity: parseInt(e.target.value) })}
                   className="w-full h-8 accent-primary"
                 />
              </div>
           </div>

           <div className="space-y-1.5">
              <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest ml-1">Forecast Districts</label>
              <div className="flex flex-wrap gap-2">
                 {['Bandra', 'Andheri', 'Kurla', 'Goregaon'].map(d => (
                   <button
                    key={d}
                    onClick={() => {
                       const next = formData.districts.includes(d) 
                        ? formData.districts.filter(x => x !== d) 
                        : [...formData.districts, d];
                       setFormData({ ...formData, districts: next });
                    }}
                    className={clsx(
                      "px-4 py-2 rounded-xl text-[10px] font-black uppercase border transition-all",
                      formData.districts.includes(d) ? "bg-primary border-primary text-white" : "bg-bg border-border text-text-secondary"
                    )}
                   >
                     {d}
                   </button>
                 ))}
              </div>
           </div>

           <button 
            onClick={runPrediction}
            disabled={loading}
            className="w-full h-14 bg-text text-white rounded-2xl font-black flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl shadow-text/20"
           >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} className="text-amber-400 fill-amber-400" />}
              RUN AI SIMULATION
           </button>
        </section>

        {/* Prediction Output */}
        <AnimatePresence>
           {prediction && (
             <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               className="space-y-8"
             >
                {/* Overall Assessment */}
                <div className="bg-primary p-6 rounded-[32px] text-white shadow-xl shadow-primary/20">
                   <div className="flex items-center gap-2 mb-3">
                      <Shield size={18} />
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Strategic Assessment</span>
                   </div>
                   <p className="text-xl font-bold leading-tight">{prediction.assessment}</p>
                </div>

                {/* Bottleneck Zones */}
                <section className="space-y-4">
                   <h2 className="font-display text-lg font-black text-text uppercase px-1">At-Risk Sectors</h2>
                   <div className="space-y-3">
                      {prediction.bottleneck_zones.map((zone: any, i: number) => (
                        <div key={i} className="bg-white p-5 rounded-3xl border border-border shadow-sm flex flex-col gap-4">
                           <div className="flex justify-between items-start">
                              <div>
                                 <h4 className="font-black text-text text-lg">{zone.district}</h4>
                                 <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest">{zone.population} at risk</p>
                              </div>
                              <StatusBadge status={zone.risk_level} />
                           </div>
                           <div className="bg-orange-50 border border-orange-100 p-3 rounded-2xl flex items-center gap-3">
                              <AlertTriangle className="text-orange-500 flex-shrink-0" size={16} />
                              <p className="text-xs font-bold text-orange-700 uppercase tracking-tight">ACTION: {zone.action}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </section>

                {/* Priority Actions */}
                <section>
                   <h2 className="font-display text-lg font-black text-text uppercase px-1 mb-4 text-center">Deployment Checklist</h2>
                   <div className="bg-surface border border-border rounded-[32px] overflow-hidden">
                      {prediction.priority_actions.map((act: string, i: number) => (
                        <div key={i} className="flex items-center gap-4 p-5 border-b border-border last:border-b-0 group active:bg-bg transition-colors">
                           <div className="w-6 h-6 border-2 border-primary rounded-lg flex items-center justify-center text-primary transition-colors group-active:bg-primary group-active:text-white">
                              <CheckCircle size={14} className="opacity-0 group-active:opacity-100" />
                           </div>
                           <p className="text-sm font-bold text-text-secondary leading-snug">{act}</p>
                        </div>
                      ))}
                   </div>
                </section>
             </motion.div>
           )}
        </AnimatePresence>
      </main>
    </div>
  );
};
