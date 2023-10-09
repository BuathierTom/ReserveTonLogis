import React, { createContext, useContext, useState } from 'react';

const ConnectContext = createContext();

export const ConnectProvider = ({ children }) => {
  const [connected, setConnected] = useState(false);

  return (
    <ConnectContext.Provider value={{ connected, setConnected }}>
      {children}
    </ConnectContext.Provider>
  );
};

export const useConnect = () => {
  return useContext(ConnectContext);
};
