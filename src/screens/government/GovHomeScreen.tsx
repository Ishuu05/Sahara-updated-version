import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, ClipboardList, Map, Users, Bell, 
  Send, ChevronRight, AlertCircle, CheckCircle, Package 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthContext } from '../../context/AuthContext';
import { 
  subscribeToSOSAlerts, 
  subscribeToInfrastructureReports, 
  subscribeToCivilianLocations,
  subscribeToBroadcasts,
  markSOSHelped,
  sendBroadcast
} from '../../services/firestoreService';
import { formatRelativeDate } from '../../utils/formatters';
import { StatusBadge } from '../../components/common/StatusBadge';
import { clsx } from 'clsx';
import { UserMenu } from '../../components/navigation/UserMenu';

export const GovHomeScreen: React.FC = () => {
  const { profile } = useAuthContext();
  const [sosAlerts, setSosAlerts] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [broadcasts, setBroadcasts] = useState<any[]>([]);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('Warning');
  const [area, setArea] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const unsubSOS = subscribeToSOSAlerts(setSosAlerts);
    const unsubReports = subscribeToInfrastructureReports(setReports);
    const unsubLocs = subscribeToCivilianLocations(setLocations);
    const unsubBC = subscribeToBroadcasts(setBroadcasts);
    
    return () => {
      unsubSOS(); unsubReports(); unsubLocs(); unsubBC();
    };
  }, []);

  const handleBroadcast = async () => {
    if (!message || !area) return;
    try {
      await sendBroadcast(message, severity, area);
      setMessage('');
      setArea('');
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const stats = [
    { label: 'Active SOS', value: sosAlerts.length, color: 'text-danger', bg: 'bg-danger/10', icon: ShieldAlert },
    { label: 'Damage Reports', value: reports.length, color: 'text-orange-500', bg: 'bg-orange-500/10', icon: ClipboardList },
    { label: 'Live Civilians', value: locations.length, color: 'text-primary', bg: 'bg-primary/10', icon: Users },
    { label: 'Broadcasts', value: broadcasts.slice(0, 5).length, color: 'text-safe', bg: 'bg-safe/10', icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-bg pb-24">
      {/* Header */}
      <header className="bg-surface px-6 pt-12 pb-6 border-b border-border sticky top-0 z-[1001]">
        <div className="flex justify-between items-end">
          <div>
            <div className="flex items-center gap-2 mb-1">
               <ShieldAlert className="text-danger" size={16} />
               <span className="text-[10px] font-black text-danger uppercase tracking-widest">Sahara Command</span>
            </div>
            <h1 className="font-display text-2xl font-black text-text">Officer {profile?.name?.split(' ')[0] || 'Admin'}</h1>
            <p className="text-xs font-bold text-text-secondary uppercase">{profile?.district}, {profile?.state}</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowModal(true)}
              className="bg-primary text-white p-3 rounded-2xl shadow-lg shadow-primary/20 active:scale-95 transition-all"
            >
              <Send size={20} />
            </button>
            <UserMenu />
          </div>
        </div>
      </header>

      <main className="p-6 space-y-8">
        {/* Stat Grid */}
        <div className="grid grid-cols-2 gap-4">
           {stats.map((stat, i) => (
             <div key={i} className="bg-white p-4 rounded-3xl border border-border shadow-sm flex flex-col items-start gap-3">
                <div className={clsx("p-2.5 rounded-xl", stat.bg, stat.color)}>
                   <stat.icon size={20} />
                </div>
                <div>
                   <p className="text-3xl font-black text-text tracking-tighter">{stat.value}</p>
                   <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest">{stat.label}</p>
                </div>
             </div>
           ))}
        </div>

        {/* SOS Priority List */}
        <section>
          <div className="flex justify-between items-center mb-4 px-1">
             <h2 className="font-display text-xl font-extrabold text-text flex items-center gap-2">
               Active SOS Alerts <span className="bg-danger/10 text-danger text-xs px-2 py-0.5 rounded-full">{sosAlerts.length}</span>
             </h2>
          </div>
          <div className="space-y-4">
             {sosAlerts.length > 0 ? (
               sosAlerts.map(sos => (
                 <div key={sos.id} className="bg-white p-5 rounded-[32px] border-2 border-danger/20 shadow-md flex items-start gap-4 animate-pulse-slow">
                    <div className="w-12 h-12 bg-danger text-white rounded-2xl flex items-center justify-center flex-shrink-0 animate-pulse">
                       <ShieldAlert size={24} />
                    </div>
                    <div className="flex-1">
                       <div className="flex justify-between items-start mb-1">
                          <h4 className="font-black text-text">{sos.name}</h4>
                          <span className="text-[10px] font-bold text-danger uppercase">{formatRelativeDate(sos.timestamp)}</span>
                       </div>
                       <p className="text-xs font-medium text-text-secondary mb-3 italic">Co-ords: {sos.lat?.toFixed(4)}, {sos.lng?.toFixed(4)}</p>
                       <div className="flex gap-2">
                          <button 
                            onClick={() => window.open(`tel:911`)} 
                            className="flex-1 h-10 bg-bg text-text-secondary rounded-xl text-[10px] font-black uppercase tracking-widest"
                          >
                            DISPATCH
                          </button>
                          <button 
                            onClick={() => markSOSHelped(sos.id)}
                            className="flex-1 h-10 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest"
                          >
                            RESOLVE
                          </button>
                       </div>
                    </div>
                 </div>
               ))
             ) : (
               <div className="bg-safe/5 border border-safe/20 p-8 rounded-[32px] text-center">
                  <CheckCircle className="text-safe mx-auto mb-3" size={32} />
                  <p className="text-sm font-bold text-safe uppercase">No active SOS signals</p>
               </div>
             )}
          </div>
        </section>

        {/* Infrastructure Reports Summary */}
        <section>
           <div className="flex justify-between items-center mb-4 px-1">
             <h2 className="font-display text-xl font-extrabold text-text">Recent Damages</h2>
             <button className="text-primary font-bold text-xs uppercase">View Reports</button>
           </div>
           <div className="space-y-4">
             {reports.slice(0, 3).map(report => (
               <div key={report.id} className="bg-white p-4 rounded-3xl border border-border flex items-center gap-4">
                  <div className="w-16 h-16 bg-bg rounded-2xl overflow-hidden flex-shrink-0 border border-border">
                     {report.imageUrl ? (
                       <img src={report.imageUrl} alt="Damage" className="w-full h-full object-cover" />
                     ) : (
                       <div className="w-full h-full flex items-center justify-center text-text-secondary opacity-20"><ClipboardList size={24} /></div>
                     )}
                  </div>
                  <div className="flex-1">
                     <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-text text-sm">{report.type} Audit</h4>
                        <StatusBadge status={report.severity} />
                     </div>
                     <p className="text-[10px] font-medium text-text-secondary">{report.district || "Local Area"} • {formatRelativeDate(report.timestamp)}</p>
                  </div>
               </div>
             ))}
           </div>
        </section>
      </main>

      {/* Broadcast Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[2000] flex items-end sm:items-center justify-center p-4">
             <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }}
               onClick={() => setShowModal(false)}
               className="absolute inset-0 bg-text/60 backdrop-blur-sm"
             />
             <motion.div
               initial={{ y: "100%" }}
               animate={{ y: 0 }}
               exit={{ y: "100%" }}
               className="bg-white w-full max-w-md rounded-[40px] p-8 shadow-2xl relative z-10"
             >
                <div className="w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-8"></div>
                <h2 className="font-display text-2xl font-black text-text mb-6">Send Official Broadcast</h2>
                
                <div className="space-y-6">
                   <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest ml-1">Message Content</label>
                      <textarea 
                         value={message}
                         onChange={(e) => setMessage(e.target.value)}
                         placeholder="e.g. Flood warning for coastal areas. Evacuation centers open at..."
                         className="w-full h-32 bg-bg border border-border rounded-3xl p-4 font-medium outline-none focus:ring-2 focus:ring-primary"
                      />
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                         <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest ml-1">Target Area</label>
                         <input 
                            value={area}
                            onChange={(e) => setArea(e.target.value)}
                            placeholder="e.g. Mumbai North"
                            className="w-full h-12 bg-bg border border-border rounded-2xl px-4 font-bold text-sm"
                         />
                      </div>
                      <div className="space-y-1.5">
                         <label className="text-[10px] font-black text-text-secondary uppercase tracking-widest ml-1">Severity</label>
                         <select 
                            value={severity}
                            onChange={(e) => setSeverity(e.target.value)}
                            className="w-full h-12 bg-bg border border-border rounded-2xl px-4 font-bold text-sm"
                         >
                            <option>Info</option>
                            <option>Warning</option>
                            <option>Danger</option>
                         </select>
                      </div>
                   </div>

                   <button 
                    onClick={handleBroadcast}
                    className="w-full h-14 bg-primary text-white rounded-2xl font-black text-lg shadow-lg"
                   >
                     SEND NOW
                   </button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
