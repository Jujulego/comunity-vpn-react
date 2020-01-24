import React, { FC } from 'react';

import {
  Checkbox, Switch,
  TableCell, TableRow,
  TableRowProps
} from '@material-ui/core';

import Server from 'data/server';

import UserCell from 'components/users/UserCell';

// Types
export interface ServerRowProps extends TableRowProps {
  server: Server,
  selected?: boolean,
  showUser?: boolean,
  onSelect: () => void
  onToggleServer: () => void
}

// Component
const ServerRow: FC<ServerRowProps> = (props) => {
  // Props
  const {
    server,
    selected = false,
    showUser = false,
    onSelect, onToggleServer,
    ...row
  } = props;

  // Render
  return (
    <TableRow selected={selected} {...row}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onChange={onSelect} />
      </TableCell>
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