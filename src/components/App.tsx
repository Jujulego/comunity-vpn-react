import React, { FC } from 'react';

import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom';

import Home from './Home';
import Login from 'components/auth/Login';
import PrivateRoute from 'components/auth/PrivateRoute';

// Component
const App: FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute path="/">
          <Home />
        </PrivateRoute>
      </Switch>
    </Router>
  );
};

export default App;
