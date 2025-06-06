import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import PublicarPage from './pages/PublicarPage'; // Página para simular o destino pós-login

// Mock do hook useAuth para controlar o retorno nos testes
jest.mock('./contexts/AuthContext', () => ({
  ...jest.requireActual('./contexts/AuthContext'), // Mantém a implementação original do AuthProvider
  useAuth: jest.fn(),
}));

// Componente auxiliar para renderizar com o contexto e as rotas necessárias
const TestWrapper = ({ children }) => {
  return (
    <AuthProvider>
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={children} />
          <Route path="/feed" element={<div>Página de Feed</div>} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  );
};

describe('LoginPage', () => {
  // Antes de cada teste, redefinimos o mock
  beforeEach(() => {
    useAuth.mockReturnValue({
      login: jest.fn(),
      logout: jest.fn(),
      token: null,
      user: null,
      loading: false,
    });
  });

  test('renderiza os campos de email e senha', () => {
    render(<LoginPage />, { wrapper: TestWrapper });

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('exibe mensagem de erro se os campos não forem preenchidos', async () => {
    render(<LoginPage />, { wrapper: TestWrapper });
    
    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);

    const errorMessage = await screen.findByText(/por favor, preencha todos os campos/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('chama a função de login ao submeter o formulário com dados válidos', async () => {
    const mockLogin = jest.fn().mockResolvedValue(true); // Simula um login bem-sucedido
    useAuth.mockReturnValue({
      ...useAuth(), // Mantém outras propriedades do mock
      login: mockLogin,
    });

    render(<LoginPage />, { wrapper: TestWrapper });

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'teste@exemplo.com' } });
    fireEvent.change(screen.getByLabelText(/senha/i), { target: { value: 'senha123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledTimes(1);
      expect(mockLogin).toHaveBeenCalledWith('teste@exemplo.com', 'senha123');
    });
  });
});