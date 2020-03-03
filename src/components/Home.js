import React from 'react';

import Logo from '../images/logo_chozas2.png';
import './styles/style.css';
import Login from './Login';

class Home extends React.Component {

  render() {

    return (
      <main className='w-screen h-screen'>
        <div id='inicio'>
          <div className='p-5' id='imgChozas'>
            <img className='w-full' src={Logo} alt='Logo' />
          </div>
          <div>
            <h1 className='text-center text-white pb-4'>
              Ramón Chozas S.A
            </h1>
          </div>
          <div className='text-center'>
            <Login />
          </div>
        </div>
      </main>
    );
  }
}

export default Home;
