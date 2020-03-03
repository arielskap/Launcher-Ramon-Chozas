import React from 'react';

import './style.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '' };

  }

    myChangeHandler = (e) => {
      this.setState({ username: e.target.value });

    }

    handleClick = (e) => {
      const user = this.state.username;
      if (user === '') {
        document.getElementById('aviso').innerText = 'Los campos están vacios';
      }
    }

    render() {
      return (
        <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='username'>
              Usuario
              <input onChange={this.myChangeHandler} className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline' name='fname' id='username' type='text' placeholder='Usuario' />
            </label>
            <p id='usuario' className='text-red-500 text-xs italic'>Ingrese Usuario.</p>
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
              Contraseña
              <input className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline' id='password' type='password' placeholder='Ingrese Contraseña' />
            </label>
            <p className='text-red-500 text-xs italic'>Ingrese Contraseña.</p>
          </div>
          <div className='flex items-center justify-end'>
            <button onClick={this.handleClick} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit'>
              Iniciar Sesión
            </button>
          </div>
          <div className='text-red-500 text-xs italic' id='aviso' />
        </form>
      );
    }
}

export default Login;
