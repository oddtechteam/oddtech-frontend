import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

// Get user role/token from your auth state or storage
const getRole = () => localStorage.getItem('role'); // e.g. 'ADMIN' | 'EMPLOYEE'
const getToken = () => localStorage.getItem('token');

export default function ProtectedRoute({ allowedRoles = [] }) {
  const location = useLocation();
  const token = getToken();
  const role = getRole();

  if (!token) {
    // not logged in → go to login, keep where they tried to go
    return <Navigate to="/loginpage" replace state={{ from: location }} />;
  }

  if (allowedRoles.length > 0 && role && !allowedRoles.includes(role)) {
    // logged in but wrong role → redirect (choose target you prefer)
    return <Navigate to="/" replace />;
  }

  // OK → render child routes
  return <Outlet />;
}
