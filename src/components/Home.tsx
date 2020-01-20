import React, { FC } from 'react';

import {
  Typography
} from '@material-ui/core';

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
    <Typography>Bonjour {me.email}</Typography>
  );
};

export default Home;