import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from '../../pages/Login';
import Dashboard from '../../pages/Dashboard';
import { storage } from '../../api/storage';
import { checkAuth } from '../../api/user';

export default function App() {
  const [authenticated, setAuthenticated] = useState(!!storage.get('token'));

  useEffect(() => {
    if (authenticated) {
      checkAuth()
        .catch(() => onHandleAuthentication(false));
    }
  }, []);

  function onHandleAuthentication(auth, token) {
    if (auth) {
      if (token) {
        storage.set('token', token);
      }
    } else {
      storage.remove('token');
    }

    setAuthenticated(auth);
  }

  function withAuthentication(Component) {
    return (props) => (
      <Component
        authenticated={authenticated}
        handleAuthentication={onHandleAuthentication}
        {...props}/>
    );
  }

  return (
    <Switch>
      <Route exact path="/login" render={withAuthentication(Login)}/>
      <Route path="/bins/:id?" render={props => (
        authenticated
          ? withAuthentication(Dashboard)(props)
          : <Redirect to="/login"/>
      )}/>
      <Redirect to="/login"/>
    </Switch>
  );
}
