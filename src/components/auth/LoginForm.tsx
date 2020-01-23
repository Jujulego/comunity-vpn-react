import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button, IconButton,
  Card, CardActions, CardContent, CardHeader,
  Container,
  Grid,
  TextField
} from '@material-ui/core';
import {
  PersonAdd as PersonAddIcon
} from '@material-ui/icons';
import { Link } from 'react-router-dom';

import { Redirect, RouteChildrenProps } from 'react-router';

import { AppState } from 'store';
import { login } from 'store/auth/thunks';

import styles from 'components/auth/Forms.module.scss';

// Types
interface FormState {
  email: string,
  password: string
}

export type LoginProps = RouteChildrenProps<{}, { from?: string }>

// Component
const LoginForm: FC<LoginProps> = ({ location }) => {
  // State
  const [form, setForm] = useState<FormState>({
    email: '', password: ''
  });

  // Redux
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: AppState) => state.auth.token != null);
  const error = useSelector((state: AppState) => state.auth.error);

  // Callbacks
  const handleChange = (field: keyof FormState) => (event: ChangeEvent<{ value: unknown }>) => {
    event.persist();
    setForm(old => ({ ...old, [field]: event.target.value }));
  };

  const handleLogin = (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    dispatch(login(form.email, form.password));
  };

  // Render
  if (isLoggedIn) {
    return <Redirect to={ (location.state && location.state.from) || "/" } />;
  }

  return (
    <Container classes={{ root: styles.container }} fixed maxWidth="sm">
      <Card component="form" onSubmit={handleLogin}>
        <CardHeader
          classes={{ root: styles.header, action: styles.action }}
          title="Community VPN" titleTypographyProps={{ variant: "body1" }}
          action={
            <IconButton color="inherit" component={Link} to="/signin">
              <PersonAddIcon />
            </IconButton>
          }
        />
        <CardContent>
          <Grid container direction="column" spacing={2}>
            <Grid item xs>
              <TextField
                label="Email" fullWidth required
                value={form.email} onChange={handleChange('email')}
                error={error != null} helperText={error}
              />
            </Grid>
            <Grid item xs>
              <TextField
                label="Mot de passe" fullWidth required type="password"
                value={form.password} onChange={handleChange('password')}
                error={error != null}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions classes={{ root: styles.actions }}>
          <Button
            color="primary" variant="contained" disabled={!form.email || !form.password}
            type="submit"
          >
            Connexion
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default LoginForm;