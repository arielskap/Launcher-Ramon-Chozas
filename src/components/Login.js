import React from 'react';

import './styles/style.css';
import './styles/Modal.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      contraseña: '',
    };
  }

  handleSubmit = (e) => {

    e.preventDefault();
    const { username, contraseña } = this.state;
    if (username === '') {
      document.querySelector('#username').classList.add('border-red-500');
    }
    if (contraseña === '') {
      document.querySelector('#password').classList.add('border-red-500');
    }
    // alert(`You are submitting ${username} ${contraseña}`);

    if ((username !== 'fib' && username !== '') || (contraseña !== '' && contraseña !== '12345')) {
      document.querySelector('#modal').classList = 'visible';
      document.querySelector('#aviso1').innerText = 'Usuario incorrecto';
      document.querySelector('#aviso2').innerText = 'Contraseña Incorrecta';
    }

  }

  handleChange = (e) => {
    const nam = e.target.name;
    const val = e.target.value;
    this.setState({ [nam]: val });
  }

  onClose = (e) => {
    document.querySelector('#modal').classList = 'invisible';
  }

  render() {
    return (
      <>

        <form className='Login shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={(this.handleSubmit)}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='username'>
              Usuario
              <input onChange={this.handleChange} className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline' name='username' id='username' type='text' placeholder='Usuario' />
            </label>
            <p id='aviso1' className='text-left text-red-500 text-xs italic' />
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
              Contraseña
              <input onChange={this.handleChange} className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline' name='contraseña' id='password' type='password' placeholder='Ingrese Contraseña' />
            </label>
            <p id='aviso2' className='text-left text-red-500 text-xs italic' />
          </div>
          <div className='flex items-center justify-end'>
            <button onClick={this.handleClick} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit'>
              Iniciar Sesión
            </button>
          </div>
          <div className='pt-5 text-right'>
            <a href='/' className='text-gray-600 text-xs italic hover:text-blue-600 py-4'>¿Olvidó su contraseña?</a>
          </div>
        </form>
        <div id='modal' className='Modal invisible'>
          <div className='Modal__container'>
            <div>
              <h1> Usuario y/o contraseña incorrectos por favor verifique e intente nuevamente </h1>
              <button type='button' onClick={this.onClose} className='Modal__close-button'>X</button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Login;
