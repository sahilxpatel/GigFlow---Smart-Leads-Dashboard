import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { authStore } from '../store/authStore';
import { Loader } from '../components/common/Loader';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isHydrated = authStore((state) => state.isHydrated);
  const isAuthenticated = authStore((state) => state.isAuthenticated);

  if (!isHydrated) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
