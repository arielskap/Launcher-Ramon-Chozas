import React, { useEffect } from 'react';
import Swiper from 'swiper';
import Card from './Card';
import '../assets/styles/TableCarousel.scss';
import first from '../assets/static/1.png';
import second from '../assets/static/2.png';
import third from '../assets/static/3.png';

const TableCarousel = () => {
  useEffect(() => {
    const swiper = new Swiper('.swiper-container', {
      loop: true,
      spaceBetween: 50,
      grabCursor: true,
      keyboard: {
        enabled: true,
      },
      autoplay: {
        delay: 10000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        renderBullet(index, className) {
          return `<span class="${className}">${index + 1}</span>`;
        },
      },
    });
  }, []);
  return (
    <div className='div_table'>
      <div className='swiper-container'>
        <div className='swiper-wrapper'>
          <div className='swiper-slide p-12'>
            <Card title='BIENVENIDA' img={third} imgAlt='Ariel Villarreal' time='10:21 07/01/2019' />
          </div>
          <div className='swiper-slide p-12'>
            <Card title='FELIZ CUMPLEAÑOS' img={second} imgAlt='Magdalena Pujato' time='12:17 17/10/2019' />
          </div>
          <div className='swiper-slide p-12'>
            <Card title='BIENVENIDA' img={first} imgAlt='María Luján Araneo' time='09:39 02/03/2020' />
          </div>
          <div className='swiper-slide p-12'>
            <Card title='BIENVENIDA' img={third} imgAlt='Ariel Villarreal' time='10:21 07/01/2019' />
          </div>
          <div className='swiper-slide p-12'>
            <Card title='FELIZ CUMPLEAÑOS' img={second} imgAlt='Magdalena Pujato' time='12:17 17/10/2019' />
          </div>
          <div className='swiper-slide p-12'>
            <Card title='BIENVENIDA' img={first} imgAlt='María Luján Araneo' time='09:39 02/03/2020' />
          </div>
        </div>

        <div className='swiper-button-next' />
        <div className='swiper-button-prev' />
        <div className='swiper-pagination' />
      </div>
    </div>

  );
};

export default TableCarousel;
