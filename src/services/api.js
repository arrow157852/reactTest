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

// Interceptor de Resposta para lidar com token expirado
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.dispatchEvent(new Event('token-expired'));
    }
    return Promise.reject(error);
  }
);

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

// NOVA FUNÇÃO: Adicionada para validar o token buscando o perfil do usuário
export const getPerfilUsuario = async () => {
  try {
    // Use o endpoint correto da sua API que retorna os dados do usuário logado
    const response = await apiClient.get('/usuarios/perfil'); 
    return response.data;
  } catch (error) {
    throw error.response?.data || new Error('Sessão inválida ou expirada.');
  }
}

export const publicarProjeto = async (formData) => {
  try {
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