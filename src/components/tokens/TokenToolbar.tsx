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
export interface TokenToolbarProps extends ToolbarProps {
  onDelete?: (ids: string[]) => void,
  onRefresh: () => void
}

// Component
const TokenToolbar: FC<TokenToolbarProps> = (props) => {
  // Props
  const {
    onDelete, onRefresh,
    ...toolbar
  } = props;

  // Context
  const { filtered, selected, selectedCount } = useContext(TableContext);

  // Handlers
  const handleDelete = onDelete && (() => {
    onDelete(filtered.map(doc => doc._id).filter(id => selected[id]))
  });

  // Render
  return (
    <TableToolbar {...toolbar}>
      { handleDelete && selectedCount > 0 && (
        <ToolbarAction
          icon={<DeleteIcon />}
          tooltip="Supprimer les tokens sélectionnés"
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

export default TokenToolbar;