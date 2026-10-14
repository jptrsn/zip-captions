import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { TestingModuleImports, TestingModuleProviders } from '../../../testing/test-scaffold';
import { ObsActions } from '../../actions/obs.actions';
import { RecognitionActions } from '../../actions/recogntion.actions';
import { AudioStreamActions } from '../../models/audio-stream.model';
import { AppPlatform } from '../../models/app.model';
import { ObsConnectionState } from '../../reducers/obs.reducer';
import { platformSelector } from '../../selectors/app.selector';
import { selectObsConnected, selectObsStreamActive, selectObsWebsocketIp } from '../../selectors/obs.selectors';
import { recognitionActiveSelector } from '../../selectors/recognition.selector';
import { ObsConnectionStatusComponent } from './obs-connection-status.component';

describe('ObsConnectionStatusComponent', () => {
  let component: ObsConnectionStatusComponent;
  let fixture: ComponentFixture<ObsConnectionStatusComponent>;
  let dispatch: jest.SpyInstance;
  let navigate: jest.SpyInstance;

  const create = (opts: { state?: ObsConnectionState; platform?: AppPlatform; recognizing?: boolean } = {}) => {
    const store = TestBed.inject(Store) as MockStore;
    store.overrideSelector(selectObsConnected, opts.state ?? ObsConnectionState.connected);
    store.overrideSelector(selectObsStreamActive, false);
    store.overrideSelector(selectObsWebsocketIp, '127.0.0.1');
    store.overrideSelector(recognitionActiveSelector, opts.recognizing ?? false);
    store.overrideSelector(platformSelector, opts.platform ?? AppPlatform.desktop);
    store.refreshState();
    dispatch = jest.spyOn(store, 'dispatch');
    navigate = jest.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    fixture = TestBed.createComponent(ObsConnectionStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };
  const menuEntries = () => Array.from<HTMLElement>(fixture.nativeElement.querySelectorAll('li a')).map((a) => a.textContent?.trim());

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [...TestingModuleProviders],
      imports: [...TestingModuleImports],
      declarations: [ObsConnectionStatusComponent],
    }).compileComponents();
  });

  it('shows the OBS address in the menu while connected', () => {
    create();
    expect(fixture.nativeElement.querySelector('.menu-title').textContent).toContain('127.0.0.1');
  });

  it('offers to disconnect while connected and not recognising', () => {
    create({ state: ObsConnectionState.connected, recognizing: false });
    expect(menuEntries().length).toBeGreaterThan(0);
    component.disconnect();
    expect(dispatch).toHaveBeenCalledWith(ObsActions.disconnect());
  });

  it('does not offer to disconnect while recognition is running', () => {
    create({ state: ObsConnectionState.connected, recognizing: true });
    expect(menuEntries()).toEqual([]);
  });

  it('offers to reconnect while disconnected', () => {
    create({ state: ObsConnectionState.disconnected });
    expect(menuEntries().length).toBe(1);
    component.reconnect();
    expect(dispatch).toHaveBeenCalledWith(ObsActions.reconnect());
  });

  it('starts listening on desktop by going home and connecting the audio stream', async () => {
    create({ platform: AppPlatform.desktop });
    component.startRecognition();
    await Promise.resolve();
    expect(navigate).toHaveBeenCalledWith(['']);
    expect(dispatch).toHaveBeenCalledWith(AudioStreamActions.connectStream({ id: 'default' }));
  });

  it('starts listening on other platforms by connecting recognition directly', async () => {
    create({ platform: AppPlatform.mobile });
    component.startRecognition();
    await Promise.resolve();
    expect(dispatch).toHaveBeenCalledWith(RecognitionActions.connect({ id: 'default' }));
    expect(dispatch).not.toHaveBeenCalledWith(AudioStreamActions.connectStream({ id: 'default' }));
  });
});
