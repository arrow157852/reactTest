// src/routes/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    // Redireciona para a página de login se não houver token
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;