import ErrorLog from 'data/ErrorLog';

import { ADD_ERROR } from './constants';
import { ErrorsActions } from './types';

// Actions
export const addError = (error: ErrorLog): ErrorsActions => ({ type: ADD_ERROR, error });