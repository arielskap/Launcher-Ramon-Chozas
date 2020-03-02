import React from 'react';

const Home = () => {
  return (
    <section className='Home p-4 h-full w-full flex flex-col'>
      <div className='Home__header text-center'>
        <h1>Ramon Chozas S.A</h1>
      </div>
      <div className='Home__body grid grid-cols-2 h-full'>
        <div>
          <div className='flex justify-center flex-col'>
            <button type='button'>Ramon Chozas SA</button>
            <button type='button'>Mantenimiento</button>
            <button type='button'>Partes</button>
          </div>
          <div className='flex justify-center mt-12'>
            <button type='button'>Salir</button>
          </div>
        </div>
        <div />
      </div>
    </section>
  );
};

export default Home;
