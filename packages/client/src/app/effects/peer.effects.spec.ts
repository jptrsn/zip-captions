import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Action } from '@ngrx/store';
import { ReplaySubject } from 'rxjs';
import { PeerActions } from '../actions/peer.actions';
import { PeerService } from '../modules/peer/services/peer.service';
import { defaultAppState } from '../reducers/app.reducer';
import { selectSocketServerConnected } from '../selectors/peer.selectors';
import { PeerEffects } from './peer.effects';

describe('PeerEffects', () => {
  let actions$: ReplaySubject<Action>;
  let effects: PeerEffects;
  let store: MockStore;
  let peerService: { refreshUserRooms: jest.Mock };

  beforeEach(() => {
    actions$ = new ReplaySubject<Action>(1);
    peerService = { refreshUserRooms: jest.fn() };
    TestBed.configureTestingModule({
      providers: [
        PeerEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState: defaultAppState }),
        { provide: PeerService, useValue: peerService },
      ]
    });
    effects = TestBed.inject(PeerEffects);
    store = TestBed.inject(MockStore);
  });

  describe('getBroadcastRooms$', () => {
    it('waits for the socket before asking for the rooms, so a page load on the broadcast screen does not fail', () => {
      store.overrideSelector(selectSocketServerConnected, false);
      const emitted: Action[] = [];
      effects.getBroadcastRooms$.subscribe((action) => emitted.push(action));

      actions$.next(PeerActions.getBroadcastRooms());
      expect(peerService.refreshUserRooms).not.toHaveBeenCalled();

      store.overrideSelector(selectSocketServerConnected, true);
      store.refreshState();
      expect(peerService.refreshUserRooms).toHaveBeenCalledTimes(1);
      expect(emitted).toEqual([PeerActions.getBroadcastRoomsRequested()]);
    });

    it('asks at once when the socket is already connected', () => {
      store.overrideSelector(selectSocketServerConnected, true);
      const emitted: Action[] = [];
      effects.getBroadcastRooms$.subscribe((action) => emitted.push(action));

      actions$.next(PeerActions.getBroadcastRooms());
      expect(peerService.refreshUserRooms).toHaveBeenCalledTimes(1);
      expect(emitted).toEqual([PeerActions.getBroadcastRoomsRequested()]);
    });
  });
});
