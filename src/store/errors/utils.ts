import { Dispatch } from 'redux';

import ErrorLog, { HttpErrorLog } from 'data/ErrorLog';

import { addError } from './actions';

// Functions
export const logError = (error: any, dispatch: Dispatch) => {
  if (error.response) {
    // Error !
    dispatch(addError(
      new HttpErrorLog(error.response.status, error.response.data.error)
    ));

    return true;
  }

  // Error !
  dispatch(addError(
    new ErrorLog(error.message)
  ));

  return false;
};