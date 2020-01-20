import { useDispatch, useSelector } from 'react-redux';

import { AppState } from 'store';

import { getMe } from './thunks';

// Hooks
export const useMe = () => {
  // Redux
  const dispatch = useDispatch();
  const user = useSelector((state: AppState) => state.user);

  // If no user => get user
  if (user.user == null && !user.loading) {
    dispatch(getMe());
  }

  return user.user;
};