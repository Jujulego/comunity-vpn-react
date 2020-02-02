import React, { FC, ReactNode, useEffect, useState } from 'react';

import MaterialTable, {
  TableProps as MaterialTableProps
} from '@material-ui/core/Table';

import TableContext, { Order, Ordering, SelectedState } from 'contexts/TableContext';
import { AnyDocument } from 'data/Document';

// Types
export interface TableProps extends MaterialTableProps {
  data: AnyDocument[],
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
  const [ordering, setOrdering] = useState<Ordering>({ order: 'asc' });
  const [selected, setSelected] = useState<SelectedState>({});

  // Effects
  useEffect(() => {
    setSelected({});
  }, [data]);

  // Render
  const selectedCount = data.reduce((acc, doc) => selected[doc._id] ? acc + 1 : acc, 0);
  const selectedAll = selectedCount >= (data.length - blacklist.length);

  const onOrderBy = (field: string) => {
    let order: Order = 'asc';

    if (ordering.field === field && ordering.order === "asc") {
      order = "desc";
    }

    setOrdering({ field, order });
  };

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
        blacklist, documents: data, ordering,
        selected, selectedCount,
        selectedAll: selectedCount > 0 && selectedAll,
        onOrderBy,
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