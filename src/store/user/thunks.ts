import axios from 'axios';
import { Dispatch } from 'redux';

import { env } from 'env';
import User from 'data/user';
import { AppState } from 'store';

import { setLoading, setUser } from './actions';
import { authHeaders } from 'store/auth/utils';

// Thunks
export const getMe = () => async (dispatch: Dispatch, getState: () => AppState) => {
  const { token } = getState().auth;
  if (token == null) return;

  dispatch(setLoading(true));

  const res = await axios.get(`${env.API_BASE_URL}/user/me`, { headers: authHeaders(token) });
  const user = res.data as User;

  dispatch(setUser(user));
};