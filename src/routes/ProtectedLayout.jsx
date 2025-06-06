// src/routes/ProtectedLayout.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Aside from '../components/common/aside/Aside';
import '../styles/global.css'; // Estilos globais são importantes aqui

const ProtectedLayout = () => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="app-container">
      <Aside />
      <main className="content-area">
        <Outlet /> {/* Renderiza o componente da rota aninhada */}
      </main>
    </div>
  );
};

export default ProtectedLayout;