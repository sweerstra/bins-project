import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Dashboard from '../../pages/Dashboard';
import Passphrase from '../../pages/Passphrase';

const App = () => (
  <div>
    <Switch>
      <Route path="/bins/:id?" component={Dashboard}/>
      <Route exact path="/passphrase" component={Passphrase}/>
      <Redirect to="/passphrase"/>
    </Switch>
  </div>
);

export default App;
