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

/*eslint-disable*/
const useFetch = (url, options) => {
  console.log('hook')
  return [123, 'load'];
};

import React from 'react';

function App() {

  const [ol, load] = useFetch()

  console.log(ol, load)
  return <div>App</div>;
}

export default App;
