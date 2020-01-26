import { GLOBAL_RESET } from './constants';
import { Action } from 'redux';

// Actions
export const globalReset = (): Action<typeof GLOBAL_RESET> => ({ type: GLOBAL_RESET });