import React, { FC, ReactNode, useContext, useMemo } from 'react';

import {
  TableBody as MaterialTableBody,
  TableBodyProps as MaterialTableBodyProps
} from '@material-ui/core';

import TableContext, { Order } from 'contexts/TableContext';
import { AnyDocument } from 'data/Document';
import { Comparator, desc, stableSort } from 'utils/sort';

// Types
export interface TableBodyProps extends MaterialTableBodyProps {
  children: (doc: AnyDocument) => ReactNode
}

// Utils
function getSorting<K extends keyof AnyDocument>(field: K, order: Order): Comparator<AnyDocument> {
  return order === 'desc' ? (a, b) => desc(a, b, field) : (a, b) => -desc(a, b, field);
}

// Component
export const TableBody: FC<TableBodyProps> = (props) => {
  // Props
  const { children, ...body } = props;

  // Contexts
  const { documents, ordering } = useContext(TableContext);

  // Memos
  const sorted = useMemo<AnyDocument[]>(() => {
    if (ordering.field === undefined) return documents;
    return stableSort(documents, getSorting(ordering.field, ordering.order));
  }, [documents, ordering]);

  // Render
  return (
    <MaterialTableBody {...body}>
      { sorted.map(children) }
    </MaterialTableBody>
  )
};

export default TableBody;