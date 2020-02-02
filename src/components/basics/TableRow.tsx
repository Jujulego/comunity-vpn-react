import React, { FC, MouseEvent, useContext } from 'react';
import { Theme, useMediaQuery } from '@material-ui/core';

import {
  Checkbox,
  TableCell, TableRow as MaterialTableRow,
  TableRowProps as MaterialTableRowProps
} from '@material-ui/core';

import TableContext from 'contexts/TableContext';
import Document from 'data/Document';

// Types
export interface TableRowProps extends Omit<MaterialTableRowProps, 'selected' | 'onClick'> {
  doc?: Document
}

// Component
const TableRow: FC<TableRowProps> = (props) => {
  // Props
  const {
    doc, children,
    ...row
  } = props;

  // Contexts
  const ctx = useContext(TableContext);

  // Handlers
  const handleChange = doc ? () => ctx.onSelect(doc._id) : ctx.onSelectAll;
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  };

  // Render
  const small = useMediaQuery(({ breakpoints }: Theme) => breakpoints.down('sm'));

  const selectable = doc ? ctx.blacklist.indexOf(doc._id) === -1 : true;
  const selected = doc ? (ctx.selected[doc._id] || false) : ctx.selectedAll;
  const indeterminate = !doc && ctx.selectedCount > 0 && !ctx.selectedAll;

  return (
    <MaterialTableRow
      {...row} selected={selectable && doc && selected}
      onClick={(!selectable || !doc) ? undefined : handleChange}
    >
      { !small && (
        <TableCell padding="checkbox">
          { selectable && (
            <Checkbox
              checked={selected} indeterminate={indeterminate}
              onChange={handleChange} onClick={handleClick}
            />
          ) }
        </TableCell>
      ) }
      { children }
    </MaterialTableRow>
  )
};

export default TableRow;