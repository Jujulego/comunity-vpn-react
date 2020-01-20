import axios from 'axios';
import { Dispatch } from 'redux';

import { env } from 'env';
import User from 'data/user';
import { AppState } from 'store';

import { setError, setToken, setUser } from './actions';
import { authHeaders } from './utils';

// Thunks
export const login = (email: string, password: string) => async (dispatch: Dispatch) => {
  // Make login request
  const loginRes = await axios.post(`${env.API_BASE_URL}/users/login`, { email, password });
  if (loginRes.status !== 200) {
    const { error } = loginRes.data;

    console.log('login failed !');
    dispatch(setError(error));

    return;
  }

  // Store token
  const token = loginRes.data.token as string;
  dispatch(setToken(token));

  // Get user's data
  const userRes = await axios.get(`${env.API_BASE_URL}/user/me`, { headers: authHeaders(token) });
  if (loginRes.status !== 200) {
    const { error } = loginRes.data;

    console.log(`error while getting user's data: ${error}`);

    dispatch(setToken(null));
    dispatch(setError(error));

    return;
  }

  // Store data
  const user = userRes.data as User;
  dispatch(setUser(user));
};

export const logout = () => async (dispatch: Dispatch, getState: () => AppState) => {
  const { token } = getState().auth;
  if (token == null) return;

  // Make logout request
  const res = await axios.post(`${ env.API_BASE_URL}/user/me/logout`, { headers: authHeaders(token) });
  if (res.status !== 200) {
    const { error } = res.data;

    console.log('login failed !');
    dispatch(setError(error));

    return;
  }

  // Remove token and user
  dispatch(setToken(null));
  dispatch(setUser(null));
};