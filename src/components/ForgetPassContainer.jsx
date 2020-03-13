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
    document.querySelector('.step1').classList.replace('bg-gray-700', 'bg-gray-500');
    document.querySelector('.step2').classList.replace('bg-gray-500', 'bg-gray-700');
    document.querySelector('#btnForm').setAttribute('disabled', '');
    document.querySelector('#btnForm').classList.add('opacity-50', 'cursor-not-allowed');
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

// if (document.querySelector('#username').value && document.querySelector('#dni').value && document.querySelector('#supervisor').value) {
//   document.querySelector('#btnForm').classList.remove('opacity-50', 'cursor-not-allowed');
//   document.querySelector('#btnForm').removeAttribute('disabled');
// } else {
//   if (!document.querySelector('#btnForm').hasAttribute('disabled')) {
//     document.querySelector('#btnForm').setAttribute('disabled', '');
//     document.querySelector('#btnForm').classList.add('opacity-50', 'cursor-not-allowed');
//   }
// }
// if (document.querySelector('.step1').classList.contains('bg-gray-700')) {
//   document.querySelector('.step1').classList.replace('bg-gray-700, bg-gray-500');
//   document.querySelector('.step2').classList.replace('bg-gray-500, bg-gray-700');
// }
