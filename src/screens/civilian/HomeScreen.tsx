import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Map, MessageSquare, Newspaper, Camera, ShieldAlert, Package, ChevronRight, AlertTriangle, CheckCircle, Cloud, Wind } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthContext } from '../../context/AuthContext';
import { useLocationContext } from '../../context/LocationContext';
import { fetchWeather, WeatherData, getWeatherIcon, getWeatherCondition } from '../../services/weatherService';
import { subscribeToBroadcasts } from '../../services/firestoreService';
import { formatRelativeDate } from '../../utils/formatters';
import { StatusBadge } from '../../components/common/StatusBadge';
import { UserMenu } from '../../components/navigation/UserMenu';

export const HomeScreen: React.FC = () => {
  const { profile } = useAuthContext();
  const { lat, lng, loading: locLoading } = useLocationContext();
  const [broadcasts, setBroadcasts] = useState<any[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = subscribeToBroadcasts((data) => {
      setBroadcasts(data);
    });
    return unsub;
  }, []);

  useEffect(() => {
    const loadWeather = async () => {
      if (locLoading) return;
      try {
        const data = await fetchWeather(lat, lng);
        setWeather(data);
      } catch (err) {
        console.error("Home weather error:", err);
      }
    };
    loadWeather();
  }, [lat, lng, locLoading]);

  const activeDisaster = broadcasts.find(b => b.severity === 'Danger' || b.severity === 'Warning');

  const menuItems = [
    { id: 'map', label: 'Map & Routes', icon: Map, color: 'bg-primary/10 text-primary', path: '/civilian/map' },
    { id: 'chat', label: 'Sahara AI', icon: MessageSquare, color: 'bg-primary/10 text-primary', path: '/civilian/chat' },
    { id: 'news', label: 'Live Updates', icon: Newspaper, color: 'bg-primary/10 text-primary', path: '/civilian/news' },
    { id: 'upload', label: 'Report Damage', icon: Camera, color: 'bg-primary/10 text-primary', path: '/civilian/upload' },
    { id: 'sos', label: 'SOS Emergency', icon: ShieldAlert, color: 'bg-danger text-white', path: '/civilian/sos', isSpecial: true },
    { id: 'resources', label: 'Resources', icon: Package, color: 'bg-primary/10 text-primary', path: '/civilian/resources' },
  ];

  return (
    <div className="min-h-screen bg-bg pb-24">
      {/* Header */}
      <header className="bg-white px-6 pt-12 pb-6 flex justify-between items-end border-b border-border sticky top-0 z-[900]">
        <div>
          <p className="text-text-secondary font-bold text-[10px] uppercase tracking-widest mb-1">WELCOME BACK</p>
          <h1 className="font-display text-2xl font-black text-text">Namaste, {profile?.name?.split(' ')[0] || 'User'} 🙏</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-2 bg-surface rounded-xl border border-border">
            <Bell size={24} className="text-text" />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-danger rounded-full border-2 border-white"></span>
          </button>
          <UserMenu />
        </div>
      </header>

      <main className="px-6 pt-6 space-y-6">
        {/* Disaster Alert Banner */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          onClick={() => navigate('/civilian/map')}
          className={clsx(
            "p-5 rounded-[32px] border flex items-start gap-4 cursor-pointer relative overflow-hidden",
            activeDisaster ? "bg-warning/10 border-warning/30" : "bg-safe/10 border-safe/30"
          )}
        >
          <div className={clsx(
            "w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm",
            activeDisaster ? "bg-warning text-white" : "bg-safe text-white"
          )}>
            {activeDisaster ? <AlertTriangle size={24} /> : <CheckCircle size={24} />}
          </div>
          <div className="flex-1">
            <h3 className={clsx("font-black text-lg uppercase tracking-tight", activeDisaster ? "text-warning" : "text-safe")}>
              {activeDisaster ? "Active Alert" : "All Clear"}
            </h3>
            <p className="text-text font-bold text-sm leading-snug mt-1">
              {activeDisaster 
                ? `${activeDisaster.message.substring(0, 80)}...` 
                : "No major disasters reported in your area. Stay safe."}
            </p>
            {activeDisaster && (
              <div className="mt-3 flex items-center text-primary font-black text-xs uppercase tracking-widest">
                VIEW ON MAP <ChevronRight size={14} className="ml-1" />
              </div>
            )}
          </div>
        </motion.div>

        {/* Weather Widget */}
        <motion.div
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.1 }}
           onClick={() => navigate('/civilian/news')}
           className="bg-surface p-5 rounded-[32px] border border-border flex items-center justify-between cursor-pointer active:scale-98 transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-2xl">
              {weather ? getWeatherIcon(weather.conditionCode) : <Cloud className="text-primary animate-pulse" size={24} />}
            </div>
            <div>
              <p className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] mb-0.5">
                {weather?.locationName || (locLoading ? 'Locating...' : 'Weather')}
              </p>
              <p className="text-lg font-black text-text">
                {weather ? `${Math.round(weather.temp)}°C` : '--°C'} 
                <span className="text-text-secondary font-bold text-sm ml-2">
                  {weather ? getWeatherCondition(weather.conditionCode) : '...'}
                </span>
              </p>
            </div>
          </div>
          <div className="text-right">
             <div className="flex items-center gap-1 text-primary font-black text-[10px] uppercase tracking-widest">
               Details <ChevronRight size={12} />
             </div>
             {weather && (
               <p className="text-[10px] font-bold text-text-secondary mt-1 flex items-center justify-end gap-1">
                 <Wind size={10} /> {weather.wind} km/h
               </p>
             )}
          </div>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-2 gap-4">
          {menuItems.map((item, idx) => (
            <motion.button
              key={item.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => navigate(item.path)}
              className={clsx(
                "h-36 rounded-[32px] p-5 flex flex-col items-start justify-between text-left transition-all active:scale-95 border border-border group",
                item.isSpecial ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-surface text-text"
              )}
            >
              <div className={clsx(
                "p-3 rounded-2xl group-hover:scale-110 transition-transform shadow-sm",
                item.isSpecial ? "bg-white text-primary" : `${item.color}`
              )}>
                <item.icon size={20} />
              </div>
              <span className="font-black text-sm leading-tight uppercase tracking-wider">
                {item.label.split(' ')[0]}<br/>{item.label.split(' ').slice(1).join(' ')}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Latest Broadcast */}
        <section className="pb-4">
          <div className="flex justify-between items-center mb-5 mt-2">
            <h2 className="font-display text-xl font-black text-text uppercase tracking-tight">Broadcasts</h2>
            <button onClick={() => navigate('/civilian/news')} className="text-primary font-black text-[10px] uppercase tracking-widest border-b-2 border-primary/20 pb-0.5">See All</button>
          </div>
          <div className="space-y-4">
            {broadcasts.length > 0 ? (
              broadcasts.slice(0, 2).map((b, i) => (
                <div key={b.id} className="bg-surface p-6 rounded-[32px] border border-border flex gap-4">
                   <div className="flex-1">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">{b.area || "GENERAL"}</span>
                        <span className="text-[10px] font-bold text-text-secondary/50">{formatRelativeDate(b.timestamp)}</span>
                      </div>
                      <p className="text-base font-bold text-text leading-tight mb-4">{b.message}</p>
                      <StatusBadge status={b.severity} />
                   </div>
                </div>
              ))
            ) : (
              // Fallback Demo
              <div className="bg-surface p-6 rounded-[32px] border border-border flex gap-4 opacity-50">
                 <div className="flex-1">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">DEMO ALERT</span>
                    </div>
                    <p className="text-base font-bold text-text leading-tight mb-4">Flood Watch — Heavy rainfall expected. Stay indoors.</p>
                    <StatusBadge status="Warning" />
                 </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

// Internal clsx simple version
const clsx = (...classes: any[]) => classes.filter(Boolean).join(' ');
