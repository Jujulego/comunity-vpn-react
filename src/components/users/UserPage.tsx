import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import {
  Button,
  Card, CardHeader, CardContent, CardActions,
  Grid,
  TextField
} from '@material-ui/core';

import { refreshUser, updateUser, deleteUserToken } from 'store/users/thunks';
import { useUser } from 'store/users/hooks';

import EditPasswordField from 'components/basics/EditPasswordField';
import TokenTable from 'components/tokens/TokenTable';

// Types
interface FormState {
  email: string,
  password: string
}

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

  // State
  const [editPassword, setEditPassword] = useState(false);
  const [form, setForm] = useState<FormState>({
    email: '', password: ''
  });

  // Redux
  const dispatch = useDispatch();
  const user = useUser(id);

  // Effects
  useEffect(() => {
    if (user) {
      setEditPassword(false);
      setForm({
        email: user.email,
        password: ''
      });
    }
  }, [user]);

  // Handlers
  const handleRefresh = () => {
    dispatch(refreshUser(id));
  };

  const handleDeleteToken = (token: string) => {
    dispatch(deleteUserToken(id, token));
  };

  const handleChange = (field: keyof FormState) => (event: ChangeEvent<{ value: unknown }>) => {
    event.persist();

    setForm(old => ({ ...old, [field]: event.target.value as string }));
  };

  const handleReset = (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();

    setEditPassword(false);
    setForm({
      email: user ? user.email : '',
      password: ''
    });
  };

  const handleSubmit = (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();

    dispatch(updateUser(id, form));
  };

  // Render
  const styles = useStyles();
  const title = (id === 'me') ? "Moi" : `Utilisateur ${id}`;

  const changed = form.email !== user?.email || form.password !== '';

  return (
    <Grid container spacing={2}>
      <Grid item lg={5}>
        <Card component="form" onSubmit={handleSubmit} onReset={handleReset}>
          <CardHeader title={title} titleTypographyProps={{ variant: "h6" }} />
          <CardContent>
            { user && (
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <TextField
                    label="Email" fullWidth
                    value={form.email} onChange={handleChange('email')}
                  />
                </Grid>
                <Grid item>
                  <EditPasswordField
                    label="Mot de passe" fullWidth
                    editable={editPassword} onChangeEditable={setEditPassword}
                    value={form.password} onChange={handleChange('password')}
                  />
                </Grid>
              </Grid>
            ) }
          </CardContent>
          <CardActions classes={{ root: styles.actions }}>
            <Button color="secondary" type="reset" disabled={!changed}>Annuler</Button>
            <Button color="primary" type="submit" disabled={!changed}>Enregistrer</Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs>
        <TokenTable
          title="Tokens"
          tokens={user?.tokens || []}
          onDeleteToken={handleDeleteToken}
          onRefresh={handleRefresh}
        />
      </Grid>
    </Grid>
  );
};

export default UserPage;