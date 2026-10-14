import { UserActions } from '../actions/user.actions';
import { SettingsState } from '../modules/settings/models/settings.model';
import { defaultSettingsState } from './settings.reducer';
import { defaultUserState, SupporterProfile, UserProfile, UserRoom, UserState, userReducer } from './user.reducer';

const profile = { id: 'u1', primaryEmail: 'me@example.com', syncUiSettings: false, creditBalance: 10 } as unknown as UserProfile;
const room: UserRoom = { roomId: 'AB-1234-5678', createdAt: '2026-01-01' };
const signedIn: UserState = { id: 'u1', profile, rooms: [room], error: 'old error' };

describe('userReducer', () => {
  it('returns the previous state for an unknown action', () => {
    expect(userReducer(defaultUserState, { type: 'unknown' } as never)).toBe(defaultUserState);
  });

  describe('profile', () => {
    it('remembers the user id when the profile is requested or the id is set', () => {
      expect(userReducer(defaultUserState, UserActions.getProfile({ id: 'u1' })).id).toBe('u1');
      expect(userReducer(defaultUserState, UserActions.setUserID({ id: 'u2' })).id).toBe('u2');
    });

    it('stores the loaded profile', () => {
      expect(userReducer(defaultUserState, UserActions.getProfileSuccess({ profile })).profile).toBe(profile);
    });

    it('drops the profile and keeps the error when loading fails', () => {
      expect(userReducer(signedIn, UserActions.getProfileFailure({ error: 'boom' }))).toMatchObject({ profile: undefined, error: 'boom', id: 'u1' });
    });

    it('clears the profile', () => {
      expect(userReducer(signedIn, UserActions.clearProfile()).profile).toBeUndefined();
    });

    it('drops the profile once the account is deleted', () => {
      expect(userReducer(signedIn, UserActions.deleteAccountSuccess()).profile).toBeUndefined();
    });

    it('updates only the credit balance of the profile', () => {
      const next = userReducer(signedIn, UserActions.updateBalance({ creditBalance: 99 }));
      expect(next.profile).toEqual({ ...profile, creditBalance: 99 });
    });

    it('ignores a balance update when there is no profile', () => {
      expect(userReducer(defaultUserState, UserActions.updateBalance({ creditBalance: 99 })).profile).toBeUndefined();
    });

    it('records the saved sync preference on the profile', () => {
      expect(userReducer(signedIn, UserActions.saveSyncPropertySuccess({ sync: true })).profile?.syncUiSettings).toBe(true);
      expect(userReducer(defaultUserState, UserActions.saveSyncPropertySuccess({ sync: true })).profile).toBeUndefined();
    });
  });

  describe('saved settings', () => {
    const settings: SettingsState = { ...defaultSettingsState, lang: 'fr' };

    it('keeps the settings the server returns, after a load or a save', () => {
      expect(userReducer(defaultUserState, UserActions.getSettingsSuccess({ settings })).uiSettings).toBe(settings);
      expect(userReducer(defaultUserState, UserActions.saveSettingsStateSuccess({ settings })).uiSettings).toBe(settings);
    });

    it('records the error when loading or saving fails', () => {
      expect(userReducer(signedIn, UserActions.getSettingsFailure({ error: 'x' })).error).toBe('x');
      expect(userReducer(signedIn, UserActions.saveSettingsStateFailure({ error: 'y' })).error).toBe('y');
    });
  });

  describe('rooms', () => {
    it('stores the loaded rooms', () => {
      expect(userReducer(defaultUserState, UserActions.getRoomsSuccess({ rooms: [room] })).rooms).toEqual([room]);
    });

    it('empties the rooms and records the error when loading fails', () => {
      expect(userReducer(signedIn, UserActions.getRoomsFailure({ error: 'x' }))).toMatchObject({ rooms: [], error: 'x' });
    });
  });

  describe('supporter profile', () => {
    const supporter = { id: 's1', email: 'me@example.com', status: 'active_patron' } as SupporterProfile;

    it('stores the supporter profile, and clears it when the server has none', () => {
      expect(userReducer(defaultUserState, UserActions.getSupporterProfileSuccess({ profile: supporter })).supporter).toBe(supporter);
      expect(userReducer({ supporter }, UserActions.getSupporterProfileSuccess({ profile: null })).supporter).toBeUndefined();
    });
  });
});
