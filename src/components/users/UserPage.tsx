import React, { FC } from 'react';

import {
  Button,
  Card, CardHeader, CardContent, CardActions,
  Grid,
  TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useUser } from 'store/users/hooks';

import TokenTable from 'components/tokens/TokenTable';

// Types
export interface UserPageProps {
  id: string
}

// Style
const useStyles = makeStyles({
  actions: {
    justifyContent: 'end'
  }
});

// Components
const UserPage: FC<UserPageProps> = (props) => {
  // Props
  const { id } = props;

  // Redux
  const user = useUser(id);

  // Render
  const styles = useStyles();
  const title = (id === 'me') ? "Moi" : `Utilisateur ${id}`;

  return (
    <Grid container spacing={2}>
      <Grid item lg={5}>
        <Card>
          <CardHeader title={title} titleTypographyProps={{ variant: "h6" }} />
          <CardContent>
            { user && (
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <TextField label="Email" value={user.email} fullWidth disabled />
                </Grid>
                <Grid item>
                  <TextField label="Mot de passe" value="secretpassword!" type="password" fullWidth disabled />
                </Grid>
              </Grid>
            ) }
          </CardContent>
          <CardActions classes={{ root: styles.actions }}>
            <Button color="primary" disabled>Enregistrer</Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs>
        <TokenTable title="Mes tokens" tokens={user?.tokens || []} />
      </Grid>
    </Grid>
  );
};

export default UserPage;