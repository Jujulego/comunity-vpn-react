import React, { FC } from 'react';

import Server from 'data/server';

import {
  Switch,
  Table, TableContainer, TableHead, TableBody, TableRow, TableCell,
  TableProps, Paper
} from '@material-ui/core';

import ServerToolbar from './ServerToolbar';

// Types
export interface ServerTableProps extends TableProps {
  title: string, servers: Server[] | null,
  onLoad: () => void, onRefresh: () => void,
  onToggleServer: (id: string, port: number) => void
}

// Utils
function randomPort() {
  return 1024 + Math.round(Math.random() * (65535 - 1024))
}

// Component
const ServerTable: FC<ServerTableProps> = (props) => {
  // Props
  const {
    title, servers,
    onLoad, onRefresh,
    onToggleServer,
    ...table
  } = props;

  // Render
  if (servers == null) onLoad();

  return (
    <Paper>
      <ServerToolbar title={title} onRefresh={onRefresh} />
      <TableContainer>
        <Table {...table}>
          <TableHead>
            <TableRow>
              <TableCell>Adresse</TableCell>
              <TableCell>Port</TableCell>
              <TableCell>Pays</TableCell>
              <TableCell>Actif</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { servers && servers.map(server => (
              <TableRow key={server._id}>
                <TableCell>{server.ip}</TableCell>
                <TableCell>{server.port}</TableCell>
                <TableCell>{server.country}</TableCell>
                <TableCell padding="none">
                  <Switch checked={server.available} onChange={() => onToggleServer(server._id, randomPort())} />
                </TableCell>
              </TableRow>
            )) }
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ServerTable;