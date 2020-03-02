import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from '../../pages/Login';
import Dashboard from '../../pages/Dashboard';
import { checkAuth } from '../../api/user';
import { useAuth } from '../../context/Auth';

export default function App() {
  const { isAuthenticated, login, logout } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      // checkAuth().catch(logout);
    }
  }, [isAuthenticated]);

  function onLogin({ token }) {
    login(token);
  }

  const PrivateRoute = props => (
    <>
      {isAuthenticated ? props.children : <Redirect to="/login" />}
    </>
  );

  return (
    <Switch>
      <Route exact path="/login">
        <Login onVerify={onLogin} isAuthenticated={isAuthenticated} />
      </Route>
      <PrivateRoute path="/bins/:id?">
        <Dashboard />
      </PrivateRoute>
      <Redirect to="/login" />
    </Switch>
  );
}
