import P from 'prop-types';

import { createContext, useReducer } from 'react';

import { reducer } from './reducer';

import { data } from './data';

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [postsState, postsDispatch] = useReducer(reducer, data);

  return <PostsContext.Provider value={{ postsState, postsDispatch }}>{children}</PostsContext.Provider>;
};

PostsProvider.propTypes = {
  children: P.node.isRequired,
};
