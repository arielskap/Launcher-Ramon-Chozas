import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Form from '../components/Form';
import Logo from '../assets/static/logo_chozas2.png';
import '../assets/styles/Login.scss';

class Home extends React.Component {

  render() {

    return (
      <main className='Login w-full h-full'>
        <div id='inicio' className='w-full h-full flex items-center justify-center flex-col'>
          <div className='h-48' id='imgChozas'>
            <img className='object-contain h-full w-full' src={Logo} alt='Logo' />
          </div>
          <div>
            <Switch>
              <Route exact path='/'>
                <Form />
              </Route>
              <Route path='/expired'>
                <Form />
              </Route>
            </Switch>
          </div>
        </div>
      </main>
    );
  }
}

export default Home;
