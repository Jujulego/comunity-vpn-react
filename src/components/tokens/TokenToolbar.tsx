import React, { FC, useContext } from 'react';

import { Delete as DeleteIcon } from '@material-ui/icons';

import TableContext from 'contexts/TableContext';

import TableToolbar, { ToolbarProps } from 'components/basics/TableToolbar';
import ToolbarAction from 'components/basics/ToolbarAction';

// Types
export interface TokenToolbarProps extends ToolbarProps {
  onDelete?: (ids: string[]) => void
}

// Component
const TokenToolbar: FC<TokenToolbarProps> = (props) => {
  // Props
  const {
    onDelete,
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
          tooltip="Supprimer les tokens sélectionnés"
          onClick={handleDelete}
        />
      ) }
    </TableToolbar>
  );
};

export default TokenToolbar;