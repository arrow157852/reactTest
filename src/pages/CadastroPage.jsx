// src/pages/CadastroPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Componentes
import AuthLayout from '../components/auth/authLayout/AuthLayout';
import AuthRedirectLink from '../components/auth/authRedirectLink/AuthRedirectLink';
import Input from '../components/common/input/Input';
import Button from '../components/common/button/Button';

// Imagens (Assumindo que você criará uma pasta 'assets' dentro de 'src')
import desktopImg from '../assets/img/cadastro-login/img-2.png';
import tabletImg from '../assets/img/cadastro-login/IMG2_Tablet.png';
import mobileImg from '../assets/img/cadastro-login/IMG2_Mobile.png';

// API
import { cadastrarUsuario } from '../services/api';

// HOC para injetar 'navigate'
function withNavigation(Component) {
  return props => <Component {...props} navigate={useNavigate()} />;
}

class CadastroPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      error: '',
      loading: false,
    };
    this.imageSet = { desktop: desktopImg, tablet: tabletImg, mobile: mobileImg };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { password } = this.state;
    const { navigate } = this.props;

    if (password.length < 8 || password.length > 20) {
      this.setState({ error: "A senha deve ter entre 8 e 20 caracteres" });
      return;
    }

    this.setState({ loading: true, error: '' });

    try {
      const { username, email, password } = this.state;
      await cadastrarUsuario({ username, email, password });
      navigate('/login');
    } catch (err) {
      this.setState({ error: err.message || 'Erro ao realizar o cadastro. Tente novamente.' });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { username, email, password, error, loading } = this.state;

    return (
      <AuthLayout imageSet={this.imageSet}>
        <h1>Cadastro</h1>
        <h2>Olá! Preencha seus dados.</h2>
        <form onSubmit={this.handleSubmit}>
          <Input
            label="Nome"
            id="username"
            type="text"
            name="username"
            required
            value={username}
            onChange={this.handleChange}
          />
          <Input
            label="Email"
            id="email-cadastro"
            type="email"
            name="email"
            required
            value={email}
            onChange={this.handleChange}
          />
          <Input
            label="Senha"
            id="password"
            type="password"
            name="password"
            required
            placeholder="Digite sua senha (8-20 caracteres)"
            value={password}
            onChange={this.handleChange}
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
  }
}

export default withNavigation(CadastroPage);