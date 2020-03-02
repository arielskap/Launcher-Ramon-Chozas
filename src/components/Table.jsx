import React, { useEffect } from 'react';
import Card from './Card';
import '../assets/styles/Table.scss';
import first from '../assets/static/1.png';
import second from '../assets/static/2.png';
import third from '../assets/static/3.png';

const Table = () => {
  useEffect(() => {
    document.querySelector('.div_table').scrollTo(0, document.body.scrollHeight);
  });
  return (
    <div className='p-4 border-2 border-teal-500 shadow-2xl max-h-full div_table overflow-auto'>
      <Card title='BIENVENIDA' img={third} imgAlt='Ariel Villarreal' time='10:21 07/01/2019' />
      <hr className='separator' />
      <Card title='FELIZ CUMPLEAÑOS' img={second} imgAlt='Magdalena Pujato' time='12:17 17/10/2019' />
      <hr className='separator' />
      <Card title='BIENVENIDA' img={first} imgAlt='María Luján Araneo' time='09:39 02/03/2020' />
    </div>
  );
};

export default Table;
