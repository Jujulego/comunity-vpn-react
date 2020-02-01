import React, { FC, useState } from 'react';
import { Theme, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import {
  AppBar as MaterialAppBar, Toolbar,
  Drawer, Divider,
  IconButton,
  List, ListItem, ListItemIcon, ListItemText,
  Typography
} from '@material-ui/core';
import {
  ChevronLeft,
  Home as HomeIcon,
  Menu as MenuIcon,
  Storage as ServersIcon
} from '@material-ui/icons';
import { Link } from 'react-router-dom';

import { useMe } from 'store/users/hooks';

import AdminLinks from './admin/AdminLinks';
import AccountMenu from './auth/AccountMenu';
import ErrorSnackbar from './errors/ErrorSnackbar';

// Styles
const useStyles = makeStyles(({ breakpoints, spacing, zIndex }) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: zIndex.drawer + 1
  },
  menubtn: {
    marginRight: spacing(2)
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
    padding: spacing(3),
    [breakpoints.down('sm')]: {
      padding: spacing(1)
    }
  }
}));

// Component
const AppBar: FC = ({ children }) => {
  // State
  const [open, setOpen] = useState(false);

  // Redux
  const user = useMe();
  const isAdmin = user && user.admin;

  // Handlers
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Render
  const small = useMediaQuery(({ breakpoints }: Theme) => breakpoints.down('sm'));
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <MaterialAppBar classes={{ root: styles.appBar }} position="fixed">
        <Toolbar>
          { small && (
            <IconButton
              classes={{ root: styles.menubtn }}
              color="inherit" edge="start"
              onClick={handleOpen}
            >
              <MenuIcon />
            </IconButton>
          ) }
          <Typography className={ styles.title } variant="h6">Community VPN</Typography>
          <AccountMenu />
        </Toolbar>
      </MaterialAppBar>
      <Drawer
        classes={{ root: styles.drawer, paper: styles.paper }} variant={small ? "temporary" : "permanent"}
        open={open} onClose={handleClose}
      >
        <Toolbar disableGutters={!small}>
          { small && (
            <>
              <Typography className={ styles.title } variant="h6">Community VPN</Typography>
              <IconButton
              color="inherit" edge="end"
              onClick={handleClose}
              >
                <ChevronLeft />
              </IconButton>
            </>
          ) }
        </Toolbar>
        { small && (<Divider />) }
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