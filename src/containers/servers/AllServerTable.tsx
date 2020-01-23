import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import Server from 'data/server';
import { AppState } from 'store';
import { refreshAllServers } from 'store/admin/thunks';
import { toggleServer } from 'store/servers/thunks';

import ServerTable, { ServerTableProps } from 'components/servers/ServerTable';

// Type
type DefinedProps = 'servers' | 'onLoad' | 'onRefresh' | 'onToggleServer';
export type AllServerTableProps = Omit<ServerTableProps, DefinedProps>;

// Component
function mapStateToProps(state: AppState, _: AllServerTableProps) {
  const { servers } = state.admin;

  return {
    servers: servers.reduce<Server[]>((acc, id) => {
      const { data } = state.servers[id];
      if (data) acc.push(data);

      return acc;
    }, [])
  };
}

function mapDispatchToProps(dispatch: ThunkDispatch<AppState, {}, any>, _: AllServerTableProps) {
  return {
    onLoad: () => dispatch(refreshAllServers()),
    onRefresh: () => dispatch(refreshAllServers()),
    onToggleServer: (id: string, port: number) => dispatch(toggleServer(id, port))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ServerTable);