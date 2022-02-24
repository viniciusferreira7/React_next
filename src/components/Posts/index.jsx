import React, { useContext, useEffect, useRef } from 'react';
import { CounterContext } from '../../contexts/CounterProvider/context';
import { incrementCounter } from '../../contexts/CounterProvider/action';
import { decrementCounter } from '../../contexts/CounterProvider/action';
import { PostsContext } from '../../contexts/PostsProvider';
import { loadPosts } from '../../contexts/PostsProvider/action';

function Posts() {
  const isMounted = useRef(true);
  const context = useContext(PostsContext);
  const { postsState, postsDispatch } = context;

  const counterContext = useContext(CounterContext);
  const { counterState, counterDispatch } = counterContext;

  useEffect(() => {
    loadPosts(postsDispatch).then((dispatch) => {
      if (isMounted.current) dispatch();
    });

    return () => {
      isMounted.current = false;
    };
  }, [postsDispatch]);

  return (
    <div>
      <button onClick={() => incrementCounter(counterDispatch)}>Counter + {counterState.counter}</button>
      <button onClick={() => decrementCounter(counterDispatch)}>Counter + {counterState.counter}</button>
      {postsState.loading && <h4>Carregando posts...</h4>}
      {postsState.posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
        </div>
      ))}
    </div>
  );
}

export default Posts;
