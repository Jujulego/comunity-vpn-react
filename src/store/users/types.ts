import { Action } from 'redux';

import User from 'data/user';

import { ADD_SERVER, DEL_SERVER, SET_DATA, SET_LOADING, SET_SERVERS } from './constants';

// State
export interface UserState {
  loading: boolean,
  data: User | null,
  servers: string[]
}

export type UsersState = { [user: string]: UserState }

// Actions
export interface UserSetAction<A, T> extends Action<A> {
  readonly user: string,
  readonly value: T
}

export interface UserServerActions extends Action<typeof ADD_SERVER | typeof DEL_SERVER> {
  readonly user: string,
  readonly server: string
}

export type UserActions = UserServerActions               |
  UserSetAction<typeof SET_LOADING, UserState['loading']> |
  UserSetAction<typeof SET_DATA, UserState['data']>       |
  UserSetAction<typeof SET_SERVERS, UserState['servers']>