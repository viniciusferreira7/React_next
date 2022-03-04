// // // import React from 'react';
// // // import Posts from '../../components/Posts';

// // // import { CounterProvider } from '../../contexts/CounterProvider';
// // // import { PostsProvider } from '../../contexts/PostsProvider';

// // // function App() {
// // //   return (
// // //     <CounterProvider>
// // //       <PostsProvider>
// // //         <h1>Posts</h1>
// // //         <Posts />
// // //       </PostsProvider>
// // //     </CounterProvider>
// // //   );
// // // }

// // // export default App;

// // import React, { useEffect, useRef, useState } from 'react';

// // const isObjectEqual = (objA, objB) => {
// //   return JSON.stringify(objA) === JSON.stringify(objB);
// // };

// // export const useFetch = (url, options) => {
// //   const [result, setResult] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [shouldLoading, setShouldLoading] = useState(false);
// //   const urlRef = useRef(url);
// //   const optionsRef = useRef(options);

// //   useEffect(() => {
// //     let change = false;

// //     if (!isObjectEqual(url, urlRef.current)) {
// //       urlRef.current = url;
// //       change = true;
// //     }
// //     if (!isObjectEqual(options, optionsRef.current)) {
// //       optionsRef.current = options;
// //       change = true;
// //     }

// //     if (change) setShouldLoading((s) => !s);
// //   }, [url, options]);

// //   useEffect(() => {
// //     const controller = new AbortController();
// //     const signal = controller.signal;
// //     let wait = false;

// //     setLoading(true);

// //     const fetchData = async () => {
// //       await new Promise((r) => {
// //         setTimeout(r, 1000);
// //       });
// //       try {
// //         const response = await fetch(urlRef.current, { signal, ...optionsRef.current });
// //         const jsonResult = await response.json();

// //         if (!wait) {
// //           setResult(jsonResult);
// //           setLoading(false);
// //         }
// //       } catch (e) {
// //         if (!wait) {
// //           setLoading(false);
// //         }
// //         throw e;
// //       }
// //     };
// //     fetchData();

// //     return () => {
// //       wait = true;
// //       controller.abort();
// //     };
// //   }, [shouldLoading]);

// //   return [result, loading];
// // };

// // export const App = () => {
// //   const [postsId, setPostsId] = useState('');
// //   const [result, loading] = useFetch(`https://jsonplaceholder.typicode.com/posts/${postsId}`, {
// //     headers: {
// //       abc: '1',
// //     },
// //   });

// //   useEffect(() => {
// //     console.log('mudou o id do:', postsId);
// //   }, [postsId]);

// //   const handleClick = (id) => {
// //     setPostsId(id);
// //   };

// //   if (loading) {
// //     return <p>Loading...</p>;
// //   }

// //   if (!loading && result) {
// //     return (
// //       <div>
// //         {result?.length > 0 ? (
// //           result.map((p) => (
// //             <div key={`posts-${p.id}`} onClick={() => handleClick(p.id)}>
// //               <p>{p.title}</p>
// //             </div>
// //           ))
// //         ) : (
// //           <div key={`posts-${result.id}`} onClick={() => handleClick('')}>
// //             <p>{result.title}</p>
// //           </div>
// //         )}
// //       </div>
// //     );
// //   }

// //   return <h1>Oi</h1>;
// // };

// export const App = () => {
//   //eslint-disable-next-line
//   const [reFetchData, state] = useAsync(fetchData, true);

//   // useEffect(() => {
//   //   reFetchData();
//   // }, [reFetchData]);

//   if (state.status === 'idle') return <h2>Nada executando</h2>;
//   if (state.status === 'pending') return <h2>Loading...</h2>;
//   if (state.status === 'error') return <pre>{JSON.stringify(state.error, null, 2)}</pre>;
//   if (state.status === 'settled') return <pre>{JSON.stringify(state.result, null, 2)}</pre>;
// };

import React, { useState } from 'react';

export const App = () => {
  const [counted, setCounted] = useState([0, 1, 2, 3, 4]);

  const handleClick = () => {
    setCounted((c) => [...c, +c.splice(-1) + 1]);
  };

  console.log(counted.slice(-1));

  return (
    <>
      <button onClick={() => handleClick()}>Counter: {counted.slice(-1)}</button>
      {counted.map((c) => (
        <p key={`c-${c}`}>{c}</p>
      ))}
    </>
  );
};
