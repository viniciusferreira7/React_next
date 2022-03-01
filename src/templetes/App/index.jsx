// import React from 'react';
// import Posts from '../../components/Posts';

// import { CounterProvider } from '../../contexts/CounterProvider';
// import { PostsProvider } from '../../contexts/PostsProvider';

// function App() {
//   return (
//     <CounterProvider>
//       <PostsProvider>
//         <h1>Posts</h1>
//         <Posts />
//       </PostsProvider>
//     </CounterProvider>
//   );
// }

// export default App;

import React, { useEffect, useRef, useState } from 'react';

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

export const App = () => {
  const [postsId, setPostsId] = useState('');
  const [result, loading] = useFetch(`https://jsonplaceholder.typicode.com/posts/${postsId}`, {
    headers: {
      abc: '1',
    },
  });

  useEffect(() => {
    console.log('mudou o id do:', postsId);
  }, [postsId]);

  const handleClick = (id) => {
    setPostsId(id);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!loading && result) {
    return (
      <div>
        {result?.length > 0 ? (
          result.map((p) => (
            <div key={`posts-${p.id}`} onClick={() => handleClick(p.id)}>
              <p>{p.title}</p>
            </div>
          ))
        ) : (
          <div key={`posts-${result.id}`} onClick={() => handleClick('')}>
            <p>{result.title}</p>
          </div>
        )}
      </div>
    );
  }

  return <h1>Oi</h1>;
};
