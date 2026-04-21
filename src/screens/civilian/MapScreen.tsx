import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Navigation, Hospital, Tent, Shield, Loader2, Compass, Layers, ChevronRight, MapPin, LocateFixed } from 'lucide-react';
import { SAFE_ZONES, SafeZone } from '../../data/safeZones';
import { getDistance, formatDistance, estimateWalkTime } from '../../utils/haversine';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

// Fix Leaflet icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const MapScreen: React.FC = () => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const zonesLayerRef = useRef<L.LayerGroup | null>(null);
  const routeLayerRef = useRef<L.Polyline | null>(null);
  const userMarkerRef = useRef<L.CircleMarker | null>(null);
  const accuracyCircleRef = useRef<L.Circle | null>(null);

  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number}>({ lat: 20.5937, lng: 78.9629 });
  const [locationLoading, setLocationLoading] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'hospital' | 'relief' | 'police'>('all');
  const [selectedZone, setSelectedZone] = useState<SafeZone | null>(null);
  const [route, setRoute] = useState<[number, number][] | null>(null);
  const [loadingRoute, setLoadingRoute] = useState(false);
  const [hasLoadedMap, setHasLoadedMap] = useState(false);
  const [needsInteraction, setNeedsInteraction] = useState(true);

  // Initialize Map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    mapRef.current = L.map(containerRef.current, {
      center: [currentLocation.lat, currentLocation.lng],
      zoom: 5,
      zoomControl: false,
      ...({ tap: false } as any),
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(mapRef.current);

    zonesLayerRef.current = L.layerGroup().addTo(mapRef.current);
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
        
        // Fly to location smoothly
        mapRef.current.flyTo([latitude, longitude], 15, {
          animate: true,
          duration: 1.5
        });

        // Remove old location marker if exists
        if (userMarkerRef.current) {
          userMarkerRef.current.remove();
        }
        if (accuracyCircleRef.current) {
          accuracyCircleRef.current.remove();
        }

        // Blue pulsing circle for user location
        userMarkerRef.current = L.circleMarker([latitude, longitude], {
          radius: 10,
          fillColor: '#1A73E8',
          color: '#ffffff',
          weight: 3,
          fillOpacity: 1,
        }).addTo(mapRef.current).bindPopup('📍 You are here').openPopup();

        // Accuracy circle
        accuracyCircleRef.current = L.circle([latitude, longitude], {
          radius: accuracy,
          fillColor: '#1A73E8',
          fillOpacity: 0.1,
          color: '#1A73E8',
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
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      }
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

  // Update Safe Zone Markers based on filter
  useEffect(() => {
    if (!mapRef.current || !zonesLayerRef.current) return;

    zonesLayerRef.current.clearLayers();

    const filtered = SAFE_ZONES.filter(z => filter === 'all' || z.type === filter);

    filtered.forEach(zone => {
      const emoji = zone.type === 'hospital' ? '🏥' : zone.type === 'relief' ? '🏕️' : '👮';
      const marker = L.marker([zone.lat, zone.lng], {
        title: zone.name,
      });

      const popupContent = document.createElement('div');
      popupContent.className = 'p-1 min-w-[150px]';
      popupContent.innerHTML = `
        <h3 class="font-bold text-sm mb-1">${emoji} ${zone.name}</h3>
        <p class="text-xs text-secondary mb-2">${zone.city}</p>
        <button id="nav-${zone.id}" class="bg-primary text-white px-3 py-1.5 rounded-lg text-xs font-bold w-full">
          NAVIGATE
        </button>
      `;

      marker.bindPopup(popupContent);
      
      marker.on('popupopen', () => {
        const btn = document.getElementById(`nav-${zone.id}`);
        if (btn) {
          btn.onclick = () => {
            handleNavigate(zone);
            marker.closePopup();
          };
        }
      });

      marker.on('click', () => setSelectedZone(zone));

      if (zonesLayerRef.current) {
        marker.addTo(zonesLayerRef.current);
      }
    });
  }, [filter, hasLoadedMap]);

  // Update Route Polyline
  useEffect(() => {
    if (!mapRef.current) return;

    if (routeLayerRef.current) {
      mapRef.current.removeLayer(routeLayerRef.current);
      routeLayerRef.current = null;
    }

    if (route && route.length > 0) {
      routeLayerRef.current = L.polyline(route, {
        color: '#1A73E8',
        weight: 5,
        opacity: 0.7,
        dashArray: '10, 10',
      }).addTo(mapRef.current);

      mapRef.current.fitBounds(routeLayerRef.current.getBounds(), { padding: [50, 50] });
    }
  }, [route]);

  const filteredZones = SAFE_ZONES
    .filter(z => filter === 'all' || z.type === filter)
    .map(z => ({
      ...z,
      distance: getDistance(currentLocation.lat, currentLocation.lng, z.lat, z.lng)
    }))
    .sort((a, b) => a.distance - b.distance);

  const handleNavigate = async (zone: SafeZone) => {
    setSelectedZone(zone);
    setLoadingRoute(true);
    setRoute(null);

    try {
      const url = `https://router.project-osrm.org/route/v1/foot/${currentLocation.lng},${currentLocation.lat};${zone.lng},${zone.lat}?overview=full&geometries=geojson`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.routes && data.routes[0]) {
        const coords = data.routes[0].geometry.coordinates.map((c: number[]) => [c[1], c[0]] as [number, number]);
        setRoute(coords);
      } else {
        setRoute([[currentLocation.lat, currentLocation.lng], [zone.lat, zone.lng]]);
      }
    } catch (err) {
      console.warn("OSRM Router failed, using straight line:", err);
      setRoute([[currentLocation.lat, currentLocation.lng], [zone.lat, zone.lng]]);
    } finally {
      setLoadingRoute(false);
    }
  };

  const getIconElement = (type: string) => {
    switch (type) {
      case 'hospital': return <Hospital size={16} />;
      case 'relief': return <Tent size={16} />;
      case 'police': return <Shield size={16} />;
      default: return <MapPin size={16} />;
    }
  };

  return (
    <div className="h-screen bg-bg flex flex-col pb-16 overflow-hidden">
      <div className="bg-surface p-4 border-b border-border z-[1000] flex justify-between items-center shadow-sm">
        <h1 className="font-display text-xl font-black text-text">Safe Zones</h1>
        <div className="flex gap-2">
          {['all', 'hospital', 'relief', 'police'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={clsx(
                "px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all",
                filter === f ? "bg-primary text-white" : "bg-bg text-text-secondary"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="relative flex-1">
        <div ref={containerRef} className="w-full h-full min-h-[300px]" style={{ height: '55vh' }} />
        
        {needsInteraction && (
          <div 
            onClick={locateUser}
            className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-[2000] cursor-pointer backdrop-blur-sm"
          >
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center animate-pulse shadow-2xl mb-6">
              <LocateFixed size={40} className="text-primary" />
            </div>
            <p className="text-white font-black text-xl px-12 text-center leading-tight">TAP TO ENABLE LIVE GPS LOCATION</p>
            <p className="text-white/60 text-xs font-bold mt-4 uppercase tracking-widest">Required for real-time safety tracking</p>
          </div>
        )}

        {locationLoading && !needsInteraction && (
          <div className="absolute inset-0 bg-surface/80 backdrop-blur-sm flex flex-col items-center justify-center z-[1001]">
            <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
            <p className="font-black text-text-secondary text-xs uppercase tracking-widest">Awaiting GPS Signal...</p>
          </div>
        )}

        <div className="absolute top-4 left-4 z-[1000]">
          <div className={clsx(
            "flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/90 backdrop-blur-md shadow-lg border border-border font-bold text-[10px] uppercase",
            locationError ? "text-danger" : "text-safe"
          )}>
            <div className={clsx("w-2 h-2 rounded-full", locationError ? "bg-danger" : "bg-safe animate-pulse")} />
            {locationError ? "GPS ERROR" : "LIVE LOCATION"}
          </div>
          {locationError && (
             <div className="mt-2 bg-danger text-white text-[9px] font-black p-2 rounded-xl max-w-xs shadow-lg uppercase leading-tight">
               {locationError}
             </div>
          )}
        </div>

        <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
           <button 
            onClick={() => {
              if (mapRef.current) mapRef.current.flyTo([currentLocation.lat, currentLocation.lng], 15);
            }}
            className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg text-text active:scale-95 border border-border"
           >
             <Compass size={24} />
           </button>
        </div>

        <button 
          onClick={locateUser} 
          className="absolute bottom-4 right-4 z-[1000] w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl active:scale-90 transition-all border-4 border-white"
        >
          <LocateFixed size={28} />
        </button>
      </div>

      <AnimatePresence>
        <motion.div 
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          className="bg-white rounded-t-[40px] shadow-[0_-10px_30px_rgba(0,0,0,0.1)] p-6 z-[1001] max-h-[45vh] overflow-y-auto"
        >
          <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6"></div>
          
          <div className="flex justify-between items-start mb-6">
            <h2 className="font-display text-xl font-bold">Nearest to You</h2>
            <div className="flex items-center gap-1 text-[10px] font-black text-text-secondary uppercase">
               Showing {filteredZones.length}
            </div>
          </div>

          <div className="space-y-4">
            {filteredZones.slice(0, 5).map(zone => (
              <div 
                key={zone.id} 
                onClick={() => handleNavigate(zone)}
                className={clsx(
                  "p-4 rounded-3xl border transition-all flex items-center gap-4 active:scale-98 relative overflow-hidden",
                  selectedZone?.id === zone.id ? "border-primary bg-primary/5 shadow-md" : "border-border bg-white"
                )}
              >
                <div className={clsx(
                  "w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0",
                  zone.type === 'hospital' ? "bg-red-100 text-danger" : 
                  zone.type === 'relief' ? "bg-green-100 text-safe" : "bg-blue-100 text-primary"
                )}>
                  {getIconElement(zone.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-text mb-0.5">{zone.name}</h4>
                    <span className="text-xs font-black text-primary">{formatDistance(zone.distance)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-bold text-text-secondary">
                    <span className="flex items-center gap-1"><Navigation size={10} /> {estimateWalkTime(zone.distance)} walk</span>
                    <span>• {zone.city}</span>
                  </div>
                </div>
                <button className="p-2 bg-bg rounded-xl text-text hover:text-primary">
                   <ChevronRight size={20} />
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MapScreen;
