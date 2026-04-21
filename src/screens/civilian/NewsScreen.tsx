import React, { useState, useEffect } from 'react';
import { Newspaper, CloudRain, AlertTriangle, Package, ExternalLink, RefreshCw, ChevronRight, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchNews, NewsArticle } from '../../services/newsService';
import { fetchWeather, WeatherData, getWeatherIcon, getWeatherCondition } from '../../services/weatherService';
import { subscribeToBroadcasts, subscribeToResources } from '../../services/firestoreService';
import { useLocation } from '../../hooks/useLocation';
import { StatusBadge } from '../../components/common/StatusBadge';
import { SkeletonGrid } from '../../components/common/SkeletonCard';
import { clsx } from 'clsx';

type Tab = 'alerts' | 'weather' | 'news' | 'supplies';

export const NewsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('alerts');
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [broadcasts, setBroadcasts] = useState<any[]>([]);
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    loadData();
    const unsubB = subscribeToBroadcasts(setBroadcasts);
    const unsubR = subscribeToResources(setResources);
    return () => { unsubB(); unsubR(); };
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [newsData, weatherData] = await Promise.all([
        fetchNews(),
        fetchWeather(location.lat, location.lng)
      ]);
      setNews(newsData);
      setWeather(weatherData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'alerts', label: 'Alerts', icon: AlertTriangle },
    { id: 'weather', label: 'Weather', icon: CloudRain },
    { id: 'news', label: 'India News', icon: Newspaper },
    { id: 'supplies', label: 'Supplies', icon: Package },
  ];

  return (
    <div className="min-h-screen bg-bg pb-24">
      {/* Header */}
      <header className="bg-surface px-6 pt-12 pb-2 border-b border-border sticky top-0 z-[1001]">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-display text-2xl font-black text-text">Updates Center</h1>
          <button onClick={loadData} className="p-2 text-text-secondary"><RefreshCw size={20} className={loading ? "animate-spin" : ""} /></button>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={clsx(
                "flex items-center gap-2 px-4 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest whitespace-nowrap transition-all border",
                activeTab === tab.id 
                  ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" 
                  : "bg-surface border-border text-text-secondary"
              )}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      <main className="p-6">
        <AnimatePresence mode="wait">
          {loading ? (
            <SkeletonGrid count={6} />
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {/* ALERTS TAB */}
              {activeTab === 'alerts' && (
                broadcasts.length > 0 ? (
                  broadcasts.map(b => (
                    <div key={b.id} className="bg-surface p-6 rounded-[32px] border border-border shadow-sm">
                      <div className="flex justify-between items-start mb-4">
                        <StatusBadge status={b.severity} />
                        <span className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">{b.area}</span>
                      </div>
                      <p className="text-lg font-bold text-text mb-4 leading-tight">{b.message}</p>
                      <div className="text-[10px] font-black text-text-secondary/50 uppercase tracking-widest">Issued: {b.timestamp?.toDate().toLocaleString()}</div>
                    </div>
                  ))
                ) : (
                  <div className="space-y-4">
                    <div className="bg-warning/5 p-6 rounded-[32px] border border-warning/30">
                       <StatusBadge status="Warning" label="Flood Watch" />
                       <p className="text-lg font-bold text-text mt-4">Coastal Maharashtra: Heavy rainfall expected. Avoid low-lying areas.</p>
                       <p className="text-[10px] text-text-secondary mt-3 font-black uppercase tracking-widest">Issued 2 hours ago • DEMO</p>
                    </div>
                    <div className="bg-safe/5 p-6 rounded-[32px] border border-safe/30">
                       <StatusBadge status="Safe" label="All Clear" />
                       <p className="text-lg font-bold text-text mt-4">Mumbai North: Relief camps have been stocked with water and food.</p>
                       <p className="text-[10px] text-text-secondary mt-3 font-black uppercase tracking-widest">Issued 5 hours ago • DEMO</p>
                    </div>
                  </div>
                )
              )}

              {/* WEATHER TAB */}
              {activeTab === 'weather' && weather && (
                <div className="space-y-6">
                  {/* Current Weather Card */}
                  <div className="bg-primary p-8 rounded-[40px] text-white shadow-xl shadow-primary/20 relative overflow-hidden">
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-6">
                         <div>
                            <h3 className="text-xs font-black opacity-80 uppercase tracking-[0.25em] flex items-center gap-2">
                              <MapPin size={12} /> My Location
                            </h3>
                            <p className="text-7xl font-black mt-2 tracking-tighter leading-none">{Math.round(weather.temp)}°</p>
                         </div>
                         <div className="text-7xl drop-shadow-lg">{getWeatherIcon(weather.conditionCode)}</div>
                      </div>
                      <div className="flex justify-between items-end border-t border-white/20 pt-6">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">Condition</p>
                          <p className="text-xl font-bold">{getWeatherCondition(weather.conditionCode)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">Wind Speed</p>
                          <p className="text-xl font-bold">{weather.wind} km/h</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Forecast */}
                  <h3 className="font-display text-2xl font-black text-text px-1 uppercase tracking-tight">5-Day Forecast</h3>
                  <div className="space-y-3">
                    {weather.forecast.map((f, i) => (
                      <div key={i} className="bg-surface p-5 rounded-[32px] border border-border flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-4">
                           <div className="text-3xl">{getIcon(f.code)}</div>
                           <div>
                              <p className="text-base font-bold text-text">{new Date(f.date).toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'short' })}</p>
                              <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest">{getWeatherCondition(f.code)}</p>
                           </div>
                        </div>
                        <div className="text-right">
                           <p className="text-lg font-black text-text">{Math.round(f.max)}° <span className="text-text-secondary/50 font-bold ml-1">{Math.round(f.min)}°</span></p>
                           {f.rain > 0 && <p className="text-[10px] font-black text-primary uppercase tracking-widest mt-1">{f.rain}mm rain</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* NEWS TAB */}
              {activeTab === 'news' && (
                <div className="space-y-4">
                   {news.map((item, i) => (
                    <a 
                      key={i} 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-surface p-6 rounded-[32px] border border-border flex flex-col shadow-sm active:scale-98 transition-all"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] bg-primary/10 px-3 py-1 rounded-full">{item.source_id}</span>
                        <span className="text-[10px] font-bold text-text-secondary/50 capitalize">{new Date(item.pubDate).toLocaleDateString()}</span>
                      </div>
                      <h3 className="text-lg font-bold text-text mb-3 leading-tight tracking-tight">{item.title}</h3>
                      <p className="text-sm text-text-secondary mb-4 leading-relaxed line-clamp-3 font-medium">{item.description}</p>
                      <div className="flex items-center gap-1 text-[10px] font-black text-primary uppercase tracking-widest mt-auto border-t border-border pt-4">
                        READ FULL REPORT <ExternalLink size={10} className="ml-1" />
                      </div>
                    </a>
                   ))}
                </div>
              )}

              {/* SUPPLIES TAB */}
              {activeTab === 'supplies' && (
                <div className="space-y-4">
                  {resources.length > 0 ? (
                    resources.map(r => (
                      <div key={r.id} className="bg-surface p-6 rounded-[32px] border border-border shadow-sm flex items-center gap-4">
                        <div className="w-14 h-14 bg-bg rounded-2xl flex items-center justify-center flex-shrink-0 border border-border">
                          <Package className="text-text-secondary" size={24} />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <h4 className="font-black text-text text-lg tracking-tight">{r.name || r.id}</h4>
                            <StatusBadge status={r.status || 'Available'} label={r.status} />
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-xs font-bold text-text-secondary">{r.quantity} {r.unit} available</p>
                            <span className="text-[10px] font-black text-text-secondary bg-bg px-2 py-0.5 rounded-full uppercase tracking-widest border border-border">{r.zone || "HQ"}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="space-y-4">
                      {['Food Packets', 'Water Cans', 'Medical Kits', 'Rescue Teams'].map((name, i) => (
                         <div key={i} className="bg-surface p-6 rounded-[32px] border border-border shadow-sm flex items-center gap-4 opacity-50">
                            <div className="w-14 h-14 bg-bg rounded-2xl flex items-center justify-center flex-shrink-0 border border-border">
                              <Package className="text-text-secondary" size={24} />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-center mb-1">
                                <h4 className="font-black text-text text-lg tracking-tight">{name}</h4>
                                <StatusBadge status={i === 2 ? "Warning" : "Safe"} label={i === 2 ? "Low Stock" : "Available"} />
                              </div>
                              <div className="flex justify-between items-center">
                                <p className="text-xs font-bold text-text-secondary">{[500, 200, 50, 8][i]} units available</p>
                                <span className="text-[10px] font-black text-text-secondary bg-bg px-2 py-0.5 rounded-full uppercase tracking-widest border border-border">Bandra Camp</span>
                              </div>
                            </div>
                         </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

const getIcon = getWeatherIcon;
