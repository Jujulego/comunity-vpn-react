import { useDispatch, useSelector } from 'react-redux';

import { AppState } from 'store';

import { getServer } from './thunks';
import { ServerState } from './types';

// Hooks
export const useServer = (id: string) => {
  // Redux
  const dispatch = useDispatch();
  const server = useSelector<AppState,ServerState>((state) => state.servers[id]);

  // If no users => get users
  if (!server || (server.data == null && !server.loading)) {
    dispatch(getServer(id));
  }

  return server ? server.data : null;
};