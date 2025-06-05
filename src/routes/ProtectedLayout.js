import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Aside from '../components/common/Aside';
import '../components/layouts/GeneralLayout.css'; // Supondo que o estilo do layout esteja aqui

const ProtectedLayout = () => {
  const { token, loading } = useAuth();

  if (loading) {
    // Aguarda a verificação do token terminar para evitar redirecionamento prematuro
    return <div>Carregando...</div>; 
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="app-container">
      <Aside />
      <main className="content-area">
        <Outlet /> {/* Renderiza o componente da rota aninhada (ex: PublicarPage) */}
      </main>
    </div>
  );
};

export default ProtectedLayout;