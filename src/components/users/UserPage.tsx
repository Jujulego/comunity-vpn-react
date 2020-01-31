import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import { Grid } from '@material-ui/core';

import { Credentials } from 'data/User';
import { refreshUser, updateUser, deleteUserToken } from 'store/users/thunks';
import { useUser } from 'store/users/hooks';

import TokenTable from 'components/tokens/TokenTable';
import CredentialsCard from 'components/users/CredentialsCard';

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

  // Handlers
  const handleRefresh = () => {
    dispatch(refreshUser(id));
  };

  const handleDeleteToken = (token: string) => {
    dispatch(deleteUserToken(id, token));
  };

  const handleUpdate = (cred: Partial<Credentials>) => {
    dispatch(updateUser(id, cred));
  };

  // Render
  return (
    <Grid container spacing={2}>
      <Grid item lg={5}>
        <CredentialsCard user={user} onUpdate={handleUpdate} />
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