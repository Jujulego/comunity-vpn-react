import React, { ReactNode } from 'react';

import {
  TableCell, TableSortLabel,
  TableCellProps
} from '@material-ui/core';

import { useTableContext } from 'contexts/TableContext';
import Document from 'data/Document';

// Types
export interface TableSortCellProps<T extends Document> extends Omit<TableCellProps, 'sortDirection'> {
  field: keyof T,
  children: ReactNode
}

// Component
const TableSortCell = <T extends Document> (props: TableSortCellProps<T>) => {
  // Props
  const {
    field, children,
    ...cell
  } = props;

  // Context
  const { ordering, onOrderBy } = useTableContext<T>();

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