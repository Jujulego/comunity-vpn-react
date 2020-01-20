import { Dispatch } from 'redux';
import { setToken } from 'store/auth/actions';
import { setUserData } from 'store/users/actions';

// Functions
export const authHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`
});

export const authError = (error: any, dispatch: Dispatch) => {
  if (error.response && error.response.status === 401) {
    // Token error
    dispatch(setToken(null));
    dispatch(setUserData('me', null));
  }

  return false;
};