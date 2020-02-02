import React, { FC, useEffect, useState } from 'react';
import { Theme, useMediaQuery } from '@material-ui/core';

import {
  Paper,
  TableContainer, TableHead, TableCell
} from '@material-ui/core';

import Server from 'data/Server';

import Table, { TableProps } from 'components/basics/Table';
import TableBody from 'components/basics/TableBody';
import TableRow from 'components/basics/TableRow';
import TableSortCell from 'components/basics/TableSortCell';
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
  const small  = useMediaQuery(({ breakpoints }: Theme) => breakpoints.down('sm'));
  const xsmall = useMediaQuery(({ breakpoints }: Theme) => breakpoints.down('xs'));

  const showAddr = !(xsmall && showUsers);
  const showPort = !small;

  return (
    <Paper>
      <TableContainer>
        <Table
          {...table}
          data={servers}
          toolbar={
            <ServerToolbar
              title={title}
              onAdd={handleOpen} onDelete={handleDelete} onRefresh={onRefresh}
            />
          }
        >
          <TableHead>
            <TableRow>
              { showAddr && <TableSortCell field="ip">Adresse</TableSortCell> }
              { showPort && <TableCell>Port</TableCell> }
              <TableSortCell field="country">Pays</TableSortCell>
              { showUsers && <TableCell>Utilisateur</TableCell> }
            </TableRow>
          </TableHead>
          <TableBody>
            { (server: Server) => (
              <TableRow key={server._id} doc={server} hover>
                { showAddr && <TableCell>{server.ip}</TableCell> }
                { showPort && <TableCell>{server.port}</TableCell> }
                <TableCell>{server.country}</TableCell>
                { showUsers && <UserCell id={server.user} /> }
              </TableRow>
            ) }
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