// src/pages/CadastroPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Componentes Reutilizados
import AuthLayout from '../components/auth/AuthLayout';
import AuthRedirectLink from '../components/auth/AuthRedirectLink';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

// Imagens para o layout de Cadastro
import desktopImg from '../assets/img/cadastro-login/img-2.png';
import tabletImg from '../assets/img/cadastro-login/IMG2_Tablet.png';
import mobileImg from '../assets/img/cadastro-login/IMG2_Mobile.png';

// Lógica da API
import { cadastrarUsuario } from '../services/api';

const CadastroPage = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const imageSet = { desktop: desktopImg, tablet: tabletImg, mobile: mobileImg };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validação de senha como no cadastro.js original
    if (password.length < 8 || password.length > 20) {
      setError("A senha deve ter entre 8 e 20 caracteres");
      return;
    }
    setLoading(true);
    setError('');

    try {
      await cadastrarUsuario({ username: nome, email, password });
      // Após o sucesso, redireciona para o login para que o usuário possa entrar
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Erro ao realizar o cadastro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout imageSet={imageSet}>
      <h1>Cadastro</h1>
      <h2>Olá! Preencha seus dados.</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="Nome"
          id="nome"
          type="text"
          name="nome"
          required
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <Input
          label="Email"
          id="email-cadastro"
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Senha"
          id="senha"
          type="password"
          name="senha"
          required
          placeholder="Digite sua senha (8-20 caracteres)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <output className="mensagem-erro">{error}</output>}
        <div className="container-botao">
          <Button type="submit" disabled={loading}>
            {loading ? 'Carregando...' : 'Cadastrar'}
          </Button>
        </div>
      </form>
      <AuthRedirectLink
        text="Já tem conta?"
        linkText="Faça seu login!"
        to="/login"
      />
    </AuthLayout>
  );
};

export default CadastroPage;