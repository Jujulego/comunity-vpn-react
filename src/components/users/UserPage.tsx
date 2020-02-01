import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import { Grid } from '@material-ui/core';

import { Credentials } from 'data/User';
import { refreshUser, updateUser, deleteUserToken, toggleAdmin } from 'store/users/thunks';
import { useMe, useUser } from 'store/users/hooks';

import TokenTable from 'components/tokens/TokenTable';

import AdminCard from './AdminCard';
import CredentialsCard from './CredentialsCard';

// Types
export interface UserPageProps {
  id: string
}

// Components
const UserPage: FC<UserPageProps> = (props) => {
  // Props
  const { id } = props;

  // Redux
  const dispatch = useDispatch();
  const user = useUser(id);
  const me = useMe();

  // Handlers
  const handleRefresh = () => {
    dispatch(refreshUser(id));
  };

  const handleUpdate = (cred: Partial<Credentials>) => {
    dispatch(updateUser(id, cred));
  };

  const handleToggleAdmin = () => {
    dispatch(toggleAdmin(id));
  };

  const handleDeleteToken = (token: string) => {
    dispatch(deleteUserToken(id, token));
  };

  // Render
  return (
    <Grid container spacing={2}>
      <Grid item xs lg={5}>
        <Grid container spacing={2} direction="column">
          <Grid item xs>
            <CredentialsCard user={user} onUpdate={handleUpdate} />
          </Grid>
          { (me && me.admin) && (
            <Grid item xs>
              <AdminCard user={user} onToggleAdmin={handleToggleAdmin} />
            </Grid>
          ) }
        </Grid>
      </Grid>
      <Grid item xs>
        <TokenTable
          title="Tokens"
          tokens={user?.tokens || []}
          onDeleteToken={handleDeleteToken}
          onRefresh={handleRefresh}
        />
      </Grid>
    </Grid>
  );
};

export default UserPage;