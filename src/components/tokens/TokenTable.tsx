import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

import {
  TableContainer, TableHead, TableCell,
  Paper
} from '@material-ui/core';

import Token from 'data/Token';
import { AppState } from 'store';

import {
  Table, TableProps,
  TableBody, TableRow,
  TableSortCell
} from 'components/basics';

import TokenToolbar from './TokenToolbar';

// Types
export interface TokenTableProps extends Omit<TableProps<Token>, 'data' | 'toolbar'> {
  title: string, tokens: Token[],
  onDeleteToken?: (id: string) => void,
  onRefresh: () => void
}

// Component
const TokenTable: FC<TokenTableProps> = (props) => {
  // Props
  const {
    title, tokens,
    onDeleteToken,
    onRefresh,
    ...table
  } = props;

  // Redux
  const current = useSelector((state: AppState) => state.auth.tokenId!);

  // Handlers
  const handleDelete = onDeleteToken && ((ids: string[]) => {
    ids.forEach(onDeleteToken);
  });

  // Render
  return (
    <Paper>
      <TableContainer>
        <Table
          {...table}
          data={tokens} blacklist={[current]}
          toolbar={
            <TokenToolbar
              title={title}
              onDelete={handleDelete}
              onRefresh={onRefresh}
            />
          }
        >
          <TableHead>
            <TableRow>
              <TableSortCell<Token> field="from">Adresse</TableSortCell>
              <TableSortCell<Token> field="createdAt">Date</TableSortCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { (token: Token) => (
              <TableRow key={token._id} doc={token} hover>
                <TableCell>{token.from}</TableCell>
                <TableCell>{moment.utc(token.createdAt).local().format('LLLL')}</TableCell>
              </TableRow>
            ) }
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TokenTable;