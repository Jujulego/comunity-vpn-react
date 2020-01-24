import { useDispatch, useSelector } from 'react-redux';

import { AppState } from 'store';

import { refreshUser } from './thunks';
import { UserState } from './types';

// Hooks
export const useMe = () => useUser('me');
export const useUser = (id: string) => {
  // Redux
  const dispatch = useDispatch();
  const me = useSelector<AppState,UserState | undefined>((state) => state.users.me);
  const user = useSelector<AppState,UserState | undefined>((state) => state.users[id]);

  // Check if is me
  if (me && me.data && me.data._id === id) {
    return me.data;
  }

  // If no users => get users
  console.log(id, user, !user || (user.data == null && !user.loading));
  if (!user || (user.data == null && !user.loading)) {
    dispatch(refreshUser(id));
  }

  return user ? user.data : null;
};