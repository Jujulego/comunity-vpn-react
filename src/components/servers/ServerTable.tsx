import React, { FC, useContext, useEffect, useState } from 'react';

import {
  TableContainer, TableHead, TableBody, TableCell,
  Paper, Switch
} from '@material-ui/core';

import TableContext from 'contexts/TableContext';
import Server from 'data/server';

import Table, { TableProps } from 'components/basics/Table';
import TableRow from 'components/basics/TableRow';
import UserCell from 'components/users/UserCell';

import AddServerDialog from './AddServerDialog';
import ServerToolbar from './ServerToolbar';

// Types
export interface ServerTableProps extends Omit<TableProps, 'data' | 'toolbar'> {
  title: string, servers: Server[], showUsers?: boolean,
  onLoad: () => void, onRefresh: () => void,
  onAddServer?: (ip: string) => void,
  onDeleteServer?: (id: string) => void,
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
    title, servers, showUsers = false,
    onLoad, onRefresh,
    onAddServer,
    onDeleteServer,
    onToggleServer,
    ...table
  } = props;

  // Context
  const { selected } = useContext(TableContext);

  // State
  const [dialog, setDialog] = useState(false);

  // Effects
  useEffect(() => {
    onLoad();
  }, [onLoad]);

  // Handlers
  const handleOpen = onAddServer && (() => setDialog(true));
  const handleClose = () => setDialog(false);

  const handleDelete = onDeleteServer && (() => {
    servers.forEach(server => {
      if (selected[server._id]) onDeleteServer(server._id);
    });
  });

  // Render
  return (
    <Paper>
      <TableContainer>
        <Table
          {...table} data={servers}
          toolbar={
            <ServerToolbar
              title={title}
              onAdd={handleOpen} onDelete={handleDelete} onRefresh={onRefresh}
            />
          }
        >
          <TableHead>
            <TableRow>
              <TableCell>Adresse</TableCell>
              <TableCell>Port</TableCell>
              <TableCell>Pays</TableCell>
              { showUsers && (
                <TableCell>Utilisateur</TableCell>
              ) }
              <TableCell>Actif</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { servers.map(server => (
              <TableRow key={server._id} doc={server} hover>
                <TableCell>{server.ip}</TableCell>
                <TableCell>{server.port}</TableCell>
                <TableCell>{server.country}</TableCell>
                { showUsers && <UserCell id={server.user} /> }
                <TableCell padding="none">
                  <Switch checked={server.available} onChange={() => onToggleServer(server._id, randomPort())} />
                </TableCell>
              </TableRow>
            )) }
          </TableBody>
        </Table>
      </TableContainer>
      { onAddServer && (
        <AddServerDialog open={dialog} onClose={handleClose} onAddServer={onAddServer} />
      )}
    </Paper>
  );
};

export default ServerTable;