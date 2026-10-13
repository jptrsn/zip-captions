import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateService } from '@ngx-translate/core';
import { Action } from '@ngrx/store';
import { ReplaySubject, of } from 'rxjs';
import { SettingsActions } from '../modules/settings/models/settings.model';
import { defaultAppState } from '../reducers/app.reducer';
import { settingsReducers } from '../reducers/settings.reducer';
import { selectUiLanguage } from '../selectors/settings.selector';
import { StorageService } from '../services/storage.service';
import { SettingsEffects } from './settings.effects';

describe('SettingsEffects', () => {
  let actions$: ReplaySubject<Action>;
  let effects: SettingsEffects;
  let store: MockStore;
  let translate: { use: jest.Mock };
  let storage: { update: jest.Mock; get: jest.Mock; set: jest.Mock };

  beforeEach(() => {
    actions$ = new ReplaySubject<Action>(1);
    translate = { use: jest.fn((lang: string) => of(lang)) };
    storage = { update: jest.fn(), get: jest.fn(), set: jest.fn() };
    TestBed.configureTestingModule({
      providers: [
        SettingsEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState: defaultAppState }),
        { provide: TranslateService, useValue: translate },
        { provide: StorageService, useValue: storage },
      ]
    });
    effects = TestBed.inject(SettingsEffects);
    store = TestBed.inject(MockStore);
  });

  it('keeps a separately chosen interface language when the spoken language changes', (done) => {
    store.overrideSelector(selectUiLanguage, 'de');
    actions$.next(SettingsActions.setLanguage({ language: 'fr' }));
    effects.applyLanguage$.subscribe(() => {
      expect(storage.update).toHaveBeenCalledWith('settings', 'lang', 'fr');
      expect(translate.use).toHaveBeenCalledWith('de');
      done();
    });
  });

  it('applies and persists the interface language preference', (done) => {
    store.overrideSelector(selectUiLanguage, 'uk');
    actions$.next(SettingsActions.setUiLanguage({ uiLanguage: 'uk' }));
    effects.applyUiLanguage$.subscribe(() => {
      expect(storage.update).toHaveBeenCalledWith('settings', 'uiLanguage', 'uk');
      expect(translate.use).toHaveBeenCalledWith('uk');
      done();
    });
  });

  it('persists the swapped spoken language and dialect', (done) => {
    // MockStore doesn't run reducers, so build the post-swap state with the real one: French (Canada) swapped
    // with English comes back as English with the dialect last used for English
    const before = {
      ...defaultAppState.settings,
      lang: 'fr' as const,
      dialect: 'fr-CA' as const,
      translation: { ...defaultAppState.settings.translation, targetLanguage: 'en', dialectByLanguage: { en: 'en-GB' as const } }
    };
    const after = settingsReducers(before, SettingsActions.swapTranslationLanguages());
    expect(after.lang).toBe('en');
    expect(after.dialect).toBe('en-GB');
    store.setState({ ...defaultAppState, settings: after });
    actions$.next(SettingsActions.swapTranslationLanguages());
    effects.swapTranslationLanguages$.subscribe(() => {
      expect(storage.update).toHaveBeenCalledWith('settings', 'lang', 'en');
      expect(storage.update).toHaveBeenCalledWith('settings', 'dialect', 'en-GB');
      done();
    });
  });
});
