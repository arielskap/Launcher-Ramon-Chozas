import React, { useState } from 'react';
import '../assets/styles/ForgetPass.scss';
import ForgetPassDetails from './ForgetPassDetails';

const ForgetPassContainer = () => {
  const handleChange = () => {
    if (document.querySelector('#username').value && document.querySelector('#dni').value) {
      document.querySelector('#btnForm').classList.remove('opacity-50', 'cursor-not-allowed');
      document.querySelector('#btnForm').removeAttribute('disabled');
    } else {
      if (!document.querySelector('#btnForm').hasAttribute('disabled')) {
        document.querySelector('#btnForm').setAttribute('disabled', '');
        document.querySelector('#btnForm').classList.add('opacity-50', 'cursor-not-allowed');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Se envio(?');
  };

  const handleNextPage = (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-use-before-define
    setData({
      title: 'Paso 2 - Confirmar',
      hasSupervisor: true,
      buttonText: 'Restaurar',
      handleSubmit,
    });
  };

  const [data, setData] = useState({
    title: 'Paso 1 - Solicitud de Supervisores',
    hasSupervisor: false,
    buttonText: 'Siguiente',
    handleSubmit: handleNextPage,
  });

  return (
    <ForgetPassDetails title={data.title} hasSupervisor={data.hasSupervisor} buttonText={data.buttonText} handleChange={handleChange} handleSubmit={data.handleSubmit} />
  );
};

export default ForgetPassContainer;
/*
<h2>Paso 2 - Confirmar </h2>
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='username'>
          Usuario:
          <input onChange={handleChange2} className='mt-1 h-10 shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline' autoComplete='username' type='text' name='username' id='username' placeholder='Ingresar Usuario' />
        </label>
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='dni'>
          DNI:
          <input onChange={handleChange2} className='mt-1 h-10 shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline' autoComplete='dni' type='text' name='dni' id='dni' placeholder='Ingrese el DNI' />
        </label>

        <div className='flex items-center justify-center'>
          <button type='submit' id='prevBtn' className='button_submit_Form bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline opacity-50 cursor-not-allowed'>Restaurar</button>
        </div>
      </div>
      <div id='circles' className='flex item-center justify-center pt-6'>
        <span className='step1' />
        <span className='step2' />
      </div>*/
