import { Action } from 'redux';

import User from 'data/user';

import {
  ADD_SERVER, DEL_SERVER,
  DEL_USER,
  SET_DATA, SET_LOADING, SET_SERVERS
} from './constants';

// State
export interface UserState {
  loading: boolean,
  data: User | null,
  servers: string[]
}

export type UsersState = { [user: string]: UserState }

// Actions
interface UserAction<A> extends Action<A> {
  readonly user: string
}

export interface UserSetAction<A, T> extends UserAction<A> {
  readonly value: T
}

export interface UserServerAction<A> extends UserAction<A> {
  readonly server: string
}

export type UserActions = |
  UserAction<typeof DEL_USER> |
  UserServerAction<typeof ADD_SERVER> |
  UserServerAction<typeof DEL_SERVER> |
  UserSetAction<typeof SET_LOADING, UserState['loading']> |
  UserSetAction<typeof SET_DATA, UserState['data']>       |
  UserSetAction<typeof SET_SERVERS, UserState['servers']>