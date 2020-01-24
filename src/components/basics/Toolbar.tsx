import React, { FC } from 'react';
import clsx from 'clsx';

import {
  Toolbar as MaterialToolbar,
  ToolbarProps as MaterialToolbarProps,
  Typography
} from '@material-ui/core';

import styles from 'components/basics/Toolbar.module.scss';

// Types
export interface ToolbarProps extends Omit<MaterialToolbarProps, 'classes'> {
  title: string, numSelected: number
}

// Component
const Toolbar: FC<ToolbarProps> = (props) => {
  // Props
  const {
    title, numSelected,
    children,
    ...toolbar
  } = props;

  // Render
  return (
    <MaterialToolbar {...toolbar} classes={{ root: clsx(styles.toolbar, { [styles.selected]: numSelected > 0 }) }}>
      { (numSelected > 0) ? (
        <Typography classes={{ root: styles.title }} color="inherit" variant="subtitle1">{numSelected} sélectionné(s)</Typography>
      ) : (
        <Typography classes={{ root: styles.title }} variant="h6">{title}</Typography>
      ) }
      {children}
    </MaterialToolbar>
  );
};

export default Toolbar;