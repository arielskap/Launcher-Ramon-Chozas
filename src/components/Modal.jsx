import React from 'react';

const Modal = ({ title, chidlren }) => {
  return (
    <div className='absolute top-0 left-0 h-screen w-screen'>
      <div>
        <div>
          <h3>{title}</h3>
        </div>
        <div>
          <p>{chidlren}</p>
        </div>
        <div>
          <button type='button'>Cancelar</button>
          <button type='button'>Confirmar</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
