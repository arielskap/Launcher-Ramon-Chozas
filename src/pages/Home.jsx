import React from 'react';
import ButtonMenu from '../components/ButtonMenu';
import '../assets/styles/Home.scss';
import logoChozas from '../assets/static/logo_chozas2.png';
import imgPerfil from '../assets/static/thrall.jpg';
import Table from '../components/Table';

const Home = () => {
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
              <ButtonMenu>Ramon Chozas SA</ButtonMenu>
              <ButtonMenu>Mantenimiento</ButtonMenu>
              <ButtonMenu>Partes</ButtonMenu>
            </div>
            <div className='flex justify-center'>
              <button type='button' className='bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-8 border border-teal-700 rounded'>Salir</button>
            </div>
          </div>
          <Table />
        </div>
      </div>
    </section>
  );
};

export default Home;
