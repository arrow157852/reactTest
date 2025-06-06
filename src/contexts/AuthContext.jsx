
import React, { createContext, useState, useContext } from 'react';
import * as api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('authToken'));

  const login = async (email, password) => {
    const data = await api.loginUsuario({ email, password });

    
    const user = {
      id: data.id,
      name: data.name,
      email: data.email,
    };

    setToken(data.token);
    setUser(user); 
    localStorage.setItem('authToken', data.token);
  };
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
  };

  const authValue = { token, user, login, logout };

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
};


export const useAuth = () => {
  return useContext(AuthContext);
};