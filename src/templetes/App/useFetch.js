import { useEffect, useRef, useState } from 'react';

const isObjectEqual = (objA, objB) => {
  return JSON.stringify(objA) === JSON.stringify(objB);
};

export const useFetch = (url, options) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [shouldLoading, setShouldLoading] = useState(false);
  const urlRef = useRef(url);
  const optionsRef = useRef(options);

  useEffect(() => {
    let change = false;

    if (!isObjectEqual(url, urlRef.current)) {
      urlRef.current = url;
      change = true;
    }
    if (!isObjectEqual(options, optionsRef.current)) {
      optionsRef.current = options;
      change = true;
    }

    if (change) setShouldLoading((s) => !s);
  }, [url, options]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    let wait = false;

    setLoading(true);

    const fetchData = async () => {
      await new Promise((r) => {
        setTimeout(r, 1000);
      });
      try {
        const response = await fetch(urlRef.current, { signal, ...optionsRef.current });
        const jsonResult = await response.json();

        if (!wait) {
          setResult(jsonResult);
          setLoading(false);
        }
      } catch (e) {
        if (!wait) {
          setLoading(false);
        }
        throw e;
      }
    };
    fetchData();

    return () => {
      wait = true;
      controller.abort();
    };
  }, [shouldLoading]);

  return [result, loading];
};
