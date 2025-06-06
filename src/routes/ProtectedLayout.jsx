import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Aside from '../components/common/aside/Aside';
import '../styles/global.css';

const ProtectedLayout = () => {
  const { token, loading } = useAuth();

  // 1. Enquanto o contexto estiver verificando a autenticação, mostre um loader.
  if (loading) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#01080e', color: 'white' }}>
            <h1>Carregando...</h1>
        </div>
    );
  }

  // 2. Após a verificação, se não houver token, redirecione para o login.
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 3. Se houver token, renderize o layout protegido.
  return (
    <div className="app-container">
      <Aside />
      <main className="content-area">
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;