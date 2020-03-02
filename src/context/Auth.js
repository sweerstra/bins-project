import React, { createContext, useContext, useState } from 'react';
import { storage } from '../api/storage';

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(Boolean(storage.get('token')));

  function login(token) {
    setAuthenticated(true);
    storage.set('token', token);
  }

  function logout() {
    setAuthenticated(false);
    storage.remove('token');
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
