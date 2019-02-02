import React from 'react';

const SettingsContext = React.createContext({
  settings: {},
  onSettingsChange: () => {
  }
});

export default SettingsContext;
