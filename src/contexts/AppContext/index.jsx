import { createContext, useState } from 'react';
import { globalState } from './data';

export const GlobalContext = createContext();

//eslint-disable-next-line
export const AppContext = ({ children }) => {
  const [contextValue, setContextValue] = useState(globalState);

  return <GlobalContext.Provider value={{ contextValue, setContextValue }}>{children}</GlobalContext.Provider>;
};
