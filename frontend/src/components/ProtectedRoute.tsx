import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { Role } from '../types';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  requireRole?: Role;
}

export function ProtectedRoute({ children, requireRole }: Props) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-talium-purple border-t-transparent" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  if (requireRole && user.role !== requireRole) {
    // Send users to their correct landing page if they hit the wrong one.
    const correctPath = user.role === 'manager' ? '/dashboard' : '/home';
    return <Navigate to={correctPath} replace />;
  }

  return <>{children}</>;
}
