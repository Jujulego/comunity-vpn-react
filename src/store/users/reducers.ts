import { ADD_SERVER, DEL_SERVER, DEL_TOKEN, DEL_USER, SET_DATA, SET_LOADING, SET_SERVERS } from './constants';
import { UserActions, UsersState, UserState } from './types';

// Initial state
const initial: UserState = {
  loading: false,
  data: null,
  servers: []
};

// Reducers
const userReducer = (state= initial, action: UserActions) => {
  const servers = state.servers || [];

  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.value, error: null };

    case SET_DATA:
      return { ...state, data: action.value, error: null, loading: false };

    case SET_SERVERS:
      return { ...state, servers: action.value };

    case ADD_SERVER:
      return { ...state, servers: [...servers, action.server]};

    case DEL_SERVER:
      return { ...state, servers: servers.filter(server => server !== action.server) };

    case DEL_TOKEN:
      if (state.data) {
        return {
          ...state,
          data: {
            ...state.data,
            tokens: state.data.tokens.filter(token => token._id !== action.token)
          }
        };
      }

      return state;

    default:
      return state;
  }
};

export const usersReducer = (state: UsersState = {}, action: UserActions) => {
  // Get user id
  let { user } = action;
  if (!user) return state;

  if (state.me && state.me.data && state.me.data._id === user) {
    user = 'me';
  }

  // Apply actions
  if (action.type === DEL_USER) {
    const { [user]: _, ...others } = state;
    return others;
  } else {
    return { ...state, [user]: userReducer(state[user], action) };
  }
};