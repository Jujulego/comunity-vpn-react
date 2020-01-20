import { AnyAction } from 'redux';

import User from 'data/user';
import SetAction from 'utils/actions/set';

import { SET_ERROR, SET_TOKEN, SET_USER } from './constants';

// State
export interface AuthState {
  user: User | null,
  token: string | null,
  error: string | null
}

// Actions
export type AuthActionTypes = AnyAction |
  SetAction<typeof SET_TOKEN, AuthState['token']> |
  SetAction<typeof SET_USER, AuthState['user']>   |
  SetAction<typeof SET_ERROR, AuthState['error']>