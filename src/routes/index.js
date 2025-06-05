// src/routes/index.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import LoginPage from '../pages/LoginPage';
import CadastroPage from '../pages/CadastroPage';
import PublicarPage from '../pages/PublicarPage';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<CadastroPage />} />

        {/* Rotas Protegidas */}
        <Route
          path="/publicar"
          element={
            <ProtectedRoute>
              <PublicarPage />
            </ProtectedRoute>
          }
        />
        {/* Adicione outras rotas protegidas aqui (ex: /feed, /perfil) */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;