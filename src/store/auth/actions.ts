import { setActionCreator as setAC } from 'utils/actions/set';

import { SET_ERROR, SET_TOKEN } from './constants';
import { AuthActionTypes } from './types';

// Actions
export const setError = setAC<AuthActionTypes, typeof SET_ERROR>(SET_ERROR);
export const setToken = setAC<AuthActionTypes, typeof SET_TOKEN>(SET_TOKEN);