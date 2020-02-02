import React, { FC, ReactNode, useContext } from 'react';

import {
  TableBody as MaterialTableBody,
  TableBodyProps as MaterialTableBodyProps
} from '@material-ui/core';

import TableContext from 'contexts/TableContext';

// Types
export interface TableBodyProps extends MaterialTableBodyProps {
  children: (doc: any & Document) => ReactNode
}

// Component
const TableBody: FC<TableBodyProps> = (props) => {
  // Props
  const { children, ...body } = props;

  // Contexts
  const ctx = useContext(TableContext);

  // Render
  return (
    <MaterialTableBody {...body}>
      { ctx.documents.map(children) }
    </MaterialTableBody>
  )
};

export default TableBody;