import React, { FC } from 'react';

import {
  Paper,
  TableContainer
} from '@material-ui/core';

import UserServerTable from 'containers/servers/UserServerTable';

// Component
const Servers: FC = () => {
  // Render
  return (
    <TableContainer component={Paper}>
      <UserServerTable user="me" />
    </TableContainer>
  );
};

export default Servers;