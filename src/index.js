// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';

// 1. Estilos Globais
// A ordem importa: o global vem primeiro.
import './styles/global.css';

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