import { DEL_SERVER, SET_DATA, SET_LOADING } from './constants';
import { ServerActions, ServersState, ServerState } from './types';

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
  const { server } = action;

  switch (action.type) {
    case SET_LOADING:
    case SET_DATA:
      return { ...state, [server]: serverReducer(state[server], action) };

    case DEL_SERVER:
      const { [server]: _, ...others } = state;
      return others;

    default:
      return state;
  }
};