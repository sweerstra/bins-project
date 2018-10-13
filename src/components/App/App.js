import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Dashboard from '../../pages/Dashboard';
import Passphrase from '../../pages/Passphrase';
import { storage } from '../../api/storage';
import { checkAuth } from '../../api/user';

class App extends Component {
  state = {
    authenticated: !!storage.get('token')
  };

  componentDidMount() {
    this.state.authenticated && checkAuth()
      .catch(() => this.setAuthenticated(false));
  }

  setAuthenticated = (authenticated, token) => {
    if (!authenticated) {
      storage.remove('token');
    } else {
      if (token) {
        storage.set('token', token);
      }
    }

    this.setState({ authenticated });
  };

  render() {
    const { authenticated } = this.state;

    const withAuthStatus = (Component) => (props) => (
      <Component
        authenticated={authenticated}
        setAuthenticated={this.setAuthenticated}
        {...props}/>
    );

    return (
      <div>
        <Switch>
          <Route path="/bins/:id?" render={withAuthStatus(Dashboard)}/>
          <Route exact path="/passphrase" render={withAuthStatus(Passphrase)}/>
          <Redirect to="/passphrase"/>
        </Switch>
      </div>
    );
  }
}

export default App;
