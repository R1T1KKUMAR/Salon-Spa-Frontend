import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CUSTOMER_ROLES = ['user', 'customer'];

// Normalize role: 'user' and 'customer' are the same customer role
const roleMatches = (userRole, required) => {
  if (!required) return true;
  const requiredList = Array.isArray(required) ? required : [required];
  // Expand 'user' to include 'customer' and vice versa
  const expanded = new Set();
  requiredList.forEach((r) => {
    expanded.add(r);
    if (r === 'user' || r === 'customer') {
      CUSTOMER_ROLES.forEach((c) => expanded.add(c));
    }
  });
  return expanded.has(userRole);
};

const ProtectedRoute = ({ requiredRole }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && !roleMatches(user?.role, requiredRole)) {
    return <Navigate to="/" replace />; // Redirect if role doesn't match
  }

  return <Outlet />;
};

export default ProtectedRoute;