import React from 'react';
import { Link } from 'react-router-dom';
import ExitModal from './ExitModal';
import Form from './Form';
import '../assets/styles/form.css';
import ver from '../assets/static/ver.svg';
import Input from './Input';

const FormDetails = ({ information, modalIsOpen, handles }) => {
  const { handleCloseModal, handlePasswordExpired, handleSubmit, handleSwitchVisiblePass } = handles;
  return (
    <>
      <Form handleSubmit={handleSubmit}>
        <div className='flex justify-around'>
          <Link to='/home'>
            Go to Home
          </Link>
          <Link to='/form/expired'>
            Go to Expired pass
          </Link>
        </div>
        <div className='mb-4'>
          <Input id='username' placeholder='Ingrese Usuario' type='text'>Usuario:</Input>
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
          <Link to='/form/olvido' className='text-gray-600 text-xs italic hover:text-blue-600 py-4' tabIndex={0}>¿Olvidó su contraseña?</Link>
        </div>
      </Form>
      <ExitModal isOpen={modalIsOpen} onCloseModal={handleCloseModal} onConfirm={handlePasswordExpired}>⚠ ¡Se vencio la constraseña! ⚠</ExitModal>
    </>
  );
};

export default FormDetails;
