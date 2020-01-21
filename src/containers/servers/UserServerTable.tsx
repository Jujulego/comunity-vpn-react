import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import Server from 'data/server';
import { AppState } from 'store';
import { refreshUserServers } from 'store/users/thunks';

import ServerTable, { ServerTableProps } from 'components/servers/ServersTable';

// Type
export interface UserServerTableProps extends Omit<ServerTableProps, 'servers' | 'onLoad'> {
  user: string,
}

// Component
function mapStateToProps(state: AppState, own: UserServerTableProps) {
  const { servers } = state.users[own.user];

  return {
    servers: servers && servers.reduce<Server[]>((acc, id) => {
      const { data } = state.servers[id];
      if (data) acc.push(data);

      return acc;
    }, [])
  };
}

function mapDispatchToProps(dispatch: ThunkDispatch<AppState, {}, any>, own: UserServerTableProps) {
  return {
    onLoad: () => dispatch(refreshUserServers(own.user))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ServerTable);