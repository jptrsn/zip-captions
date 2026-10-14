import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, firstValueFrom } from 'rxjs';
import { selectUserLoggedIn } from '../../../selectors/auth.selectors';
import { StorageService } from '../../../services/storage.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  const endpoint = 'http://localhost:3000/v1/user';
  let http: HttpTestingController;
  let storage: { get: jest.Mock; remove: jest.Mock };
  let navigate: jest.SpyInstance;

  const create = (loggedIn: boolean): AuthService => {
    storage = { get: jest.fn(), remove: jest.fn() };
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [provideMockStore(), { provide: StorageService, useValue: storage }],
    });
    const store = TestBed.inject(Store) as MockStore;
    store.overrideSelector(selectUserLoggedIn, loggedIn);
    store.refreshState();
    http = TestBed.inject(HttpTestingController);
    navigate = jest.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    return TestBed.inject(AuthService);
  };

  afterEach(() => http.verify());

  describe('userIsAuthenticated', () => {
    it('lets a logged-in user through without a request', () => {
      expect(create(true).userIsAuthenticated()).toBe(true);
    });

    it('sends a logged-out user with no token to the login page, without a request', async () => {
      const service = create(false);
      storage.get.mockReturnValue(null);
      await expect(firstValueFrom(service.userIsAuthenticated() as Observable<boolean>)).resolves.toBe(false);
      expect(navigate).toHaveBeenCalledWith(['auth', 'login']);
    });

    it('lets a user with a token the server accepts through', async () => {
      const service = create(false);
      storage.get.mockReturnValue('jwt');
      const result = firstValueFrom(service.userIsAuthenticated() as Observable<boolean>);
      http.expectOne(`${endpoint}/validate`).flush({ id: 'u1' });
      await expect(result).resolves.toBe(true);
      expect(navigate).not.toHaveBeenCalled();
    });

    it.each([
      ['rejects it', (req: ReturnType<HttpTestingController['expectOne']>) => req.flush('no', { status: 401, statusText: 'Unauthorized' })],
      ['accepts it but knows no user', (req: ReturnType<HttpTestingController['expectOne']>) => req.flush({ id: null })],
    ])('sends a user whose token the server %s to the login page', async (_name, respond) => {
      const service = create(false);
      storage.get.mockReturnValue('jwt');
      const result = firstValueFrom(service.userIsAuthenticated() as Observable<boolean>);
      respond(http.expectOne(`${endpoint}/validate`));
      await expect(result).resolves.toBe(false);
      expect(navigate).toHaveBeenCalledWith(['auth', 'login']);
    });
  });

  describe('userIsLoggedOut', () => {
    it('sends a logged-in user to their account page', () => {
      expect(create(true).userIsLoggedOut()).toBe(false);
      expect(navigate).toHaveBeenCalledWith(['user']);
    });

    it('lets a logged-out user through', () => {
      expect(create(false).userIsLoggedOut()).toBe(true);
      expect(navigate).not.toHaveBeenCalled();
    });
  });

  describe('logout', () => {
    it('posts the logout and removes the stored token', async () => {
      const service = create(true);
      const result = firstValueFrom(service.logout());
      const req = http.expectOne(`${endpoint}/logout`);
      expect(req.request.method).toBe('POST');
      req.flush('ok');
      await result;
      expect(storage.remove).toHaveBeenCalledWith('token');
    });

    it('removes the stored token even when the server cannot be reached', async () => {
      const service = create(true);
      const result = firstValueFrom(service.logout());
      http.expectOne(`${endpoint}/logout`).error(new ProgressEvent('error'));
      await result;
      expect(storage.remove).toHaveBeenCalledWith('token');
    });
  });

  it('gives the login URL of each provider', () => {
    const service = create(false);
    expect(service.getGoogleLoginUrl()).toBe(`${endpoint}/google-login`);
    expect(service.getAzureLoginUrl()).toBe(`${endpoint}/azure-login`);
    expect(service.getPatreonLoginUrl()).toBe(`${endpoint}/patreon-login`);
  });
});
