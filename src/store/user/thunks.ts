import axios from 'axios';
import { Dispatch } from 'redux';

import { env } from 'env';
import User from 'data/user';
import { AppState } from 'store';

import { setLoading, setError, setUser } from './actions';
import { authHeaders } from 'store/auth/utils';

// Thunks
export const getMe = () => async (dispatch: Dispatch, getState: () => AppState) => {
  try {
    const { token } = getState().auth;
    if (token == null) return;

    dispatch(setLoading(true));

    const res = await axios.get(`${env.API_BASE_URL}/user/me`, { headers: authHeaders(token) });
    const user = res.data as User;

    dispatch(setUser(user));
  } catch (error) {
    dispatch(setError(error.response.data.error));

    throw error;
  }
};