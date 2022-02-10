import React, { useReducer } from 'react';

const globalState = {
  title: 'O title do contexto',
  body: 'O body do contexto',
  counter: 1,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'Title mudou': {
      console.log(action.payLoad);
      return { ...state, title: 'Title mudou', counter: action.payLoad };
    }
    case 'inverte': {
      const { title } = state;
      return { ...state, title: title.split('').reverse('').join(''), counter: action.payLoad };
    }
  }
  return { ...state };
};

function App() {
  const [state, dispatch] = useReducer(reducer, globalState);
  const { title, counter } = state;

  return (
    <div>
      <h1>
        {title}, {counter}
      </h1>
      <button onClick={() => dispatch({ type: 'Title mudou', payLoad: new Date().toLocaleString('pt-br') })}>
        Click
      </button>
      <button onClick={() => dispatch({ type: 'inverte', payLoad: new Date().toLocaleString('pt-br') })}>Invert</button>
    </div>
  );
}

export default App;
