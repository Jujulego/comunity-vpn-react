import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { SET_ERROR, SET_TOKEN, SET_USER } from './constants';
import { AuthActionTypes, AuthState } from './types';

// Persist config
const config = {
  key: 'auth',
  whitelist: ['token'],
  storage
};

// Initial state
const initial: AuthState = {
  error: null,
  user: null,
  token: null
};

// Reducers
export const authReducer = persistReducer<AuthState,AuthActionTypes>(config, (state= initial, action) => {
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
});