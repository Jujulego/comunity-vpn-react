import React, { FC } from 'react';

import { IconButton, Tooltip } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';

import Toolbar, { ToolbarProps } from 'components/basics/Toolbar';

// Types
export interface TokenToolbarProps extends ToolbarProps {
  onDelete?: () => void
}

// Component
const TokenToolbar: FC<TokenToolbarProps> = (props) => {
  // Props
  const {
    onDelete,
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
    </Toolbar>
  );
};

export default TokenToolbar;