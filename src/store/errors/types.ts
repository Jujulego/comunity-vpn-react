import { Action } from 'redux';

import HttpError from 'data/HttpError';

import { ADD_ERROR } from './constants';

// State
export interface ErrorsState {
  errors: HttpError[]
}

// Actions
interface AddErrorAction extends Action<typeof ADD_ERROR> {
  error: HttpError
}

export type ErrorsActions = AddErrorAction