import axios from 'axios';
import { Dispatch } from 'redux';

import { env } from 'env';
import { AppState } from 'store';
import { setUserData } from 'store/users/actions';

import { setError, setToken } from './actions';
import { authError, authHeaders } from './utils';

// Thunks
export const login = (email: string, password: string) => async (dispatch: Dispatch) => {
  try {
    // Make login request
    const loginRes = await axios.post(`${env.API_BASE_URL}/users/login`, { email, password });
    const token = loginRes.data.token as string;

    // Store data
    dispatch(setToken(token));
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
    await axios.post(`${env.API_BASE_URL}/user/me/logout`, {}, { headers: authHeaders(token) });

    // Remove token and user
    dispatch(setToken(null));
    dispatch(setUserData('me', null));
  } catch (error) {
    if (authError(error, dispatch)) return;
    throw error;
  }
};