import React, { FC } from 'react';
import clsx from 'clsx';

import {
  IconButton,
  Toolbar, Tooltip,
  Typography
} from '@material-ui/core';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon
} from '@material-ui/icons';

import styles from './ServerToolbar.module.scss';

// Types
export interface ServerToolbarProps {
  title: string, numSelected: number,
  onAdd?: () => void,
  onDelete?: () => void,
  onRefresh: () => void
}

// Component
const ServerToolbar: FC<ServerToolbarProps> = (props) => {
  // Props
  const {
    title, numSelected,
    onAdd, onDelete, onRefresh
  } = props;

  // Render
  return (
    <Toolbar classes={{ root: clsx(styles.toolbar, { [styles.selected]: numSelected > 0 }) }}>
      { (numSelected > 0) ? (
        <Typography classes={{ root: styles.title }} color="inherit" variant="subtitle1">{numSelected} sélectionné(s)</Typography>
      ) : (
        <Typography classes={{ root: styles.title }} variant="h6">{title}</Typography>
      ) }
      { onDelete && (numSelected > 0) && (
        <Tooltip title="Supprimer les serveurs sélectionnés">
          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) }
      { onAdd && (
        <Tooltip title="Ajouter un serveur">
          <IconButton onClick={onAdd}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      ) }
      <Tooltip title="Rafraichir">
        <IconButton onClick={onRefresh}>
          <RefreshIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

export default ServerToolbar;