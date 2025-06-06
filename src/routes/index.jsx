import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedLayout from './ProtectedLayout'; // Importe o novo layout
import LoginPage from '../pages/LoginPage';
import CadastroPage from '../pages/CadastroPage';
import PublicarPage from '../pages/publicar/PublicarPage';
// Importe outras páginas que serão protegidas, ex:
// import FeedPage from '../pages/FeedPage'; 
// import PerfilPage from '../pages/PerfilPage';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota inicial que redireciona para o feed ou login */}
        <Route path="/" element={<Navigate to="/feed" />} />

        {/* Rotas Públicas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />

        {/* Agrupamento de Rotas Protegidas */}
        <Route element={<ProtectedLayout />}>
          <Route path="/publicar" element={<PublicarPage />} />
          {/* Adicione outras rotas protegidas aqui */}
          {/* Exemplo:
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/perfil" element={<PerfilPage />} />
          */}
        </Route>
        
        {/* Rota para qualquer caminho não encontrado */}
        <Route path="*" element={<div>Página não encontrada</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;