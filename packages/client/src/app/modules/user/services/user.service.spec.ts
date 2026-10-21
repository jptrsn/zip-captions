import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { firstValueFrom } from 'rxjs';
import { UserActions } from '../../../actions/user.actions';
import { selectUserId } from '../../../selectors/user.selector';
import { StorageService } from '../../../services/storage.service';
import { defaultSettingsState } from '../../../reducers/settings.reducer';
import { UserService } from './user.service';

describe('UserService', () => {
  const profileUrl = 'http://localhost:3000/v1/user/profile';
  let http: HttpTestingController;
  let store: MockStore;
  let dispatch: jest.SpyInstance;

  const create = (userId?: string): UserService => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [provideMockStore(), { provide: StorageService, useValue: {} }],
    });
    store = TestBed.inject(Store) as MockStore;
    store.overrideSelector(selectUserId, userId);
    store.refreshState();
    dispatch = jest.spyOn(store, 'dispatch');
    http = TestBed.inject(HttpTestingController);
    return TestBed.inject(UserService);
  };

  afterEach(() => http.verify());

  describe('with a known user', () => {
    let service: UserService;
    beforeEach(() => { service = create('u1'); });

    it('gets the profile', () => {
      service.getUserProfile('u1').subscribe();
      expect(http.expectOne(`${profileUrl}/u1`).request.method).toBe('GET');
      expect(dispatch).not.toHaveBeenCalled();
    });

    it('deletes the account, with the reason when one is given', () => {
      service.deleteAccount(null).subscribe();
      const without = http.expectOne(`${profileUrl}/u1`);
      expect(without.request.method).toBe('DELETE');
      expect(without.request.responseType).toBe('text');
      without.flush('');
      service.deleteAccount('privacy').subscribe();
      http.expectOne(`${profileUrl}/u1?reason=privacy`).flush('');
    });

    it('saves the sync setting and returns the stored value', async () => {
      const result = firstValueFrom(service.saveSyncSetting(true));
      const req = http.expectOne(`${profileUrl}/u1/sync`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ sync: true });
      req.flush({ sync: false });
      await expect(result).resolves.toBe(false);
    });

    it('gets the saved settings', () => {
      service.getUiSettings().subscribe();
      expect(http.expectOne(`${profileUrl}/u1/settings`).request.method).toBe('GET');
    });

    it('posts the settings wrapped in a "settings" property', () => {
      service.saveUiSettings(defaultSettingsState).subscribe();
      const req = http.expectOne(`${profileUrl}/u1/settings`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ settings: defaultSettingsState });
    });

    it('lists the rooms', () => {
      service.getUserRooms().subscribe();
      expect(http.expectOne(`${profileUrl}/u1/rooms`).request.method).toBe('GET');
    });

    it('saves one room with a PATCH to that room', () => {
      service.saveUserRoom({ roomId: 'AB-1234-5678', allowAnonymous: true }).subscribe();
      const req = http.expectOne(`${profileUrl}/u1/rooms/AB-1234-5678`);
      expect(req.request.method).toBe('PATCH');
      expect(req.request.body).toEqual({ room: { roomId: 'AB-1234-5678', allowAnonymous: true } });
    });

    it('deletes one room', () => {
      service.deleteUserRoom('AB-1234-5678').subscribe();
      expect(http.expectOne(`${profileUrl}/u1/rooms/AB-1234-5678`).request.method).toBe('DELETE');
    });

    it('gets the supporter profile', () => {
      service.getSupporterProfile().subscribe();
      expect(http.expectOne(`${profileUrl}/u1/support`).request.method).toBe('GET');
    });

    it('asks for candidate room ids, static or not', () => {
      service.getCandidateRoomIdList(true).subscribe();
      http.expectOne('http://localhost:3000/v1/user/rooms/ids?isStatic=true').flush([]);
    });
  });

  describe('without a known user', () => {
    it('remembers the id when the profile is requested', () => {
      const service = create(undefined);
      service.getUserProfile('u9').subscribe();
      http.expectOne(`${profileUrl}/u9`);
      expect(dispatch).toHaveBeenCalledWith(UserActions.setUserID({ id: 'u9' }));
    });

    it.each([
      ['deleteAccount', (s: UserService) => s.deleteAccount(null)],
      ['saveSyncSetting', (s: UserService) => s.saveSyncSetting(true)],
      ['getUiSettings', (s: UserService) => s.getUiSettings()],
      ['saveUiSettings', (s: UserService) => s.saveUiSettings(defaultSettingsState)],
      ['getUserRooms', (s: UserService) => s.getUserRooms()],
      ['saveUserRoom', (s: UserService) => s.saveUserRoom({ roomId: 'x' })],
      ['deleteUserRoom', (s: UserService) => s.deleteUserRoom('x')],
      ['getSupporterProfile', (s: UserService) => s.getSupporterProfile()],
    ])('%s refuses to send a request', (_name, call) => {
      const service = create(undefined);
      expect(() => call(service)).toThrow('No user ID set');
    });
  });
});
