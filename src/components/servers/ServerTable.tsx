import React, { FC, useEffect, useState } from 'react';

import Server from 'data/server';

import {
  Checkbox,
  Table, TableContainer, TableHead, TableBody, TableRow, TableCell,
  TableProps, Paper
} from '@material-ui/core';

import AddServerDialog from './AddServerDialog';
import ServerRow from './ServerRow';
import ServerToolbar from './ServerToolbar';

// Types
interface SelectedState { [id: string]: boolean }

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

  // State
  const [dialog, setDialog] = useState(false);
  const [selected, setSelected] = useState<SelectedState>({});

  const numSelected = servers.reduce((acc, server) => {
    if (selected[server._id]) acc++;
    return acc;
  }, 0);

  // Effects
  useEffect(() => {
    onLoad();
  }, [onLoad]);

  // Handlers
  const handleOpen = onAddServer && (() => setDialog(true));
  const handleClose = () => setDialog(false);

  const handleSelect = (id: string) => () => {
    setSelected(old => ({ ...old, [id]: !old[id] }));
  };

  const handleSelectAll = () => {
    if (numSelected === servers.length) {
      setSelected({});
    } else {
      setSelected(servers.reduce<SelectedState>((acc, server) => {
        acc[server._id] = true;
        return acc;
      }, {}));
    }
  };

  const handleDelete = onDeleteServer && (() => {
    servers.forEach(server => {
      if (selected[server._id]) onDeleteServer(server._id);
    });
  });

  // Render
  return (
    <Paper>
      <ServerToolbar
        title={title} numSelected={numSelected}
        onAdd={handleOpen} onDelete={handleDelete} onRefresh={onRefresh}
      />
      <TableContainer>
        <Table {...table}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={numSelected > 0 && numSelected < servers.length}
                  checked={numSelected > 0 && numSelected === servers.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
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
                  key={server._id}
                  server={server} selected={selected[server._id]}
                  hover showUser={showUsers}
                  onSelect={handleSelect(server._id)}
                  onToggleServer={() => onToggleServer(server._id, randomPort())}
              />
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