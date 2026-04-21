import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'civilian' | 'government';
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user, profile, loading } = useAuthContext();
  const location = useLocation();

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-bg gap-4">
        <Loader2 className="animate-spin text-primary" size={48} />
        <p className="text-sm font-bold text-text-secondary uppercase tracking-widest animate-pulse">Establishing Command...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && profile?.role !== requiredRole) {
    return <Navigate to={profile?.role === 'government' ? '/gov/home' : '/civilian/home'} replace />;
  }

  return <>{children}</>;
};
