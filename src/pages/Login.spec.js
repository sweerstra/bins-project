import React from 'react';
import Login from './Login';
import { cleanup, fireEvent, render, renderWithRouter, wait, waitForElement } from '../test-utils';
import { verify } from '../api/user';

jest.mock('../api/user');

const onVerify = jest.fn();
const setup = () => render(
  <Login isAuthenticated={false} onVerify={onVerify} />
);

describe('<Login />', () => {
  afterEach(() => {
    cleanup();
    verify.mockClear();
  });

  it('shouldn\'t be able to login with username or password missing', async () => {
    const { getByText } = setup();
    fireEvent.click(getByText(/Confirm/i));

    await wait(() => {
      expect(verify).not.toHaveBeenCalled();
    });
  });

  it('should reject login with invalid username or password', async () => {
    verify.mockRejectedValueOnce('Not verified');

    const { getByTestId, getByLabelText } = setup();
    fireEvent.change(getByLabelText(/Username/i), { target: { value: 'username' } });
    fireEvent.change(getByLabelText(/Password/i), { target: { value: 'password' } });
    fireEvent.submit(getByTestId('login-form'));

    const [usernameInput, passwordInput] = await waitForElement(() => [
      getByLabelText(/Username/i),
      getByLabelText(/Password/i)
    ]);

    expect(usernameInput.value).toBe('');
    expect(passwordInput.value).toBe('');
  });

  it('should verify login with correct username and password', async () => {
    const userData = { token: 'abcd' };
    verify.mockResolvedValueOnce(Promise.resolve(userData));

    const { getByTestId, getByLabelText } = setup();
    fireEvent.change(getByLabelText(/Username/i), { target: { value: 'username' } });
    fireEvent.change(getByLabelText(/Password/i), { target: { value: 'password' } });
    fireEvent.submit(getByTestId('login-form'));

    await wait(() => {
      expect(verify).toHaveBeenCalledTimes(1);
      expect(onVerify).toHaveBeenCalledTimes(1);
      expect(onVerify).toHaveBeenCalledWith(userData);
    });
  });

  it('should initially focus on username input', () => {
    const { getByLabelText } = setup();
    const usernameInput = getByLabelText(/Username/i);
    expect(document.activeElement).toEqual(usernameInput);
  });

  it('should redirect to bins when already authenticated', () => {
    const { history } = renderWithRouter(
      <Login isAuthenticated={true} onVerify={onVerify} />
    );
    expect(history.location.pathname).toEqual('/bins');
  });

  it('read-only link should redirect to bins', async () => {
    const { getByText } = setup();
    expect(getByText(/read-only/i)).toHaveAttribute('href', '/bins');
  });
});
