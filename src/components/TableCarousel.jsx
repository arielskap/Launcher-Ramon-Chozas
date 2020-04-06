import React, { useEffect } from 'react';
import Swiper from 'swiper';
import Card from './Card';
import '../assets/styles/tableCarousel.css';
import 'swiper/css/swiper.css';
import json from '../jsons/table.json';
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
    <div className='div_table border-2 border-teal-500 shadow-2xl rounded'>
      <div className='swiper-container'>
        <div className='swiper-wrapper'>
          {json.map((element) => {
            const { id, title, imgAlt, time } = element;
            let { img } = element;
            switch (img) {
              case 1:
                img = first;
                break;
              case 2:
                img = second;
                break;
              case 3:
                img = third;
                break;
            }
            return (
              <div className='swiper-slide p-12' key={id}>
                <Card title={title} img={img} imgAlt={imgAlt} time={time} />
              </div>
            );
          })}
        </div>

        <div className='swiper-button-next' />
        <div className='swiper-button-prev' />
        <div className='swiper-pagination' />
      </div>
    </div>

  );
};

export default TableCarousel;
