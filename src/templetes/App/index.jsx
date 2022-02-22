import React, { useEffect, useRef, useState } from 'react';

import './styles.css';

export const useInterval = (callBack, delay = 1000) => {
  const saveRef = useRef();

  useEffect(() => {
    saveRef.current = callBack;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      saveRef.current();
    }, delay);

    return () => clearInterval(interval);
  }, [delay]);
};

function App() {
  const [counter, setCounter] = useState(0);
  const [delay, setDelay] = useState(1000);
  const [incrementar, setIncrementar] = useState(100);

  useInterval(() => setCounter((c) => c + 1), delay);

  return (
    <>
      <h1>Counter: {counter}</h1>
      <h2>Delay: {delay}</h2>
      <button onClick={() => setDelay((c) => c + incrementar)}>+{incrementar}</button>
      <button onClick={() => setDelay((c) => c - incrementar)}>-{incrementar}</button>
      <input type="number" value={incrementar} onChange={(e) => setIncrementar(Number(e.target.value))} />
    </>
  );
}

export default App;
