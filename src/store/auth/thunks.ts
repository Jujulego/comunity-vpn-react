import axios from 'axios';
import { Dispatch } from 'redux';

import { env } from 'env';
import User from 'data/user';
import { AppState } from 'store';

import { setError, setToken, setUser } from './actions';
import { authHeaders } from './utils';

// Thunks
export const login = (email: string, password: string) => async (dispatch: Dispatch) => {
  try {
    // Make login request
    const loginRes = await axios.post(`${env.API_BASE_URL}/users/login`, { email, password });
    const token = loginRes.data.token as string;

    // Get user's data
    const userRes = await axios.get(`${env.API_BASE_URL}/user/me`, { headers: authHeaders(token) });
    const user = userRes.data as User;

    // Store data
    dispatch(setToken(token));
    dispatch(setUser(user));
  } catch (error) {
    dispatch(setError(error.response.data.error));

    throw error;
  }
};

export const logout = () => async (dispatch: Dispatch, getState: () => AppState) => {
  const { token } = getState().auth;
  if (token == null) return;

  try {
    // Make logout request
    await axios.post(`${env.API_BASE_URL}/user/me/logout`, { headers: authHeaders(token) });

    // Remove token and user
    dispatch(setToken(null));
    dispatch(setUser(null));
  } catch (error) {
    dispatch(setError(error.response.data.error));

    throw error;
  }
};