import React, { FC } from 'react';

import { Switch, Route } from 'react-router';

import AllServerTable from 'containers/servers/AllServerTable';

// Component
const AdminApp: FC = () => {
  // Render
  return (
    <Switch>
      <Route path="/admin/servers">
        <AllServerTable title="Serveurs" showUsers />
      </Route>
    </Switch>
  );
};

export default AdminApp;