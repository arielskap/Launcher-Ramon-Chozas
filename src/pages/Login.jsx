import React from 'react';
import Form from '../components/Form';
import Logo from '../assets/static/logo_chozas2.png';
import '../assets/styles/LoginForm.scss';

class Home extends React.Component {

  render() {

    return (
      <main className='w-screen h-screen'>
        <div id='inicio'>
          <div className='p-5 h-48' id='imgChozas'>
            <img className='object-contain h-full w-full' src={Logo} alt='Logo' />
          </div>
          <div className='text-center'>
            <Form />
          </div>
        </div>
      </main>
    );
  }
}

export default Home;
