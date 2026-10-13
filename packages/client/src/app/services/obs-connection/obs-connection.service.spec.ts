import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { ObsConnectionService } from './obs-connection.service';
import { TestingModuleProviders } from '../../../testing/test-scaffold';
import { defaultAppState } from '../../reducers/app.reducer';
import { ObsConnectionState } from '../../reducers/obs.reducer';
import { selectObsConnected, selectObsStreamActive } from '../../selectors/obs.selectors';

describe('ObsConnectionService', () => {
  let service: ObsConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: TestingModuleProviders
    });
    service = TestBed.inject(ObsConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('sendCaption', () => {
    let call: jest.Mock;
    let store: MockStore;

    const setup = (streaming: boolean, connection: ObsConnectionState) => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({ providers: [provideMockStore({ initialState: defaultAppState })] });
      store = TestBed.inject(MockStore);
      store.overrideSelector(selectObsStreamActive, streaming);
      store.overrideSelector(selectObsConnected, connection);
      store.refreshState();
      service = TestBed.inject(ObsConnectionService);
      call = jest.fn().mockResolvedValue({});
      (service as any).obs = { call };
    };

    it('sends the caption while streaming and connected', async () => {
      setup(true, ObsConnectionState.connected);
      await service.sendCaption('hello');
      expect(call).toHaveBeenCalledWith('SendStreamCaption', { captionText: 'hello' });
    });

    it('sends an empty caption to clear it', async () => {
      setup(true, ObsConnectionState.connected);
      await service.sendCaption('');
      expect(call).toHaveBeenCalledWith('SendStreamCaption', { captionText: '' });
    });

    it('sends nothing when the stream is not active', async () => {
      setup(false, ObsConnectionState.connected);
      await service.sendCaption('hello');
      expect(call).not.toHaveBeenCalled();
    });

    it('sends nothing after the socket closed, even though streaming was last reported active', async () => {
      setup(true, ObsConnectionState.disconnected);
      await service.sendCaption('hello');
      expect(call).not.toHaveBeenCalled();
    });

    it('swallows a rejected call', async () => {
      setup(true, ObsConnectionState.connected);
      jest.spyOn(console, 'warn').mockImplementation(() => undefined);
      call.mockRejectedValue(new Error('socket closed'));
      await expect(service.sendCaption('hello')).resolves.toBeUndefined();
    });
  });
});
