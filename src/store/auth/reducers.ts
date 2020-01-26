import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { SET_ERROR, SET_TOKEN, SET_TOKEN_ID } from './constants';
import { AuthActions, AuthState } from './types';

// Persist config
const config = {
  key: 'auth',
  whitelist: ['token', 'token_id'],
  storage
};

// Initial state
const initial: AuthState = {
  error: null,
  token: null,
  tokenId: null
};

// Reducers
export const authReducer = persistReducer<AuthState,AuthActions>(config, (state= initial, action) => {
  switch (action.type) {
    case SET_ERROR:
      return { ...state, error: action.value };

    case SET_TOKEN:
      return { ...state, token: action.value, error: null };

    case SET_TOKEN_ID:
      return { ...state, tokenId: action.value };

    default:
      return state;
  }
});