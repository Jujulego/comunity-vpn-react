import React, { FC, MouseEvent, ReactNode } from 'react';

import { IconButton, Tooltip } from '@material-ui/core';

// Types
export interface ToolbarActionProps {
  icon: ReactNode,
  tooltip: string,
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
}

// Components
const ToolbarAction: FC<ToolbarActionProps> = (props) => {
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