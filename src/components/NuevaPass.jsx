import React from 'react';
import '../assets/styles/Form.scss';

const NuevaPass = () => (

  <form className='Form border-solid border-2 border-white rounded-lg shadow-2xl px-8 pt-6 pb-8 mb-4 animated fadeIn'>
    <h2>Contraseña Vencida</h2>
    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='username'>
      Usuario:
      <input className='mt-1 h-10 shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline' autoComplete='username' type='text' name='username' placeholder='Ingresar Usuario' />
    </label>
    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
      Contraseña Actual:
      <input className='mt-1 h-10 shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline' autoComplete='password' type='text' name='password' placeholder='Ingrese contraseña actual' />
    </label>
    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
      Nueva Contraseña:
      <input className='mt-1 h-10 shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline' type='text' placeholder='Ingrese nueva contraseña' />
    </label>
    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
      Confirme Nueva Contraseña:
      <input className='mt-1 h-10 shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline' type='text' placeholder='Confirmar nueva contraseña' />
    </label>
    <div className='flex items-center justify-center'>
      <button type='button' className='button_submit_Form bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Enviar</button>
    </div>
  </form>

);

export default NuevaPass;
