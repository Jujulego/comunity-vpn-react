import axios from 'axios';
import { Dispatch } from 'redux';

import { env } from 'env';
import Server from 'data/server';
import User from 'data/user';

import { AppState } from 'store';
import { authError, authHeaders } from 'store/auth/utils';
import { deleteServer, setServerData } from 'store/servers/actions';

import {
  addUserServer as addUserServerAction,
  deleteUserServer as deleteUserServerAction,
  setUserLoading, setUserData, setUserServers
} from './actions';

// Thunks
export const refreshUser = (id: string) => async (dispatch: Dispatch, getState: () => AppState) => {
  try {
    const { token } = getState().auth;
    if (token == null) return;

    dispatch(setUserLoading(id, true));

    const res = await axios.get(`${env.API_BASE_URL}/user/${id}`, { headers: authHeaders(token) });
    const user = res.data as User;

    dispatch(setUserData(id, user));
  } catch (error) {
    if (authError(error, dispatch)) return;
    throw error;
  }
};

export const refreshUserServers = (id: string) => async (dispatch: Dispatch, getState: () => AppState) => {
  try {
    const { token } = getState().auth;
    if (token == null) return;

    dispatch(setUserServers(id, []));

    const res = await axios.get(`${env.API_BASE_URL}/user/${id}/servers`, { headers: authHeaders(token) });
    const servers = res.data as Server[];

    servers.forEach(server => dispatch(setServerData(server._id, server)));
    dispatch(setUserServers(id, servers.map(server => server._id)));
  } catch (error) {
    if (authError(error, dispatch)) return;
    throw error;
  }
};

export const toggleAdmin = (id: string) => async (dispatch: Dispatch, getState: () => AppState) => {
  try {
    const { token } = getState().auth;
    if (token == null) return;

    const admin = !(getState().users[id].data!.admin);

    const res = await axios.put(`${env.API_BASE_URL}/user/${id}`, { admin }, { headers: authHeaders(token) });
    const user = res.data as User;

    dispatch(setUserData(id, user));
  } catch (error) {
    if (authError(error, dispatch)) return;
    throw error;
  }
};

export const addUserServer = (user: string, ip: string) => async (dispatch: Dispatch, getState: () => AppState) => {
  try {
    const { token } = getState().auth;
    if (token == null) return;

    const res = await axios.post(`${env.API_BASE_URL}/server/`, { ip }, { headers: authHeaders(token) });
    const server = res.data as Server;

    dispatch(setServerData(server._id, server));
    dispatch(addUserServerAction(user, server._id));
  } catch (error) {
    if (authError(error, dispatch)) return;
    throw error;
  }
};

export const deleteUserServer = (user: string, id: string) => async (dispatch: Dispatch, getState: () => AppState) => {
  try {
    const { token } = getState().auth;
    if (token == null) return;

    await axios.delete(`${env.API_BASE_URL}/server/${id}`, { headers: authHeaders(token) });

    dispatch(deleteUserServerAction(user, id));
    dispatch(deleteServer(id));
  } catch (error) {
    if (authError(error, dispatch)) return;
    throw error;
  }
};