import React, { FC, FormEvent, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Controller, useForm } from 'react-hook-form';
import validator from 'validator';

import {
  Button,
  Card, CardHeader, CardContent, CardActions, CardProps,
  Grid,
  TextField
} from '@material-ui/core';

import User, { Credentials } from 'data/user';

import EditPasswordField from 'components/basics/EditPasswordField';

// Types
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

  // Form
  const { control, errors, formState, handleSubmit, register, reset } = useForm<Credentials>({ mode: 'onBlur' });

  // Handlers
  const handleReset = (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();

    setEditPassword(false);
    reset({
      email: user?.email || '',
      password: ''
    });
  };

  const handleUpdate = (cred: Credentials) => {
    if (user) {
      const update: Partial<Credentials> = {};

      if (cred.email !== user.email) update.email    = cred.email;
      if (cred.password !== '')      update.password = cred.password;

      if (Object.keys(update).length > 0) {
        onUpdate(update);
      }
    }
  };

  // Render
  const styles = useStyles();

  return (
    <Card {...card} component="form" onSubmit={handleSubmit(handleUpdate)} onReset={handleReset}>
      <CardHeader title="Identifiants" titleTypographyProps={{ variant: "h6" }} />
      <CardContent>
        { user && (
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextField
                name="email"
                defaultValue={user?.email || ''}
                inputRef={register({ validate: validator.isEmail })}

                label="Email" fullWidth
                error={!!errors.email} helperText={errors.email && "Adresse email valide"}
              />
            </Grid>
            <Grid item>
              <Controller
                name="password" defaultValue="" as={EditPasswordField}
                control={control} rules={{ minLength: 8 }}

                label="Mot de passe" fullWidth required
                error={!!errors.password} helperText={errors.password && "8 caractères minimum"}
                editable={editPassword} onChangeEditable={setEditPassword}
              />
            </Grid>
          </Grid>
        ) }
      </CardContent>
      <CardActions classes={{ root: styles.actions }}>
        <Button color="secondary" type="reset" disabled={!formState.dirty}>Annuler</Button>
        <Button color="primary" type="submit" disabled={!formState.dirty}>Enregistrer</Button>
      </CardActions>
    </Card>
  )
};

export default CredentialsCard;