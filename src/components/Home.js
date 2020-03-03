import React from 'react';

import Logo from '../images/logo_chozas2.png';
import './styles/style.css';
import Login from './Login';

class Home extends React.Component {

  render() {

    return (
      <main className='w-screen h-screen'>
        <div id='inicio'>
          <div className='p-5 h-48' id='imgChozas'>
            <img className='object-contain h-full w-full' src={Logo} alt='Logo' />
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
