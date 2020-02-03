import React, { FC, useContext } from 'react';

import {
  TableCell, TableSortLabel,
  TableCellProps
} from '@material-ui/core';

import TableContext from 'contexts/TableContext';

// Types
export interface TableSortCellProps extends Omit<TableCellProps, 'sortDirection'> {
  field: string
}

// Component
export const TableSortCell: FC<TableSortCellProps> = (props) => {
  // Props
  const {
    field, children,
    ...cell
  } = props;

  // Context
  const { ordering, onOrderBy } = useContext(TableContext);

  // Render
  return (
    <TableCell {...cell}
      sortDirection={ordering.field === field ? ordering.order : false}
    >
      <TableSortLabel
        active={ordering.field === field}
        direction={ordering.field === field ? ordering.order : 'asc'}
        onClick={() => onOrderBy(field)}
      >
        { children }
      </TableSortLabel>
    </TableCell>
  )
};

export default TableSortCell;