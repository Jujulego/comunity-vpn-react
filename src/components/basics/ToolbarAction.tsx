import React, { FC, MouseEvent, ReactNode } from 'react';

import { IconButton, Tooltip } from '@material-ui/core';

// Types
export interface TooolbarActionProps {
  icon: ReactNode,
  tooltip: string,
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
}

// Components
export const ToolbarAction: FC<TooolbarActionProps> = (props) => {
  // Props
  const { icon, tooltip, onClick } = props;

  // Render
  return (
    <Tooltip title={tooltip}>
      <IconButton color="inherit" onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default ToolbarAction;