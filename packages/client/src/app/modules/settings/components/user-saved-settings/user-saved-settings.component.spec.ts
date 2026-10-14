import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { TestingModuleImports, TestingModuleProviders } from '../../../../../testing/test-scaffold';
import { UserActions } from '../../../../actions/user.actions';
import { defaultSettingsState } from '../../../../reducers/settings.reducer';
import { selectUserLoggedIn } from '../../../../selectors/auth.selectors';
import { selectSyncSettings } from '../../../../selectors/settings.selector';
import { selectUserId, selectUserSavedSettings, selectUserSettingsSync } from '../../../../selectors/user.selector';
import { SettingsActions, SettingsState } from '../../models/settings.model';
import { UserSavedSettingsComponent } from './user-saved-settings.component';

// What "Save current" posts: the settings without the device-specific translation keys
const current = (changes: Partial<SettingsState> = {}): SettingsState => ({
  ...defaultSettingsState,
  translation: { enabled: false, mode: 'off', targetLanguage: 'es', splitOrientation: 'vertical', paneOrder: 'original-first' },
  ...changes,
});

interface Scenario {
  loggedIn?: boolean;
  userId?: string;
  saved?: unknown;
  current?: SettingsState;
  sync?: boolean;
}

describe('UserSavedSettingsComponent', () => {
  let component: UserSavedSettingsComponent;
  let fixture: ComponentFixture<UserSavedSettingsComponent>;
  let store: MockStore;
  let dispatch: jest.SpyInstance;

  const create = (s: Scenario = {}) => {
    store.overrideSelector(selectUserLoggedIn, s.loggedIn ?? true);
    store.overrideSelector(selectUserId, s.userId as string);
    store.overrideSelector(selectUserSavedSettings, s.saved as SettingsState);
    store.overrideSelector(selectSyncSettings, (s.current ?? current()) as never);
    store.overrideSelector(selectUserSettingsSync, s.sync ?? false);
    store.refreshState();
    fixture = TestBed.createComponent(UserSavedSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };
  const byId = (id: string) => fixture.nativeElement.querySelector(`[data-testid="${id}"]`) as HTMLInputElement | HTMLButtonElement | null;
  const saveButton = () => byId('zc-sync-save-current') as HTMLButtonElement;
  const applyButton = () => byId('zc-sync-apply-saved') as HTMLButtonElement | null;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [...TestingModuleImports],
      providers: [...TestingModuleProviders],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [UserSavedSettingsComponent],
    }).compileComponents();
    store = TestBed.inject(Store) as MockStore;
    dispatch = jest.spyOn(store, 'dispatch');
  });

  describe('loading', () => {
    it('asks the server for the saved settings once the user is known', () => {
      create({ userId: 'u1' });
      expect(dispatch).toHaveBeenCalledWith(UserActions.getSettings());
    });

    it('does not ask before there is a user id', () => {
      create({ userId: undefined });
      expect(dispatch).not.toHaveBeenCalledWith(UserActions.getSettings());
    });
  });

  describe('in sync', () => {
    it('is in sync when the saved copy equals the current settings', () => {
      create({ saved: current() });
      expect(component.settingsMatch()).toBe(true);
      expect(saveButton().disabled).toBe(true);
      expect(applyButton()?.disabled).toBe(true);
      expect(byId('zc-sync-apply-globally')).toBeTruthy();
    });

    it('is in sync for an account saved before translation and transcription were stored, while they are at their defaults', () => {
      const { transcription, translation, ...old } = current();
      create({ saved: old });
      expect(component.settingsMatch()).toBe(true);
    });

    it('is out of sync for that account once the user has changed those settings, so they can save', () => {
      const { transcription, translation, ...old } = current();
      create({ saved: old, current: current({ translation: { enabled: true, mode: 'split', targetLanguage: 'fr' } }) });
      expect(component.settingsMatch()).toBe(false);
      expect(saveButton().disabled).toBe(false);
    });

    it('ignores the device-specific Picture-in-Picture and OBS settings in a saved copy', () => {
      const saved = { ...current(), translation: { ...current().translation, pipContent: 'split', obsFeed: 'translated' } };
      create({ saved });
      expect(component.settingsMatch()).toBe(true);
    });

    it('is out of sync when a setting differs', () => {
      create({ saved: current({ lang: 'fr' }), current: current({ lang: 'en' }) });
      expect(component.settingsMatch()).toBe(false);
      expect(byId('zc-sync-view-toggle')).toBeTruthy();
    });

    it('is not in sync when nothing is saved', () => {
      create({ saved: undefined });
      expect(component.settingsMatch()).toBe(false);
      expect(applyButton()).toBeNull();
    });
  });

  describe('saving', () => {
    it('saves the current settings', () => {
      create({ saved: undefined });
      dispatch.mockClear();
      saveButton().click();
      expect(dispatch).toHaveBeenCalledWith(UserActions.saveSettingsState({ settings: current() }));
    });

    it('cannot save when signed out, and says why', () => {
      create({ loggedIn: false, saved: undefined });
      expect(saveButton().disabled).toBe(true);
      expect(byId('zc-sync-login-required')).toBeTruthy();
    });

    it('cannot save while looking at the saved copy', () => {
      create({ saved: current({ lang: 'fr' }), current: current({ lang: 'en' }) });
      expect(saveButton().disabled).toBe(false);
      component.toggleView();
      fixture.detectChanges();
      expect(saveButton().disabled).toBe(true);
    });
  });

  describe('applying', () => {
    it('applies the saved settings', () => {
      const saved = current({ lang: 'fr' });
      create({ saved, current: current({ lang: 'en' }) });
      component.applySaved();
      expect(dispatch).toHaveBeenCalledWith(SettingsActions.applySettings({ settings: saved }));
    });

    it('reports an error instead of applying when nothing is loaded', () => {
      create({ saved: undefined });
      component.applySaved();
      expect(dispatch).toHaveBeenCalledWith(UserActions.getSettingsFailure({ error: 'No saved settings loaded into memory' }));
      expect(dispatch).not.toHaveBeenCalledWith(expect.objectContaining({ type: SettingsActions.applySettings.type }));
    });

    it('offers Apply only when looking at the saved copy of settings that differ', () => {
      create({ saved: current({ lang: 'fr' }), current: current({ lang: 'en' }) });
      expect(applyButton()?.disabled).toBe(true);
      component.toggleView();
      fixture.detectChanges();
      expect(component.viewingSaved).toBe(true);
      expect(applyButton()?.disabled).toBe(false);
    });
  });

  describe('apply everywhere', () => {
    it('shows the stored preference', () => {
      create({ saved: current(), sync: true });
      expect((byId('zc-sync-apply-globally') as HTMLInputElement).checked).toBe(true);
    });

    it('saves the preference when the user changes it, and not when it is only loaded', () => {
      create({ saved: current(), sync: false });
      expect(dispatch).not.toHaveBeenCalledWith(expect.objectContaining({ type: UserActions.saveSyncProperty.type }));
      component.syncControl.setValue(true);
      expect(dispatch).toHaveBeenCalledWith(UserActions.saveSyncProperty({ sync: true }));
    });
  });
});
