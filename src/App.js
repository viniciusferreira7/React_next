import P from 'prop-types';
import React, { createContext, useContext, useReducer, useRef } from 'react';

export const globalState = {
  title: 'O title do contexto',
  body: 'O body do contexto',
  counter: 1,
};

export const actions = {
  CHANGE_TITLE: 'CHANGE_TITLE',
};

export const Context = createContext();

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.CHANGE_TITLE: {
      return { ...state, title: action.payLoad };
    }
  }
  return { ...state };
};

export const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, globalState);

  const changeTitle = (payLoad) => {
    dispatch({ type: actions.CHANGE_TITLE, payLoad });
  };

  return <Context.Provider value={{ state, changeTitle }}>{children}</Context.Provider>;
};

AppContext.propTypes = {
  children: P.node,
};

export const H1 = () => {
  const context = useContext(Context);
  const inputRef = useRef();
  return (
    <>
      <h1 onClick={() => context.changeTitle(inputRef.current.value)}>{context.state.title}</h1>
      <input type="text" ref={inputRef} />
    </>
  );
};

function App() {
  return (
    <AppContext>
      <H1 />
    </AppContext>
  );
}

export default App;
