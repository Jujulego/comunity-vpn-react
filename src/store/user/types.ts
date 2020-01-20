import { AnyAction } from 'redux';

import User from 'data/user';
import SetAction from 'utils/actions/set';

import { SET_LOADING, SET_ERROR, SET_USER } from './constants';

// State
export interface UserState {
  user: User | null,
  loading: boolean,
  error: string | null
}

// Actions
export type UserActionTypes = AnyAction               |
  SetAction<typeof SET_LOADING, UserState['loading']> |
  SetAction<typeof SET_USER, UserState['user']>       |
  SetAction<typeof SET_ERROR, UserState['error']>