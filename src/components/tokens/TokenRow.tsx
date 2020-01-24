import React, { FC } from 'react';
import moment from 'moment';

import {
  Checkbox,
  TableCell, TableRow,
  TableRowProps
} from '@material-ui/core';

import Token from 'data/token';

// Types
export interface TokenRowProps extends TableRowProps {
  token: Token,
  selected?: boolean,
  onSelect: () => void
}

// Component
const TokenRow: FC<TokenRowProps> = (props) => {
  // Props
  const {
    token,
    selected = false,
    onSelect,
    ...row
  } = props;

  // Render
  const last = moment.utc(token.createdAt);

  return (
    <TableRow {...row} selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onChange={onSelect} />
      </TableCell>
      <TableCell>{token.from}</TableCell>
      <TableCell>{last.format('LLLL')}</TableCell>
    </TableRow>
  );
};

export default TokenRow;