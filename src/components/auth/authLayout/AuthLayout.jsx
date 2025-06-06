import styles from './AuthLayout.module.css'; 

const AuthLayout = ({ children, imageSet }) => {
  // imageSet seria um objeto com as imagens { desktop, tablet, mobile }
  return (
    <main className={styles.authMain}>
      {/* CORRIGIDO: Adicionado "styles." */}
      <div className={styles.contentContainer}>
        <img src={imageSet.desktop} alt="Ilustração" className={`${styles.imgMain} ${styles.imgDesktop}`}  />
        <img src={imageSet.tablet} alt="Ilustração" className={`${styles.imgMain} ${styles.imgTablet}`}   />
        <img src={imageSet.mobile} alt="Ilustração" className= {`${styles.imgMain} ${styles.imgMobile}`}  />
        
        {/* CORRIGIDO: Adicionado "styles." */}
        <div className={styles.containerForm}>
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;