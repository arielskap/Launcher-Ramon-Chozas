import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import '../assets/styles/app.css';
import '../assets/styles/tailwind.css';
import 'animate.css/animate.min.css';

const App = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path='/'>
          <Redirect to='/form' />
        </Route>
        <Route path='/form'>
          <Login />
        </Route>
        <Route path='/home'>
          <Home />
        </Route>
      </Switch>
    </HashRouter>
  );
};

export default App;
