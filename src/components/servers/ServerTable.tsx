import React, { FC, useContext, useEffect, useState } from 'react';

import {
  Table, TableContainer, TableHead, TableBody, TableCell,
  TableProps, Paper
} from '@material-ui/core';

import TableContext from 'contexts/TableContext';
import Server from 'data/server';

import DataTable from 'components/basics/DataTable';
import TableRow from 'components/basics/TableRow';

import AddServerDialog from './AddServerDialog';
import ServerRow from './ServerRow';
import ServerToolbar from './ServerToolbar';

// Types
export interface ServerTableProps extends TableProps {
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
      <DataTable data={servers}>
        <ServerToolbar
          title={title}
          onAdd={handleOpen} onDelete={handleDelete} onRefresh={onRefresh}
        />
        <TableContainer>
          <Table {...table}>
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
                <ServerRow
                    key={server._id} server={server}
                    hover showUser={showUsers}
                    onToggleServer={() => onToggleServer(server._id, randomPort())}
                />
              )) }
            </TableBody>
          </Table>
        </TableContainer>
      </DataTable>
      { onAddServer && (
        <AddServerDialog open={dialog} onClose={handleClose} onAddServer={onAddServer} />
      )}
    </Paper>
  );
};

export default ServerTable;