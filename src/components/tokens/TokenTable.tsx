import React, { FC } from 'react';
import moment from 'moment';

import {
  Table, TableContainer, TableHead, TableBody, TableCell,
  TableProps, Paper
} from '@material-ui/core';

import Token from 'data/token';

import DataTable from 'components/basics/DataTable';
import TableRow from 'components/basics/TableRow';
import TableToolbar from 'components/basics/TableToolbar';

// Types
export interface TokenTableProps extends TableProps {
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

  // Render
  return (
    <Paper>
      <DataTable data={tokens}>
        <TableToolbar title={title} />
        <TableContainer>
          <Table {...table}>
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
      </DataTable>
    </Paper>
  );
};

export default TokenTable;