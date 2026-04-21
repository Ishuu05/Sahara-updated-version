import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthContext } from '../../context/AuthContext';

export const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, loading } = useAuthContext();

  useEffect(() => {
    if (loading) return;

    const timer = setTimeout(() => {
      if (user) {
        if (profile?.role === 'government') {
          navigate('/gov/home');
        } else {
          navigate('/civilian/home');
        }
      } else {
        const onboarded = localStorage.getItem('sahara_onboarded');
        if (onboarded === 'true') {
          navigate('/login');
        } else {
          navigate('/onboarding');
        }
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [loading, user, profile, navigate]);

  return (
    <div className="fixed inset-0 bg-primary flex flex-col items-center justify-center text-white z-[2000]">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <div className="bg-white/20 p-6 rounded-3xl mb-6 backdrop-blur-sm border border-white/30">
          <HeartHandshake size={80} className="text-white" />
        </div>
        <h1 className="font-display text-5xl font-extrabold tracking-tight mb-1">Sahara</h1>
        <h2 className="text-2xl font-medium opacity-80 mb-4">सहारा</h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          transition={{ delay: 1 }}
          className="text-lg font-medium tracking-wide"
        >
          Support in every storm.
        </motion.p>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-12 flex flex-col items-center opacity-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.5 }}
      >
        <div className="h-1 w-32 bg-white/30 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-white"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, delay: 1 }}
          />
        </div>
      </motion.div>
    </div>
  );
};
