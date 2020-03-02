import { useState } from 'react';
import { storage } from '../api/storage';

export function useAuthentication() {
  const [isAuthenticated, setAuthenticated] = useState(!!storage.get('token'));

  function setToken(token) {
    setAuthenticated(Boolean(token));

    if (token) {
      storage.set('token', token);
    } else {
      storage.remove('token');
    }
  }

  return { isAuthenticated, setToken };
}
