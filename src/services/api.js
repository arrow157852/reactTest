import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // Usa a variável de ambiente
  headers: {
    'Content-Type': 'application/json',
  },
});

// Função para definir o token de autorização para todas as requisições
export const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

export const loginUsuario = async (credentials) => {
  try {
    const response = await apiClient.post('/usuarios/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error('Erro de conexão com o servidor.');
  }
};

export const cadastrarUsuario = async (userData) => {
  try {
    const response = await apiClient.post('/usuarios', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error('Erro ao cadastrar usuário.');
  }
};

// Adicione aqui as outras chamadas (publicar projeto, etc.)
export const publicarProjeto = async (formData) => {
  try {
    // A API para upload de arquivos geralmente espera 'multipart/form-data'
    const response = await apiClient.post('/projetos', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error('Erro ao publicar projeto.');
  }
};