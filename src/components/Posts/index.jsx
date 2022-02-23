import React, { useContext, useEffect } from 'react';
import { loadPosts } from '../../contexts/PostsProvider/action';
import { PostsContext } from '../../contexts/PostsProvider/context';

function Posts() {
  const postsContext = useContext(PostsContext);
  const { postsState, postsDispatch } = postsContext;

  useEffect(() => {
    loadPosts(postsDispatch);
  }, [postsDispatch]);

  return (
    <div>
      <h1>Posts</h1>
      {postsState.loading && <h4>Carregando posts...</h4>}
      {postsState.posts.map((post) => (
        <div key={post.id}>
          <p>{post.title}</p>
        </div>
      ))}
    </div>
  );
}

export default Posts;
