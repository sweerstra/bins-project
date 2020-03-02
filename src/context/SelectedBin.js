import React, { createContext, useContext, useState } from 'react';

export const SelectedBinContext = createContext();
export const SelectedBinProvider = ({ children }) => {
  const [selectedBin, setSelectedBin] = useState({});

  return (
    <SelectedBinContext.Provider
      value={{ selectedBin, setSelectedBin }}
    >
      {children}
    </SelectedBinContext.Provider>
  );
};

export const useSelectedBin = () => useContext(SelectedBinContext);
