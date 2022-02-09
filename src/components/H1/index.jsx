import { useContext } from 'react';
import { GlobalContext } from '../../contexts/AppContext';

export const H1 = () => {
  const context = useContext(GlobalContext);
  const {
    contextValue: { title, counter },
  } = context;
  return (
    <>
      <h1>
        {title} {counter}
      </h1>
    </>
  );
};
