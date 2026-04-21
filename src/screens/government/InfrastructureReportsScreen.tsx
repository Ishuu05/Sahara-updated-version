import React, { useState, useEffect } from 'react';
import { 
  ClipboardList, Search, Filter, Calendar, 
  MapPin, AlertTriangle, ChevronRight, CheckCircle, 
  Trash2, ExternalLink, Activity 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { subscribeToInfrastructureReports } from '../../services/firestoreService';
import { formatRelativeDate } from '../../utils/formatters';
import { StatusBadge } from '../../components/common/StatusBadge';
import { clsx } from 'clsx';

export const InfrastructureReportsScreen: React.FC = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>('All');
  const [selectedReport, setSelectedReport] = useState<any>(null);

  useEffect(() => {
    const unsub = subscribeToInfrastructureReports(setReports);
    return unsub;
  }, []);

  const filteredReports = reports.filter(r => filter === 'All' || r.severity === filter);

  return (
    <div className="min-h-screen bg-bg pb-24">
      {/* Header */}
      <header className="bg-surface px-6 pt-12 pb-6 border-b border-border sticky top-0 z-[1001]">
         <h1 className="font-display text-2xl font-black text-text mb-6 tracking-tight">Damage Terminal</h1>
         
         <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {['All', 'Critical', 'High', 'Medium', 'Low'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={clsx(
                  "px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border",
                  filter === f ? "bg-danger border-danger text-white" : "bg-white border-border text-text-secondary"
                )}
              >
                {f}
              </button>
            ))}
         </div>
      </header>

      <main className="p-6 space-y-4">
         {filteredReports.length > 0 ? (
           filteredReports.map((report, idx) => (
             <motion.div
               key={report.id}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: idx * 0.05 }}
               onClick={() => setSelectedReport(report)}
               className="bg-white p-4 rounded-3xl border border-border shadow-sm flex gap-4 active:scale-98 transition-all relative overflow-hidden"
             >
                <div className="w-20 h-20 bg-bg rounded-2xl overflow-hidden flex-shrink-0 border border-border relative">
                   {report.imageUrl ? (
                     <img src={report.imageUrl} alt="Audit" className="w-full h-full object-cover" />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center text-text-secondary opacity-30"><ClipboardList size={28} /></div>
                   )}
                   <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="flex-1 min-w-0">
                   <div className="flex justify-between items-start mb-1">
                      <h4 className="font-black text-text text-sm truncate">{report.type} Audit</h4>
                      <StatusBadge status={report.severity} />
                   </div>
                   <div className="flex items-center gap-2 text-[9px] font-black text-text-secondary uppercase tracking-wide mb-2 opacity-60">
                      <MapPin size={10} /> {report.district || "Local Zone"} • {formatRelativeDate(report.timestamp)}
                   </div>
                   <p className="text-[11px] font-bold text-text-secondary leading-snug line-clamp-2">
                     "{report.reasoning || report.description || "No AI assessment text provided."}"
                   </p>
                </div>
                <div className="flex flex-col justify-center">
                   <ChevronRight size={20} className="text-gray-300" />
                </div>
                
                {/* Danger indicator bar */}
                {report.severity === 'Critical' && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-danger" />
                )}
             </motion.div>
           ))
         ) : (
           <div className="py-20 text-center opacity-40">
              <ClipboardList size={48} className="mx-auto mb-4" />
              <p className="text-sm font-black uppercase tracking-widest tracking-widest text-text-secondary">No reports match filter</p>
           </div>
         )}
      </main>

      {/* Report Detail Modal */}
      <AnimatePresence>
         {selectedReport && (
           <div className="fixed inset-0 z-[2000] flex items-end justify-center">
              <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }}
               onClick={() => setSelectedReport(null)}
               className="absolute inset-0 bg-text/60 backdrop-blur-md"
              />
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                className="bg-white w-full max-w-lg rounded-t-[48px] p-8 pb-12 shadow-2xl relative z-10 max-h-[90vh] overflow-y-auto"
              >
                 <div className="w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-8"></div>
                 
                 <div className="flex items-start justify-between mb-8">
                    <div className="p-3 bg-danger/10 text-danger rounded-2xl">
                       <AlertTriangle size={32} />
                    </div>
                    <div className="flex flex-col items-end gap-2">
                       <StatusBadge status={selectedReport.severity} label={selectedReport.severity + " RISK"} />
                       <span className="text-[10px] font-black text-text-secondary opacity-60 uppercase">{formatRelativeDate(selectedReport.timestamp)}</span>
                    </div>
                 </div>

                 <h2 className="font-display text-2xl font-black text-text mb-2">{selectedReport.type} Damage Report</h2>
                 <p className="text-text-secondary font-bold text-xs uppercase tracking-widest mb-6 flex items-center gap-1">
                   <MapPin size={12} className="text-primary" /> {selectedReport.district}, {selectedReport.state} • {selectedReport.lat?.toFixed(4)}, {selectedReport.lng?.toFixed(4)}
                 </p>

                 <div className="aspect-video bg-bg rounded-3xl overflow-hidden border border-border mb-8">
                    {selectedReport.imageUrl ? (
                      <img src={selectedReport.imageUrl} alt="Damage" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-text-secondary opacity-10"><Activity size={64} /></div>
                    )}
                 </div>

                 <div className="space-y-8">
                    {selectedReport.reasoning && (
                      <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10">
                        <h3 className="text-[10px] font-black text-primary uppercase mb-2">AI Strategic Analysis</h3>
                        <p className="text-sm font-bold text-text-secondary italic leading-relaxed">"{selectedReport.reasoning}"</p>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-4 bg-bg rounded-2xl border border-border">
                          <p className="text-[10px] font-black text-text-secondary mb-1 uppercase">Recommended</p>
                          <p className="text-xs font-black text-text uppercase">{selectedReport.recommended_action || "Inspection"}</p>
                       </div>
                       <div className="p-4 bg-bg rounded-2xl border border-border">
                          <p className="text-[10px] font-black text-text-secondary mb-1 uppercase">Materials</p>
                          <p className="text-xs font-black text-text uppercase">{selectedReport.materials || "Unknown"}</p>
                       </div>
                    </div>

                    <div className="space-y-4 pt-4">
                       <button className="w-full h-14 bg-primary text-white rounded-2xl font-black shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                         DISPATCH NDMA TEAM
                         <ChevronRight size={20} />
                       </button>
                       <button 
                        onClick={() => setSelectedReport(null)}
                        className="w-full h-14 bg-bg text-text-secondary rounded-2xl font-black"
                       >
                         CLOSE TERMINAL
                       </button>
                    </div>
                 </div>
              </motion.div>
           </div>
         )}
      </AnimatePresence>
    </div>
  );
};
