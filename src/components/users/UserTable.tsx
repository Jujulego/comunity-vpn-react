import React, { FC, useEffect, useState } from 'react';

import User from 'data/user';

import {
  Checkbox,
  Table, TableContainer, TableHead, TableBody, TableRow, TableCell,
  TableProps, Paper
} from '@material-ui/core';

import UserRow from 'components/users/UserRow';
import UserToolbar from 'components/users/UserToolbar';

// Types
interface SelectedState { [id: string]: boolean }

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

  // State
  const [selected, setSelected] = useState<SelectedState>({});

  const numSelected = users.reduce((acc, user) => {
    if (selected[user._id]) acc++;
    return acc;
  }, 0);

  // Effects
  useEffect(() => {
    onLoad();
  }, [onLoad]);

  // Handlers
  const handleSelect = (id: string) => () => {
    setSelected(old => ({ ...old, [id]: !old[id] }));
  };

  const handleSelectAll = () => {
    if (numSelected === users.length) {
      setSelected({});
    } else {
      setSelected(users.reduce<SelectedState>((acc, server) => {
        acc[server._id] = true;
        return acc;
      }, {}));
    }
  };

  const handleDelete = onDeleteUser && (() => {
    users.forEach(server => {
      if (selected[server._id]) onDeleteUser(server._id);
    });
  });

  // Render
  return (
    <Paper>
      <UserToolbar
        title={title} numSelected={numSelected}
        onDelete={handleDelete} onRefresh={onRefresh}
      />
      <TableContainer>
        <Table {...table}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={numSelected > 0 && numSelected < users.length}
                  checked={numSelected > 0 && numSelected === users.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Connexions</TableCell>
              <TableCell>Dernière connexion</TableCell>
              <TableCell>Admin</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { users.map(user => (
              <UserRow
                key={user._id}
                hover user={user} selected={selected[user._id]}
                onSelect={handleSelect(user._id)}
                onToggleAdmin={() => onToggleAdmin(user._id)}
              />
            )) }
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default UserTable;