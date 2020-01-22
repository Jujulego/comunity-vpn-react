import React, { FC, useEffect, useState } from 'react';

import Server from 'data/server';

import {
  Checkbox, Switch,
  Table, TableContainer, TableHead, TableBody, TableRow, TableCell,
  TableProps, Paper
} from '@material-ui/core';

import AddServerDialog from './AddServerDialog';
import ServerToolbar from './ServerToolbar';

// Types
interface SelectedState { [id: string]: boolean }
export interface ServerTableProps extends TableProps {
  title: string, servers: Server[],
  onLoad: () => void, onRefresh: () => void,
  onAddServer?: (ip: string) => void,
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
    onAddServer,
    onToggleServer,
    ...table
  } = props;

  // State
  const [dialog, setDialog] = useState(false);
  const [selected, setSelected] = useState<SelectedState>({});

  const selectedCount = servers.reduce((acc, server) => {
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

  const handleSelectAll = () => {
    if (selectedCount === servers.length) {
      setSelected({});
    } else {
      setSelected(servers.reduce<SelectedState>((acc, server) => {
        acc[server._id] = true;
        return acc;
      }, {}));
    }
  };

  const handleSelect = (id: string) => () => {
    setSelected(old => ({ ...old, [id]: !old[id] }));
  };

  // Render
  return (
    <Paper>
      <ServerToolbar
        title={title}
        onAdd={handleOpen} onRefresh={onRefresh}
      />
      <TableContainer>
        <Table {...table}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selectedCount > 0 && selectedCount < servers.length}
                  checked={selectedCount === servers.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>Adresse</TableCell>
              <TableCell>Port</TableCell>
              <TableCell>Pays</TableCell>
              <TableCell>Actif</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { servers && servers.map(server => (
              <TableRow
                key={server._id}
                hover selected={selected[server._id]}
              >
                <TableCell padding="checkbox">
                  <Checkbox checked={selected[server._id] || false} onChange={handleSelect(server._id)} />
                </TableCell>
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
      { onAddServer && (
        <AddServerDialog open={dialog} onClose={handleClose} onAddServer={onAddServer} />
      )}
    </Paper>
  );
};

export default ServerTable;