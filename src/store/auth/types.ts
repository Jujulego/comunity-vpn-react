import { AnyAction } from 'redux';

import SetAction from 'utils/actions/set';

import { SET_ERROR, SET_TOKEN } from './constants';

// State
export interface AuthState {
  token: string | null,
  error: string | null
}

// Actions
export type AuthActionTypes = AnyAction |
  SetAction<typeof SET_TOKEN, AuthState['token']> |
  SetAction<typeof SET_ERROR, AuthState['error']>