import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';
import { AuthActions } from '../../../../actions/auth.actions';
import { selectUserLoggedIn } from '../../../../selectors/auth.selectors';
import { UserHomeComponent } from './user-home.component';

describe('UserHomeComponent', () => {
  let component: UserHomeComponent;
  let fixture: ComponentFixture<UserHomeComponent>;
  let dispatch: jest.SpyInstance;
  let navigate: jest.SpyInstance;
  const route = { snapshot: { queryParams: {} as Record<string, string> } };

  // loggedIn is undefined until the sign-in has been checked
  const create = (loggedIn: boolean | undefined, tabIndex?: string) => {
    route.snapshot.queryParams = tabIndex === undefined ? {} : { tabIndex };
    const store = TestBed.inject(Store) as MockStore;
    store.overrideSelector(selectUserLoggedIn, loggedIn as boolean);
    store.refreshState();
    dispatch = jest.spyOn(store, 'dispatch');
    navigate = jest.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    fixture = TestBed.createComponent(UserHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };
  const actions = () => fixture.nativeElement.querySelector('.btn-primary');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [...TestingModuleImports],
      providers: [...TestingModuleProviders, { provide: ActivatedRoute, useValue: route }],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [UserHomeComponent],
    }).compileComponents();
  });

  it('shows the profile, and no sign-in prompt, to a signed-in user', () => {
    create(true);
    expect(fixture.nativeElement.querySelector('app-user-profile')).toBeTruthy();
    expect(actions()).toBeNull();
    expect(dispatch).not.toHaveBeenCalled();
    expect(navigate).not.toHaveBeenCalled();
  });

  it('sends a user who is known to be signed out to the login page, and offers the links', () => {
    create(false);
    expect(navigate).toHaveBeenCalledWith(['..', 'auth', 'login']);
    expect(actions()).toBeTruthy();
  });

  it('asks the server whether the user is signed in when that is not known yet, without redirecting', () => {
    create(undefined);
    expect(dispatch).toHaveBeenCalledWith(AuthActions.validate());
    expect(navigate).not.toHaveBeenCalled();
  });

  it('does not ask again for a user who is already signed in', () => {
    create(true);
    expect(dispatch).not.toHaveBeenCalledWith(AuthActions.validate());
  });

  describe('tabs', () => {
    it('opens the first tab by default', () => {
      create(true);
      expect(component.tabNames).toEqual(['account', 'provider']);
      expect(component.tabIndex()).toBe(0);
    });

    it('opens the tab from the tabIndex query parameter, wrapping one past the end', () => {
      create(true, '1');
      expect(component.tabIndex()).toBe(1);
      fixture.destroy();
      create(true, '3');
      expect(component.tabIndex()).toBe(1);
    });

    it('falls back to the first tab for a tabIndex that is not a number', () => {
      create(true, 'abc');
      expect(component.tabIndex()).toBe(0);
    });

    it('puts the chosen tab in the address', () => {
      create(true);
      component.tabsControl.setValue(1);
      expect(navigate).toHaveBeenCalledWith([], expect.objectContaining({ queryParams: { tabIndex: 1 }, queryParamsHandling: 'merge' }));
    });
  });
});
