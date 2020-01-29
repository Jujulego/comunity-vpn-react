import { Action } from 'redux';

import SetAction from 'utils/actions/set';

import { DEL_SERVER, SET_ALL_SERVERS, SET_ALL_USERS } from './constants';

// State
export interface AdminState {
  servers: string[],
  users: string[]
}

// Actions
interface DeleteServer extends Action<typeof DEL_SERVER> {
  server: string
}

export type AdminActions = DeleteServer |
  SetAction<typeof SET_ALL_SERVERS, AdminState['servers']> |
  SetAction<typeof SET_ALL_USERS, AdminState['users']>