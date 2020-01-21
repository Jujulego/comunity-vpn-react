import axios from 'axios';
import { Dispatch } from 'redux';

import { env } from 'env';
import Server from 'data/server';

import { AppState } from 'store';
import { authError, authHeaders } from 'store/auth/utils';
import { addUserServer } from 'store/users/actions';

import { setServerLoading, setServerData } from './actions';

// Thunks
export const addServer = (ip: string) => async (dispatch: Dispatch, getState: () => AppState) => {
  try {
    const { token } = getState().auth;
    if (token == null) return;

    const res = await axios.post(`${env.API_BASE_URL}/server/`, { ip }, { headers: authHeaders(token) });
    const server = res.data as Server;

    dispatch(setServerData(server._id, server));
    dispatch(addUserServer('me', server._id));
  } catch (error) {
    if (authError(error, dispatch)) return;
    throw error;
  }
};

export const getServer = (id: string) => async (dispatch: Dispatch, getState: () => AppState) => {
  try {
    const { token } = getState().auth;
    if (token == null) return;

    dispatch(setServerLoading(id, true));

    const res = await axios.get(`${env.API_BASE_URL}/server/${id}`, { headers: authHeaders(token) });
    const server = res.data as Server;

    dispatch(setServerData(id, server));
  } catch (error) {
    if (authError(error, dispatch)) return;
    throw error;
  }
};

export const toggleServer = (id: string, port: number) => async (dispatch: Dispatch, getState: () => AppState) => {
  try {
    // Get token
    const { token } = getState().auth;
    if (token == null) return;

    // Get server state
    const { data } = getState().servers[id];
    if (data == null) return;

    const route = data.available ? 'down' : 'up';

    const res = await axios.put(`${env.API_BASE_URL}/server/${id}/${route}`, { port }, { headers: authHeaders(token) });
    const server = res.data as Server;

    dispatch(setServerData(id, server));
  } catch (error) {
    if (authError(error, dispatch)) return;
    throw error;
  }
};