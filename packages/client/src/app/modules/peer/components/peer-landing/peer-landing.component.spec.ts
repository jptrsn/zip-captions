import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';
import { ObsActions } from '../../../../actions/obs.actions';
import { PeerActions } from '../../../../actions/peer.actions';
import { RecognitionActions } from '../../../../actions/recogntion.actions';
import { AppPlatform } from '../../../../models/app.model';
import { ObsConnectionState } from '../../../../reducers/obs.reducer';
import { peerConnectionsAcceptedSelector, platformSelector } from '../../../../selectors/app.selector';
import { selectObsConnected } from '../../../../selectors/obs.selectors';
import { selectIsBroadcasting, selectJoinCode, selectPeerError, selectPeerServerConnected, selectRoomId, selectServerOffline, selectSocketServerConnected } from '../../../../selectors/peer.selectors';
import { recognitionActiveSelector } from '../../../../selectors/recognition.selector';
import { PeerLandingComponent } from './peer-landing.component';

interface Scenario {
  accepted?: boolean;
  socketConnected?: boolean;
  broadcasting?: boolean;
  recognizing?: boolean;
  platform?: AppPlatform;
  obs?: ObsConnectionState;
  tabIndex?: string;
}

describe('PeerLandingComponent', () => {
  let component: PeerLandingComponent;
  let fixture: ComponentFixture<PeerLandingComponent>;
  let store: MockStore;
  let dispatch: jest.SpyInstance;
  let navigate: jest.SpyInstance;
  const route = { snapshot: { queryParams: {} as Record<string, string> } };

  const create = (s: Scenario = {}) => {
    route.snapshot.queryParams = s.tabIndex === undefined ? {} : { tabIndex: s.tabIndex };
    store.overrideSelector(peerConnectionsAcceptedSelector, s.accepted ?? true);
    store.overrideSelector(selectSocketServerConnected, s.socketConnected ?? true);
    store.overrideSelector(selectPeerServerConnected, true);
    store.overrideSelector(selectRoomId, 'AB-1234-5678');
    store.overrideSelector(selectJoinCode, 'ABCD');
    store.overrideSelector(selectIsBroadcasting, s.broadcasting ?? false);
    store.overrideSelector(recognitionActiveSelector, s.recognizing ?? false);
    store.overrideSelector(selectObsConnected, s.obs ?? ObsConnectionState.uninitialized);
    store.overrideSelector(selectPeerError, undefined);
    store.overrideSelector(selectServerOffline, false);
    store.overrideSelector(platformSelector, s.platform ?? AppPlatform.desktop);
    store.refreshState();
    navigate = jest.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    fixture = TestBed.createComponent(PeerLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };
  const has = (tag: string) => !!fixture.nativeElement.querySelector(tag);
  const session = () => component.joinSessionFormGroup.controls['session'];
  const joinCode = () => component.joinSessionFormGroup.controls['joinCode'];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [...TestingModuleImports],
      providers: [...TestingModuleProviders, { provide: ActivatedRoute, useValue: route }],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PeerLandingComponent],
    }).compileComponents();
    store = TestBed.inject(Store) as MockStore;
    dispatch = jest.spyOn(store, 'dispatch');
  });

  describe('what is shown', () => {
    it('shows the watch and broadcast tabs on a desktop, starting on watch', () => {
      create();
      expect(component.tabNames).toEqual(['view', 'broadcast']);
      expect(component.tabIndex()).toBe(0);
      expect(has('app-join-broadcast')).toBe(true);
    });

    it('shows only the watch tab on a mobile device, which cannot broadcast', () => {
      create({ platform: AppPlatform.mobile });
      expect(component.tabNames).toEqual(['view']);
    });

    it('never shows the broadcast form on a mobile device, even when the URL asks for that tab', () => {
      create({ platform: AppPlatform.mobile, tabIndex: '1' });
      expect(has('app-start-broadcast')).toBe(false);
    });

    it('disables the broadcast form on an unsupported browser, and enables it otherwise', () => {
      create({ platform: AppPlatform.unsupported, tabIndex: '1' });
      expect(fixture.debugElement.query(By.css('app-start-broadcast')).properties['disabled']).toBe(true);
      fixture.destroy();
      create({ tabIndex: '1' });
      expect(fixture.debugElement.query(By.css('app-start-broadcast')).properties['disabled']).toBe(false);
    });

    it('opens the broadcast tab from the tabIndex query parameter', () => {
      create({ tabIndex: '1' });
      expect(has('app-start-broadcast')).toBe(true);
      expect(has('app-join-broadcast')).toBe(false);
    });

    it('wraps a tabIndex past the last tab', () => {
      create({ tabIndex: '3' });
      expect(component.tabIndex()).toBe(1);
    });

    it('puts the chosen tab in the URL', () => {
      create();
      component.tabsControl.setValue(1);
      expect(navigate).toHaveBeenCalledWith([], expect.objectContaining({ queryParams: { tabIndex: 1 }, queryParamsHandling: 'merge' }));
    });

    it('asks for permission to connect before showing the status chips', () => {
      create({ accepted: false });
      expect(has('app-socket-server-status-chip')).toBe(false);
      expect(fixture.nativeElement.querySelector('.text-warning')).toBeTruthy();
    });

    it('shows the OBS chip only once OBS has been connected or tried', () => {
      create({ obs: ObsConnectionState.uninitialized });
      expect(component.showObsStatus()).toBe(false);
      fixture.destroy();
      create({ obs: ObsConnectionState.connected });
      expect(component.showObsStatus()).toBe(true);
    });

    it('shows the broadcast room while broadcasting, with the room id and join code', () => {
      create({ broadcasting: true });
      expect(has('app-broadcast-room')).toBe(true);
      expect(has('app-room-id')).toBe(true);
      expect(has('app-end-broadcast')).toBe(true);
      expect(has('app-join-broadcast')).toBe(false);
    });

    it('shows the captions stream while recognising and not broadcasting', () => {
      create({ recognizing: true });
      expect(has('app-stream-captions')).toBe(true);
      expect(has('app-broadcast-room')).toBe(false);
    });
  });

  describe('server connection', () => {
    it('connects to the socket server once connections are accepted', () => {
      create({ accepted: true, socketConnected: false });
      expect(dispatch).toHaveBeenCalledWith(PeerActions.connectSocketServer());
    });

    it.each([
      ['already connected', { accepted: true, socketConnected: true }],
      ['not yet accepted', { accepted: false, socketConnected: false }],
    ])('does not connect when %s', (_name, scenario) => {
      create(scenario);
      expect(dispatch).not.toHaveBeenCalledWith(PeerActions.connectSocketServer());
    });
  });

  describe('leaving', () => {
    it('resets recognition when destroyed', () => {
      create();
      fixture.destroy();
      expect(dispatch).toHaveBeenCalledWith(RecognitionActions.resetState());
    });

    it('may be left unless a broadcast is running', () => {
      create({ broadcasting: false });
      expect(component.canDeactivate()).toBe(true);
      fixture.destroy();
      create({ broadcasting: true });
      expect(component.canDeactivate()).toBe(false);
    });

    it('stops the OBS connection first, then the stream recognition once OBS has disconnected', () => {
      create({ recognizing: true, obs: ObsConnectionState.connected });
      component.stopWebsocketRecognition();
      expect(dispatch).toHaveBeenCalledWith(ObsActions.disconnect());
      expect(dispatch).not.toHaveBeenCalledWith(RecognitionActions.disconnect({ id: 'stream' }));
      store.overrideSelector(selectObsConnected, ObsConnectionState.disconnected);
      store.refreshState();
      expect(dispatch).toHaveBeenCalledWith(RecognitionActions.disconnect({ id: 'stream' }));
    });
  });

  describe('joining a session', () => {
    const type = (control: typeof session, text: string) => {
      let typed = '';
      for (const char of text) {
        typed = control().value + char;
        control().setValue(typed);
      }
    };

    it('needs a session id and a join code', () => {
      create();
      expect(session().hasError('required')).toBe(true);
      expect(joinCode().hasError('required')).toBe(true);
    });

    it('adds the dashes to the session id while it is typed', () => {
      create();
      type(session, '4NA79EF2GV');
      expect(session().value).toBe('4N-A79E-F2GV');
      expect(session().valid).toBe(true);
    });

    it('formats a session id set in one go, such as a paste, the same way as one typed', () => {
      create();
      session().setValue('4NA79EF2GV');
      expect(session().value).toBe('4N-A79E-F2GV');
      expect(session().valid).toBe(true);
    });

    it.each(['4N-A79E', '4N-A79E-F2GO', '12345'])('rejects the session id %s', (id) => {
      create();
      session().setValue(id);
      expect(session().hasError('invalid')).toBe(true);
    });

    it.each([['ACDE', true], ['acde', true], ['ACD', false], ['ACDEF', false], ['ACD1', false], ['ABCD', false]])('join code %s is valid: %s', (code, valid) => {
      create();
      joinCode().setValue(code);
      expect(joinCode().valid).toBe(valid);
    });

    it('stores the join code and goes to the session, passing the code along, when the form is valid', () => {
      create();
      session().setValue('4N-A79E-F2GV');
      joinCode().setValue('ACDE');
      expect(component.joinSession()).toBe(false);
      expect(dispatch).toHaveBeenCalledWith(PeerActions.setJoinCode({ joinCode: 'ACDE' }));
      expect(navigate).toHaveBeenCalledWith(['4N-A79E-F2GV'], expect.objectContaining({ queryParams: { joinCode: 'ACDE' } }));
    });

    it('does nothing but show the errors when the form is invalid', () => {
      create();
      session().setValue('nope');
      component.joinSession();
      expect(navigate).not.toHaveBeenCalledWith(['nope'], expect.anything());
      expect(dispatch).not.toHaveBeenCalledWith(expect.objectContaining({ type: PeerActions.setJoinCode.type }));
      expect(session().touched).toBe(true);
    });
  });
});
