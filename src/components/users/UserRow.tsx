import React, { FC } from 'react';
import moment from 'moment';

import {
  Checkbox, Switch,
  Link,
  TableCell, TableRow,
  TableRowProps
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import User from 'data/user';

// Types
export interface UserRowProps extends TableRowProps {
  user: User,
  selected?: boolean,
  onSelect: () => void
  onToggleAdmin: () => void
}

// Component
const UserRow: FC<UserRowProps> = (props) => {
  // Props
  const {
    user,
    selected = false,
    onSelect, onToggleAdmin,
    ...row
  } = props;

  // Render
  let connection = "Pas connecté";
  if (user.tokens.length > 0) {
    const tokens = user.tokens.sort((a, b) => moment(a.createdAt).diff(b.createdAt)).reverse();
    const last = moment.utc(tokens[0].createdAt);

    connection = `${tokens[0].from} ${last.fromNow()}`
  }

  return (
    <TableRow {...row} selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onChange={onSelect} />
      </TableCell>
      <TableCell>
        <Link component={RouterLink} to={`/admin/user/${user._id}`}>
          {user.email}
        </Link>
      </TableCell>
      <TableCell>{user.tokens.length}</TableCell>
      <TableCell>{connection}</TableCell>
      <TableCell padding="none">
        <Switch checked={user.admin} onChange={onToggleAdmin} />
      </TableCell>
    </TableRow>
  );
};

export default UserRow;