import * as type from './type';

export const reducer = (state, action) => {
  switch (action.type) {
    case type.POSTS_SUCCESS: {
      return { ...state, posts: action.payload, loading: false };
    }

    case type.POSTS_LOADING: {
      return { ...state, loading: true };
    }
  }
  return { ...state };
};
