import { Action } from 'redux';

import ErrorLog from 'data/ErrorLog';

import { ADD_ERROR } from './constants';

// State
export interface ErrorsState {
  errors: ErrorLog[]
}

// Actions
interface AddErrorAction extends Action<typeof ADD_ERROR> {
  error: ErrorLog
}

export type ErrorsActions = AddErrorAction