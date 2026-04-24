import React, { useState, useEffect } from 'react';
import { Phone, Package, Shield, Navigation, Heart, WifiOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SAFE_ZONES, SafeZone } from '../../data/safeZones';
import { useLocation } from '../../hooks/useLocation';
import { getDistance, formatDistance } from '../../utils/haversine';
import { subscribeToResources } from '../../services/firestoreService';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';
import { useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';

type Tab = 'contacts' | 'relief' | 'gov';

export const ResourcesScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('contacts');
  const [govResources, setGovResources] = useState<any[]>([]);
  const location = useLocation();
  const isOnline = useOnlineStatus();
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = subscribeToResources((data) => {
      if (data.length > 0) {
        setGovResources(data);
        localStorage.setItem('sahara_cached_resources', JSON.stringify(data));
      }
    });
    const cached = localStorage.getItem('sahara_cached_resources');
    if (cached) {
      setGovResources(JSON.parse(cached));
    }
    return unsub;
  }, []);

  const emergencyContacts = [
    { name: 'National Emergency', number: '112', icon: Shield, color: 'bg-danger' },
    { name: 'Ambulance', number: '108', icon: Heart, color: 'bg-danger' },
    { name: 'Fire Brigade', number: '101', icon: Shield, color: 'bg-danger' },
    { name: 'Police', number: '100', icon: Shield, color: 'bg-danger' },
    { name: 'Disaster Management', number: '1078', icon: Shield, color: 'bg-primary' },
    { name: 'Women Helpline', number: '1091', icon: Shield, color: 'bg-primary' },
    { name: 'Child Helpline', number: '1098', icon: Shield, color: 'bg-primary' },
    { name: 'NDMA Control Room', number: '011-26701728', icon: Shield, color: 'bg-secondary' },
    { name: 'Red Cross India', number: '011-23716441', icon: Shield, color: 'bg-secondary' },
    { name: 'Coast Guard', number: '1554', icon: Shield, color: 'bg-secondary' },
  ];

  const sortedSafeZones = [...SAFE_ZONES].map(zone => ({
    ...zone,
    distance: getDistance(location.lat, location.lng, zone.lat, zone.lng)
  })).sort((a, b) => a.distance - b.distance);

  const demoResources = [
    { name: 'Food Packets', quantity: 500, unit: 'units', zone: 'Bandra Relief Camp, Mumbai', status: 'Available' },
    { name: 'Water Cans', quantity: 200, unit: 'units', zone: 'Dharavi Centre, Mumbai', status: 'Available' },
    { name: 'Medical Kits', quantity: 50, unit: 'units', zone: 'KEM Hospital, Mumbai', status: 'Low Stock' },
    { name: 'Rescue Teams', quantity: 8, unit: 'units', zone: 'NDRF Mumbai', status: 'Deployed' },
    { name: 'Blankets', quantity: 300, unit: 'units', zone: 'Civil Defence HQ Delhi', status: 'Available' },
    { name: 'Food Packets', quantity: 150, unit: 'units', zone: 'Apollo Hospital Chennai', status: 'Low Stock' },
  ];

  const resourcesToShow = govResources.length > 0 ? govResources : demoResources;

  return (
    <div className="min-h-screen bg-bg pb-24">
      <header className="bg-surface px-6 pt-12 pb-2 border-b border-border sticky top-0 z-[1001]">
        <h1 className="font-display text-2xl font-black text-text mb-6">Resources</h1>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {[
            { id: 'contacts', label: 'Emergency Contacts' },
            { id: 'relief', label: 'Relief Centers' },
            { id: 'gov', label: 'Gov Resources' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={clsx(
                "px-4 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border",
                activeTab === tab.id
                  ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                  : "bg-surface border-border text-text-secondary"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      <main className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {activeTab === 'contacts' && (
              <div className="grid grid-cols-1 gap-3">
                {emergencyContacts.map((contact) => (
                  <a
                    key={contact.number}
                    href={`tel:${contact.number}`}
                    className="bg-surface p-5 rounded-[24px] border border-border shadow-sm flex items-center justify-between active:scale-98 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={clsx("w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-inner", contact.color)}>
                        <Phone size={20} />
                      </div>
                      <div>
                        <h4 className="font-black text-text text-sm uppercase tracking-tight">{contact.name}</h4>
                        <p className="text-xl font-black text-primary">{contact.number}</p>
                      </div>
                    </div>
                    <div className="w-10 h-10 bg-bg rounded-xl flex items-center justify-center text-text-secondary border border-border group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                      <Phone size={18} />
                    </div>
                  </a>
                ))}
              </div>
            )}

            {activeTab === 'relief' && (
              <div className="space-y-3">
                {sortedSafeZones.map((zone) => (
                  <div key={zone.id} className="bg-surface p-5 rounded-[32px] border border-border shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className={clsx(
                          "text-[9px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-md",
                          zone.type === 'hospital' ? "bg-danger/10 text-danger" :
                          zone.type === 'relief' ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"
                        )}>
                          {zone.type}
                        </span>
                        <h3 className="text-lg font-black text-text mt-1">{zone.name}</h3>
                        <p className="text-xs font-bold text-text-secondary">{zone.city}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-black text-primary">{formatDistance(zone.distance)}</p>
                        <p className="text-[10px] font-bold text-text-secondary/50 uppercase tracking-widest">Away</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                      
                        href={`tel:${zone.phone}`}
                        className="flex-1 h-12 bg-bg border border-border rounded-2xl flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-text active:scale-95 transition-all"
                      >
                        <Phone size={14} /> Call
                      </a>
                      <button
                        onClick={() => navigate('/civilian/map', { state: { center: [zone.lat, zone.lng] } })}
                        className="flex-1 h-12 bg-primary text-white rounded-2xl flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest active:scale-95 transition-all shadow-md shadow-primary/20"
                      >
                        <Navigation size={14} /> Navigate
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'gov' && (
              <div className="space-y-4">
                {!isOnline && (
                  <div className="bg-warning/10 border border-warning/30 p-4 rounded-2xl flex items-center gap-3">
                    <WifiOff size={18} className="text-warning" />
                    <p className="text-xs font-bold text-warning-dark">Offline — Showing cached data</p>
                  </div>
                )}
                {resourcesToShow.map((r, i) => (
                  <div key={i} className="bg-surface p-6 rounded-[32px] border border-border shadow-sm flex items-center gap-4">
                    <div className="w-14 h-14 bg-bg rounded-2xl flex items-center justify-center flex-shrink-0 border border-border">
                      <Package className="text-text-secondary" size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-black text-text text-lg tracking-tight">{r.name}</h4>
                        <span className={clsx(
                          "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border",
                          r.status === 'Available' ? "bg-safe/10 text-safe border-safe/20" :
                          r.status === 'Low Stock' ? "bg-warning/10 text-warning border-warning/20" :
                          "bg-danger/10 text-danger border-danger/20"
                        )}>
                          {r.status === 'Available' ? "✅ " : r.status === 'Low Stock' ? "⚠️ " : "🚨 "}{r.status}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-xs font-bold text-text-secondary">{r.quantity} {r.unit} ready</p>
                        <span className="text-[10px] font-black text-text-secondary/60 bg-bg px-2 py-0.5 rounded-full uppercase tracking-widest border border-border">{r.zone}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};
