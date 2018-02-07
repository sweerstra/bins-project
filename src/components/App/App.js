import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Editor from '../../pages/editor';
import Passphrase from '../../pages/passphrase';
// import PermissionApi from '../../api/permission';
import './App.css';

const App = () => (
  <div className="App">
    <Switch>
      <Route path="/bin" component={Editor}/>
      <Route exact path="/passphrase" component={Passphrase}/>
      <Redirect to="/"/>
    </Switch>
  </div>
);

export default App;
