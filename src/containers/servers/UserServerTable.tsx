import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import Server from 'data/server';
import { AppState } from 'store';
import { refreshUserServers } from 'store/users/thunks';
import { addServer, toggleServer } from 'store/servers/thunks';

import ServerTable, { ServerTableProps } from 'components/servers/ServerTable';

// Type
type DefinedProps = 'servers' | 'onLoad' | 'onRefresh' | 'onAddServer' | 'onToggleServer';
export interface UserServerTableProps extends Omit<ServerTableProps, DefinedProps> {
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
    onAddServer: (ip: string) => dispatch(addServer(ip)),
    onToggleServer: (id: string, port: number) => dispatch(toggleServer(id, port))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ServerTable);