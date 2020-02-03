import React, { FC, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import {
  Toolbar as MaterialToolbar,
  ToolbarProps as MaterialToolbarProps,
  Typography
} from '@material-ui/core';

import TableContext from 'contexts/TableContext';
import { StyledProps } from 'utils/style';

// Types
type Classes = 'root' | 'selected' | 'title';
export interface ToolbarProps extends Omit<MaterialToolbarProps, 'classes'>, StyledProps<Classes> {
  title: string
}

// Styles
const useStyles = makeStyles(({ shape, palette, spacing }) => {
  const secondary = palette.secondary.main;
  const text = palette.getContrastText(secondary);

  return {
    root: {
      paddingRight: spacing(1)
    },
    selected: {
      color: text,
      backgroundColor: secondary,
      borderTopLeftRadius: shape.borderRadius,
      borderTopRightRadius: shape.borderRadius
    },
    title: {
      flex: '1 1 100%'
    }
  }
});

// Component
export const TableToolbar: FC<ToolbarProps> = (props) => {
  // Props
  const {
    title,
    children,
    ...toolbar
  } = props;

  // Context
  const { selectedCount } = useContext(TableContext);

  // Render
  const styles = useStyles(props);

  return (
    <MaterialToolbar {...toolbar} classes={{ root: clsx(styles.root, { [styles.selected]: selectedCount > 0 }) }}>
      { (selectedCount > 0) ? (
        <Typography classes={{ root: styles.title }} color="inherit" variant="subtitle1">{selectedCount} sélectionné(s)</Typography>
      ) : (
        <Typography classes={{ root: styles.title }} variant="h6">{title}</Typography>
      ) }
      { children }
    </MaterialToolbar>
  );
};

export default TableToolbar;