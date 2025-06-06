import React from 'react';
import styles from './SobrePage.module.css';
import GeneralLayout from '../../components/layouts/GeneralLayout';
// Exemplo de como você importaria as imagens
// import img1 from '../assets/img/sobre/img1.png';
// import img2 from '../assets/img/sobre/img2.png'; 
// import logoIcon from '../assets/img/logo-icon.png';

const SobrePage = () => {
  return (
    <GeneralLayout>
      <main className={styles.main}>
        <div className={styles.containerImg1}>
          { <img src={img1} alt="Banner da página sobre" className={styles.img1} /> }
        </div>
        <h1 className={styles.title}>Sobre o Code Connect</h1>
        <p className={styles.subtitulo}>Uma rede social para programadores e entusiastas de tecnologia.</p>
        
        <div className={styles.containerResumo}>
          <p className={styles.paragraph}>
            Bem-vindo ao Code Connect! Nossa plataforma foi criada para ser o ponto de encontro de desenvolvedores, designers, e todos que amam criar com código.
          </p>
        </div>

        <div className={styles.containerMissaoImg}>
          <div className={styles.containerMissao}>
            <h3 className={styles.sectionTitle}>Nossa Missão</h3>
            <p className={styles.paragraph}>
              Conectar talentos, inspirar a criação e facilitar a colaboração em projetos de tecnologia. Acreditamos que as melhores ideias nascem quando mentes criativas se unem.
            </p>
          </div>
          <div className={styles.containerImg2}>
            {<img src={img2} alt="Equipe colaborando" className={styles.img2} /> }
          </div>
        </div>
        
        <div className={styles.containerFraseFinal}>
          {<img src={logoIcon} alt="Ícone Code Connect" /> }
          <p>Junte-se a nós e transforme linhas de código em grandes projetos.</p>
        </div>
      </main>
    </GeneralLayout>
  );
};

export default SobrePage;