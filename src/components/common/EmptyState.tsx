import React from 'react';
import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  message?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No data found",
  message = "There's nothing to show here at the moment."
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center bg-surface rounded-2xl border border-border dashed shadow-sm">
      <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mb-4">
        <Inbox size={32} />
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-text-secondary">{message}</p>
    </div>
  );
};
