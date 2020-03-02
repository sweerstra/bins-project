import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react'
import { Router, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './ui/theme';
import { AuthProvider } from './context/Auth';
import { createMemoryHistory } from 'history';

const WithProviders = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  )
};

const renderWithProviders = (ui, options) => (
  render(ui, { wrapper: WithProviders, ...options })
);

const renderWithRouter = (
  ui,
  {
    path = '/',
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) => {
  return {
    ...renderWithProviders(
      <Router history={history}>
        <Route path={path}>
          {ui}
        </Route>
      </Router>
    ),
    history,
  }
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { renderWithProviders as render };
export { renderWithRouter };
