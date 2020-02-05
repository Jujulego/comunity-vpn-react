import React, { FC, useState } from 'react';

import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon
} from '@material-ui/icons';

import { useTableContext } from 'contexts/TableContext';

import {
  TableToolbar, ToolbarProps,
  ToolbarAction, TableFilterAction
} from 'components/basics';
import FilterServerDialog from './FilterServerDialog';

// Types
export interface ServerToolbarProps extends ToolbarProps {
  filterUser?: boolean,
  onAdd?: () => void,
  onDelete?: (ids: string[]) => void,
  onRefresh: () => void
}

// Component
const ServerToolbar: FC<ServerToolbarProps> = (props) => {
  // Props
  const {
    filterUser,
    onAdd, onDelete, onRefresh,
    ...toolbar
  } = props;

  // Context
  const { selected, selectedCount } = useTableContext();

  // State
  const [open, setOpen] = useState(false);

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
      <TableFilterAction onClick={() => setOpen(true)} />
      <FilterServerDialog
        filterUser={filterUser}
        open={open} onClose={() => setOpen(false)}
      />
    </TableToolbar>
  );
};

export default ServerToolbar;