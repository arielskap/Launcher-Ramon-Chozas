import React from 'react';

const ButtonMenu = ({ children, onClick }) => {
  return (
    <>
      <button onClick={onClick} type='button' className='my-3 shadow-lg bg-transparent hover:bg-blue-500 text-white-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>{children}</button>
    </>
  );
};

export default ButtonMenu;
