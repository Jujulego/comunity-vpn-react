import { createContext } from 'react';

import { AnyDocument } from 'data/Document';

// Types
export interface SelectedState { [id: string]: boolean }

export type Order = 'asc' | 'desc'
export interface Ordering {
  field?: string,
  order: Order
}

export interface TableContextProps {
  blacklist: string[],
  documents: AnyDocument[],
  ordering: Ordering,

  selectedAll: boolean,
  selectedCount: number,
  selected: SelectedState,

  onOrderBy: (field: string) => void,
  onSelect: (id: string) => void,
  onSelectAll: () => void
}

// Default values
const tableDefaults: TableContextProps = {
  blacklist: [],
  documents: [],
  ordering: { order: 'asc' },

  selectedAll: false,
  selectedCount: 0,
  selected: {},

  onOrderBy: () => {},
  onSelect: () => {},
  onSelectAll: () => {}
};

// Context
const TableContext = createContext(tableDefaults);

export default TableContext;