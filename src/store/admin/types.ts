import SetAction from 'utils/actions/set';

import { SET_ALL_SERVERS, SET_ALL_USERS } from './constants';

// State
export interface AdminState {
  servers: string[],
  users: string[]
}

// Actions
export type AdminActions = |
  SetAction<typeof SET_ALL_SERVERS, AdminState['servers']> |
  SetAction<typeof SET_ALL_USERS, AdminState['users']>