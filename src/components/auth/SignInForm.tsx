import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';

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

import { PasswordField } from 'components/basics/Fields';

// Types
interface FormState {
  email: string,
  password: string,
  confirm: string
}

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
const SignInForm: FC = () => {
  // Form
  const { errors, formState, handleSubmit, getValues, register } = useForm<FormState>({ mode: 'onBlur' });

  // Redux
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: AppState) => state.auth.token != null);

  // Handlers
  const samePassword = (confirm: string) => {
    const { password } = getValues();
    return confirm === password || 'Les mots de passe ne correspondent pas';
  };

  const handleSignIn = (data: FormState) => {
    dispatch(signIn(data.email, data.password));
  };

  // Render
  const styles = useStyles();

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Container classes={{ root: styles.container }} fixed maxWidth="sm">
      <Card component="form" onSubmit={handleSubmit(handleSignIn)}>
        <CardHeader
          classes={{ root: styles.header }}
          title="Community VPN" titleTypographyProps={{ variant: "body1" }}
        />
        <CardContent>
          <Grid container direction="column" spacing={2}>
            <Grid item xs>
              <TextField
                label="Email" fullWidth required
                error={!!errors.email} helperText={errors.email?.message}
                name="email" inputRef={
                  register({
                    validate: (value: string) => validator.isEmail(value) || "Adresse email invalide"
                  })
                }
              />
            </Grid>
            <Grid item xs>
              <PasswordField
                label="Mot de passe" fullWidth required
                error={!!errors.password} helperText={errors.password?.message}
                name="password" inputRef={
                  register({
                    minLength: { value: 8, message: "8 caractères minimum" }
                  })
                }
              />
            </Grid>
            <Grid item xs>
              <PasswordField
                label="Confirmez le mot de passe" fullWidth required
                error={!!errors.confirm} helperText={errors.confirm?.message}
                name="confirm" inputRef={
                  register({
                    validate: samePassword
                  })
                }
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions classes={{ root: styles.actions }}>
          <Button
            color="primary" variant="contained" disabled={!formState.dirty}
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