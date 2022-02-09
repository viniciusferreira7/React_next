import { useContext } from 'react';
import { GlobalContext } from '../../contexts/AppContext';

export const P = () => {
  const context = useContext(GlobalContext);
  const {
    contextValue: { body, counter },
    setContextValue,
  } = context;
  return (
    <p onClick={() => setContextValue((c) => ({ ...c, counter: c.counter + 1 }))}>
      {body}, {counter}
    </p>
  );
};
