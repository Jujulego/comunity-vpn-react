import React, { FC, useContext } from 'react';

import {
  Delete as DeleteIcon,
  Refresh as RefreshIcon
} from '@material-ui/icons';

import TableContext from 'contexts/TableContext';

import {
  TableToolbar, ToolbarProps,
  ToolbarAction
} from 'components/basics';

// Types
export interface UserToolbarProps extends ToolbarProps {
  onDelete?: (ids: string[]) => void,
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
  const { selected, selectedCount } = useContext(TableContext);

  // Handlers
  const handleDelete = onDelete && (() => {
    onDelete(Object.keys(selected).filter(id => selected[id]))
  });

  // Render
  return (
    <TableToolbar {...toolbar}>
      { handleDelete && selectedCount > 0 && (
        <ToolbarAction
          icon={<DeleteIcon />}
          tooltip="Supprimer les utilistateurs sélectionnés"
          onClick={handleDelete}
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