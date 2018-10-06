import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './ui/theme';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';

render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root')
);

registerServiceWorker();
