import React, { FC } from 'react';

import { useMe } from 'store/users/hooks';

import {
  AppBar as MaterialAppBar, Toolbar,
  Drawer,
  List, ListItem, ListItemIcon, ListItemText,
  Typography
} from '@material-ui/core';
import {
  Home as HomeIcon,
  Storage as ServersIcon
} from '@material-ui/icons';
import { Link } from 'react-router-dom';

import AdminLinks from './admin/AdminLinks';
import AccountMenu from './auth/AccountMenu';

import styles from './AppBar.module.scss';

// Component
const AppBar: FC = ({ children }) => {
  // Redux
  const user = useMe();
  const isAdmin = user && user.admin;

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
            <ListItemIcon><ServersIcon /></ListItemIcon>
            <ListItemText primary="Serveurs" />
          </ListItem>
          { isAdmin && (
            <AdminLinks />
          ) }
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