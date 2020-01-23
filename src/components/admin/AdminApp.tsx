import React, { FC } from 'react';

import { Switch, Route } from 'react-router';

import AllServerTable from 'containers/servers/AllServerTable';
import AllUserTable from 'containers/users/AllUserTable';

// Component
const AdminApp: FC = () => {
  // Render
  return (
    <Switch>
      <Route path="/admin/servers">
        <AllServerTable title="Serveurs" showUsers />
      </Route>
      <Route path="/admin/users">
        <AllUserTable title="Utilisateurs" />
      </Route>
    </Switch>
  );
};

export default AdminApp;