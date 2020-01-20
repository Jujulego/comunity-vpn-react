import React, { FC } from 'react';

import {
  AppBar as MaterialAppBar, Toolbar,
  Drawer,
  List, ListItem, ListItemIcon, ListItemText,
  Typography
} from '@material-ui/core';
import {
  Home as HomeIcon,
  Storage as ServerIcon
} from '@material-ui/icons';
import { Link } from 'react-router-dom';

import AccountMenu from './auth/AccountMenu';

import styles from './AppBar.module.scss';

// Component
const AppBar: FC = ({ children }) => {
  // Render
  return (
    <div className={styles.root}>
      <MaterialAppBar classes={{ root: styles.appBar }} position="fixed">
        <Toolbar>
          <Typography className={ styles.title } variant="h6">Community VPN</Typography>
          <AccountMenu />
        </Toolbar>
      </MaterialAppBar>
      <Drawer classes={{ root: styles.drawer, paper: styles.paper }} variant="permanent">
        <Toolbar disableGutters />
        <List>
          <ListItem button component={Link} to="/">
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Accueil" />
          </ListItem>
          <ListItem button component={Link} to="/servers">
            <ListItemIcon><ServerIcon /></ListItemIcon>
            <ListItemText primary="Serveurs" />
          </ListItem>
        </List>
      </Drawer>
      <main className={ styles.content }>
        <Toolbar disableGutters />
        { children }
      </main>
    </div>
  );
};

export default AppBar;