import { Action, AnyAction } from 'redux';

import User from 'data/user';

import { SET_LOADING, SET_DATA, SET_SERVERS } from './constants';

// State
export interface UserState {
  loading: boolean,
  data: User | null,
  servers: string[] | null
}

export type UsersState = { [user: string]: UserState }

// Actions
export interface UserSetAction<A, T> extends Action<A> {
  readonly user: string,
  readonly value: T
}

export type UserActions = AnyAction                       |
  UserSetAction<typeof SET_LOADING, UserState['loading']> |
  UserSetAction<typeof SET_DATA, UserState['data']>       |
  UserSetAction<typeof SET_SERVERS, UserState['servers']>