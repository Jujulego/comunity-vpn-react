import React, { FC } from 'react';

import {
  IconButton,
  Toolbar, Tooltip,
  Typography
} from '@material-ui/core';
import {
  Refresh as RefreshIcon
} from '@material-ui/icons';

import styles from './ServerToolbar.module.scss';

// Types
export interface ServerToolbarProps {
  title: string,
  onRefresh: () => void
}

// Component
const ServerToolbar: FC<ServerToolbarProps> = (props) => {
  // Props
  const { title, onRefresh } = props;

  // Render
  return (
    <Toolbar classes={{ root: styles.toolbar }}>
      <Typography classes={{ root: styles.title }} variant="h6">{title}</Typography>
      <Tooltip title="Rafraichir">
        <IconButton onClick={onRefresh}>
          <RefreshIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

export default ServerToolbar;