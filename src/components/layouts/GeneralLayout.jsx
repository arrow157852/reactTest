// src/components/layouts/GeneralLayout.js
import React from 'react';
import Aside from '../common/aside/Aside';
import './GeneralLayout.css';

const GeneralLayout = ({ children }) => {
  return (
    <div className="app-container">
      <Aside />
      <main className="content-area">
        {children}
      </main>
    </div>
  );
};

export default GeneralLayout;