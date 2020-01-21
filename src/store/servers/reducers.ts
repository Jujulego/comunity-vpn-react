import { SET_LOADING, SET_DATA } from './constants';
import { ServerActions, ServerState, ServersState } from './types';

// Initial state
const initial: ServerState = {
  data: null,
  loading: false
};

// Reducers
const serverReducer = (state= initial, action: ServerActions) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.value, error: null };

    case SET_DATA:
      return { ...state, data: action.value, error: null, loading: false };

    default:
      return state;
  }
};

export const serversReducer = (state: ServersState = {}, action: ServerActions) => {
  switch (action.type) {
    case SET_LOADING:
    case SET_DATA:
      const { server } = action;
      return { ...state, [server]: serverReducer(state[server], action) };

    default:
      return state;
  }
};