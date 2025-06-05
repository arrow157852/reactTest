
import React from 'react';
import './Input.css'; // Crie um CSS para estilização se necessário

const Input = ({ label, id, ...props }) => {
  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
    </div>
  );
};

export default Input;