import React, { FC, useState } from 'react';

import {
  Checkbox,
  Table, TableContainer, TableHead, TableBody, TableRow, TableCell,
  TableProps, Paper
} from '@material-ui/core';

import Token from 'data/token';
import TokenRow from 'components/tokens/TokenRow';
import TokenToolbar from 'components/tokens/TokenToolbar';

// Types
interface SelectedState { [id: string]: boolean }

export interface TokenTableProps extends TableProps {
  title: string, tokens: Token[],
  onDeleteToken?: (id: string) => void,
}

// Component
const TokenTable: FC<TokenTableProps> = (props) => {
  // Props
  const {
    title, tokens,
    onDeleteToken,
    ...table
  } = props;

  // State
  const [selected, setSelected] = useState<SelectedState>({});

  const numSelected = tokens.reduce((acc, token) => {
    if (selected[token._id]) acc++;
    return acc;
  }, 0);

  // Handlers
  const handleSelect = (id: string) => () => {
    setSelected(old => ({ ...old, [id]: !old[id] }));
  };

  const handleSelectAll = () => {
    if (numSelected === tokens.length) {
      setSelected({});
    } else {
      setSelected(tokens.reduce<SelectedState>((acc, server) => {
        acc[server._id] = true;
        return acc;
      }, {}));
    }
  };

  const handleDelete = onDeleteToken && (() => {
    tokens.forEach(token => {
      if (selected[token._id]) onDeleteToken(token._id);
    });
  });

  // Render
  return (
    <Paper>
      <TokenToolbar
        title={title} numSelected={numSelected}
        onDelete={handleDelete}
      />
      <TableContainer>
        <Table {...table}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={numSelected > 0 && numSelected < tokens.length}
                  checked={numSelected > 0 && numSelected === tokens.length}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>Adresse</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { tokens.map(token => (
              <TokenRow
                key={token._id}
                hover token={token} selected={selected[token._id]}
                onSelect={handleSelect(token._id)}
              />
            )) }
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TokenTable;