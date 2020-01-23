import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  Card, CardActions, CardContent, CardHeader,
  Container,
  Grid,
  TextField
} from '@material-ui/core';

import { Redirect } from 'react-router';

import { AppState } from 'store';
import { signIn } from 'store/auth/thunks';

import styles from 'components/auth/Forms.module.scss';

// Types
interface FormState {
  email: string,
  password: string,
  confirm: string
}

// Component
const SignInForm: FC = () => {
  // State
  const [form, setForm] = useState<FormState>({
    email: '', password: '', confirm: ''
  });

  // Redux
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: AppState) => state.auth.token != null);

  // Callbacks
  const handleChange = (field: keyof FormState) => (event: ChangeEvent<{ value: unknown }>) => {
    event.persist();
    setForm(old => ({ ...old, [field]: event.target.value }));
  };

  const handleSignIn = (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    dispatch(signIn(form.email, form.password));
  };

  // Render
  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  const confirmError = !!form.confirm && form.password !== form.confirm;
  const confirmText  = "Les mots de passe ne correspondent pas";

  return (
    <Container classes={{ root: styles.container }} fixed maxWidth="sm">
      <Card component="form" onSubmit={handleSignIn}>
        <CardHeader
          classes={{ root: styles.header }}
          title="Community VPN" titleTypographyProps={{ variant: "body1" }}
        />
        <CardContent>
          <Grid container direction="column" spacing={2}>
            <Grid item xs>
              <TextField
                label="Email" fullWidth required
                value={form.email} onChange={handleChange('email')}
              />
            </Grid>
            <Grid item xs>
              <TextField
                label="Mot de passe" fullWidth required type="password"
                value={form.password} onChange={handleChange('password')}
              />
            </Grid>
            <Grid item xs>
              <TextField
                label="Confirmez le mot de passe" fullWidth required type="password"
                value={form.confirm} onChange={handleChange('confirm')}
                error={confirmError} helperText={confirmError && confirmText}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions classes={{ root: styles.actions }}>
          <Button
            color="primary" variant="contained" disabled={!form.email || !form.password || !form.confirm || confirmError}
            type="submit"
          >
            Inscription
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default SignInForm;