import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';
import { UserActions } from '../../../../actions/user.actions';
import { UserRoom } from '../../../../reducers/user.reducer';
import { selectUserLoggedIn } from '../../../../selectors/auth.selectors';
import { selectUserId, selectUserRooms } from '../../../../selectors/user.selector';
import { BroadcastSettingsComponent } from './broadcast-settings.component';

const room = (roomId: string, isStatic = false): UserRoom => ({ roomId, isStatic, createdAt: '2026-01-01' });

describe('BroadcastSettingsComponent', () => {
  let component: BroadcastSettingsComponent;
  let fixture: ComponentFixture<BroadcastSettingsComponent>;
  let store: MockStore;
  let dispatch: jest.SpyInstance;

  const create = (opts: { loggedIn?: boolean; rooms?: UserRoom[]; userId?: string } = {}) => {
    store.overrideSelector(selectUserLoggedIn, opts.loggedIn ?? true);
    store.overrideSelector(selectUserRooms, opts.rooms);
    store.overrideSelector(selectUserId, opts.userId);
    store.refreshState();
    fixture = TestBed.createComponent(BroadcastSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [...TestingModuleProviders],
      imports: [...TestingModuleImports],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [BroadcastSettingsComponent],
    }).compileComponents();
    store = TestBed.inject(Store) as MockStore;
    dispatch = jest.spyOn(store, 'dispatch');
  });

  it('lists the user\'s rooms when already signed in', () => {
    create({ loggedIn: true });
    expect(dispatch).toHaveBeenCalledWith(UserActions.getRooms());
  });

  it('waits for the user id before listing rooms when not yet signed in', () => {
    create({ loggedIn: false, userId: undefined });
    expect(dispatch).not.toHaveBeenCalledWith(UserActions.getRooms());
    store.overrideSelector(selectUserId, 'u1');
    store.refreshState();
    expect(dispatch).toHaveBeenCalledWith(UserActions.getRooms());
  });

  it('splits the rooms into the static room and the others', () => {
    create({ rooms: [room('A', true), room('B'), room('C')] });
    expect(component.staticRooms()?.map((r) => r.roomId)).toEqual(['A']);
    expect(component.dynamicRooms()?.map((r) => r.roomId)).toEqual(['B', 'C']);
  });

  it('has no room groups when there are no rooms of that kind', () => {
    create({ rooms: [room('B')] });
    expect(component.staticRooms()).toBeUndefined();
    create({ rooms: [] });
    expect(component.dynamicRooms()).toBeUndefined();
  });

  it('lets the user add a static room only if they do not have one', () => {
    create({ rooms: [room('B')] });
    expect(component.canAddRooms()).toBe(true);
    fixture.destroy();
    create({ rooms: [room('A', true)] });
    expect(component.canAddRooms()).toBe(false);
  });

  it('refreshes the list when the new-room card closes, and when an edit asks for it', () => {
    create();
    dispatch.mockClear();
    component.openModal();
    expect(component.modalOpen()).toBe(true);
    component.hideModal();
    expect(component.modalOpen()).toBe(false);
    expect(dispatch).toHaveBeenCalledTimes(1);
    component.editClosed(false);
    expect(dispatch).toHaveBeenCalledTimes(1);
    component.editClosed(true);
    expect(dispatch).toHaveBeenCalledTimes(2);
  });
});
