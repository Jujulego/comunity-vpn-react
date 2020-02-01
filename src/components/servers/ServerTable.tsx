import React, { FC, useEffect, useState } from 'react';
import { Theme, useMediaQuery } from '@material-ui/core';

import {
  Paper,
  TableContainer, TableHead, TableBody, TableCell
} from '@material-ui/core';

import Server from 'data/Server';

import Table, { TableProps } from 'components/basics/Table';
import TableRow from 'components/basics/TableRow';
import UserCell from 'components/users/UserCell';

import AddServerDialog from './AddServerDialog';
import ServerToolbar from './ServerToolbar';

// Types
export interface ServerTableProps extends Omit<TableProps, 'data' | 'toolbar'> {
  title: string, servers: Server[], showUsers?: boolean,
  onLoad: () => void, onRefresh: () => void,
  onAddServer?: (ip: string, port: number) => void,
  onDeleteServer?: (id: string) => void
}

// Component
const ServerTable: FC<ServerTableProps> = (props) => {
  // Props
  const {
    title, servers, showUsers = false,
    onLoad, onRefresh,
    onAddServer,
    onDeleteServer,
    ...table
  } = props;

  // State
  const [dialog, setDialog] = useState(false);

  // Effects
  useEffect(() => {
    onLoad();
  }, [onLoad]);

  // Handlers
  const handleOpen = onAddServer && (() => setDialog(true));
  const handleClose = () => setDialog(false);

  const handleDelete = onDeleteServer && ((ids: string[]) => {
    ids.forEach(onDeleteServer);
  });

  // Render
  const small = useMediaQuery(({ breakpoints }: Theme) => breakpoints.down('sm'));

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
              { !small && (<TableCell>Port</TableCell>) }
              <TableCell>Pays</TableCell>
              { showUsers && (
                <TableCell>Utilisateur</TableCell>
              ) }
            </TableRow>
          </TableHead>
          <TableBody>
            { servers.map(server => (
              <TableRow key={server._id} doc={server} hover>
                <TableCell>{server.ip}</TableCell>
                { !small && (<TableCell>{server.port}</TableCell>) }
                <TableCell>{server.country}</TableCell>
                { showUsers && <UserCell id={server.user} /> }
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