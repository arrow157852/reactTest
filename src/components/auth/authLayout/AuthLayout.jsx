// src/components/auth/authLayout/AuthLayout.jsx
import styles from './AuthLayout.module.css'; 

const AuthLayout = ({ children, imageSet }) => {
  return (
    <main className={styles.authMain}>
      <div className={styles.contentContainer}>
        {imageSet.desktop && <img src={imageSet.desktop} alt="Ilustração" className={`${styles.imgMain} ${styles.imgDesktop}`}  />}
        {imageSet.tablet && <img src={imageSet.tablet} alt="Ilustração" className={`${styles.imgMain} ${styles.imgTablet}`}   />}
        {imageSet.mobile && <img src={imageSet.mobile} alt="Ilustração" className= {`${styles.imgMain} ${styles.imgMobile}`}  />}
        
        <div className={styles.containerForm}>
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;