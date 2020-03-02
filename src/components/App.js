import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './Home';
import Login from './Login';



function App(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path='/home' component={Home} />
                <Route exact path='/home/login' component={Login} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;