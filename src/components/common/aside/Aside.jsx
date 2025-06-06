// src/components/common/Aside.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/img/publicar/Logo.svg';
// 1. Mude o import do CSS para usar o padrão de Módulos
import styles from './Aside.module.css'; 

const Aside = () => {
  // 2. Aplique as classes usando o objeto 'styles'
  // Note que classes com hífen (ex: "lista-links") viram camelCase (listaLinks)
  return (
    // A classe 'pagina-publicar' é adicionada dinamicamente, vamos tratar isso se necessário
    <aside>
      <img src={logo} alt="logo do codeconnect" />
      <nav>
        <ul className={styles.listaLinks}>
          <li>
            <NavLink 
              to="/publicar" 
              // Você pode combinar classes se precisar
              className={({isActive}) => isActive ? `${styles.menuLink} ${styles.linkDestaque}` : styles.menuLink}
            >
              Publicar
            </NavLink>
          </li>
          <li><NavLink to="/feed" className={styles.menuLink}>Feed</NavLink></li>
          <li><NavLink to="/perfil" className={styles.menuLink}>Perfil</NavLink></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Aside;