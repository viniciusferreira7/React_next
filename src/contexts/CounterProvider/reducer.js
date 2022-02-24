import * as type from './types';

export const reducer = (state, action) => {
  switch (action.type) {
    case type.INCREMENT_COUNTER: {
      return { ...state, counter: state.counter + 1 };
    }
    case type.DECREMENT_COUNTER: {
      return { ...state, counter: state.counter - 1 };
    }
  }

  return { ...state };
};
