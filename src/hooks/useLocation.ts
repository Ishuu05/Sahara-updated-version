import { useState, useEffect } from 'react';

export interface LocationState {
  lat: number;
  lng: number;
  loading: boolean;
  error: string | null;
}

export function useLocation() {
  const [state, setState] = useState<LocationState>({
    lat: 20.5937, // Default center of India
    lng: 78.9629,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState(prev => ({ ...prev, loading: false, error: 'Geolocation not supported' }));
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setState({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          loading: false,
          error: null,
        });
      },
      (err) => {
        setState(prev => ({ 
          ...prev, 
          loading: false, 
          error: err.message === 'User denied Geolocation' ? 'Enable location to find nearest safe zones' : err.message
        }));
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return state;
}
