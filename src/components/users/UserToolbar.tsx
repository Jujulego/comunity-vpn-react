import React, { FC } from 'react';
import clsx from 'clsx';

import {
  IconButton,
  Toolbar, Tooltip,
  Typography
} from '@material-ui/core';
import {
  Delete as DeleteIcon,
  Refresh as RefreshIcon
} from '@material-ui/icons';

import styles from 'components/users/UserToolbar.module.scss';

// Types
export interface UserToolbarProps {
  title: string, numSelected: number,
  onDelete?: () => void,
  onRefresh: () => void
}

// Component
const UserToolbar: FC<UserToolbarProps> = (props) => {
  // Props
  const {
    title, numSelected,
    onDelete, onRefresh
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
        <Tooltip title="Supprimer les utilistateurs sélectionnés">
          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) }
      <Tooltip title="Rafraîchir">
        <IconButton onClick={onRefresh}>
          <RefreshIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

export default UserToolbar;