import React from 'react';
import ReactDOM from 'react-dom';
import '../assets/styles/Modal.scss';

const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }
  return ReactDOM.createPortal(
    <div className='Modal animated fadeIn faster'>
      <div className='Modal__container animated slideInDown faster'>
        <button className='Modal__close-button' type='button' onClick={onClose}><b>X</b></button>
        {children}
      </div>
    </div>,
    document.getElementById('modal'),
  );
};

export default Modal;
