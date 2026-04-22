import React, { createContext, useContext, useState, useEffect } from 'react';

export interface LocationState {
  lat: number;
  lng: number;
  loading: boolean;
  error: string | null;
}

const LocationContext = createContext<LocationState | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<LocationState>(() => {
    const saved = localStorage.getItem('sahara_last_location');
    if (saved) {
      const { lat, lng } = JSON.parse(saved);
      return { lat, lng, loading: true, error: null };
    }
    return {
      lat: 20.5937, // Default center of India
      lng: 78.9629,
      loading: true,
      error: null,
    };
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState(prev => ({ ...prev, loading: false, error: 'Geolocation not supported' }));
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        setState({
          lat,
          lng,
          loading: false,
          error: null,
        });
        localStorage.setItem('sahara_last_location', JSON.stringify({ lat, lng, timestamp: Date.now() }));
      },
      (err) => {
        setState(prev => ({ 
          ...prev, 
          loading: false, 
          error: err.message === 'User denied Geolocation' ? 'Enable location to find nearest safe zones' : err.message
        }));
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <LocationContext.Provider value={state}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocationContext must be used within a LocationProvider');
  }
  return context;
};
