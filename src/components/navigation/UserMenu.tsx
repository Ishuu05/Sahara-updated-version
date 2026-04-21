import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, Sun, Moon, Type, ChevronDown } from 'lucide-react';
import { useAuthContext } from '../../context/AuthContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

export const UserMenu: React.FC = () => {
  const { profile } = useAuthContext();
  const { highContrast, largeText, toggleHighContrast, toggleLargeText } = useAccessibility();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('sahara_onboarded');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 rounded-2xl border border-border hover:bg-surface transition-all active:scale-95"
      >
        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
          <User size={20} />
        </div>
        <ChevronDown size={16} className={clsx("text-text-secondary transition-transform", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full right-0 mt-3 w-72 bg-white rounded-[32px] shadow-2xl border border-border overflow-hidden z-[2000]"
          >
            <div className="p-6 border-b border-border bg-surface/50">
              <h3 className="font-black text-text leading-tight">{profile?.name || 'Sahara User'}</h3>
              <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mt-1 truncate">{profile?.email || auth.currentUser?.email}</p>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <span className={clsx(
                  "px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter",
                  profile?.role === 'government' ? "bg-danger/10 text-danger" : "bg-primary/10 text-primary"
                )}>
                  {profile?.role === 'government' ? 'OFFICER' : 'CIVILIAN'}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-bg text-text-secondary text-[9px] font-black uppercase tracking-tighter shadow-sm border border-border">
                  {profile?.district || 'Unknown District'}
                </span>
              </div>
            </div>

            <div className="p-4 space-y-1">
              <button 
                onClick={toggleHighContrast}
                className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-surface transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-bg border border-border flex items-center justify-center text-text-secondary group-hover:text-primary transition-colors">
                    {highContrast ? <Moon size={16} /> : <Sun size={16} />}
                  </div>
                  <span className="text-xs font-bold text-text">High Contrast</span>
                </div>
                <div className={clsx(
                  "w-10 h-5 rounded-full transition-all relative overflow-hidden",
                  highContrast ? "bg-primary" : "bg-border"
                )}>
                  <div className={clsx(
                    "absolute top-1 w-3 h-3 bg-white rounded-full transition-all",
                    highContrast ? "left-6" : "left-1"
                  )} />
                </div>
              </button>

              <button 
                onClick={toggleLargeText}
                className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-surface transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-bg border border-border flex items-center justify-center text-text-secondary group-hover:text-primary transition-colors">
                    <Type size={16} />
                  </div>
                  <span className="text-xs font-bold text-text">Large Text</span>
                </div>
                <div className={clsx(
                  "w-10 h-5 rounded-full transition-all relative overflow-hidden",
                  largeText ? "bg-primary" : "bg-border"
                )}>
                  <div className={clsx(
                    "absolute top-1 w-3 h-3 bg-white rounded-full transition-all",
                    largeText ? "left-6" : "left-1"
                  )} />
                </div>
              </button>
            </div>

            <div className="p-4 bg-surface/30">
              <button 
                onClick={handleLogout}
                className="w-full h-12 bg-danger text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-danger/10 active:scale-95 transition-all"
              >
                <LogOut size={16} /> Log Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
