import React from 'react';

const Card = ({ title, img, imgAlt, children, time }) => {
  return (
    <div>
      <div className='mb-2 text-lg font-semibold text-center'>
        <h2>{title}</h2>
      </div>
      <div>
        <img className='object-contain h-full w-full' src={img} alt={imgAlt} />
      </div>
      <div>
        <p>{children}</p>
      </div>
      <div className='text-white text-sm italic text-right mt-1'>
        <p>{time}</p>
      </div>
    </div>
  );
};

export default Card;
