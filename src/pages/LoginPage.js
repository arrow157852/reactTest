// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // 1. Importe o hook de autenticação

// Componentes
import AuthLayout from '../components/auth/AuthLayout';
import AuthRedirectLink from '../components/auth/AuthRedirectLink';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

// Imagens para o layout
import desktopImg from '../assets/img/cadastro-login/img-1.png';
import tabletImg from '../assets/img/cadastro-login/IMG_1 - Tablet.png';
import mobileImg from '../assets/img/cadastro-login/IMG_1 - Mobile.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth(); // 2. Obtenha a função de login do contexto

  const imageSet = { desktop: desktopImg, tablet: tabletImg, mobile: mobileImg };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validação simples de campos
    if (!email || !password) {
        setError('Por favor, preencha todos os campos.');
        return;
    }

    setLoading(true);
    setError('');

    try {
      // 3. Use a função de login do contexto em vez da API diretamente
      await login(email, password);
      navigate('/feed'); // Redireciona para o feed após o sucesso
    } catch (err) {
      // O erro lançado pelo AuthContext ou API será capturado aqui
      setError(err.message || 'E-mail ou senha incorretos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout imageSet={imageSet}>
      <h1>Login</h1>
      <h2>Boas vindas! Faça seu login.</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          id="email-login"
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Senha"
          id="senha-login"
          type="password"
          name="senha"
          required
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <output className="mensagem-erro">{error}</output>}
        <div className="container-botao">
          <Button type="submit" disabled={loading}>
            {loading ? 'Carregando...' : 'Login'}
          </Button>
        </div>
      </form>
      <AuthRedirectLink
        text="Ainda não tem conta?"
        linkText="Crie seu Cadastro!"
        to="/cadastro"
      />
    </AuthLayout>
  );
};

export default LoginPage;