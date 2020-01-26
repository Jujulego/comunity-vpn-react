import React, { FC, ReactNode, useState } from 'react';

import MaterialTable, {
  TableProps as MaterialTableProps
} from '@material-ui/core/Table';

import TableContext, { SelectedState } from 'contexts/TableContext';
import Document from 'data/document';

// Types
export interface TableProps extends MaterialTableProps {
  data: Document[],
  toolbar?: ReactNode
}

// Component
const Table: FC<TableProps> = (props) => {
  // Props
  const {
    data, toolbar, children,
    ...table
  } = props;

  // State
  const [selected, setSelected] = useState<SelectedState>({});

  // Render
  const selectedCount = data.reduce((acc, doc) => selected[doc._id] ? acc + 1 : acc, 0);

  const onSelect = (id: string) => setSelected(old => ({ ...old, [id]: !old[id] }));
  const onSelectAll = () => {
    if (selectedCount === data.length) {
      setSelected({});
    } else {
      setSelected(data.reduce<SelectedState>((acc, doc) => Object.assign(acc, { [doc._id]: true }), {}));
    }
  };

  return (
    <TableContext.Provider
      value={{
        selected, selectedCount,
        selectedAll: data.length > 0 && selectedCount === data.length,
        onSelect,
        onSelectAll
      }}
    >
      { toolbar }
      <MaterialTable {...table}>
        { children }
      </MaterialTable>
    </TableContext.Provider>
  );
};

export default Table;