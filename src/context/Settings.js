import React, { createContext, useContext, useState } from 'react';
import { settings as initialSettings } from '../constants/presets';

export const SettingsContext = createContext();
export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(initialSettings);

  return (
    <SettingsContext.Provider
      value={{ settings, setSettings }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
