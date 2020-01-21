import {
  SET_LOADING, SET_DATA, SET_SERVERS,
  ADD_SERVER
} from './constants';
import { UserActions, UserState, UsersState } from './types';

// Initial state
const initial: UserState = {
  loading: false,
  data: null,
  servers: null
};

// Reducers
const userReducer = (state= initial, action: UserActions) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.value, error: null };

    case SET_DATA:
      return { ...state, data: action.value, error: null, loading: false };

    case SET_SERVERS:
      return { ...state, servers: action.value };

    case ADD_SERVER:
      const servers = state.servers || [];
      return { ...state, servers: [...servers, action.server]};

    default:
      return state;
  }
};

export const usersReducer = (state: UsersState = {}, action: UserActions) => {
  switch (action.type) {
    case SET_DATA:
    case SET_LOADING:
    case SET_SERVERS:
    case ADD_SERVER:
      const { user } = action;
      return { ...state, [user]: userReducer(state[user], action) };

    default:
      return state;
  }
};