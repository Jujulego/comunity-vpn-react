import React, { FC, MouseEvent } from 'react';
import { Theme, useMediaQuery } from '@material-ui/core';
import moment from 'moment';

import { Link, Switch, TableCell } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import User from 'data/User';

import { TableRow, TableRowProps } from 'components/basics';

// Types
export interface UserRowProps extends Omit<TableRowProps, 'doc'> {
  user: User,
  onToggleAdmin: () => void
}

// Component
const UserRow: FC<UserRowProps> = (props) => {
  // Props
  const {
    user, onToggleAdmin,
    ...row
  } = props;

  // Handlers
  const handleClick = (event: MouseEvent<HTMLInputElement>) => {
    event.stopPropagation();
  };

  // Render
  const small = useMediaQuery(({ breakpoints }: Theme) => breakpoints.down('sm'));

  let connection = "Pas connecté";
  if (user.tokens.length > 0) {
    const tokens = user.tokens.sort((a, b) => moment(a.createdAt).diff(b.createdAt)).reverse();
    const last = moment.utc(tokens[0].createdAt);

    connection = small ? last.fromNow() : `${tokens[0].from} ${last.fromNow()}`
  }

  return (
    <TableRow {...row} doc={user}>
      <TableCell>
        <Link component={RouterLink} to={`/admin/user/${user._id}`}>
          {user.email}
        </Link>
      </TableCell>
      { !small && (<TableCell>{user.tokens.length}</TableCell>) }
      <TableCell>{connection}</TableCell>
      { !small && (
        <TableCell padding="none">
          <span onClick={handleClick}>
            <Switch checked={user.admin} onChange={onToggleAdmin} />
          </span>
        </TableCell>
      ) }
    </TableRow>
  );
};

export default UserRow;