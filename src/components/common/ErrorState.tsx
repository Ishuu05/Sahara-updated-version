import React from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ 
  message = "Something went wrong. Please try again.", 
  onRetry 
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center bg-surface rounded-2xl border border-border shadow-sm">
      <div className="w-16 h-16 bg-danger/10 text-danger rounded-full flex items-center justify-center mb-4">
        <AlertTriangle size={32} />
      </div>
      <h3 className="text-lg font-bold mb-2">Error Occurred</h3>
      <p className="text-text-secondary mb-6">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-dark transition-colors"
        >
          <RefreshCcw size={18} />
          Try Again
        </button>
      )}
    </div>
  );
};
