import { useDispatch, useSelector } from 'react-redux';

import { AppState } from 'store';

import { refreshUser } from './thunks';
import { UserState } from './types';
import { getUserState } from './utils';

// Hooks
export const useMe = () => useUser('me');
export const useUser = (id: string) => {
  // Redux
  const dispatch = useDispatch();
  const user = useSelector<AppState,UserState | undefined>((state) => getUserState(id, () => state.users));

  // If no users => get users
  if (!user || (user.data == null && !user.loading)) {
    dispatch(refreshUser(id));
  }

  return user ? user.data : null;
};