import { SET_ERROR, SET_TOKEN, SET_USER } from './constants';
import { AuthActionTypes, AuthState } from './types';

// Initial state
const initial: AuthState = {
  error: null,
  user: null,
  token: null
};

// Reducers
export function authReducer(state= initial, action: AuthActionTypes) {
  switch (action.type) {
    case SET_ERROR:
      return { ...state, error: action.value };

    case SET_TOKEN:
      return { ...state, token: action.value, error: null };

    case SET_USER:
      return { ...state, user: action.value, error: null };

    default:
      return state;
  }
}