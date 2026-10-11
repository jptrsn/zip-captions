import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateService } from '@ngx-translate/core';
import { Action } from '@ngrx/store';
import { ReplaySubject, of } from 'rxjs';
import { SettingsActions } from '../modules/settings/models/settings.model';
import { defaultAppState } from '../reducers/app.reducer';
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
    store.setState({ ...defaultAppState, settings: { ...defaultAppState.settings, lang: 'en', dialect: 'en-GB' } });
    actions$.next(SettingsActions.swapTranslationLanguages());
    effects.swapTranslationLanguages$.subscribe(() => {
      expect(storage.update).toHaveBeenCalledWith('settings', 'lang', 'en');
      expect(storage.update).toHaveBeenCalledWith('settings', 'dialect', 'en-GB');
      done();
    });
  });
});
