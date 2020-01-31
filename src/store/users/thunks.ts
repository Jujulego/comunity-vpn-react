import axios from 'axios';
import { Dispatch } from 'redux';

import { env } from 'env';
import Server from 'data/Server';
import User from 'data/User';

import { AppState } from 'store';
import { setAllUsers } from 'store/admin/actions';
import { authError, authHeaders } from 'store/auth/utils';
import { httpError } from 'store/errors/utils';
import { setServerData } from 'store/servers/actions';

import {
  deleteUser as deleteUserAction,
  deleteUserToken as deleteUserTokenAction,
  setUserLoading, setUserData, setUserServers
} from './actions';
import { getUserState } from './utils';

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
    if (httpError(error, dispatch)) return;
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
    if (httpError(error, dispatch)) return;
    throw error;
  }
};

type EditedUser = Partial<User & { password: string }>;
export const updateUser = (id: string, values: EditedUser) => async (dispatch: Dispatch, getState: () => AppState) => {
  try {
    const { token } = getState().auth;
    if (token == null) return;

    const res = await axios.put(`${env.API_BASE_URL}/user/${id}`, values, { headers: authHeaders(token) });
    const user = res.data as User;

    dispatch(setUserData(id, user));
  } catch (error) {
    if (authError(error, dispatch)) return;
    if (httpError(error, dispatch)) return;
    throw error;
  }
};

export const toggleAdmin = (id: string) => async (dispatch: Dispatch, getState: () => AppState) => {
  try {
    const { token } = getState().auth;
    if (token == null) return;

    const admin = !(getUserState(id, () => getState().users)!.data!.admin);

    const res = await axios.put(`${env.API_BASE_URL}/user/${id}`, { admin }, { headers: authHeaders(token) });
    const user = res.data as User;

    dispatch(setUserData(id, user));
  } catch (error) {
    if (authError(error, dispatch)) return;
    if (httpError(error, dispatch)) return;
    throw error;
  }
};

export const deleteUserToken = (user: string, id: string) => async (dispatch: Dispatch, getState: () => AppState) => {
  try {
    const { token } = getState().auth;
    if (token == null) return;

    await axios.delete(`${env.API_BASE_URL}/user/${user}/token/${id}`, { headers: authHeaders(token) });

    dispatch(deleteUserTokenAction(user, id));
  } catch (error) {
    if (authError(error, dispatch)) return;
    if (httpError(error, dispatch)) return;
    throw error;
  }
};

export const deleteUser = (user: string) => async (dispatch: Dispatch, getState: () => AppState) => {
  try {
    const { token } = getState().auth;
    if (token == null) return;

    await axios.delete(`${env.API_BASE_URL}/user/${user}`, { headers: authHeaders(token) });

    dispatch(setAllUsers(getState().admin.users.filter(id => id !== user)));
    dispatch(deleteUserAction(user));
  } catch (error) {
    if (authError(error, dispatch)) return;
    if (httpError(error, dispatch)) return;
    throw error;
  }
};