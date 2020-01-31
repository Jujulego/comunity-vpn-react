import moment from 'moment';
import { Dispatch } from 'redux';

import { addError } from './actions';

// Functions
export const httpError = (error: any, dispatch: Dispatch) => {
  if (error.response) {
    // Error !
    dispatch(addError({
      date: moment(),
      status: error.response.status,
      message: error.response.data.error
    }));

    return true;
  }

  return false;
};