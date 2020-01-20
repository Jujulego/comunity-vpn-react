import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import IconButton, { IconButtonProps } from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ExitToApp from '@material-ui/icons/ExitToApp';

import { logout } from 'store/auth/thunks';

// Types
export type LogoutButtonProps = Omit<IconButtonProps, 'onClick'>;

// Component
const LogoutButton: FC<LogoutButtonProps> = (props) => {
  // Redux
  const dispatch = useDispatch();

  // Handlers
  const handleClick = () => {
    dispatch(logout());
  };

  // Rendering
  return (
    <Tooltip title="Logout">
      <IconButton {...props} onClick={handleClick}>
        <ExitToApp />
      </IconButton>
    </Tooltip>
  );
};

export default LogoutButton;