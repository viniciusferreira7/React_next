import React from 'react';
import Posts from '../../components/Posts';

import { PostsProvider } from '../../contexts/PostsProvider';

function App() {
  return (
    <PostsProvider>
      <h1>Posts</h1>
      <Posts />
    </PostsProvider>
  );
}

export default App;
