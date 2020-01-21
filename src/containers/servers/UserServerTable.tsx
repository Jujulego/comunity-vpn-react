import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import Server from 'data/server';
import { AppState } from 'store';
import { refreshUserServers } from 'store/users/thunks';
import { toggleServer } from 'store/servers/thunks';

import ServerTable, { ServerTableProps } from 'components/servers/ServerTable';

// Type
export interface UserServerTableProps extends Omit<ServerTableProps, 'servers' | 'onLoad' | 'onRefresh' | 'onToggleServer'> {
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
    onLoad: () => dispatch(refreshUserServers(own.user)),
    onRefresh: () => dispatch(refreshUserServers(own.user)),
    onToggleServer: (id: string, port: number) => dispatch(toggleServer(id, port))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ServerTable);