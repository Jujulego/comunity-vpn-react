import React, { FC, useMemo, useState } from 'react';

import { Badge } from '@material-ui/core';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon
} from '@material-ui/icons';

import Server from 'data/Server';
import { useTableContext } from 'contexts/TableContext';

import {
  TableToolbar, ToolbarProps,
  ToolbarAction
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
  const { selected, selectedCount, filter } = useTableContext<Server>();

  // State
  const [open, setOpen] = useState(false);

  // Memos
  const count = useMemo(() => Object.keys(filter).length, [filter]);

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
      <ToolbarAction
        icon={
          <Badge badgeContent={count} color="primary">
            <FilterIcon />
          </Badge>
        }
        tooltip="Filtrer"
        onClick={() => setOpen(true)}
      />
      <FilterServerDialog
        filterUser={filterUser}
        open={open} onClose={() => setOpen(false)}
      />
    </TableToolbar>
  );
};

export default ServerToolbar;