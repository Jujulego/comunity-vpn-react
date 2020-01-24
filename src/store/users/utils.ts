import { UserState, UsersState } from './types';

// Utils
export const isMe = (id: string, getMe: () => UserState | undefined) => {
  const me = getMe();
  return me && me.data && me.data._id === id;
};

export const getUserState = (id: string, getState: () => UsersState): UserState | undefined => {
  const { me, [id]: user } = getState();
  return isMe(id, () => me) ? me : user;
};