import React, { FC } from 'react';

import { IconButton, Tooltip } from '@material-ui/core';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon
} from '@material-ui/icons';

import Toolbar, { ToolbarProps } from 'components/basics/Toolbar';

// Types
export interface ServerToolbarProps extends ToolbarProps {
  onAdd?: () => void,
  onDelete?: () => void,
  onRefresh: () => void
}

// Component
const ServerToolbar: FC<ServerToolbarProps> = (props) => {
  // Props
  const {
    onAdd, onDelete, onRefresh,
    ...toolbar
  } = props;

  // Render
  const selected = toolbar.numSelected > 0;
  const color = selected ? "inherit" : undefined;

  return (
    <Toolbar {...toolbar}>
      { onDelete && selected && (
        <Tooltip title="Supprimer les serveurs sélectionnés">
          <IconButton color={color} onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) }
      { onAdd && (
        <Tooltip title="Ajouter un serveur">
          <IconButton color={color} onClick={onAdd}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      ) }
      <Tooltip title="Rafraîchir">
        <IconButton color={color} onClick={onRefresh}>
          <RefreshIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

export default ServerToolbar;