import React from 'react';
import { Link } from 'react-router-dom';
import ExitModal from './ExitModal';
import '../assets/styles/Form.scss';
import ver from '../assets/static/ver.svg';

const FormDetails = ({ information, modalIsOpen, handles }) => {
  const { handleCloseModal, handlePasswordExpired, handleSubmit, handleSwitchVisiblePass } = handles;
  return (
    <>
      <form className='Form border-solid border-2 border-white rounded-lg shadow-2xl px-8 pt-6 pb-8 mb-4 animated fadeIn' onSubmit={handleSubmit}>
        <Link to='/home'>
          Go to Home
        </Link>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='username'>
            Usuario:
            <input autoComplete='username' className='mt-1 h-10 shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline' name='username' id='username' type='text' placeholder='Ingrese Usuario' tabIndex={0} />
          </label>
        </div>
        <div className='mb-6'>
          <label className='block text-gray-700 text-sm font-bold mb-2 relative' htmlFor='password'>
            Contraseña:
            <input autoComplete='current-password' className='mt-1 h-10 shadow appearance-none border rounded w-full py-2 pl-3 pr-12 text-black leading-tight focus:outline-none focus:shadow-outline' name='contraseña' id='password' type='password' placeholder='Ingrese Contraseña' tabIndex={0} />
            <button className='absolute w-10 h-10 right-0 bottom-0 flex justify-center items-center opacity-50' type='button' onClick={handleSwitchVisiblePass}>
              <div className='w-5'>
                <img className='img__visiblePass object-contain w-full h-full' src={ver} alt='Ver' />
              </div>
            </button>
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

export default FormDetails;
