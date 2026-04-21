import React, { useState, useEffect } from 'react';
import { ShieldAlert, MapPin, Phone, Home, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from '../../hooks/useLocation';
import { useAuthContext } from '../../context/AuthContext';
import { sendSOS } from '../../services/firestoreService';
import { clsx } from 'clsx';

export const SOSScreen: React.FC = () => {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const location = useLocation();
  const { profile, user } = useAuthContext();
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHolding && progress < 100) {
      interval = setInterval(() => {
        setProgress(prev => Math.min(prev + 2, 100));
      }, 30);
    } else if (!isHolding) {
      setProgress(0);
    }
    
    if (progress === 100 && !sent && !loading) {
      triggerSOS();
    }

    return () => clearInterval(interval);
  }, [isHolding, progress]);

  const triggerSOS = async () => {
    setLoading(true);
    try {
      if (user && profile) {
        await sendSOS(user.uid, profile.name || 'Anonymous', location.lat, location.lng);
      }
      setSent(true);
      if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
      window.open('tel:112');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const emergencyNumbers = [
    { label: 'Police', value: '100', color: 'bg-blue-600' },
    { label: 'Ambulance', value: '108', color: 'bg-safe' },
    { label: 'Fire', value: '101', color: 'bg-orange-600' },
    { label: 'Disaster', value: '1078', color: 'bg-purple-600' },
  ];

  return (
    <div className="h-screen bg-bg flex flex-col pt-12 px-6 pb-24 overflow-hidden relative">
      <div className="flex justify-between items-start text-text mb-12">
        <div>
           <h1 className="font-display text-4xl font-black italic tracking-tighter text-primary">SOS PULSE</h1>
           <p className="text-xs font-black text-text-secondary uppercase tracking-[0.2em] mt-1">EMERGENCY COMMAND</p>
        </div>
        <div className="bg-surface px-3 py-2 rounded-2xl text-[10px] font-black border border-border">
          {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative">
        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.div 
              key="button"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              className="flex flex-col items-center"
            >
               <div className="relative w-64 h-64 flex items-center justify-center">
                  {/* Outer Rings */}
                  <div className="absolute inset-0 bg-danger/10 rounded-full animate-ping [animation-duration:3s]"></div>
                  <div className="absolute inset-4 bg-danger/20 rounded-full animate-ping [animation-duration:2s]"></div>
                  
                  {/* Progress Ring */}
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle
                      cx="128"
                      cy="128"
                      r="120"
                      fill="none"
                      stroke="#E0E0E0"
                      strokeWidth="8"
                    />
                    <circle
                      cx="128"
                      cy="128"
                      r="120"
                      fill="none"
                      stroke="#D32F2F"
                      strokeWidth="8"
                      strokeDasharray={754}
                      strokeDashoffset={754 - (754 * progress) / 100}
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* Main Button */}
                  <button
                    onMouseDown={() => setIsHolding(true)}
                    onMouseUp={() => setIsHolding(false)}
                    onTouchStart={() => setIsHolding(true)}
                    onTouchEnd={() => setIsHolding(false)}
                    className={clsx(
                      "w-48 h-48 rounded-full bg-danger flex flex-col items-center justify-center shadow-2xl transition-all active:scale-90",
                      isHolding ? "scale-95" : "scale-100"
                    )}
                  >
                    <ShieldAlert size={64} className="text-white mb-2" />
                    <span className="text-white font-display text-4xl font-black">SOS</span>
                  </button>
               </div>
               <p className="text-danger font-black text-lg mt-12 animate-pulse uppercase tracking-tight">HOLD FOR 3 SECONDS</p>
               <p className="text-text-secondary text-[10px] font-black uppercase tracking-[0.2em] mt-2">Trigger silent alert & call 112</p>
            </motion.div>
          ) : (
            <motion.div 
              key="sent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center text-center"
            >
               <div className="w-40 h-40 bg-safe/10 border-4 border-safe rounded-full flex items-center justify-center mb-8 shadow-xl">
                  <CheckCircle size={80} className="text-safe" />
               </div>
               <h2 className="text-4xl font-black text-text mb-4 uppercase tracking-tighter">SOS ACTIVE</h2>
               <p className="text-lg text-text-secondary font-bold px-8 leading-relaxed">
                 Distress signal sent with your coordinates. Help is being dispatched.
               </p>
               <button 
                onClick={() => setSent(false)}
                className="mt-10 bg-primary text-white px-10 py-5 rounded-[32px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 transition-all active:scale-95"
               >
                 I AM SAFE NOW
               </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!sent && (
        <div className="grid grid-cols-2 gap-3 mb-4">
           {emergencyNumbers.map(num => (
             <a
              key={num.label}
              href={`tel:${num.value}`}
              className={clsx(
                "p-5 rounded-[32px] flex flex-col items-center justify-center gap-1 shadow-sm active:scale-95 transition-all text-white border-2 border-transparent",
                num.label === "Police" ? "bg-primary" : "bg-danger"
              )}
             >
                <Phone size={24} />
                <span className="font-display text-2xl font-black">{num.value}</span>
                <span className="text-[10px] font-black uppercase tracking-widest opacity-90">{num.label}</span>
             </a>
           ))}
        </div>
      )}
    </div>
  );
};

import { useRef } from 'react';
