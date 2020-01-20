import React, { FC } from 'react';

import {
  AppBar as MaterialAppBar, Toolbar,
  Typography
} from '@material-ui/core';

import LogoutButton from './auth/LogoutButton';

import styles from './AppBar.module.scss';

// Component
const AppBar: FC = () => {
  // Render
  return (
    <MaterialAppBar position="fixed">
      <Toolbar>
        <Typography className={ styles.title } variant="h6">Community VPN</Typography>
        <LogoutButton color="inherit" />
      </Toolbar>
    </MaterialAppBar>
  );
};

export default AppBar;