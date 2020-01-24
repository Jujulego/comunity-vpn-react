import React, { FC } from 'react';
import { TableCell, TableCellProps } from '@material-ui/core';

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
      { user ? user.email : id }
    </TableCell>
  );
};

export default UserCell;