import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ipcRenderer } from 'electron';
import { login } from '../renderer-process';
import ExitModal from './ExitModal';
import animateCSS from '../funciones';
import '../assets/styles/Form.scss';

const Form = () => {
  const [information, setInformation] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const history = useHistory();

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handlePasswordExpired = () => {
    history.push('/expired');
  };

  const handleSubmit = (e) => {
    const username = document.querySelector('#username');
    const password = document.querySelector('#password');
    e.preventDefault();

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

    ipcRenderer.on('reply-login-launcher', (event, argsJSON) => {
      const { message, code } = argsJSON;
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
          setInformation(`⚠ ${message} ⚠`);
          animateCSS('.p_information', 'fadeIn faster');
        });
      }
    });
  };

  useEffect(() => {
    document.getElementById('username').focus();
  }, []);

  return (
    <>
      <form className='Form shadow-md rounded px-8 pt-6 pb-8 mb-4 animated fadeIn' onSubmit={handleSubmit}>
        <Link to='/home'>
          Go to Home
        </Link>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='username'>
            Usuario:
            <input autoComplete='username' className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline' name='username' id='username' type='text' placeholder='Usuario' tabIndex={0} />
          </label>
        </div>
        <div className='mb-6'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
            Contraseña:
            <input autoComplete='current-password' className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline' name='contraseña' id='password' type='password' placeholder='Ingrese Contraseña' tabIndex={0} />
          </label>
        </div>
        <div className='div_information text-center text-red-500 text-xs my-4'>
          <p className='p_information'>{information}</p>
        </div>
        <div className='flex items-center justify-center'>
          <button className='button_submit_Form bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit' tabIndex={0}>
            Iniciar Sesión
          </button>
        </div>
        <div className='pt-5 text-right'>
          <button type='button' className='text-gray-600 text-xs italic hover:text-blue-600 py-4' tabIndex={0}>¿Olvidó su contraseña?</button>
        </div>
      </form>
      <ExitModal isOpen={modalIsOpen} onCloseModal={handleCloseModal} onConfirm={handlePasswordExpired}>⚠ ¡Se vencio la constraseña! ⚠</ExitModal>
    </>
  );
};

export default Form;
