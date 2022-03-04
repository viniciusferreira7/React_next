import { useCallback, useEffect, useState } from 'react';
//eslint-disable-next-line
export const useAsync = (asyncFunction, shouldRun) => {
  const [state, setState] = useState({
    result: null,
    error: null,
    status: 'idle',
  });

  const run = useCallback(async () => {
    await new Promise((r) => setTimeout(r, 2000));

    setState({
      result: null,
      error: null,
      status: 'pending',
    });

    return asyncFunction()
      .then((response) => {
        setState({
          result: response,
          error: null,
          status: 'settled',
        });
      })
      .catch((error) => {
        setState({
          result: null,
          error: error,
          status: 'settled',
        });
      });
  }, [asyncFunction]);

  useEffect(() => {
    if (shouldRun) {
      run();
    }
  }, [shouldRun, run]);

  return [run, state];
};

export const fetchData = async () => {
  await new Promise((r) => setTimeout(r, 2000));

  const data = await fetch('https://jsonplaceholder.typicode.com/posts');
  const json = await data.json();

  return json;
};
