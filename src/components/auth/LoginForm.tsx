import React, { FC, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button, IconButton,
  Card, CardActions, CardContent, CardHeader,
  Container,
  Grid,
  TextField
} from '@material-ui/core';
import { PersonAdd as PersonAddIcon } from '@material-ui/icons';
import { Redirect, RouteChildrenProps } from 'react-router';
import { Link } from 'react-router-dom';

import { Credentials } from 'data/User';
import { AppState } from 'store';
import { login } from 'store/auth/thunks';

import PasswordField from 'components/basics/PasswordField';

// Types
export type LoginProps = RouteChildrenProps<{}, { from?: string }>;

// Style
const useStyles = makeStyles(({ palette }) => {
  const primary = palette.primary.main;
  const text = palette.getContrastText(primary);

  return {
    container: {
      height: '100vh',

      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    header: {
      color: text,
      backgroundColor: primary
    },
    action: {
      marginTop: -12,
      marginBottom: -12
    },
    actions: {
      justifyContent: 'center'
    }
  };
});

// Component
const LoginForm: FC<LoginProps> = (props) => {
  // Props
  const { location } = props;

  // Form
  const { errors, handleSubmit, register, setError } = useForm<Credentials>();

  // Redux
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: AppState) => state.auth.token != null);
  const error = useSelector((state: AppState) => state.auth.error);

  // Effects
  useEffect(() => {
    if (error) {
      setError([
        { type: 'loginFailed', name: 'email', message: error },
        { type: 'loginFailed', name: 'password', message: '' },
      ]);
    }
  }, [error, setError]);

  // Handlers
  const handleLogin = (cred: Credentials) => {
    dispatch(login(cred.email, cred.password));
  };

  // Render
  const styles = useStyles();

  if (isLoggedIn) {
    return <Redirect to={ (location.state && location.state.from) || "/" } />;
  }

  return (
    <Container classes={{ root: styles.container }} fixed maxWidth="sm">
      <Card component="form" onSubmit={handleSubmit(handleLogin)}>
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
                error={!!errors.email} helperText={errors.email?.message}
                name="email" inputRef={register}
              />
            </Grid>
            <Grid item xs>
              <PasswordField
                label="Mot de passe" fullWidth required
                error={!!errors.password} helperText={errors.password?.message}
                name="password" inputRef={register}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions classes={{ root: styles.actions }}>
          <Button color="primary" variant="contained" type="submit">
            Connexion
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default LoginForm;