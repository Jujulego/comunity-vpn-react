import SetAction from 'utils/actions/set';

import { SET_ALL_SERVERS } from './constants';

// State
export interface AdminState {
  servers: string[]
}

// Actions
export type AdminActions = SetAction<typeof SET_ALL_SERVERS, AdminState['servers']>