import React from 'react';

import './styles/style.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      contraseña: '',
    };
  }

  handlerChange = (event) => {
    const nam = event.target.name;
    const val = event.target.value;
    this.setState({ [nam]: val });
  }

  render() {
    let aviso1 = '';
    let aviso2 = '';
    if (!this.state.username) {
      aviso1 = (
        <p>Ingrese el usuario</p>
      );
    } else {
      aviso1 = '';
    }
    if (!this.state.contraseña) {
      aviso2 = (<p>Ingrese su contraseña</p>);
    } else {
      aviso2 = '';
    }

    return (
      <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='username'>
            Usuario
            <input onChange={this.handlerChange} className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline' name='username' id='username' type='text' placeholder='Usuario' />
          </label>
          <p className='text-red-500 text-xs italic'>{aviso1}</p>
        </div>
        <div className='mb-6'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
            Contraseña
            <input onChange={this.handlerChange} className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline' name='contraseña' id='password' type='password' placeholder='Ingrese Contraseña' />
          </label>
          <p className='text-red-500 text-xs italic'>{aviso2}</p>
        </div>
        <div className='flex items-center justify-end'>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit'>
            Iniciar Sesión
          </button>
        </div>
      </form>
    );
  }
}

export default Login;
