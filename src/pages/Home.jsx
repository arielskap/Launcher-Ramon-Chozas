import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { ipcRenderer } from 'electron';
import ButtonMenu from '../components/ButtonMenu';
import TableCarousel from '../components/TableCarousel';
import ExitModal from '../components/ExitModal';
import { logout, openAPP, install } from '../renderer-process';
import '../assets/styles/home.css';
import logoChozas from '../assets/static/logo_chozas2.png';
import imgPerfil from '../assets/static/thrall.jpg';
import animateCSS from '../funciones';

const Home = () => {
  const [modalExitIsOpen, setModalExitIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const history = useHistory();
  const elementDOM = useRef('');

  const handleCloseModal = () => {
    animateCSS('.Modal__container', 'slideOutUp faster', () => {
      setModalExitIsOpen(false);
      setModalIsOpen(false);
    });
    animateCSS('.Modal', 'fadeOut faster');
  };

  const handleOpenModalExit = () => {
    setModalExitIsOpen(true);
  };

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseApp = () => {
    window.close();
  };

  const handleLogOut = () => {
    logout();
    history.push('/');
  };

  const handleOpenApp = (element, aplication) => {
    const queryElement = document.querySelector(`.${element}`);
    elementDOM.current = document.querySelector(`.${element}`);
    openAPP(aplication);
    queryElement.setAttribute('disabled', '');
    queryElement.classList.add('bg-blue-500', 'text-white', 'border-transparent');
    queryElement.classList.remove('bg-transparent', 'text-white-700', 'border-blue-500');
    document.body.classList.add('cursor-wait');

  };

  useEffect(() => {
    ipcRenderer.once('reply-open-app', (event, argsJSON) => {
      console.log(argsJSON);
      document.body.classList.remove('cursor-wait');
    });

    ipcRenderer.once('reply-close-app', (event, argsJSON) => {
      console.log(argsJSON);
      elementDOM.current.removeAttribute('disabled');
      elementDOM.current.classList.add('bg-transparent', 'text-white-700', 'border-blue-500');
      elementDOM.current.classList.remove('bg-blue-500', 'text-white', 'border-transparent');
    });

    ipcRenderer.once('reply-install-app', (event, argsJSON) => {
      console.log(argsJSON);
    });
  }, []);

  const { firstName, lastName, listApp } = JSON.parse(localStorage.getItem('user'));
  return (
    <section className='Home p-4 h-full w-full flex flex-col animated fadeIn text-white'>
      <div className='Home__header flex items-center justify-between'>
        <div className='w-24'>
          <img className='object-contain h-full w-full' src={logoChozas} alt='Logo Chozas' />
        </div>
        <div className='flex items-center justify-center text-2xl'>
          <h1>Ramon Chozas S.A</h1>
        </div>
        <div className='flex justify-end items-center mr-12 div_perfil'>
          <div className='w-16'>
            <img className='rounded-full object-contain h-full w-full' src={imgPerfil} alt='Perfil' />
          </div>
          <div className='ml-4 text-xl'>
            <p>{`${firstName} ${lastName}`}</p>
          </div>
        </div>
      </div>
      <div className='Home__body'>
        <div className='grid grid-cols-2 gap-4 div_menu pt-6'>
          <div className='flex flex-col justify-between text-xl'>
            <div className='flex justify-center flex-col px-12'>
              {listApp.map((app, index) => {
                const { name, alias, status } = app;
                const id = index;
                const className = `button__${name}`;
                return (
                  <div className='w-full' key={id}>
                    <ButtonMenu
                      className={className}
                      onClick={() => {
                        handleOpenApp(className, name);
                      }}
                    >
                      {alias}
                    </ButtonMenu>
                  </div>
                );
              })}
            </div>
            <div className='flex justify-around'>
              <div>
                <button onClick={handleOpenModal} type='button' className='bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-8 border border-teal-700 rounded'>Cerrar Sesión</button>
                <ExitModal isOpen={modalIsOpen} onCloseModal={handleCloseModal} onConfirm={handleLogOut}>¿Seguro/a que quieres cerrar sesión?</ExitModal>
              </div>
              <div>
                <button onClick={handleOpenModalExit} type='button' className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-8 border border-red-700 rounded'>Salir</button>
                <ExitModal isOpen={modalExitIsOpen} onCloseModal={handleCloseModal} onConfirm={handleCloseApp}>¿Seguro/a que quieres salir?</ExitModal>
              </div>
            </div>
          </div>
          <TableCarousel />
        </div>
      </div>
    </section>
  );
};

export default Home;
