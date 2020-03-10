import React from 'react';
import { Switch, Route } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import Logo from '../assets/static/logo_chozas2.png';
import '../assets/styles/Login.scss';

const Home = () => {
  const handleCloseApp = () => {
    window.close();
  };

  return (
    <main className='Login w-full h-full'>
      <div id='inicio' className='w-full h-full flex items-center justify-center flex-col'>
        <div className='w-48 mb-8' id='imgChozas'>
          <img className='object-contain h-full w-full' src={Logo} alt='Logo' />
        </div>
        <div className='div__forms'>
          <Switch>
            <Route exact path='/'>
              <FormContainer />
            </Route>
            <Route path='/expired'>
              <FormContainer />
            </Route>
          </Switch>
        </div>
        <div>
          <button className='text-center italic text-white hover:underline' type='button' onClick={handleCloseApp}>Salir</button>
        </div>
      </div>
    </main>
  );
};

export default Home;
