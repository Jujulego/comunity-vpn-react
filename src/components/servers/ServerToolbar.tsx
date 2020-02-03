import React, { FC, useContext } from 'react';

import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon
} from '@material-ui/icons';

import TableContext from 'contexts/TableContext';

import {
  TableToolbar, ToolbarProps,
  ToolbarAction
} from 'components/basics';

// Types
export interface ServerToolbarProps extends ToolbarProps {
  onAdd?: () => void,
  onDelete?: (ids: string[]) => void,
  onRefresh: () => void
}

// Component
const ServerToolbar: FC<ServerToolbarProps> = (props) => {
  // Props
  const {
    onAdd, onDelete, onRefresh,
    ...toolbar
  } = props;

  // Context
  const { selected, selectedCount } = useContext(TableContext);

  // Handlers
  const handleDelete = onDelete && (() => {
    onDelete(Object.keys(selected).filter(id => selected[id]))
  });

  return (
    <TableToolbar {...toolbar}>
      { handleDelete && selectedCount > 0 && (
        <ToolbarAction
          icon={<DeleteIcon />}
          tooltip="Supprimer les serveurs sélectionnés"
          onClick={handleDelete}
        />
      ) }
      { onAdd && (
        <ToolbarAction
            icon={<AddIcon />}
            tooltip="Ajouter un serveur"
            onClick={onAdd}
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

export default ServerToolbar;