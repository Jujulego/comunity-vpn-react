import { SET_LOADING, SET_ERROR, SET_USER } from './constants';
import { UserActionTypes, UserState } from './types';

// Initial state
const initial: UserState = {
  user: null,
  loading: false,
  error: null
};

// Reducers
export const userReducer = (state= initial, action: UserActionTypes) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.value, error: null };

    case SET_ERROR:
      return { ...state, error: action.value, loading: false };

    case SET_USER:
      return { ...state, user: action.value, error: null, loading: false };

    default:
      return state;
  }
};