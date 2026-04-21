import React from 'react';

export const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-surface rounded-2xl p-4 shadow-sm border border-border animate-pulse">
      <div className="h-6 w-3/4 bg-gray-200 rounded mb-3"></div>
      <div className="h-4 w-full bg-gray-100 rounded mb-2"></div>
      <div className="h-4 w-5/6 bg-gray-100 rounded mb-4"></div>
      <div className="h-10 w-full bg-gray-200 rounded-xl"></div>
    </div>
  );
};

export const SkeletonGrid: React.FC<{ count?: number }> = ({ count = 4 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};
