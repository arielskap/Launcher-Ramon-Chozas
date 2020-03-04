import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import '../assets/styles/App.scss';

const App = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/home'>
          <Home />
        </Route>
      </Switch>
    </HashRouter>
  );
};

export default App;
