import React, { FC } from 'react';
import { CardProps } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import {
  Card, CardHeader, CardContent,
  FormControlLabel,
  Switch
} from '@material-ui/core';

import User from 'data/User';

// Types
export interface AdminCardProps extends CardProps {
  user: User | null,
  onToggleAdmin: () => void
}

// Styles
const useStyles = makeStyles(({ spacing }) => ({
  switchField: {
    width: '100%',
    margin: 0,
    paddingLeft: spacing(2),

    flexDirection: 'row-reverse'
  },
  switchLabel: {
    flexGrow: 1
  },
}));

// Component
const AdminCard: FC<AdminCardProps> = (props) => {
  // Props
  const {
    user, onToggleAdmin,
    ...card
  } = props;

  // Render
  const styles = useStyles();

  return (
    <Card {...card}>
      <CardHeader title="Administration" titleTypographyProps={{ variant: "h6" }} />
      <CardContent>
        { user && (
          <FormControlLabel
            classes={{ root: styles.switchField, label: styles.switchLabel }}
            label="Administrateur"
            control={
              <Switch checked={user.admin} onChange={onToggleAdmin} />
            }
          />
        ) }
      </CardContent>
    </Card>
  )
};

export default AdminCard;