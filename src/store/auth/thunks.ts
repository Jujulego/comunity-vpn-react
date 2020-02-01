import axios from 'axios';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { env } from 'env';
import { AppState } from 'store';
import { globalReset } from 'store/actions';
import { logError } from 'store/errors/utils';

import { setError, setToken, setTokenId } from './actions';
import { authError, authHeaders } from './utils';

// Thunks
export const login = (email: string, password: string) => async (dispatch: Dispatch) => {
  try {
    // Make login request
    const res = await axios.post(`${env.API_BASE_URL}/users/login`, { email, password });
    const token = res.data.token as string;
    const tokenId = res.data._id as string;

    // Store data
    dispatch(setToken(token));
    dispatch(setTokenId(tokenId));
  } catch (error) {
    dispatch(setError(error.response.data.error));

    throw error;
  }
};

export const signIn = (email: string, password: string) => async (dispatch: ThunkDispatch<AppState, {}, any>) => {
  try {
    // Make sign in request
    await axios.post(`${env.API_BASE_URL}/users`, { email, password });
    dispatch(login(email, password));
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
    dispatch(globalReset());
  } catch (error) {
    if (authError(error, dispatch)) return;
    if (logError(error, dispatch)) return;
    throw error;
  }
};