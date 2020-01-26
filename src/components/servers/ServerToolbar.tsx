import React, { FC, useContext } from 'react';

import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon
} from '@material-ui/icons';

import TableContext from 'contexts/TableContext';

import TableToolbar, { ToolbarProps } from 'components/basics/TableToolbar';
import ToolbarAction from 'components/basics/ToolbarAction';

// Types
export interface ServerToolbarProps extends ToolbarProps {
  onAdd?: () => void,
  onDelete?: () => void,
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
  const { selectedCount } = useContext(TableContext);

  return (
    <TableToolbar {...toolbar}>
      { onDelete && selectedCount > 0 && (
        <ToolbarAction
          icon={<DeleteIcon />}
          tooltip="Supprimer les serveurs sélectionnés"
          onClick={onDelete}
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