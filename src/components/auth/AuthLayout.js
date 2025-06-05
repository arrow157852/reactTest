// src/components/auth/AuthLayout.js
import React from 'react';

import './AuthLayout.css'; // Copie e adapte o CSS de login.css e cadastro.css

const AuthLayout = ({ children, imageSet }) => {
  // imageSet seria um objeto com as imagens { desktop, tablet, mobile }
  return (
    <main className="auth-main">
      <div className="content-container">
        <img src={imageSet.desktop} alt="Ilustração" className="img-main img-desktop" />
        <img src={imageSet.tablet} alt="Ilustração" className="img-main img-tablet" />
        <img src={imageSet.mobile} alt="Ilustração" className="img-main img-mobile" />
        <div className="container-form">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;