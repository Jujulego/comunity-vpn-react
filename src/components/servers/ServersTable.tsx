import React, { FC } from 'react';

import Server from 'data/server';

import {
  Table, TableHead, TableBody, TableRow, TableCell,
  TableProps
} from '@material-ui/core';

// Types
export interface ServerTableProps extends TableProps {
  servers: Server[] | null,
  onLoad: () => void
}

// Component
const ServersTable: FC<ServerTableProps> = (props) => {
  // Props
  const {
    servers, onLoad,
    ...table
  } = props;

  // Render
  if (servers == null) onLoad();

  return (
    <Table {...table}>
      <TableHead>
        <TableRow>
          <TableCell>Adresse</TableCell>
          <TableCell>Port</TableCell>
          <TableCell>Country</TableCell>
          <TableCell>Actif</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        { servers && servers.map(server => (
          <TableRow key={server._id}>
            <TableCell>{server.ip}</TableCell>
            <TableCell>{server.port}</TableCell>
            <TableCell>{server.country}</TableCell>
            <TableCell>{server.available}</TableCell>
          </TableRow>
        )) }
      </TableBody>
    </Table>
  );
};

export default ServersTable;