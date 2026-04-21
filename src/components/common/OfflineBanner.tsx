import React from 'react';
import { WifiOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';

export const OfflineBanner: React.FC = () => {
  const isOnline = useOnlineStatus();

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-warning text-text text-sm py-2 px-4 flex items-center justify-center gap-2 overflow-hidden shadow-md sticky top-0 z-[1001]"
        >
          <WifiOff size={16} />
          <span>You are offline — showing cached data</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
