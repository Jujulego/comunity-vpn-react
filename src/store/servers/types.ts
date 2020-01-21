import { Action, AnyAction } from 'redux';

import Server from 'data/server';

import { SET_LOADING, SET_DATA } from './constants';

// State
export interface ServerState {
  data: Server | null,
  loading: boolean
}

export type ServersState = { [id: string]: ServerState }

// Actions
export interface ServerSetAction<A, T> extends Action<A> {
  readonly server: string,
  readonly value: T
}

export type ServerActions = AnyAction                         |
  ServerSetAction<typeof SET_LOADING, ServerState['loading']> |
  ServerSetAction<typeof SET_DATA, ServerState['data']>