import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';
import { PeerActions } from '../../../../actions/peer.actions';
import { selectPeerServerConnected, selectSocketServerConnected } from '../../../../selectors/peer.selectors';
import { PeerHomeComponent } from './peer-home.component';

describe('PeerHomeComponent', () => {
  let fixture: ComponentFixture<PeerHomeComponent>;
  let dispatch: jest.SpyInstance;

  const leaveWith = (peer: boolean, socket: boolean) => {
    const store = TestBed.inject(Store) as MockStore;
    store.overrideSelector(selectPeerServerConnected, peer);
    store.overrideSelector(selectSocketServerConnected, socket);
    store.refreshState();
    dispatch = jest.spyOn(store, 'dispatch');
    fixture = TestBed.createComponent(PeerHomeComponent);
    fixture.detectChanges();
    fixture.destroy();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [...TestingModuleProviders],
      imports: [...TestingModuleImports],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [PeerHomeComponent],
    }).compileComponents();
  });

  it('disconnects from both servers when the user leaves the stream area while connected', () => {
    leaveWith(true, true);
    expect(dispatch).toHaveBeenCalledWith(PeerActions.disconnectPeerServer());
    expect(dispatch).toHaveBeenCalledWith(PeerActions.disconnectSocketServer());
  });

  it('disconnects only from the socket server when only the socket server is connected', () => {
    leaveWith(false, true);
    expect(dispatch).not.toHaveBeenCalledWith(PeerActions.disconnectPeerServer());
    expect(dispatch).toHaveBeenCalledWith(PeerActions.disconnectSocketServer());
  });

  it('disconnects only from the peer server when only the peer server is connected', () => {
    leaveWith(true, false);
    expect(dispatch).toHaveBeenCalledWith(PeerActions.disconnectPeerServer());
    expect(dispatch).not.toHaveBeenCalledWith(PeerActions.disconnectSocketServer());
  });

  it('dispatches nothing when it was never connected', () => {
    leaveWith(false, false);
    expect(dispatch).not.toHaveBeenCalled();
  });
});
