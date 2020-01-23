import { ADD_SERVER, DEL_SERVER, DEL_USER, SET_DATA, SET_LOADING, SET_SERVERS } from './constants';
import { UserActions, UserSetAction } from './types';

// Action creator
type ExtractAction<A extends UserActions['type']> = Extract<UserActions, UserSetAction<A, any>>

export function creator<A extends UserActions['type']>(type: A) {
  return (user: string, value: ExtractAction<A>['value']) => ({ type, user, value });
}

// Actions
export const setUserLoading = creator<typeof SET_LOADING>(SET_LOADING);
export const setUserData    = creator<typeof SET_DATA>(SET_DATA);
export const setUserServers = creator<typeof SET_SERVERS>(SET_SERVERS);

export const addUserServer = (user: string, server: string): UserActions => ({
  type: ADD_SERVER,
  user, server
});

export const deleteUserServer = (user: string, server: string): UserActions => ({
  type: DEL_SERVER,
  user, server
});

export const deleteUser = (user: string): UserActions => ({
  type: DEL_USER,
  user
});