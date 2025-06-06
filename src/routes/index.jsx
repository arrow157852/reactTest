import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedLayout from './ProtectedLayout';
import LoginPage from '../pages/LoginPage';
import CadastroPage from '../pages/CadastroPage';
import FeedPage from '../pages/Feed/FeedPage'; // Importe o FeedPage
import PublicarPage from '../pages/publicar/PublicarPage';
import PerfilPage from '../pages/perfil/PerfilPage'; // Importe o PerfilPage

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas Públicas: Acessíveis sem login */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />

        {/* Agrupamento de Rotas Protegidas */}
        {/* O ProtectedLayout agora envolve todas as rotas que exigem login */}
        <Route element={<ProtectedLayout />}>
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/publicar" element={<PublicarPage />} />
          <Route path="/perfil" element={<PerfilPage />} />
        </Route>
        
        {/* Rota inicial que redireciona para o feed (que agora é protegido) */}
        <Route path="/" element={<Navigate to="/feed" replace />} />

        {/* Rota para qualquer caminho não encontrado */}
        <Route path="*" element={<div><h1>404 - Página não encontrada</h1></div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;