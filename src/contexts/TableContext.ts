import { createContext, useContext } from 'react';

import Document, { AnyDocument } from 'data/Document';

// Types
export interface SelectedState { [id: string]: boolean }

export type Order = 'asc' | 'desc'
export interface Ordering<T extends Document> {
  field?: keyof T,
  order: Order
}

interface BaseTableContextProps<T extends Document> {
  blacklist: string[],
  documents: T[],
  ordering: Ordering<T>,

  selectedAll: boolean,
  selectedCount: number,
  selected: SelectedState,

  onSelect: (id: string) => void,
  onSelectAll: () => void
}

export type TableContextProps<T extends Document> = BaseTableContextProps<T> & {
  onOrderBy: (field: keyof T) => void
};

type TableContextDefaults = BaseTableContextProps<AnyDocument> & {
  onOrderBy: (field: any) => void
};

// Default values
const tableDefaults: TableContextDefaults = {
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

// Hook
export function useTableContext<T extends Document = AnyDocument>(): TableContextProps<T> {
  return useContext(TableContext);
}

export default TableContext;