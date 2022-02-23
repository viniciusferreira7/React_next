import * as type from './type';

export const loadPosts = async (dispatch) => {
  dispatch({ type: type.POSTS_LOADING });

  setTimeout(async () => {
    const postsRaw = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await postsRaw.json();

    dispatch({ type: type.POSTS_SUCCESS, payload: posts });
  }, 5000);
};
