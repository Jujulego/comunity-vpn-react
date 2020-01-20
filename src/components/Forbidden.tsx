import React, { FC } from 'react';

import {
  Typography
} from '@material-ui/core';

// Component
const Forbidden: FC = () => {
  // Rendering
  return (
    <Typography variant="h3">Accès interdit !</Typography>
  );
};

export default Forbidden;