// src/components/common/aside/Aside.jsx

import { NavLink } from 'react-router-dom';
import styles from './Aside.module.css';

// CORREÇÃO: Tentando um caminho diferente.
// Este caminho assume que a pasta 'assets' está na RAIZ do seu projeto, e não dentro de 'src'.
import iconPublicar from '../../../../assets/img/aside/Frame 2.png';
import iconFeed from '../../../../assets/img/aside/Frame 3.png';
import iconPerfil from '../../../../assets/img/aside/Frame 4.png';
// import logo from '../../../../assets/img/publicacao/logo.svg';

const Aside = () => {
  return (
    <aside className={styles.asideContainer}>
      {/* <img src={logo} alt="logo do codeconnect" className={styles.logo} /> */}
      
      <nav>
        <ul className={styles.listaLinks}>
          <li>
            <NavLink 
              to="/publicar" 
              className={({isActive}) => isActive ? `${styles.menuLink} ${styles.active}` : styles.menuLink}
            >
              <img src={iconPublicar} alt="Publicar" />
              <span>Publicar</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/feed" 
              className={({isActive}) => isActive ? `${styles.menuLink} ${styles.active}` : styles.menuLink}
            >
              <img src={iconFeed} alt="Feed" />
              <span>Feed</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/perfil" 
              className={({isActive}) => isActive ? `${styles.menuLink} ${styles.active}` : styles.menuLink}
            >
              <img src={iconPerfil} alt="Perfil" />
              <span>Perfil</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Aside;