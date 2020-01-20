import axios from 'axios';
import { Dispatch } from 'redux';

import { env } from 'env';
import User from 'data/user';

import { AppState } from 'store';
import { authError, authHeaders } from 'store/auth/utils';

import { setUserLoading, setUserData } from './actions';

// Thunks
export const getUser = (id: string) => async (dispatch: Dispatch, getState: () => AppState) => {
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

export const getMe = () => getUser('me');