import React, { FC, useEffect, useState } from 'react';
import { Paper, TableCell, TableContainer, TableHead, Theme, useMediaQuery } from '@material-ui/core';

import { useEventRoom } from 'contexts/EventContext';
import Server from 'data/Server';

import { Table, TableBody, TableProps, TableRow, TableSortCell } from 'components/basics';
import UserCell from 'components/users/UserCell';

import AddServerDialog from './AddServerDialog';
import ServerToolbar from './ServerToolbar';
import { ip2int } from 'utils/ip';

// Types
export interface ServerTableProps extends Omit<TableProps<Server>, 'data' | 'toolbar'> {
  title: string, room?: string, servers: Server[], showUsers?: boolean,
  onLoad: () => void, onRefresh: () => void,
  onAddServer?: (ip: string, port: number, user: string) => void,
  onDeleteServer?: (id: string) => void
}

// Component
const ServerTable: FC<ServerTableProps> = (props) => {
  // Props
  const {
    title, room, servers, showUsers = false,
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

  // Events
  useEventRoom(room, event => {
    if (event.scope === 'servers') {
      onRefresh();
    }
  });

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
              { showAddr && <TableSortCell field={(srv: Server) => ip2int(srv.ip)}>Adresse</TableSortCell> }
              { showPort && <TableCell>Port</TableCell> }
              <TableSortCell<Server> field="country">Pays</TableSortCell>
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
        <AddServerDialog open={dialog} selectUser={showUsers} onClose={handleClose} onAddServer={onAddServer} />
      )}
    </Paper>
  );
};

export default ServerTable;