import React, { FC } from 'react';

import {
  Link,
  TableCell, TableCellProps
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import { useUser } from 'store/users/hooks';

// Types
export interface UserCellProps extends TableCellProps {
  id: string
}

// Component
const UserCell: FC<UserCellProps> = (props) => {
  // Props
  const { id, ...cell } = props;

  // Redux;
  const user = useUser(id);

  // Render
  return (
    <TableCell {...cell}>
      <Link component={RouterLink} to={`/admin/user/${id}`}>
        { user ? user.email : id }
      </Link>
    </TableCell>
  );
};

export default UserCell;