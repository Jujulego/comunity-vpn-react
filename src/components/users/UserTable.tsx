import React, { FC, useEffect, useMemo } from 'react';
import moment from 'moment';
import { Theme, useMediaQuery } from '@material-ui/core';

import {
  TableContainer, TableHead, TableCell,
  Paper
} from '@material-ui/core';

import { useEventRoom } from 'contexts/EventContext';
import User from 'data/User';

import {
  Table, TableProps,
  TableBody, TableRow,
  TableSortCell
} from 'components/basics';

import UserRow from './UserRow';
import UserToolbar from './UserToolbar';

// Types
export interface UserTableProps extends Omit<TableProps, 'data' | 'toolbar'> {
  title: string, room?: string, users: User[],
  onLoad: () => void, onRefresh: () => void,
  onDeleteUser?: (id: string) => void,
  onToggleAdmin: (id: string) => void
}

// Component
const UserTable: FC<UserTableProps> = (props) => {
  // Props
  const {
    title, room, users,
    onLoad, onRefresh,
    onDeleteUser,
    onToggleAdmin,
    ...table
  } = props;

  // Effects
  useEffect(() => {
    onLoad();
  }, [onLoad]);

  // Events
  useEventRoom(room, event => {
    if (event.scope === "users") {
      onRefresh();
    }
  });

  // Memos
  const enhanced = useMemo(() => users.map(
    user => ({ ...user,
      connexions: user.tokens.length,
      last: moment.max(user.tokens.map(tk => moment(tk.createdAt)))
    })
  ), [users]);

  // Handlers
  const handleDelete = onDeleteUser && ((ids: string[]) => {
    ids.forEach(onDeleteUser);
  });

  // Render
  const small = useMediaQuery(({ breakpoints }: Theme) => breakpoints.down('sm'));

  return (
    <Paper>
      <TableContainer>
        <Table
          data={enhanced} {...table}
          toolbar={
            <UserToolbar
              title={title}
              onDelete={handleDelete} onRefresh={onRefresh}
            />
          }
        >
          <TableHead>
            <TableRow>
              <TableSortCell field="email">Email</TableSortCell>
              { !small && (<TableSortCell field="connexions">Connexions</TableSortCell>) }
              <TableSortCell field="last">Dernière connexion</TableSortCell>
              { !small && (<TableCell>Admin</TableCell>) }
            </TableRow>
          </TableHead>
          <TableBody>
            { (user: User) => (
              <UserRow
                key={user._id} user={user} hover
                onToggleAdmin={() => onToggleAdmin(user._id)}
              />
            ) }
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default UserTable;