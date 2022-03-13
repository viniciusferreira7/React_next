// // // import React from 'react';
// // // import Posts from '../../components/Posts';

// import { Children, cloneElement, useState } from 'react/cjs/react.development';

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

// import React from 'react';
// import { useEffect, useState } from 'react/cjs/react.development';

// /*eslint-disable */
// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = { hasError: false }
//   }
//   static getDerivedStateFromError(error) {
//     return { hasError: true }
//   }

//   componentDidCatch(error, errorInfo) {
//     console.log(error, errorInfo)
//   }

//   render() {
//     if (this.state.hasError) return <h2>Algo deu errado</h2>

//     return this.props.children
//   }
// }

// export const ItWillThrowError = () => {
//   const [counter, setCounter] = useState(0);

//   useEffect(() => {
//     if (counter >= 3) throw new Error('Que chato');
//   }, [counter]);

//   return <button onClick={() => setCounter((c) => c + 1)}>Click increment counter + {counter}</button>;
// };

// export const App = () => {
//   const s = {
//     style: { fontSize: '15px' },
//   };
//   return (
//     <div {...s}>
//       <h1>Error boundary</h1>
//       <ErrorBoundary>
//         <ItWillThrowError />
//       </ErrorBoundary>
//     </div>
//   );
// };

// import React, { cloneElement, Children, useState } from 'react';

// export const s = {
//   style: {
//     fontSize: '24px',
//     color: 'navy',
//   },
// };

// export const TurnOnOff = ({ children }) => {
//   const [isOn, setIsOn] = useState(false);

//   const onTurn = () => setIsOn((s) => !s);

//   return Children.map(children, (child) => {
//     const newChild = cloneElement(child, { isOn, onTurn });
//     return newChild;
//   });
// };

// export const TurnedOn = ({ isOn, children }) => (isOn ? children : null);
// export const TurnedOff = ({ isOn, children }) => (isOn ? null : children);

// /*eslint-disable-next-line */
// export const TurnButton = ({ isOn, onTurn }) => {
//   return <button onClick={onTurn}>{isOn ? 'OFF' : 'ON'}</button>;
// };

// export const App = () => {
//   return (
//     <TurnOnOff>
//       <TurnedOn>Aqui que as coisas vão acontecer quando estiver ON.</TurnedOn>
//       <TurnedOff>Aqui que vem as coisas do OFF.</TurnedOff>
//       <TurnButton />
//     </TurnOnOff>
//   );
// };

// import React from 'react';
// import { useState, createContext, useContext } from 'react/cjs/react.development';
// import P from 'prop-types';

// const s = {
//   styles: {
//     fontSize: '35px',
//     color: 'navy',
//     textDecoration: 'underline',
//   },
// };

// export const TurnContext = createContext();

// export const TurnOnOff = ({ children }) => {
//   const [isOn, setIsOn] = useState(false);
//   const onTurn = () => setIsOn((s) => !s);

//   return <TurnContext.Provider value={{ isOn, onTurn }}>{children}</TurnContext.Provider>;
// };

// TurnOnOff.propTypes = {
//   children: P.node,
// };

// export const TurnedOn = ({ children }) => {
//   const { isOn } = useContext(TurnContext);
//   return isOn ? children : null;
// };
// export const TurnedOff = ({ children }) => {
//   const { isOn } = useContext(TurnContext);
//   return isOn ? null : children;
// };
// export const TurnButton = ({ ...props }) => {
//   const { isOn, onTurn } = useContext(TurnContext);
//   return (
//     <button {...props} onClick={onTurn}>
//       TURN {isOn ? 'OFF' : 'ON'}
//     </button>
//   );
// };

// export const App = () => {
//   return (
//     <TurnOnOff>
//       <p>ola</p>
//       <TurnedOn>O pai da ON.</TurnedOn>
//       <TurnedOff>O pai da OFF.</TurnedOff>
//       <TurnButton {...s} />
//     </TurnOnOff>
//   );
// };

// import React from 'react';
// import { useState } from 'react/cjs/react.development';
// import { LazyComponent } from './LazyComponent';

// export const App = () => {
//   const [show, setShow] = useState(false);
//   return (
//     <>
//       <button onClick={() => setShow((s) => !s)}>Show {show ? 'LC is screen' : 'LC is off'}</button>
//       {show && <LazyComponent />}
//     </>
//   );
// };

import React from 'react';
import { cloneElement, Children, useState, useEffect } from 'react/cjs/react.development';
import P from 'prop-types';

const s = {
  style: {
    fontSize: '35px',
    color: 'navy',
  },
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  //eslint-disable-next-line
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, infoError) {
    console.log(error, infoError);
  }

  render() {
    if (this.state.hasError) return <h3>Algo deu errado</h3>;

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: P.node,
};

export const TurnOnOff = ({ children }) => {
  const [isOn, setIsOn] = useState(false);
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    setIsOn((s) => !s);
    setCounter((c) => c + 1);
  };

  useEffect(() => {
    if (counter >= 3) throw new Error('Algo deu errado');
  }, [counter]);

  return Children.map(children, (child) => {
    const newChild = cloneElement(child, { isOn, handleClick, ...s });
    return newChild;
  });
};

export const TurnedOn = ({ isOn, children }) => (isOn ? children : null);
export const TurnedOff = ({ isOn, children }) => (isOn ? null : children);

export const TurnButton = ({ isOn, handleClick }) => {
  return <button onClick={handleClick}>Click {isOn ? 'OFF' : 'ON'}</button>;
};

TurnButton.propTypes = {
  isOn: P.bool,
  handleClick: P.func,
};

export const App = () => {
  return (
    <ErrorBoundary>
      <TurnOnOff>
        <TurnedOn>Está ligado</TurnedOn>
        <TurnedOff>Está desligado</TurnedOff>
        <TurnButton />
      </TurnOnOff>
    </ErrorBoundary>
  );
};
