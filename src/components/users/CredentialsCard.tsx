import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  Button,
  Card, CardHeader, CardContent, CardActions, CardProps,
  Grid,
  TextField
} from '@material-ui/core';

import User, { Credentials } from 'data/user';

import EditPasswordField from 'components/basics/EditPasswordField';

// Types
type FormState = Credentials;
export interface CredentialsCardProps extends Omit<CardProps, 'component'> {
  user: User | null,
  onUpdate: (cred: Partial<Credentials>) => void
}

// Style
const useStyles = makeStyles({
  actions: {
    justifyContent: 'end'
  }
});

// Component
const CredentialsCard: FC<CredentialsCardProps> = (props) => {
  // Props
  const {
    user, onUpdate,
    ...card
  } = props;

  // State
  const [editPassword, setEditPassword] = useState(false);
  const [form, setForm] = useState<FormState>({
    email: '', password: ''
  });

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

    if (user) {
      const update: Partial<Credentials> = {};

      if (form.email !== user.email) update.email = form.email;
      if (form.password !== '') update.password = form.password;

      if (Object.keys(update).length > 0) {
        onUpdate(update);
      }
    }
  };

  // Render
  const styles = useStyles();
  const changed = form.email !== user?.email || form.password !== '';

  return (
    <Card {...card} component="form" onSubmit={handleSubmit} onReset={handleReset}>
      <CardHeader title="Identifiants" titleTypographyProps={{ variant: "h6" }} />
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
                label="Mot de passe" fullWidth required
                editable={editPassword} onChangeEditable={setEditPassword}
                value={form.password} onChange={handleChange('password')}
              />
            </Grid>
          </Grid>
        ) }
      </CardContent>
      <CardActions classes={{ root: styles.actions }}>
        <Button color="secondary" type="reset" disabled={!changed}>Annuler</Button>
        <Button color="primary" type="submit" disabled={!changed && (form.password === '')}>Enregistrer</Button>
      </CardActions>
    </Card>
  )
};

export default CredentialsCard;