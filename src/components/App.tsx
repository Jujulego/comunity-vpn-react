import React, { FC, useMemo } from 'react';
import { createMuiTheme, useMediaQuery } from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';

import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom';

import { env } from 'env';

import UserServerTable from 'containers/servers/UserServerTable';

import LoginForm from './auth/LoginForm';
import PrivateRoute from './auth/PrivateRoute';
import SignInForm from './auth/SignInForm';

import AdminApp from './admin/AdminApp';
import AdminRoute from './admin/AdminRoute';

import UserPage from './users/UserPage';

import AppBar from './AppBar';
import Forbidden from './Forbidden';
import Home from './Home';
import EventProvider from './EventProvider';

// Component
const App: FC = () => {
  // Theme
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(
    () => createMuiTheme({
      palette: {
        primary: {
          main: deepPurple[400]
        },
        type: prefersDark ? 'dark' : 'light'

      }
    }),
    [prefersDark]
  );

  // Render
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router basename={env.BASENAME}>
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/signin" component={SignInForm} />
          <PrivateRoute>
            <EventProvider>
              <AppBar>
                <Switch>
                  <AdminRoute path="/admin">
                    <AdminApp />
                  </AdminRoute>
                  <Route path="/forbidden" component={Forbidden} />
                  <Route path="/profile">
                    <UserPage id="me" />
                  </Route>
                  <Route path="/servers">
                    <UserServerTable title="Mes serveurs" user="me" />
                  </Route>
                  <Route component={Home} />
                </Switch>
              </AppBar>
            </EventProvider>
          </PrivateRoute>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
