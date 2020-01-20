import { setActionCreator as setAC } from 'utils/actions/set';

import { SET_ERROR, SET_TOKEN } from './constants';
import { AuthActions } from './types';

// Actions
export const setError = setAC<AuthActions, typeof SET_ERROR>(SET_ERROR);
export const setToken = setAC<AuthActions, typeof SET_TOKEN>(SET_TOKEN);