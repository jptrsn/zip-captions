import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';
import { AuthActions } from '../../../../actions/auth.actions';
import { selectAuthLoading, selectUserLoggedIn } from '../../../../selectors/auth.selectors';
import { StorageService } from '../../../../services/storage.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let store: MockStore;
  let dispatch: jest.SpyInstance;
  let navigate: jest.SpyInstance;
  let storage: { set: jest.Mock };
  const route = { snapshot: { queryParams: {} as Record<string, string> } };

  const create = (opts: { loggedIn?: boolean; loading?: boolean; query?: Record<string, string> } = {}) => {
    route.snapshot.queryParams = opts.query ?? {};
    store.overrideSelector(selectUserLoggedIn, opts.loggedIn ?? false);
    store.overrideSelector(selectAuthLoading, opts.loading ?? false);
    store.refreshState();
    navigate = jest.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
  };

  beforeEach(async () => {
    storage = { set: jest.fn() };
    await TestBed.configureTestingModule({
      imports: [...TestingModuleImports],
      providers: [
        ...TestingModuleProviders,
        { provide: StorageService, useValue: storage },
        { provide: ActivatedRoute, useValue: route },
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LoginComponent],
    }).compileComponents();
    store = TestBed.inject(Store) as MockStore;
    dispatch = jest.spyOn(store, 'dispatch');
  });

  it('offers both sign-in providers to a visitor who is not signed in', () => {
    create();
    expect(fixture.nativeElement.querySelector('app-google-oauth-login')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-microsoft-login')).toBeTruthy();
    expect(navigate).not.toHaveBeenCalled();
  });

  it('sends a user who is already signed in to the home page', () => {
    create({ loggedIn: true });
    expect(navigate).toHaveBeenCalledWith(['/']);
  });

  it('shows a spinner while signing in, and not otherwise', () => {
    create({ loading: true });
    expect(fixture.nativeElement.querySelector('.loading-spinner')).toBeTruthy();
    fixture.destroy();
    create({ loading: false });
    expect(fixture.nativeElement.querySelector('.loading-spinner')).toBeNull();
  });

  describe('coming back from a provider with an id_token in the address', () => {
    it('stores the token and signs in', () => {
      create({ query: { id_token: 'jwt-123' } });
      expect(storage.set).toHaveBeenCalledWith('token', 'jwt-123');
      expect(dispatch).toHaveBeenCalledWith(AuthActions.login());
    });

    it('removes the token from the address, keeping the other parameters', () => {
      create({ query: { id_token: 'jwt-123' } });
      expect(navigate).toHaveBeenCalledWith([], expect.objectContaining({ queryParams: { id_token: null }, queryParamsHandling: 'merge' }));
    });

    it('prefers the token when the address also has an error', () => {
      create({ query: { id_token: 'jwt-123', error: 'denied' } });
      expect(dispatch).toHaveBeenCalledWith(AuthActions.login());
      expect(dispatch).not.toHaveBeenCalledWith(expect.objectContaining({ type: AuthActions.loginFailure.type }));
    });
  });

  describe('coming back from a provider with an error in the address', () => {
    it('reports the decoded error and does not store a token', () => {
      create({ query: { error: 'access%20denied' } });
      expect(dispatch).toHaveBeenCalledWith(AuthActions.loginFailure({ error: 'access denied' }));
      expect(storage.set).not.toHaveBeenCalled();
    });

    it('removes the error from the address', () => {
      create({ query: { error: 'denied' } });
      expect(navigate).toHaveBeenCalledWith([], expect.objectContaining({ queryParams: { error: null }, queryParamsHandling: 'merge' }));
    });
  });

  it('does nothing about sign-in when the address has neither', () => {
    create({ query: {} });
    expect(dispatch).not.toHaveBeenCalled();
    expect(storage.set).not.toHaveBeenCalled();
  });
});
