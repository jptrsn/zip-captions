import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateService } from '@ngx-translate/core';
import { Observable, firstValueFrom, of } from 'rxjs';
import { SettingsActions, SettingsState } from '../modules/settings/models/settings.model';
import { defaultSettingsState } from '../reducers/settings.reducer';
import { StorageService } from '../services/storage.service';
import { SettingsEffects } from './settings.effects';

describe('SettingsEffects translation layout persistence', () => {
  let actions$: Observable<any>;
  let storage: { get: jest.Mock; set: jest.Mock; update: jest.Mock };
  let effects: SettingsEffects;

  const translation = { ...defaultSettingsState.translation, enabled: true, mode: 'split' as const, splitOrientation: 'horizontal' as const, paneOrder: 'translated-first' as const, pipContent: 'split' as const };

  const setup = (stored: Partial<SettingsState> | null = null) => {
    storage = { get: jest.fn().mockReturnValue(stored), set: jest.fn(), update: jest.fn() };
    TestBed.configureTestingModule({
      providers: [
        SettingsEffects,
        provideMockActions(() => actions$),
        provideMockStore({ initialState: { settings: { ...defaultSettingsState, translation } } }),
        { provide: StorageService, useValue: storage },
        { provide: TranslateService, useValue: { use: jest.fn().mockReturnValue(of({})) } },
      ],
    });
    effects = TestBed.inject(SettingsEffects);
  };

  it.each([
    ['setSplitOrientation', SettingsActions.setSplitOrientation({ orientation: 'horizontal' })],
    ['swapCaptionPanes', SettingsActions.swapCaptionPanes()],
    ['setPipContent', SettingsActions.setPipContent({ content: 'split' })],
  ])('persists the whole translation object after %s', async (_name, action) => {
    setup();
    actions$ = of(action);
    await firstValueFrom(effects.saveTranslationSettings$);
    expect(storage.update).toHaveBeenCalledWith('settings', 'translation', translation);
  });

  it('fills the layout defaults for translation settings stored before they existed', async () => {
    setup({ translation: { enabled: true, mode: 'split', targetLanguage: 'fr' } } as Partial<SettingsState>);
    actions$ = of(SettingsActions.initSettings());
    const result: any = await firstValueFrom(effects.init$);
    expect(result.settings.translation).toMatchObject({
      enabled: true,
      targetLanguage: 'fr',
      splitOrientation: 'vertical',
      paneOrder: 'original-first',
      pipContent: 'translated',
    });
  });

  it('keeps stored layout settings', async () => {
    setup({ translation } as Partial<SettingsState>);
    actions$ = of(SettingsActions.initSettings());
    const result: any = await firstValueFrom(effects.init$);
    expect(result.settings.translation).toMatchObject({ splitOrientation: 'horizontal', paneOrder: 'translated-first', pipContent: 'split' });
  });
});
