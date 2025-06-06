import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import * as api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // Novo estado de loading

  // Função de logout centralizada
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    api.setAuthToken(null);
  }, []);

  // Efeito para verificar o token na inicialização
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        api.setAuthToken(storedToken);
        try {
          // Tenta buscar os dados do usuário para validar o token
          const userData = await api.getPerfilUsuario(); // Você precisará criar esta função na API
          setUser(userData);
          setToken(storedToken);
        } catch (error) {
          // Se falhar (ex: 401 Unauthorized), faz o logout
          logout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [logout]);

  // Efeito para ouvir o evento global de token expirado
  useEffect(() => {
    const handleTokenExpired = () => {
      console.log("Token expirado detectado. Fazendo logout.");
      logout();
    };

    window.addEventListener('token-expired', handleTokenExpired);

    return () => {
      window.removeEventListener('token-expired', handleTokenExpired);
    };
  }, [logout]);


  const login = async (email, password) => {
    const data = await api.loginUsuario({ email, password });
    
    // Supondo que a API de login retorna o usuário e o token
    const user = {
      id: data.id,
      name: data.name,
      email: data.email,
    };

    setToken(data.token);
    setUser(user);
    localStorage.setItem('authToken', data.token);
    api.setAuthToken(data.token);
  };

  // Incluímos 'loading' no valor do contexto
  const authValue = { token, user, login, logout, loading };

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
};


export const useAuth = () => {
  return useContext(AuthContext);
};