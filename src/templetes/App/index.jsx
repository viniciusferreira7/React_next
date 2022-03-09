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

// import P from 'prop-types';
// import React, { useState, useLayoutEffect, useRef, forwardRef, useImperativeHandle } from 'react';

// export const App = () => {
//   const [counted, setCounted] = useState([0, 1, 2, 3, 4]);
//   const divRef = useRef();

//   const handleClick = () => {
//     setCounted((c) => [...c, +c.slice(-1) + 1]);
//     divRef.current.handleClick();
//   };

//   useLayoutEffect(() => {
//     const now = Date.now();
//     while (Date.now() < now + 300) divRef.current.divRef.scrollTop = divRef.current.divRef.scrollHeight;
//   });

//   return (
//     <>
//       <button onClick={handleClick}>Add +{counted.slice(-1)}</button>
//       <DisplayCounted counted={counted} ref={divRef} />
//     </>
//   );
// };

// export const DisplayCounted = forwardRef(function DisplayCounted({ counted }, ref) {
//   const [rand, setRand] = useState('0.24');
//   const divRef = useRef();

//   const handleClick = () => {
//     setRand(Math.random().toFixed(2));
//   };

//   useImperativeHandle(ref, () => ({
//     handleClick,
//     divRef: divRef.current,
//   }));

//   return (
//     <div onClick={handleClick} ref={divRef} style={{ width: '150px', height: '120px', overflowY: 'scroll' }}>
//       {counted.map((c) => (
//         <p key={`c-${c}`}>
//           {c} +++ {rand}
//         </p>
//       ))}
//     </div>
//   );
// });

// DisplayCounted.propTypes = {
//   counted: P.array,
// };

import React, { useState, useEffect, useDebugValue } from 'react';

export const useMediaQuery = (queryValue, initialValue = false) => {
  const [match, setMatch] = useState(initialValue);

  useDebugValue(queryValue, () => {
    return queryValue + 'modificado';
  });

  useEffect(() => {
    let isMounted = true;
    const matchMedia = window.matchMedia(queryValue);
    const handleChange = () => {
      if (!isMounted) return;
      setMatch(!!matchMedia.matches);
    };

    matchMedia.addEventListener('change', handleChange);
    setMatch(Boolean(matchMedia.matches));

    return () => {
      (isMounted = false), matchMedia.removeEventListener('change', handleChange);
    };
  }, [queryValue]);

  return match;
};
export const App = () => {
  const huge = useMediaQuery('(min-width:980px)');
  const big = useMediaQuery('(max-width:979px) and (min-width: 768px)');
  const medium = useMediaQuery('(max-width:767px) and (min-width: 321px)');
  const small = useMediaQuery('(max-width:320px)');

  const background = huge ? 'navy' : big ? '#eb4034' : medium ? '#397536' : small ? '#6ad0d4' : false;
  return <div style={{ fontSize: '35px', background }}>App</div>;
};
