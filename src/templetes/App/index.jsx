import React from 'react';
import Posts from '../../components/Posts';

import { CounterProvider } from '../../contexts/CounterProvider';
import { PostsProvider } from '../../contexts/PostsProvider';

function App() {
  return (
    <CounterProvider>
      <PostsProvider>
        <h1>Posts</h1>
        <Posts />
      </PostsProvider>
    </CounterProvider>
  );
}

export default App;
