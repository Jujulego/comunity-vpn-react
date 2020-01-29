import { DEL_SERVER, SET_ALL_SERVERS, SET_ALL_USERS } from './constants';
import { AdminActions, AdminState } from './types';

// Initial state
const initial: AdminState = {
  servers: [],
  users: []
};

// Reducers
export const adminReducer = (state = initial, action: AdminActions) => {
  switch (action.type) {
    case SET_ALL_SERVERS:
      return { ...state, servers: action.value };

    case SET_ALL_USERS:
      return { ...state, users: action.value };

    case DEL_SERVER:
      return { ...state, servers: state.servers.filter(server => server !== action.server) };

    default:
      return state;
  }
};