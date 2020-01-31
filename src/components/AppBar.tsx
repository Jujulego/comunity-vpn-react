import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';

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

import { useMe } from 'store/users/hooks';

import AdminLinks from './admin/AdminLinks';
import AccountMenu from './auth/AccountMenu';
import ErrorSnackbar from './errors/ErrorSnackbar';

// Styles
const useStyles = makeStyles(({ spacing, zIndex }) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: zIndex.drawer + 1
  },
  title: {
    flexGrow: 1
  },
  drawer: {
    width: 300,
    flexShrink: 0
  },
  paper: {
    width: 300,
    zIndex: zIndex.drawer
  },
  content: {
    flexGrow: 1,
    padding: spacing(3)
  }
}));

// Component
const AppBar: FC = ({ children }) => {
  // Redux
  const user = useMe();
  const isAdmin = user && user.admin;

  // Render
  const styles = useStyles();

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
      <ErrorSnackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} />
    </div>
  );
};

export default AppBar;