import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  allowedRoles?: ('brand' | 'creator' | 'admin')[];
  children?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-collabrix-onyx flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-collabrix-roseGold border-t-transparent rounded-full animate-spin"></div>
          <p className="text-collabrix-roseGlimmer font-medium tracking-wide">Loading COLLABRIX...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/role-select" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If wrong role, redirect to appropriate home
    return <Navigate to={user.role === 'brand' ? '/brand/dashboard' : '/creator/dashboard'} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
