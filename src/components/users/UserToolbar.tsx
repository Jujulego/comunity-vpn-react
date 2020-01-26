import React, { FC, useContext } from 'react';

import {
  Delete as DeleteIcon,
  Refresh as RefreshIcon
} from '@material-ui/icons';

import TableContext from 'contexts/TableContext';

import TableToolbar, { ToolbarProps } from 'components/basics/TableToolbar';
import ToolbarAction from 'components/basics/ToolbarAction';

// Types
export interface UserToolbarProps extends ToolbarProps {
  onDelete?: () => void,
  onRefresh: () => void
}

// Component
const UserToolbar: FC<UserToolbarProps> = (props) => {
  // Props
  const {
    onDelete, onRefresh,
    ...toolbar
  } = props;

  // Context
  const { selectedCount } = useContext(TableContext);

  // Render
  return (
    <TableToolbar {...toolbar}>
      { onDelete && selectedCount > 0 && (
        <ToolbarAction
          icon={<DeleteIcon />}
          tooltip="Supprimer les utilistateurs sélectionnés"
          onClick={onDelete}
        />
      ) }
      <ToolbarAction
        icon={<RefreshIcon />}
        tooltip="Rafraîchir"
        onClick={onRefresh}
      />
    </TableToolbar>
  );
};

export default UserToolbar;