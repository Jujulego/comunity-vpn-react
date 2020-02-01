import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import Server from 'data/Server';
import { AppState } from 'store';
import { refreshAllServers } from 'store/admin/thunks';
import { downServer } from 'store/servers/thunks';

import ServerTable, { ServerTableProps } from 'components/servers/ServerTable';

// Type
type DefinedProps = 'servers' | 'onLoad' | 'onRefresh' | 'onDeleteServer';
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
    onDeleteServer: (id: string) => dispatch(downServer(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ServerTable);