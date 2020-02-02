import React, { FC, useEffect } from 'react';
import { Theme, useMediaQuery } from '@material-ui/core';

import User from 'data/User';

import {
  TableContainer, TableHead, TableCell,
  Paper
} from '@material-ui/core';

import Table, { TableProps } from 'components/basics/Table';
import TableBody from 'components/basics/TableBody';
import TableRow from 'components/basics/TableRow';
import TableSortCell from 'components/basics/TableSortCell';
import UserRow from 'components/users/UserRow';
import UserToolbar from 'components/users/UserToolbar';

// Types
export interface UserTableProps extends Omit<TableProps, 'data' | 'toolbar'> {
  title: string, users: User[],
  onLoad: () => void, onRefresh: () => void,
  onDeleteUser?: (id: string) => void,
  onToggleAdmin: (id: string) => void
}

// Component
const UserTable: FC<UserTableProps> = (props) => {
  // Props
  const {
    title, users,
    onLoad, onRefresh,
    onDeleteUser,
    onToggleAdmin,
    ...table
  } = props;

  // Effects
  useEffect(() => {
    onLoad();
  }, [onLoad]);

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
          data={users} {...table}
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
              { !small && (<TableCell>Connexions</TableCell>) }
              <TableCell>Dernière connexion</TableCell>
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