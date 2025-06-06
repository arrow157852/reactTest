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

// --- CORREÇÃO ADICIONADA: Interceptor de Resposta ---
// Este trecho intercepta TODAS as respostas da API.
apiClient.interceptors.response.use(
  // Função para respostas de sucesso (nenhuma alteração necessária)
  (response) => response,

  // Função para lidar com erros
  (error) => {
    // Verifica se o erro é de autenticação (token expirado/inválido)
    if (error.response && error.response.status === 401) {
      // Dispara um evento global para que o AuthContext possa reagir e fazer logout.
      // Isso evita dependências circulares entre este arquivo e o AuthContext.
      window.dispatchEvent(new Event('token-expired'));
    }

    // Rejeita a promise para que o erro continue seu fluxo e possa ser tratado
    // no componente que fez a chamada, se necessário.
    return Promise.reject(error);
  }
);
// --- FIM DA CORREÇÃO ---


export const loginUsuario = async (credentials) => {
  try {
    const response = await apiClient.post('/usuarios/login', credentials);
    return response.data;
  } catch (error) {
    // O erro será propagado para a página de login, que exibirá a mensagem.
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
    // Se o token estiver expirado aqui, o interceptor acima vai lidar com o logout.
    throw error.response?.data || new Error('Erro ao publicar projeto.');
  }
};