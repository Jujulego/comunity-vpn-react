import { ADD_ERROR } from './constants';
import { ErrorsActions, ErrorsState } from './types';

// Initial
const initial: ErrorsState = {
  errors: []
};

// Reducers
export const errorsReducer = (state = initial, action: ErrorsActions) => {
  switch (action.type) {
    case ADD_ERROR:
      return { ...state, errors: [action.error, ...state.errors ] };

    default:
      return state;
  }
};