import React, { FC, useContext } from 'react';
import { TableRowProps as MaterialTableRowProps } from '@material-ui/core/TableRow';

import {
  Checkbox,
  TableCell, TableRow as MaterialTableRow
} from '@material-ui/core';

import TableContext from 'contexts/TableContext';
import Document from 'data/document';

// Types
export interface TableRowProps extends Omit<MaterialTableRowProps, 'selected'> {
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

  // Render
  const selectable = doc ? ctx.blacklist.indexOf(doc._id) === -1 : true;
  const selected = doc ? (ctx.selected[doc._id] || false) : ctx.selectedAll;
  const indeterminate = !doc && ctx.selectedCount > 0 && !ctx.selectedAll;

  const handleChange = doc ? () => ctx.onSelect(doc._id) : ctx.onSelectAll;

  return (
    <MaterialTableRow {...row} selected={selectable && doc && selected}>
      <TableCell padding="checkbox">
        { selectable && (
          <Checkbox checked={selected} indeterminate={indeterminate} onChange={handleChange} />
        ) }
      </TableCell>
      { children }
    </MaterialTableRow>
  )
};

export default TableRow;