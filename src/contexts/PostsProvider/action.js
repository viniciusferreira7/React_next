import * as type from './type';

export const loadPosts = async (dispatch) => {
  dispatch({ type: type.POSTS_LOADING });

  const postsRaw = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await postsRaw.json();

  return () => dispatch({ type: type.POSTS_SUCCESS, payload: posts });
};
