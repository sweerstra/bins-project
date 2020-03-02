import React from 'react';
import Navbar from './Navbar';
import { AuthContext } from '../../context/Auth';
import { fireEvent, render, cleanup } from '../../test-utils';

const onViewLibraries = jest.fn();
const onViewSettings = jest.fn();
const initialProps = {
  alert: {},
  onViewLibraries,
  onViewSettings
};

const logout = jest.fn();
const setup = ({ isAuthenticated }) => render(
  <AuthContext.Provider value={{ isAuthenticated, logout }}>
    <Navbar {...initialProps} />
  </AuthContext.Provider>
);

describe('<Navbar />', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('view libraries', () => {
    const { getByText } = setup({ isAuthenticated: false });
    fireEvent.click(getByText(/Libraries/i));
    expect(onViewLibraries).toHaveBeenCalled();
  });

  it('view settings', () => {
    const { getByText } = setup({ isAuthenticated: false });
    fireEvent.click(getByText(/Settings/i));
    expect(onViewSettings).toHaveBeenCalled();
  });

  it('logs out when authenticated', () => {
    const { getByTestId } = setup({ isAuthenticated: true });
    fireEvent.click(getByTestId('navbar-status-button'));
    expect(logout).toHaveBeenCalled();
  });

  it('won\'t log out out when unauthenticated', () => {
    const { getByTestId } = setup({ isAuthenticated: false });
    fireEvent.click(getByTestId('navbar-status-button'));
    expect(logout).not.toHaveBeenCalled();
  });

  it('authenticated status', () => {
    const { getByTestId } = setup({ isAuthenticated: true });
    expect(getByTestId('navbar-status-button').textContent).toContain('✔');
  });

  it('unauthenticated status', () => {
    const { getByTestId } = setup({ isAuthenticated: false });
    expect(getByTestId('navbar-status-button').textContent).toContain('❌');
  });
});
