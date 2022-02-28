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

export const useFetch = (url, options) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const urlRef = useRef(url);
  const optionsRef = useRef(options);

  useEffect(() => {
    console.log('effect', new Date().toLocaleString());

    setLoading(true);

    const fetchData = async () => {
      await new Promise((r) => {
        setTimeout(r, 2000);
      });
      try {
        const response = await fetch(urlRef.current, optionsRef.current);
        const jsonResult = await response.json();
        setResult(jsonResult);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        throw e;
      }
    };
    fetchData();
  }, []);

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
        {result.map((p) => (
          <div key={`posts-${p.id}`} onClick={() => handleClick(p.id)}>
            <p>{p.title}</p>
          </div>
        ))}
      </div>
    );
  }

  return <h1>Oi</h1>;
};
