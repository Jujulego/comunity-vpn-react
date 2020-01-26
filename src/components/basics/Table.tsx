import React, { FC, ReactNode, useEffect, useState } from 'react';

import MaterialTable, {
  TableProps as MaterialTableProps
} from '@material-ui/core/Table';

import TableContext, { SelectedState } from 'contexts/TableContext';
import Document from 'data/document';

// Types
export interface TableProps extends MaterialTableProps {
  data: Document[],
  blacklist?: string[],
  toolbar?: ReactNode
}

// Component
const Table: FC<TableProps> = (props) => {
  // Props
  const {
    data, blacklist = [],
    toolbar,
    children,
    ...table
  } = props;

  // State
  const [selected, setSelected] = useState<SelectedState>({});

  // Effects
  useEffect(() => {
    setSelected({});
  }, [data]);

  // Render
  const selectedCount = data.reduce((acc, doc) => selected[doc._id] ? acc + 1 : acc, 0);
  const selectedAll = selectedCount >= (data.length - blacklist.length);

  const onSelect = (id: string) => setSelected(old => ({ ...old, [id]: !old[id] }));
  const onSelectAll = () => {
    if (selectedAll) {
      setSelected({});
    } else {
      setSelected(data.reduce<SelectedState>((acc, doc) => {
        if (blacklist.indexOf(doc._id) === -1) {
          acc[doc._id] = true;
        }

        return acc;
      }, {}));
    }
  };

  return (
    <TableContext.Provider
      value={{
        blacklist,
        selected, selectedCount,
        selectedAll: selectedCount > 0 && selectedAll,
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