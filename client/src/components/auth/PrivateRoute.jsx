import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute() {
  // TODO: Implement proper auth check
  const isAuthenticated = true;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
