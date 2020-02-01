import { Action } from 'redux';

import Server from 'data/Server';

import { DEL_SERVER, SET_LOADING, SET_DATA } from './constants';

// State
export interface ServerState {
  data: Server | null,
  loading: boolean
}

export type ServersState = { [id: string]: ServerState }

// Actions
export interface ServerAction<A> extends Action<A> {
  readonly server: string,
}

export interface ServerSetAction<A, T> extends ServerAction<A> {
  readonly value: T
}

export type ServerActions = ServerAction<typeof DEL_SERVER>   |
  ServerSetAction<typeof SET_LOADING, ServerState['loading']> |
  ServerSetAction<typeof SET_DATA, ServerState['data']>