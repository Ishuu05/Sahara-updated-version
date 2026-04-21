import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, MessageCircle, Shield, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    id: 1,
    icon: MapPin,
    title: "Always Know Where to Go",
    description: "Real-time safe routes even without internet. Find nearest hospitals and relief camps instantly.",
    color: "bg-primary"
  },
  {
    id: 2,
    icon: MessageCircle,
    title: "Help at Your Fingertips",
    description: "Ask Sahara AI anything — survival tips, medical aid, or resource status. Works offline too.",
    color: "bg-primary"
  },
  {
    id: 3,
    icon: Shield,
    title: "Government & Citizens Together",
    description: "A unified system so help reaches faster. Transparent resource management and real-time alerts.",
    color: "bg-primary"
  }
];

export const OnboardingScreen: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    localStorage.setItem('sahara_onboarded', 'true');
    navigate('/login');
  };

  const slide = slides[current];

  return (
    <div className="fixed inset-0 bg-bg flex flex-col pt-12 px-6 pb-6 overflow-hidden">
      <div className="flex justify-end mb-8">
        <button 
          onClick={handleComplete}
          className="text-text-secondary font-bold text-sm tracking-wide"
        >
          SKIP
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="flex flex-col items-center"
          >
            <div className={`w-32 h-32 ${slide.color} rounded-[40px] flex items-center justify-center text-white mb-10 shadow-xl shadow-gray-200 rotate-6`}>
              <slide.icon size={64} className="-rotate-6" />
            </div>
            <h1 className="font-display text-3xl font-extrabold text-text mb-4 leading-tight">
              {slide.title}
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed px-4">
              {slide.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-col items-center gap-10">
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <div 
              key={i} 
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "bg-primary w-8" : "bg-gray-300 w-2"
              }`} 
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-full h-14 bg-primary text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all active:scale-[0.98]"
        >
          {current === slides.length - 1 ? "Get Started" : "Next"}
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};
