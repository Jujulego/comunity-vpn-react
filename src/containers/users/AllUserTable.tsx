import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import User from 'data/User';
import { AppState } from 'store';
import { refreshAllUsers } from 'store/admin/thunks';
import { deleteUser, toggleAdmin } from 'store/users/thunks';

import UserTable, { UserTableProps } from 'components/users/UserTable';

// Type
type DefinedProps = 'users' | 'room' | 'onLoad' | 'onRefresh' | 'onToggleAdmin' | 'onDeleteUser';
export type AllUserTableProps = Omit<UserTableProps, DefinedProps>;

// Component
function mapStateToProps(state: AppState, _: AllUserTableProps) {
  const { users } = state.admin;

  return {
    room: 'admin',
    users: users.reduce<User[]>((acc, id) => {
      const { data } = state.users[id];
      if (data) acc.push(data);

      return acc;
    }, [])
  };
}

function mapDispatchToProps(dispatch: ThunkDispatch<AppState, {}, any>, _: AllUserTableProps) {
  return {
    onLoad: () => dispatch(refreshAllUsers()),
    onRefresh: () => dispatch(refreshAllUsers()),
    onToggleAdmin: (id: string) => dispatch(toggleAdmin(id)),
    onDeleteUser: (id: string) => dispatch(deleteUser(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserTable);