import React, { FC } from 'react';

import { env } from 'env';

import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom';

import Login from './auth/Login';
import PrivateRoute from './auth/PrivateRoute';

import AdminRoute from './admin/AdminRoute';

import Servers from './servers/Servers';

import AppBar from './AppBar';
import Forbidden from './Forbidden';
import Home from './Home';

// Component
const App: FC = () => {
  return (
    <Router basename={env.BASENAME}>
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute>
          <AppBar>
            <Switch>
              <AdminRoute path="/admin" />
              <Route path="/forbidden" component={Forbidden} />
              <Route path="/servers" component={Servers} />
              <Route component={Home} />
            </Switch>
          </AppBar>
        </PrivateRoute>
      </Switch>
    </Router>
  );
};

export default App;
