import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './ui/theme';
import { GlobalStyle } from './ui/global';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import { AuthProvider } from './context/Auth';

render(
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <Router>
        <GlobalStyle/>
        <App/>
      </Router>
    </AuthProvider>
  </ThemeProvider>,
  document.getElementById('root')
);

registerServiceWorker();
