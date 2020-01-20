import React, { FC } from 'react';

import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import PrivateRoute from './PrivateRoute';

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
