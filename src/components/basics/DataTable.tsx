import React, { FC, useState } from 'react';

import TableContext, { SelectedState } from 'contexts/TableContext';
import Document from 'data/document';

// Types
export interface DataTableProps {
  data: Document[]
}

// Component
const DataTable: FC<DataTableProps> = (props) => {
  // Props
  const { data, children } = props;

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
        selectedAll: selectedCount === data.length,
        onSelect,
        onSelectAll
      }}
    >
      { children }
    </TableContext.Provider>
  );
};

export default DataTable;