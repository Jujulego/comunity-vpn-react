import React, { FC, MouseEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  Menu, MenuItem,
  IconButton
} from '@material-ui/core';
import {
  AccountCircle as AccountCircleIcon
} from '@material-ui/icons';
import { Link } from 'react-router-dom';

import { logout } from 'store/auth/thunks';

// Component
const AccountMenu: FC = () => {
  // State
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  // Redux
  const dispatch = useDispatch();

  // Handlers
  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const handleLogout = () => {
    setAnchor(null);
    dispatch(logout());
  };

  // Render
  return (
    <>
      <IconButton color="inherit" onClick={handleMenu}>
        <AccountCircleIcon />
      </IconButton>
      <Menu
        anchorEl={anchor}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={anchor != null}
        onClose={handleClose}
      >
        <MenuItem disabled
          component={Link} to="/profile"
          onClick={handleClose}
        >
          Profil
        </MenuItem>
        <MenuItem onClick={handleLogout}>Déconnexion</MenuItem>
      </Menu>
    </>
  );
};

export default AccountMenu;