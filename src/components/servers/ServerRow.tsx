import React, { FC } from 'react';

import { Switch, TableCell } from '@material-ui/core';

import Server from 'data/server';

import TableRow, { TableRowProps } from 'components/basics/TableRow';
import UserCell from 'components/users/UserCell';

// Types
export interface ServerRowProps extends Omit<TableRowProps, 'doc'> {
  server: Server,
  showUser?: boolean,
  onToggleServer: () => void
}

// Component
const ServerRow: FC<ServerRowProps> = (props) => {
  // Props
  const {
    server, showUser = false,
    onToggleServer,
    ...row
  } = props;

  // Render
  return (
    <TableRow {...row} doc={server}>
      <TableCell>{server.ip}</TableCell>
      <TableCell>{server.port}</TableCell>
      <TableCell>{server.country}</TableCell>
      { showUser && <UserCell id={server.user} /> }
      <TableCell padding="none">
        <Switch checked={server.available} onChange={onToggleServer} />
      </TableCell>
    </TableRow>
  );
};

export default ServerRow;