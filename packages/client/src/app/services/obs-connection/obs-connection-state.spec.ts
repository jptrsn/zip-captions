import { ObsConnectionState } from '../../reducers/obs.reducer';
import { obsConnectionStateKey } from './obs-connection-state';

describe('obsConnectionStateKey', () => {
  it.each([
    [ObsConnectionState.uninitialized, 'CONNECTIONS.notConnected'],
    [ObsConnectionState.disconnected, 'CONNECTIONS.disconnected'],
    [ObsConnectionState.connecting, 'CONNECTIONS.connecting'],
    [ObsConnectionState.connected, 'STREAM.connected'],
    [ObsConnectionState.error, 'CONNECTIONS.connectionError'],
    [undefined, 'CONNECTIONS.notConnected'],
  ])('maps %s to %s', (state, key) => {
    expect(obsConnectionStateKey(state)).toBe(key);
  });

  it('never returns the raw enum value', () => {
    Object.values(ObsConnectionState).forEach((state) => {
      expect(obsConnectionStateKey(state)).not.toBe(state);
    });
  });
});
