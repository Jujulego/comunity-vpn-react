import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import Server from 'data/Server';
import { AppState } from 'store';
import { downServer, upServer } from 'store/servers/thunks';
import { refreshUserServers } from 'store/users/thunks';

import ServerTable, { ServerTableProps } from 'components/servers/ServerTable';

// Type
type DefinedProps = 'servers' | 'showUsers' | 'onLoad' | 'onRefresh' | 'onAddServer' | 'onDeleteServer';
export interface UserServerTableProps extends Omit<ServerTableProps, DefinedProps> {
  user: string,
}

// Component
function mapStateToProps(state: AppState, own: UserServerTableProps) {
  const { servers } = state.users[own.user];

  return {
    showUsers: false,
    servers: servers.reduce<Server[]>((acc, id) => {
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
    onAddServer: (ip: string, port: number) => dispatch(upServer(ip, port, own.user)),
    onDeleteServer: (id: string) => dispatch(downServer(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ServerTable);