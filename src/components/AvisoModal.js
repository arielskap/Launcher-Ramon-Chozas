import React from 'react';

import Modal from './Modal';

function Aviso(props) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <div className='Aviso__Modal'>
        <h1>Usuario y/o contraseña invalida.</h1>
        <p>Por favor intente nuevamente</p>
      </div>
    </Modal>
  );
}

export default Aviso;
