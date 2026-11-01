import { ObsConnectionState } from '../../reducers/obs.reducer';

/** Translation key for the connection badge, so the raw enum value is never shown */
export function obsConnectionStateKey(state: ObsConnectionState | undefined): string {
  switch (state) {
    case ObsConnectionState.connected: return 'STREAM.connected';
    case ObsConnectionState.connecting: return 'CONNECTIONS.connecting';
    case ObsConnectionState.disconnected: return 'CONNECTIONS.disconnected';
    case ObsConnectionState.error: return 'CONNECTIONS.connectionError';
    default: return 'CONNECTIONS.notConnected';
  }
}
