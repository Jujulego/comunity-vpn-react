import React, { FC } from 'react';

import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom';

import Login from './auth/Login';
import PrivateRoute from './auth/PrivateRoute';

import AdminRoute from './admin/AdminRoute';

import AppBar from './AppBar';
import Forbidden from './Forbidden';
import Home from './Home';

// Component
const App: FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute>
          <AppBar>
            <Switch>
              <AdminRoute path="/admin">
              </AdminRoute>
              <Route path="/forbidden">
                <Forbidden />
              </Route>
              <Route path="/servers">
              </Route>
              <Route>
                <Home />
              </Route>
            </Switch>
          </AppBar>
        </PrivateRoute>
      </Switch>
    </Router>
  );
};

export default App;
