import React, { FC, useState } from 'react';

import {
  Collapse,
  List, ListItem, ListItemIcon, ListItemText
} from '@material-ui/core';
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Storage as ServersIcon
} from '@material-ui/icons';
import { Link } from 'react-router-dom';

import styles from './AdminLinks.module.scss';

// Component
const AdminLinks: FC = () => {
  // State
  const [open, setOpen] = useState(false);

  // Handlers
  const handleClick = () => {
    setOpen(!open);
  };

  // Render
  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemIcon><SettingsIcon /></ListItemIcon>
        <ListItemText primary="Administration" />
        { open ? <ExpandLessIcon /> : <ExpandMoreIcon /> }
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List classes={{ root: styles.nested }} disablePadding>
          <ListItem button disabled component={Link} to="/admin/users">
            <ListItemIcon><PeopleIcon /></ListItemIcon>
            <ListItemText primary="Utilisateurs" />
          </ListItem>
          <ListItem button disabled component={Link} to="/admin/servers">
            <ListItemIcon><ServersIcon /></ListItemIcon>
            <ListItemText primary="Serveurs" />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};

export default AdminLinks;