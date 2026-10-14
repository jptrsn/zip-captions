import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { PeerActions } from '../../../../actions/peer.actions';
import { UserRoom } from '../../../../reducers/user.reducer';
import { selectUserLoggedIn } from '../../../../selectors/auth.selectors';
import { selectMyBroadcastRooms } from '../../../../selectors/peer.selectors';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';
import { StartBroadcastComponent } from './start-broadcast.component';

const room = (roomId: string, extra: Partial<UserRoom> = {}): UserRoom => ({ roomId, createdAt: '2026-01-01', ...extra });

describe('StartBroadcastComponent', () => {
  let component: StartBroadcastComponent;
  let fixture: ComponentFixture<StartBroadcastComponent>;
  let store: MockStore;
  let dispatch: jest.SpyInstance;

  const create = (rooms: UserRoom[] | undefined = undefined, loggedIn = false) => {
    store.overrideSelector(selectMyBroadcastRooms, rooms as UserRoom[]);
    store.overrideSelector(selectUserLoggedIn, loggedIn);
    store.refreshState();
    fixture = TestBed.createComponent(StartBroadcastComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('acceptedPeerConnections', signal(true));
    fixture.componentRef.setInput('isMobileDevice', signal(false));
    fixture.componentRef.setInput('isIncompatibleBrowser', signal(false));
    fixture.componentRef.setInput('disabled', false);
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [...TestingModuleImports],
      declarations: [StartBroadcastComponent],
      providers: [...TestingModuleProviders],
    }).compileComponents();
    store = TestBed.inject(Store) as MockStore;
    dispatch = jest.spyOn(store, 'dispatch');
  });

  it('requires sign-in to join by default, and does not send a room id when none is chosen', () => {
    create();
    component.createRoom();
    expect(dispatch).toHaveBeenCalledWith(PeerActions.createBroadcastRoom({ myBroadcast: true, allowAnonymous: false }));
  });

  it('allows anonymous viewers when the sign-in requirement is switched off', () => {
    create();
    component.formGroup.controls['useAuthentication'].setValue(false);
    component.createRoom();
    expect(dispatch).toHaveBeenCalledWith(PeerActions.createBroadcastRoom({ myBroadcast: true, allowAnonymous: true }));
  });

  it('sends the chosen room id', () => {
    create();
    component.formGroup.controls['room'].setValue('AB-1234-5678');
    component.createRoom();
    expect(dispatch).toHaveBeenCalledWith(PeerActions.createBroadcastRoom({ myBroadcast: true, allowAnonymous: false, roomId: 'AB-1234-5678' }));
  });

  it('follows the saved room\'s anonymous setting, ignoring case, when a room is picked', () => {
    create([room('AB-1234-5678', { allowAnonymous: true }), room('CD-1234-5678', { allowAnonymous: false })]);
    component.formGroup.controls['room'].setValue('ab-1234-5678');
    expect(component.formGroup.controls['useAuthentication'].value).toBe(false);
    component.formGroup.controls['room'].setValue('cd-1234-5678');
    expect(component.formGroup.controls['useAuthentication'].value).toBe(true);
  });

  it('preselects the static room once the rooms are known', () => {
    create([room('AB-1234-5678'), room('ST-0000-0000', { isStatic: true })]);
    expect(component.formGroup.controls['room'].value).toBe('ST-0000-0000');
  });

  it('asks for the user\'s rooms when already signed in', () => {
    create(undefined, true);
    expect(dispatch).toHaveBeenCalledWith(PeerActions.getBroadcastRooms());
  });

  it('does not ask for rooms when signed out', () => {
    create(undefined, false);
    expect(dispatch).not.toHaveBeenCalledWith(PeerActions.getBroadcastRooms());
  });

  it('disables the form while the parent is disabled and enables it again', () => {
    create();
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(component.formGroup.disabled).toBe(true);
    fixture.componentRef.setInput('disabled', false);
    fixture.detectChanges();
    expect(component.formGroup.enabled).toBe(true);
  });

  it('explains the broadcast on a compatible desktop browser, without a warning', () => {
    create();
    expect(fixture.nativeElement.querySelector('.text-warning')).toBeFalsy();
    expect(fixture.nativeElement.querySelector('.text-xl')).toBeTruthy();
  });

  it.each([
    ['a mobile device', 'isMobileDevice'],
    ['an incompatible browser', 'isIncompatibleBrowser'],
  ])('shows a single warning instead of the explanation on %s', (_name, input) => {
    create();
    fixture.componentRef.setInput(input, signal(true));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.text-warning').length).toBe(1);
    expect(fixture.nativeElement.querySelector('.text-xl')).toBeFalsy();
  });

  it('shows no warning before the browser has accepted peer connections', () => {
    create();
    fixture.componentRef.setInput('isIncompatibleBrowser', signal(true));
    fixture.componentRef.setInput('acceptedPeerConnections', signal(false));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.text-warning')).toBeFalsy();
  });
});
