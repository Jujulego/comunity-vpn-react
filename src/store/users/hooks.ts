import { useDispatch, useSelector } from 'react-redux';

import { AppState } from 'store';

import { getUser } from './thunks';
import { UserState } from './types';

// Hooks
export const useUser = (id: string) => {
  // Redux
  const dispatch = useDispatch();
  const user = useSelector<AppState,UserState>((state) => state.users[id]);

  // If no users => get users
  if (!user || (user.data == null && !user.loading)) {
    dispatch(getUser(id));
  }

  return user ? user.data : null;
};

export const useMe = () => useUser('me');