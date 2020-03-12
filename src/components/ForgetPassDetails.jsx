import React from 'react';

const ForgetPassDetails = ({ title, hasSupervisor, buttonText, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} id='regForm' className='Form border-solid border-2 border-white rounded-lg shadow-2xl px-8 pt-6 pb-8 mb-4 animated fadeIn'>
      <div className='tab'>
        <h2>{title}</h2>
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='username'>
          Usuario:
          <input onChange={handleChange} className='mt-1 h-10 shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline' autoComplete='username' type='text' name='username' id='username' placeholder='Ingresar Usuario' />
        </label>
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='dni'>
          DNI:
          <input onChange={handleChange} className='mt-1 h-10 shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline' autoComplete='dni' type='text' name='dni' id='dni' placeholder='Ingrese el DNI' />
        </label>
        {hasSupervisor && (
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='supervisor'>
            Supervisor:
            <select onChange={handleChange} className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline' id='supervisor' name='supervisor' required>
              <option value=''>--Supervisor--</option>
              <option value='Alfredo Guillot'>Alfredo Guillot</option>
              <option value='Ariel Villareal'>Ariel Villareal</option>
              <option value='Abbul'>Abbul Rodriguez</option>
            </select>
          </label>
        )}
        <div className='flex items-center justify-center'>
          <button type='submit' id='btnForm' className='button_submit_Form bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline opacity-50 cursor-not-allowed' disabled>{buttonText}</button>
        </div>
      </div>
      <div id='circles' className='flex item-center justify-center pt-6'>
        <span className='step1' />
        <span className='step2' />
      </div>
    </form>
  );
};

export default ForgetPassDetails;
