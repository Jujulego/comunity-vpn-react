import axios from 'axios';
import { Dispatch } from 'redux';

import { env } from 'env';
import Server from 'data/server';

import { AppState } from 'store';
import { authError, authHeaders } from 'store/auth/utils';
import { setServerData } from 'store/servers/actions';

import { setAllServers } from './actions';

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
    throw error;
  }
};