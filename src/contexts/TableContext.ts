import { createContext } from 'react';

import Document from 'data/Document';

// Types
export interface SelectedState { [id: string]: boolean }
export interface TableContextProps {
  blacklist: string[],
  documents: Document[],

  selectedAll: boolean,
  selectedCount: number,
  selected: SelectedState,

  onSelect: (id: string) => void,
  onSelectAll: () => void
}

// Default values
const tableDefaults: TableContextProps = {
  blacklist: [],
  documents: [],

  selectedAll: false,
  selectedCount: 0,
  selected: {},

  onSelect: () => {},
  onSelectAll: () => {}
};

// Context
const TableContext = createContext(tableDefaults);

export default TableContext;