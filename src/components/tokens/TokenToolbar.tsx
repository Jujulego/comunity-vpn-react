import React, { FC } from 'react';

import { IconButton, Tooltip } from '@material-ui/core';
import {
  Delete as DeleteIcon,
  Refresh as RefreshIcon
} from '@material-ui/icons';

import Toolbar, { ToolbarProps } from 'components/basics/Toolbar';

// Types
export interface TokenToolbarProps extends ToolbarProps {
  onDelete?: () => void,
  onRefresh: () => void
}

// Component
const TokenToolbar: FC<TokenToolbarProps> = (props) => {
  // Props
  const {
    onDelete, onRefresh,
    ...toolbar
  } = props;

  // Render
  const selected = toolbar.numSelected > 0;
  const color = selected ? "inherit" : undefined;

  return (
    <Toolbar {...toolbar}>
      { onDelete && selected && (
        <Tooltip title="Supprimer les tokens sélectionnés">
          <IconButton color={color} onClick={onDelete}>
            <DeleteIcon />
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

export default TokenToolbar;