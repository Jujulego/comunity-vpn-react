import React, { FC } from 'react';

import {
  Toolbar,
  Typography
} from '@material-ui/core';

import AppBar from 'components/AppBar';

import { useMe } from 'store/user/hooks';

// Component
const Home: FC = () => {
  // Redux
  const me = useMe();

  // Rendering
  if (me == null) {
    return null;
  }

  return (
    <>
      <AppBar />
      <Toolbar />
      <Typography>Bonjour {me.email}</Typography>
    </>
  );
};

export default Home;