import { AnyAction } from 'redux';

import SetAction from 'utils/actions/set';

import { SET_ERROR, SET_TOKEN, SET_TOKEN_ID } from './constants';

// State
export interface AuthState {
  tokenId: string | null,
  token: string | null,
  error: string | null
}

// Actions
export type AuthActions = AnyAction |
  SetAction<typeof SET_TOKEN,    AuthState['token']>   |
  SetAction<typeof SET_TOKEN_ID, AuthState['tokenId']> |
  SetAction<typeof SET_ERROR,    AuthState['error']>