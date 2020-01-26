import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';

import {
  TableContainer, TableHead, TableBody, TableCell,
  Paper
} from '@material-ui/core';

import Token from 'data/token';
import { AppState } from 'store';

import Table, { TableProps } from 'components/basics/Table';
import TableRow from 'components/basics/TableRow';
import TableToolbar from 'components/basics/TableToolbar';

// Types
export interface TokenTableProps extends Omit<TableProps, 'data' | 'toolbar'> {
  title: string, tokens: Token[],
  onDeleteToken?: (id: string) => void,
}

// Component
const TokenTable: FC<TokenTableProps> = (props) => {
  // Props
  const {
    title, tokens,
    ...table
  } = props;

  // Redux
  const current = useSelector((state: AppState) => state.auth.tokenId!);

  // Render
  return (
    <Paper>
      <TableContainer>
        <Table
          {...table}
          data={tokens} blacklist={[current]}
          toolbar={<TableToolbar title={title} />}
        >
          <TableHead>
            <TableRow>
              <TableCell>Adresse</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { tokens.map(token => (
              <TableRow key={token._id} doc={token} hover>
                <TableCell>{token.from}</TableCell>
                <TableCell>{moment.utc(token.createdAt).format('LLLL')}</TableCell>
              </TableRow>
            )) }
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TokenTable;