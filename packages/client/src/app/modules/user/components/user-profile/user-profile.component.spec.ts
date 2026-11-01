import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { TimeagoModule } from 'ngx-timeago';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';
import { UserActions } from '../../../../actions/user.actions';
import { UserProfile } from '../../../../reducers/user.reducer';
import { selectUserLoggedIn } from '../../../../selectors/auth.selectors';
import { selectUserProfile, selectUserSupportProfile } from '../../../../selectors/user.selector';
import { UserProfileComponent } from './user-profile.component';

const user = { id: 'u1', createdAt: '2026-01-01T00:00:00Z', primaryEmail: 'me@example.com', googleConnected: true, azureConnected: false } as unknown as UserProfile;

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let store: MockStore;
  let dispatch: jest.SpyInstance;

  // MockStore treats an override of `undefined` as no override, so "no profile" is null
  const create = (profile: UserProfile | null = user) => {
    store.overrideSelector(selectUserProfile, profile as UserProfile);
    store.overrideSelector(selectUserSupportProfile, undefined);
    store.overrideSelector(selectUserLoggedIn, true);
    store.refreshState();
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [...TestingModuleProviders],
      imports: [...TestingModuleImports, TimeagoModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [UserProfileComponent],
    }).compileComponents();
    store = TestBed.inject(Store) as MockStore;
    dispatch = jest.spyOn(store, 'dispatch');
  });

  it('works out the join date from the profile', () => {
    create();
    expect(component.joined()).toEqual(new Date('2026-01-01T00:00:00Z'));
  });

  it('shows the delete button once the profile has loaded', () => {
    create();
    expect(fixture.nativeElement.querySelector('[data-testid="zc-account-delete"]')).toBeTruthy();
    fixture.destroy();
    create(null);
    expect(fixture.nativeElement.querySelector('[data-testid="zc-account-delete"]')).toBeFalsy();
  });

  it.each([['', 'required'], ['someone@else.com', 'invalid']])('refuses to delete when the typed email is "%s" (%s)', (email) => {
    create();
    component.formGroup.controls['email'].setValue(email);
    component.deleteAccount();
    expect(dispatch).not.toHaveBeenCalledWith(expect.objectContaining({ type: UserActions.deleteAccount.type }));
    expect(component.loading()).toBe(false);
  });

  it('deletes the account, with the chosen reason, when the typed email matches', () => {
    create();
    component.formGroup.controls['email'].setValue('me@example.com');
    component.formGroup.controls['reason'].setValue('privacy');
    component.deleteAccount();
    expect(dispatch).toHaveBeenCalledWith(UserActions.deleteAccount({ reason: 'privacy' }));
    expect(component.loading()).toBe(true);
  });

  it('reports the account as deleted once the user is signed out', () => {
    create();
    component.formGroup.controls['email'].setValue('me@example.com');
    component.deleteAccount();
    expect(component.accountDeleted()).toBe(false);
    store.overrideSelector(selectUserLoggedIn, false);
    store.refreshState();
    expect(component.accountDeleted()).toBe(true);
    expect(component.loading()).toBe(false);
  });
});
