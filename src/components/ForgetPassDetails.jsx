import React from 'react';
import Form from './Form';
import BackToLogin from './BackToLogin';
import InformationModal from './InformationModal';
import '../assets/styles/ForgetPass.scss';
import info from '../assets/static/info.svg';
import Input from './Input';

/*onChange={handleChange}*/
const ForgetPassDetails = ({ title, step, hasSupervisor, buttonText, handles, modalIsOpen, setModalIsOpen }) => {
  const { handleChange, handleSubmit, handleCloseModal } = handles;

  const Combobox = () => {
    if (document.querySelector('#supervisor').value) {
      document.querySelector('#btnForm').classList.remove('opacity-50', 'cursor-not-allowed');
      document.querySelector('#btnForm').removeAttribute('disabled');
    }
  };

  return (
    <>
      <Form handleSubmit={handleSubmit}>
        <div className='tab'>
          <div className='flex justify-around'>
            <BackToLogin />
            <button type='button' onClick={() => setModalIsOpen(true)}>
              <img className='object-contain h-full w-6' src={info} alt='Información' />
            </button>
          </div>
          <div className='mt-4 text-center'>
            <div>
              <h2 className='text-lg font-bold'>{title}</h2>
            </div>
            <div>
              <h3 className='font-bold text-lg'>
                Paso
                {step}
              </h3>
            </div>
          </div>
          <Input id='username' placeholder='Ingresar Usuario' handleChange={handleChange} type='text'>Usuario:</Input>
          <Input id='dni' placeholder='Ingrese el DNI' handleChange={handleChange} type='number'>DNI:</Input>
          {hasSupervisor && (
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='supervisor'>
              Supervisor:
              <select onChange={Combobox} className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline' id='supervisor' name='supervisor' required>
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
          <span className='step1 bg-gray-700' />
          <span className='step2 bg-gray-500' />
        </div>
      </Form>
      <InformationModal isOpen={modalIsOpen} onCloseModal={handleCloseModal}>
        Una vez completados los datos se le enviara un email al supervisor seleccionado (Asegurese que el mismo se encuentra en la empresa), este email contendra una nueva contraseña temporal.
      </InformationModal>
    </>
  );
};

export default ForgetPassDetails;
