import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Users, ShieldAlert, ChevronRight, Phone, Loader2, LocateFixed } from 'lucide-react';
import { subscribeToCivilianLocations, subscribeToSOSAlerts, markSOSHelped } from '../../services/firestoreService';
import { formatRelativeDate } from '../../utils/formatters';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

// Fix Leaflet icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const GovMapScreen: React.FC = () => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pinsLayerRef = useRef<L.LayerGroup | null>(null);
  const userMarkerRef = useRef<L.CircleMarker | null>(null);
  const accuracyCircleRef = useRef<L.Circle | null>(null);

  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number}>({ lat: 20.5937, lng: 78.9629 });
  const [locationLoading, setLocationLoading] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [civilians, setCivilians] = useState<any[]>([]);
  const [sosAlerts, setSosAlerts] = useState<any[]>([]);
  const [selectedPin, setSelectedPin] = useState<any>(null);
  const [filter, setFilter] = useState<'all' | 'sos' | 'normal'>('all');
  const [hasLoadedMap, setHasLoadedMap] = useState(false);
  const [needsInteraction, setNeedsInteraction] = useState(true);

  // Initialize Map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    mapRef.current = L.map(containerRef.current, {
      center: [currentLocation.lat, currentLocation.lng],
      zoom: 12,
      zoomControl: false,
      ...({ tap: false } as any),
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      opacity: 0.8,
    }).addTo(mapRef.current);

    pinsLayerRef.current = L.layerGroup().addTo(mapRef.current);
    setHasLoadedMap(true);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const locateUser = () => {
    setNeedsInteraction(false);
    setLocationLoading(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
        setLocationLoading(false);
        
        if (!mapRef.current) return;
        
        mapRef.current.flyTo([latitude, longitude], 13, {
          animate: true,
          duration: 1.5
        });

        if (userMarkerRef.current) userMarkerRef.current.remove();
        if (accuracyCircleRef.current) accuracyCircleRef.current.remove();

        userMarkerRef.current = L.circleMarker([latitude, longitude], {
          radius: 10,
          fillColor: '#EA4335',
          fillOpacity: 1,
          color: 'white',
          weight: 4,
        }).addTo(mapRef.current).bindPopup('Command Center (You)');

        accuracyCircleRef.current = L.circle([latitude, longitude], {
          radius: accuracy,
          fillColor: '#EA4335',
          fillOpacity: 0.1,
          color: '#EA4335',
          weight: 1,
        }).addTo(mapRef.current);
      },
      (error) => {
        setLocationLoading(false);
        const errorMessages: Record<number, string> = {
          1: 'Location access denied. Please enable GPS in your browser settings.',
          2: 'Location unavailable. Please check your GPS signal.',
          3: 'Location request timed out. Please try again.'
        };
        setLocationError(errorMessages[error.code] || 'Could not get location.');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };

  useEffect(() => {
    if (!needsInteraction) {
      locateUser();
    }
  }, [needsInteraction]);

  useEffect(() => {
    if (needsInteraction) return;

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
        
        if (userMarkerRef.current && mapRef.current) {
          userMarkerRef.current.setLatLng([latitude, longitude]);
        }
        if (accuracyCircleRef.current && mapRef.current) {
          accuracyCircleRef.current.setLatLng([latitude, longitude]);
          accuracyCircleRef.current.setRadius(accuracy);
        }
      },
      null,
      { enableHighAccuracy: true, maximumAge: 5000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [needsInteraction]);

  useEffect(() => {
    const unsubCivs = subscribeToCivilianLocations(setCivilians);
    const unsubSOS = subscribeToSOSAlerts(setSosAlerts);
    return () => { unsubCivs(); unsubSOS(); };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !pinsLayerRef.current) return;

    pinsLayerRef.current.clearLayers();

    const sosUids = new Set(sosAlerts.map(s => s.uid));
    const displayCivs = civilians
      .map(c => ({
        ...c,
        isSOS: sosUids.has(c.id),
        sosData: sosAlerts.find(s => s.uid === c.id)
      }))
      .filter(c => {
        if (filter === 'sos') return c.isSOS;
        if (filter === 'normal') return !c.isSOS;
        return true;
      });

    displayCivs.forEach(civ => {
      if (civ.isSOS) {
        L.circleMarker([civ.lat, civ.lng], {
          radius: 15,
          fillColor: '#EA4335',
          fillOpacity: 0.3,
          color: '#EA4335',
          weight: 2,
          className: 'animate-pulse'
        }).addTo(pinsLayerRef.current!);
      }

      const marker = L.marker([civ.lat, civ.lng]);
      
      const popupDiv = document.createElement('div');
      popupDiv.className = 'p-1 min-w-[150px]';
      popupDiv.innerHTML = `
        <div class="flex items-center gap-2 mb-1">
          <div class="w-2 h-2 rounded-full ${civ.isSOS ? 'bg-danger animate-pulse' : 'bg-safe'}"></div>
          <h3 class="font-bold text-sm">${civ.name}</h3>
        </div>
        <p class="text-[10px] font-bold text-secondary mb-2 uppercase">Last Update: ${formatRelativeDate(civ.lastUpdate)}</p>
        ${civ.isSOS ? `
          <button id="resolve-${civ.id}" class="bg-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-lg w-full">
            MARK HELPED
          </button>
        ` : ''}
      `;

      marker.bindPopup(popupDiv);
      marker.on('popupopen', () => {
        if (civ.isSOS) {
          const btn = document.getElementById(`resolve-${civ.id}`);
          if (btn) {
            btn.onclick = () => {
              markSOSHelped(civ.sosData.id);
              marker.closePopup();
            };
          }
        }
      });

      marker.on('click', () => setSelectedPin(civ));
      
      if (pinsLayerRef.current) {
        marker.addTo(pinsLayerRef.current);
      }
    });
  }, [civilians, sosAlerts, filter, hasLoadedMap]);

  return (
    <div className="h-screen bg-bg flex flex-col pb-16 overflow-hidden">
      <header className="bg-surface p-4 border-b border-border z-[1000] flex justify-between items-center shadow-sm">
        <h1 className="font-display text-xl font-black text-text">GPS Ops Terminal</h1>
        <div className="flex gap-2">
           {['all', 'sos', 'normal'].map(f => (
             <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={clsx(
                "px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all",
                filter === f ? "bg-danger text-white" : "bg-bg text-text-secondary"
              )}
             >
                {f}
             </button>
           ))}
        </div>
      </header>

      <div className="relative flex-1">
        <div ref={containerRef} className="w-full h-full min-h-[300px]" style={{ height: '55vh' }} />
        
        {needsInteraction && (
          <div 
            onClick={locateUser}
            className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-[2000] cursor-pointer backdrop-blur-md"
          >
            <div className="w-20 h-20 bg-danger/10 border-2 border-danger rounded-full flex items-center justify-center animate-pulse shadow-2xl mb-6">
              <LocateFixed size={40} className="text-danger" />
            </div>
            <p className="text-white font-black text-xl px-12 text-center leading-tight">OFFICER: TAP TO ACTIVATE OPS TRACKING</p>
            <p className="text-danger/60 text-[10px] font-black mt-4 uppercase tracking-[0.2em]">High precision satellite link required</p>
          </div>
        )}

        {locationLoading && !needsInteraction && (
          <div className="absolute inset-0 bg-surface/80 backdrop-blur-sm flex flex-col items-center justify-center z-[1001]">
            <Loader2 className="w-10 h-10 text-danger animate-spin mb-4" />
            <p className="font-black text-text-secondary text-xs uppercase tracking-widest">Acquiring Command Coordinates...</p>
          </div>
        )}

        <div className="absolute top-4 left-4 z-[1000] space-y-2">
          <div className={clsx(
            "flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/90 backdrop-blur-md shadow-lg border border-border font-bold text-[10px] uppercase",
            locationError ? "text-danger" : "text-safe"
          )}>
            <div className={clsx("w-2 h-2 rounded-full", locationError ? "bg-danger" : "bg-safe animate-pulse")} />
            {locationError ? "SATELLITE ERROR" : "OPS CENTER ACTIVE"}
          </div>
          
           {!locationError && (
             <>
                <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-border flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-danger animate-pulse" />
                  <span className="text-[10px] font-black text-text uppercase tracking-widest">Active SOS ({sosAlerts.length})</span>
                </div>
                <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-border flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-safe" />
                  <span className="text-[10px] font-black text-text uppercase tracking-widest">Connected Civilians ({civilians.length})</span>
                </div>
             </>
           )}
        </div>

        <button 
          onClick={locateUser} 
          className="absolute bottom-4 right-4 z-[1000] w-14 h-14 bg-danger text-white rounded-full flex items-center justify-center shadow-2xl active:scale-90 transition-all border-4 border-white"
        >
          <LocateFixed size={28} />
        </button>
      </div>

      <AnimatePresence>
        {selectedPin && (
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            className="fixed bottom-16 left-0 right-0 bg-white p-6 rounded-t-[40px] shadow-2xl z-[1001] border-t border-border"
          >
             <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                   <div className={clsx(
                     "w-14 h-14 rounded-2xl flex items-center justify-center",
                     selectedPin.isSOS ? "bg-danger text-white shadow-lg shadow-danger/20" : "bg-primary/10 text-primary"
                   )}>
                      {selectedPin.isSOS ? <ShieldAlert size={28} /> : <Users size={28} />}
                   </div>
                   <div>
                      <h3 className="text-xl font-black text-text">{selectedPin.name}</h3>
                      <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Geofence: {selectedPin.lat?.toFixed(4)}, {selectedPin.lng?.toFixed(4)}</p>
                   </div>
                </div>
                <button onClick={() => setSelectedPin(null)} className="p-2 bg-bg rounded-xl text-text-secondary">
                  <ChevronRight size={24} className="rotate-90" />
                </button>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <button className="h-14 rounded-2xl bg-bg text-text-secondary font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                   <Phone size={18} /> Call Contact
                </button>
                {selectedPin.isSOS ? (
                  <button 
                    onClick={() => markSOSHelped(selectedPin.sosData.id)}
                    className="h-14 rounded-2xl bg-primary text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                  >
                    RESOLVE ALERT
                  </button>
                ) : (
                  <button className="h-14 rounded-2xl bg-primary text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                    Send Check-in
                  </button>
                )}
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GovMapScreen;
