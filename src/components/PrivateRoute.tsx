import React, { FC } from 'react';
import { useSelector } from 'react-redux';

import { Redirect, Route, RouteProps } from 'react-router';

import { AppState } from 'store';

// Component
const PrivateRoute: FC<RouteProps> = ({ children , ...props }) => {
  // Redux
  const isLoggedIn = useSelector<AppState,boolean>(state => state.auth.token != null);

  // Render
  return (
    <Route
      {...props}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;