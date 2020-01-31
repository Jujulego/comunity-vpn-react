import HttpError from 'data/HttpError';

import { ADD_ERROR } from './constants';
import { ErrorsActions } from './types';

// Actions
export const addError = (error: HttpError): ErrorsActions => ({ type: ADD_ERROR, error });