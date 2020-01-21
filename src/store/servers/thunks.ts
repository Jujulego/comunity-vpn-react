import axios from 'axios';
import { Dispatch } from 'redux';

import { env } from 'env';
import Server from 'data/server';

import { AppState } from 'store';
import { authError, authHeaders } from 'store/auth/utils';

import { setServerLoading, setServerData } from './actions';

// Thunks
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