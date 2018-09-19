import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Editor from '../pages/Editor/Editor';
import Passphrase from '../pages/Passphrase/Passphrase';
import './App.css';

const App = () => (
  <div className="App">
    <Switch>
      <Route path="/bin" component={Editor}/>
      <Route exact path="/passphrase" component={Passphrase}/>
      <Redirect to="/passphrase"/>
    </Switch>
  </div>
);

export default App;
