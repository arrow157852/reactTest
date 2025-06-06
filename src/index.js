import React from 'react';
import ReactDOM from 'react-dom/client';

// 1. Estilos Globais e de Componentes
// A ordem importa: o global vem primeiro.
import './styles/global.css';
import './components/auth/AuthLayout.css';
import './assets/css/aside.css';
import './assets/css/feed.css';
import './assets/css/perfil.css';
import './assets/css/publicar.css';
import './assets/css/sobre.css';

// 2. Componente Principal da Aplicação
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();