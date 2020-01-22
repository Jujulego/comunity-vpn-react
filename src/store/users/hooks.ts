import { useDispatch, useSelector } from 'react-redux';

import { AppState } from 'store';

import { refreshUser } from './thunks';
import { UserState } from './types';

// Hooks
export const useMe = () => useUser('me');
export const useUser = (id: string, refresh: boolean = false) => {
  // Redux
  const dispatch = useDispatch();
  const user = useSelector<AppState,UserState>((state) => state.users[id]);

  // If no users => get users
  if (!user || ((refresh || user.data == null) && !user.loading)) {
    dispatch(refreshUser(id));
  }

  return user ? user.data : null;
};