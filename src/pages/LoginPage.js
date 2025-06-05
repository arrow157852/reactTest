// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Componentes
import AuthLayout from '../components/auth/AuthLayout';
import AuthRedirectLink from '../components/auth/AuthRedirectLink';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

// Imagens para o layout
import desktopImg from '../assets/img/cadastro-login/img-1.png';
import tabletImg from '../assets/img/cadastro-login/IMG_1 - Tablet.png';
import mobileImg from '../assets/img/cadastro-login/IMG_1 - Mobile.png';

// Lógica (será movida para um hook/context depois)
import { loginUsuario } from '../services/api';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const imageSet = { desktop: desktopImg, tablet: tabletImg, mobile: mobileImg };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userData = await loginUsuario({ email, password });
      // Lógica de salvar token (será movida para o AuthContext)
      localStorage.setItem('authToken', userData.token);
      navigate('/feed');
    } catch (err) {
      // A lógica de mensagens de erro de login.js
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