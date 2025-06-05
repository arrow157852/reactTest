// src/components/common/Aside.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/img/publicar/Logo.svg';
import './Aside.css'; // Adapte o CSS de aside.css

const Aside = () => {
  // Você pode buscar os ícones de forma semelhante ao logo
  return (
    <aside>
      <img src={logo} alt="logo do codeconnect" />
      <nav>
        <ul className="lista-links">
          {/* Adicione os outros links aqui */}
          <li><NavLink to="/publicar" className={({isActive}) => isActive ? "link-destaque" : ""}>Publicar</NavLink></li>
          <li><NavLink to="/feed">Feed</NavLink></li>
          <li><NavLink to="/perfil">Perfil</NavLink></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Aside;