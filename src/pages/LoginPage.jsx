// src/pages/LoginPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Componentes
import AuthLayout from '../components/auth/authLayout/AuthLayout';
import AuthRedirectLink from '../components/auth/authRedirectLink/AuthRedirectLink';
import Input from '../components/common/input/Input';
import Button from '../components/common/button/Button';

// Imagens (Assumindo que você criará uma pasta 'assets' dentro de 'src')
import desktopImg from '../assets/img/cadastro-login/img-1.png';
import tabletImg from '../assets/img/cadastro-login/IMG_1 - Tablet.png';
import mobileImg from '../assets/img/cadastro-login/IMG_1 - Mobile.png';

// HOC para injetar 'navigate' e 'auth'
function withRouterAndAuth(Component) {
  return function WrappedComponent(props) {
    const navigate = useNavigate();
    const auth = useAuth();
    return <Component {...props} navigate={navigate} auth={auth} />;
  };
}

class LoginPage extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      loading: false,
    };
    this.imageSet = { desktop: desktopImg, tablet: tabletImg, mobile: mobileImg };
  }

  handleChange = (e) => {
    // Corrigido para pegar o 'name' do input, não 'id'
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const { navigate, auth } = this.props;

    if (!email || !password) {
      this.setState({ error: 'Por favor, preencha todos os campos.' });
      return;
    }

    this.setState({ loading: true, error: '' });

    try {
      await auth.login(email, password);
      navigate('/feed');
    } catch (err) {
      this.setState({ error: err.message || 'E-mail ou senha incorretos.' });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { email, password, error, loading } = this.state;

    return (
      <AuthLayout imageSet={this.imageSet}>
        <h1>Login</h1>
        <h2>Boas vindas! Faça seu login.</h2>
        <form onSubmit={this.handleSubmit}>
          <Input
            label="Email"
            id="email-login"
            type="email"
            name="email" // Adicionado o atributo name
            required
            value={email}
            onChange={this.handleChange}
          />
          <Input
            label="Senha"
            id="senha-login"
            type="password"
            name="password" // Corrigido o name para 'password'
            required
            placeholder="Digite sua senha"
            value={password}
            onChange={this.handleChange}
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
  }
}

export default withRouterAndAuth(LoginPage);