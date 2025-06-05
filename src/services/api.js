// src/services/api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/v1', // URL da sua API
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginUsuario = async (credentials) => {
  try {
    const response = await apiClient.post('/usuarios/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const cadastrarUsuario = async (userData) => {
    try {
        const response = await apiClient.post('/usuarios', userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Adicione aqui as outras chamadas (publicar projeto, etc.)