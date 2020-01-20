import { Action, AnyAction } from 'redux';

import User from 'data/user';

import { SET_LOADING, SET_DATA } from './constants';

// State
export interface UserState {
  data: User | null,
  loading: boolean
}

export type UsersState = { [user: string]: UserState }

// Actions
export interface UserSetAction<A, T> extends Action<A> {
  readonly user: string,
  readonly value: T
}

export type UserActions = AnyAction               |
  UserSetAction<typeof SET_LOADING, UserState['loading']> |
  UserSetAction<typeof SET_DATA, UserState['data']>