import { setActionCreator as setAC } from 'utils/actions/set';

import { SET_LOADING, SET_ERROR, SET_USER } from './constants';
import { UserActionTypes } from './types';

// Actions
export const setLoading = setAC<UserActionTypes, typeof SET_LOADING>(SET_LOADING);
export const setError = setAC<UserActionTypes, typeof SET_ERROR>(SET_ERROR);
export const setUser  = setAC<UserActionTypes, typeof SET_USER>(SET_USER);