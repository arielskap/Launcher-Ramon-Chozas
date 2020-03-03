import React, { useState } from 'react';
import ButtonMenu from '../components/ButtonMenu';
import TableCarousel from '../components/TableCarousel';
import ExitModal from '../components/ExitModal';
import { logout, openAPP } from '../renderer-process';
import '../assets/styles/Home.scss';
import logoChozas from '../assets/static/logo_chozas2.png';
import imgPerfil from '../assets/static/thrall.jpg';

const Home = () => {
  const [modalExitIsOpen, setModalExitIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleCloseModal = () => {
    setModalExitIsOpen(false);
    setModalIsOpen(false);
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
  };

  return (
    <section className='Home p-4 h-full w-full flex flex-col animated fadeIn'>
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
            <p>Ariel Villarreal</p>
          </div>
        </div>
      </div>
      <div className='Home__body'>
        <div className='grid grid-cols-2 gap-4 div_menu pt-6'>
          <div className='flex flex-col justify-between text-xl'>
            <div className='flex justify-center flex-col px-12'>
              <ButtonMenu onClick={() => {
                openAPP('sistema_chozas');
              }}
              >
                Ramon Chozas SA
              </ButtonMenu>
              <ButtonMenu onClick={() => {
                openAPP('hoja_de_ruta');
              }}
              >
                Hoja de Ruta
              </ButtonMenu>
              <ButtonMenu>Mantenimiento</ButtonMenu>
              <ButtonMenu>Partes</ButtonMenu>
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
