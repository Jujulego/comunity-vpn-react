import axios from 'axios';
import { Dispatch } from 'redux';

import { env } from 'env';
import Server from 'data/Server';

import { AppState } from 'store';
import { deleteAdminServer } from 'store/admin/actions';
import { authError, authHeaders } from 'store/auth/utils';
import { httpError } from 'store/errors/utils';
import {
  addUserServer as addUserServerAction,
  deleteUserServer as deleteUserServerAction
} from 'store/users/actions';

import { setServerLoading, setServerData, deleteServer } from './actions';

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
    if (httpError(error, dispatch)) return;
    throw error;
  }
};

export const upServer = (ip: string, port: number, user: string) => async (dispatch: Dispatch, getState: () => AppState) => {
  try {
    const { token } = getState().auth;
    if (token == null) return;

    const res = await axios.put(`${env.API_BASE_URL}/server/${ip}/up`, { port, user }, { headers: authHeaders(token) });
    const server = res.data as Server;

    dispatch(setServerData(server._id, server));
    dispatch(addUserServerAction(user, server._id));
  } catch (error) {
    if (authError(error, dispatch)) return;
    if (httpError(error, dispatch)) return;
    throw error;
  }
};

export const downServer = (id: string) => async (dispatch: Dispatch, getState: () => AppState) => {
  try {
    const { token } = getState().auth;
    if (token == null) return;

    const { data } = getState().servers[id];
    if (!data) return;

    await axios.put(`${env.API_BASE_URL}/server/${data.ip}/down`, { port: data.port }, { headers: authHeaders(token) });

    dispatch(deleteUserServerAction(data.user, id));
    dispatch(deleteAdminServer(id));
    dispatch(deleteServer(id));
  } catch (error) {
    if (authError(error, dispatch)) return;
    if (httpError(error, dispatch)) return;
    throw error;
  }
};