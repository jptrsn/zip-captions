import { SettingsActions } from '../modules/settings/models/settings.model';
import { defaultSettingsState, settingsReducers } from './settings.reducer';

describe('Settings Reducer', () => {
  describe('saveTranscriptionSettingsFailure', () => {
    it('should clear the transcription loading flag and record the error', () => {
      const loadingState = settingsReducers(
        defaultSettingsState,
        SettingsActions.saveTranscriptionSettings({ transcription: { enabled: true } })
      );
      expect(loadingState.transcription.loading).toBe(true);

      const result = settingsReducers(
        loadingState,
        SettingsActions.saveTranscriptionSettingsFailure({ error: 'network down' })
      );

      expect(result.transcription.loading).toBe(false);
      expect(result.transcription.enabled).toBe(true);
      expect((result as any).error).toBe('network down');
    });
  });

  describe('swapTranslationLanguages', () => {
    const frenchCanada = () => {
      let state = settingsReducers(defaultSettingsState, SettingsActions.setLanguage({ language: 'fr' }));
      state = settingsReducers(state, SettingsActions.setDialect({ dialect: 'fr-CA' }));
      return settingsReducers(state, SettingsActions.setTranslationTargetLanguage({ targetLanguage: 'en' }));
    };

    it('swaps the spoken and translation languages', () => {
      const result = settingsReducers(frenchCanada(), SettingsActions.swapTranslationLanguages());
      expect(result.lang).toBe('en');
      expect(result.dialect).toBe('unspecified');
      expect(result.translation.targetLanguage).toBe('fr');
    });

    it('restores the remembered dialect when swapping back', () => {
      let state = settingsReducers(frenchCanada(), SettingsActions.swapTranslationLanguages());
      state = settingsReducers(state, SettingsActions.setDialect({ dialect: 'en-GB' }));
      state = settingsReducers(state, SettingsActions.swapTranslationLanguages());
      expect(state.lang).toBe('fr');
      expect(state.dialect).toBe('fr-CA');
      expect(state.translation.targetLanguage).toBe('en');

      state = settingsReducers(state, SettingsActions.swapTranslationLanguages());
      expect(state.dialect).toBe('en-GB');
    });

    it('does nothing when the translation language cannot be spoken', () => {
      const state = settingsReducers(frenchCanada(), SettingsActions.setTranslationTargetLanguage({ targetLanguage: 'ja' }));
      expect(settingsReducers(state, SettingsActions.swapTranslationLanguages())).toBe(state);
    });

    it('leaves the interface language preference untouched', () => {
      let state = settingsReducers(frenchCanada(), SettingsActions.setUiLanguage({ uiLanguage: 'de' }));
      state = settingsReducers(state, SettingsActions.swapTranslationLanguages());
      expect(state.uiLanguage).toBe('de');
    });
  });

  describe('setDialect', () => {
    it('remembers the dialect for its own language', () => {
      const state = settingsReducers(defaultSettingsState, SettingsActions.setDialect({ dialect: 'es-US' }));
      expect(state.translation.dialectByLanguage).toEqual({ es: 'es-US' });
    });
  });

  describe('setUiLanguage', () => {
    it('defaults to following the spoken language and can be set separately', () => {
      expect(defaultSettingsState.uiLanguage).toBe('spoken');
      expect(settingsReducers(defaultSettingsState, SettingsActions.setUiLanguage({ uiLanguage: 'uk' })).uiLanguage).toBe('uk');
    });
  });
});
