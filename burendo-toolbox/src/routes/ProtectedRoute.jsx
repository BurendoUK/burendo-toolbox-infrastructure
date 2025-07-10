// Does nothing now. In place for restricting apps later.
import { Navigate } from 'react-router-dom';
import { useIsAuthenticated } from '@azure/msal-react';

export function ProtectedRoute({ children }) {
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
