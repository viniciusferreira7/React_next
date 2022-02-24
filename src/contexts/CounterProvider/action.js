import * as type from './types';

export const incrementCounter = (dispatch) => {
  dispatch({ type: type.INCREMENT_COUNTER });
};

export const decrementCounter = (dispatch) => {
  dispatch({ type: type.DECREMENT_COUNTER });
};
