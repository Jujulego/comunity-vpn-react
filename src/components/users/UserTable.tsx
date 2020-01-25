import React, { FC, useContext, useEffect } from 'react';

import User from 'data/user';

import {
  Table, TableContainer, TableHead, TableBody, TableCell,
  TableProps, Paper
} from '@material-ui/core';

import TableContext from 'contexts/TableContext';

import DataTable from 'components/basics/DataTable';
import TableRow from 'components/basics/TableRow';
import UserRow from 'components/users/UserRow';
import UserToolbar from 'components/users/UserToolbar';

// Types
export interface UserTableProps extends TableProps {
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

  // Context
  const { selected } = useContext(TableContext);

  // Effects
  useEffect(() => {
    onLoad();
  }, [onLoad]);

  // Handlers
  const handleDelete = onDeleteUser && (() => {
    users.forEach(user => {
      if (selected[user._id]) onDeleteUser(user._id);
    });
  });

  // Render
  return (
    <Paper>
      <DataTable data={users}>
        <UserToolbar
          title={title}
          onDelete={handleDelete} onRefresh={onRefresh}
        />
        <TableContainer>
          <Table {...table}>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Connexions</TableCell>
                <TableCell>Dernière connexion</TableCell>
                <TableCell>Admin</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { users.map(user => (
                <UserRow
                  key={user._id} user={user} hover
                  onToggleAdmin={() => onToggleAdmin(user._id)}
                />
              )) }
            </TableBody>
          </Table>
        </TableContainer>
      </DataTable>
    </Paper>
  );
};

export default UserTable;