import React from 'react';
import '../assets/styles/ForgetPass.scss';

class ForgetPass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        username: '',
        dni: '',
        supervisor: '',
      },
    };
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });

  };

 handleSubmit = (e) => {
   const username = document.querySelector('#username');
   const dni = document.querySelector('#dni');
   e.preventDefault();
   if (this.state.form.username === '' || this.state.form.dni === '') {
     username.classList.add('border-red-500');
     dni.classList.add('border-red-500');
   }

   if (this.state.form.username !== '' && this.state.form.dni !== '') {
     document.querySelector('.tab2').classList.replace('hidden', 'block');
     document.querySelector('.tab').classList.add('hidden');
   }
 }

handleChange2 = (e) => {
  this.setState({
    form: {
      ...this.state.form,
      [e.target.name]: e.target.value,
    },
  });
};

render() {
  if (this.state.form.username !== '' && this.state.form.dni !== '') {
    document.querySelector('.button_submit_Form').classList.remove('opacity-50', 'cursor-not-allowed');
  }

  return (
    <form onSubmit={this.handleSubmit} id='regForm' className='Form border-solid border-2 border-white rounded-lg shadow-2xl px-8 pt-6 pb-8 mb-4 animated fadeIn'>
      <div className='tab'>
        <h2>Paso 1 - Solicitud de Supervisores</h2>
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='username'>
          Usuario:
          <input onChange={this.handleChange} className='mt-1 h-10 shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline' autoComplete='username' type='text' name='username' id='username' placeholder='Ingresar Usuario' />
        </label>
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='dni'>
          DNI:
          <input onChange={this.handleChange} className='mt-1 h-10 shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline' autoComplete='dni' type='text' name='dni' id='dni' placeholder='Ingrese el DNI' />
        </label>
        <div className='flex items-center justify-center'>
          <button type='submit' id='nextBtn' className='button_submit_Form bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline opacity-50 cursor-not-allowed'>Siguiente</button>
          <h1>{this.state.username}</h1>
        </div>
      </div>
      <div className='tab2 hidden'>
        <h2>Paso 2 - Confirmar </h2>
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='username'>
          Usuario:
          <input onChange={this.handleChange2} className='mt-1 h-10 shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline' autoComplete='username' type='text' name='username' id='username' placeholder='Ingresar Usuario' />
        </label>
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='dni'>
          DNI:
          <input onChange={this.handleChange2} className='mt-1 h-10 shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline' autoComplete='dni' type='text' name='dni' id='dni' placeholder='Ingrese el DNI' />
        </label>
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='supervisor'>
          Supervisor:
          <select value={this.state.form.supervisor} onChange={this.handleChange2} className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline' id='supervisor' name='supervisor'>
            <option value='Alfredo Guillot'>Alfredo Guillot</option>
            <option value='Ariel Villareal'>Ariel Villareal</option>
            <option value='Abbul'>Abbul </option>
          </select>
        </label>
        <div className='flex items-center justify-center'>
          <button type='submit' id='prevBtn' className='button_submit_Form bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline opacity-50 cursor-not-allowed'>Restaurar</button>
        </div>
      </div>
      <div id='circles' className='flex item-center justify-center pt-6'>
        <span className='step1' />
        <span className='step2' />
      </div>
    </form>

  );
}
}

export default ForgetPass;
