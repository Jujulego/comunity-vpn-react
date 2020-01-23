import { setActionCreator as setAC } from 'utils/actions/set';

import { SET_ALL_SERVERS } from './constants';
import { AdminActions } from './types';

// Actions
export const setAllServers = setAC<AdminActions, typeof SET_ALL_SERVERS>(SET_ALL_SERVERS);