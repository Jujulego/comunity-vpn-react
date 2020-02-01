import axios from 'axios';
import { Dispatch } from 'redux';

import { env } from 'env';
import Server from 'data/Server';
import User from 'data/User';

import { AppState } from 'store';
import { authError, authHeaders } from 'store/auth/utils';
import { logError } from 'store/errors/utils';
import { setServerData } from 'store/servers/actions';
import { setUserData } from 'store/users/actions';

import { setAllServers, setAllUsers } from './actions';

// Thunks
export const refreshAllServers = () => async (dispatch: Dispatch, getState: () => AppState) => {
  try {
    const { token } = getState().auth;
    if (token == null) return;

    const res = await axios.get(`${env.API_BASE_URL}/servers/all`, { headers: authHeaders(token) });
    const servers = res.data as Server[];

    servers.forEach(server => dispatch(setServerData(server._id, server)));
    dispatch(setAllServers(servers.map(server => server._id)));
  } catch (error) {
    if (authError(error, dispatch)) return;
    if (logError(error, dispatch)) return;
    throw error;
  }
};

export const refreshAllUsers = () => async (dispatch: Dispatch, getState: () => AppState) => {
  try {
    const { token } = getState().auth;
    if (token == null) return;

    const res = await axios.get(`${env.API_BASE_URL}/users`, { headers: authHeaders(token) });
    const users = res.data as User[];

    const id = getState().users.me.data?._id;

    users.forEach(user => dispatch(setUserData(user._id, user)));
    dispatch(setAllUsers(users.map(user => user._id === id ? 'me' : user._id)));
  } catch (error) {
    if (authError(error, dispatch)) return;
    if (logError(error, dispatch)) return;
    throw error;
  }
};