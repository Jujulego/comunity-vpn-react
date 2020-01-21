import { SET_LOADING, SET_DATA } from './constants';
import { ServerActions, ServerSetAction } from './types';

// Action creator
type ExtractAction<A extends ServerActions['type']> = Extract<ServerActions, ServerSetAction<A, any>>

export function creator<A extends ServerActions['type']>(type: A) {
  return (server: string, value: ExtractAction<A>['value']) => ({ type, server, value });
}

// Actions
export const setServerLoading = creator<typeof SET_LOADING>(SET_LOADING);
export const setServerData    = creator<typeof SET_DATA>(SET_DATA);