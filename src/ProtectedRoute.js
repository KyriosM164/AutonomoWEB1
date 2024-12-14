import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './Screen/AuthContext';

const ProtectedRoute = ({ element: Component }) => {
  const { currentUser } = useAuth();

  return currentUser ? Component : <Navigate to="/login" />;
};

export default ProtectedRoute;
