import { SET_LOADING, SET_DATA } from './constants';
import { UserActions, UserState, UsersState } from './types';

// Initial state
const initial: UserState = {
  data: null,
  loading: false
};

// Reducers
const userReducer = (state= initial, action: UserActions) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.value, error: null };

    case SET_DATA:
      return { ...state, data: action.value, error: null, loading: false };

    default:
      return state;
  }
};

export const usersReducer = (state: UsersState = {}, action: UserActions) => {
  switch (action.type) {
    case SET_LOADING:
    case SET_DATA:
      const { user } = action;
      return { ...state, [user]: userReducer(state[user], action) };

    default:
      return state;
  }
};