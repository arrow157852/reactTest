import { NavLink } from 'react-router-dom';
import logo from '../../assets/img/publicar/Logo.svg';
import styles from './Aside.module.css'; 

const Aside = () => {

  return (

    <aside>
      <img src={logo} alt="logo do codeconnect" />
      <nav>
        <ul className={styles.listaLinks}>
          <li>
            <NavLink 
              to="/publicar" 
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