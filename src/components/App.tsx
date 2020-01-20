import React, { FC } from 'react';

import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom';

import Login from './auth/Login';
import PrivateRoute from './auth/PrivateRoute';
import AppBar from './AppBar';
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
