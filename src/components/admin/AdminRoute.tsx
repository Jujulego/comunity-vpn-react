import React, { FC } from 'react';

import { Redirect, Route, RouteProps } from 'react-router';

import { useMe } from 'store/users/hooks';

// Types
export type AdminRouteProps = Omit<RouteProps, "render">

// Component
const AdminRoute: FC<AdminRouteProps> = ({ children , ...props }) => {
  // Redux
  const user = useMe();

  // Render
  if (user == null) return null;

  return (
    <Route
      {...props}
      render={({ location }) =>
        user.admin ? (
          children
        ) : (
          <Redirect to={{ pathname: "/forbidden", state: { from: location } }} />
        )
      }
    />
  );
};

export default AdminRoute;