import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ipcRenderer } from 'electron';
import { login } from '../renderer-process';
import FormDetails from './FormDetails';
import animateCSS from '../funciones';
import ver from '../assets/static/ver.svg';
import noVer from '../assets/static/noVer.svg';

const FormContainer = () => {
  const [information, setInformation] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const history = useHistory();

  const handleCloseModal = () => {
    animateCSS('.Modal__container', 'slideOutUp faster', () => {
      setModalIsOpen(false);
      document.querySelector('.button_submit_Form').removeAttribute('disabled');
      document.querySelector('.button_submit_Form').classList.remove('opacity-50', 'cursor-not-allowed');
      setInformation(`⚠ ${message}`);
    });
    animateCSS('.Modal', 'fadeOut faster');
  };

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handlePasswordExpired = () => {
    animateCSS('.Form', 'fadeOut faster', () => {
      history.push('/expired');
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    document.body.classList.add('cursor-wait');
    document.querySelector('.button_submit_Form').setAttribute('disabled', '');
    document.querySelector('.button_submit_Form').classList.add('opacity-50', 'cursor-not-allowed');
    login();

    if (!information) {
      animateCSS('.p_information', 'fadeOut faster', () => {
        setInformation('🕑 Validando los datos... 🕑');
        animateCSS('.p_information', 'fadeIn faster');
      });
    } else {
      animateCSS('.p_information', 'fadeIn faster', () => {
        setInformation('🕑 Validando los datos... 🕑');
      });
    }
  };

  const handleSwitchVisiblePass = () => {
    const inputPass = document.querySelector('#password');
    if (inputPass.getAttribute('type') === 'password') {
      inputPass.setAttribute('type', 'text');
      document.querySelector('.img__visiblePass').src = noVer;
    } else {
      inputPass.setAttribute('type', 'password');
      document.querySelector('.img__visiblePass').src = ver;
    }
  };
  useEffect(() => {
    document.getElementById('username').focus();
    ipcRenderer.once('reply-login-launcher', (event, argsJSON) => {
      const { message, code, user } = argsJSON;
      const listApp = argsJSON.list_app;
      const username = document.querySelector('#username');
      const password = document.querySelector('#password');
      console.table(argsJSON);
      if (user) {
        const { firstName, lastName } = user;
        const usuario = { firstName, lastName, listApp };
        localStorage.setItem('user', JSON.stringify(usuario));
      }
      document.body.classList.remove('cursor-wait');
      if (code === 200) {
        animateCSS('.Login', 'fadeOut faster', () => {
          history.push('/home');
        });
      } else if (code === 201) {
        handleOpenModal();
      } else if (code >= 400) {
        document.querySelector('.button_submit_Form').removeAttribute('disabled');
        document.querySelector('.button_submit_Form').classList.remove('opacity-50', 'cursor-not-allowed');
        if (code === 400) {
          if (username.value === '') {
            username.classList.add('border-red-500');
          }
          if (password.value === '') {
            password.classList.add('border-red-500');
          }
        } else if (code === 401) {
          username.classList.add('border-red-500');
          password.classList.add('border-red-500');
        } else if (code === 402) {
          username.classList.add('border-gray-300');
          password.classList.add('border-red-500');
        }
        animateCSS('.p_information', 'fadeOut faster', () => {
          setInformation(`⚠ ${message}`);
          animateCSS('.p_information', 'fadeIn faster');
        });
      }
    });
  }, []);

  return (
    <>
      <FormDetails
        information={information}
        modalIsOpen={modalIsOpen}
        handles={
          {
            handleCloseModal,
            handlePasswordExpired,
            handleSubmit,
            handleSwitchVisiblePass,
          }
        }
      />
    </>
  );
};

export default FormContainer;
