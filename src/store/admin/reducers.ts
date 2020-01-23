import { SET_ALL_SERVERS } from './constants';
import { AdminActions, AdminState } from './types';

// Initial state
const initial: AdminState = {
  servers: []
};

// Reducers
export const adminReducer = (state = initial, action: AdminActions) => {
  switch (action.type) {
    case SET_ALL_SERVERS:
      return { ...state, servers: action.value };

    default:
      return state;
  }
};