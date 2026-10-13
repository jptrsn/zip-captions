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

  describe('split layout', () => {
    it('defaults to stacked panes, original first, and translated-only Picture-in-Picture', () => {
      expect(defaultSettingsState.translation.splitOrientation).toBe('vertical');
      expect(defaultSettingsState.translation.paneOrder).toBe('original-first');
      expect(defaultSettingsState.translation.pipContent).toBe('translated');
    });

    it('sets the split orientation', () => {
      const state = settingsReducers(defaultSettingsState, SettingsActions.setSplitOrientation({ orientation: 'horizontal' }));
      expect(state.translation.splitOrientation).toBe('horizontal');
      expect(settingsReducers(state, SettingsActions.setSplitOrientation({ orientation: 'vertical' })).translation.splitOrientation).toBe('vertical');
    });

    it('swaps the panes back and forth without touching any language', () => {
      let state = settingsReducers(defaultSettingsState, SettingsActions.setLanguage({ language: 'fr' }));
      state = settingsReducers(state, SettingsActions.setDialect({ dialect: 'fr-CA' }));
      state = settingsReducers(state, SettingsActions.setTranslationTargetLanguage({ targetLanguage: 'en' }));

      const swapped = settingsReducers(state, SettingsActions.swapCaptionPanes());
      expect(swapped.translation.paneOrder).toBe('translated-first');
      expect(swapped.lang).toBe(state.lang);
      expect(swapped.dialect).toBe(state.dialect);
      expect(swapped.translation.targetLanguage).toBe(state.translation.targetLanguage);
      expect(swapped.translation.dialectByLanguage).toEqual(state.translation.dialectByLanguage);

      expect(settingsReducers(swapped, SettingsActions.swapCaptionPanes()).translation.paneOrder).toBe('original-first');
    });

    it('treats settings stored before the pane order existed as original first', () => {
      const legacy = { ...defaultSettingsState, translation: { enabled: true, mode: 'split' as const, targetLanguage: 'es' } };
      expect(settingsReducers(legacy, SettingsActions.swapCaptionPanes()).translation.paneOrder).toBe('translated-first');
    });

    it('keeps the pane order when the languages are swapped', () => {
      let state = settingsReducers(defaultSettingsState, SettingsActions.setTranslationTargetLanguage({ targetLanguage: 'fr' }));
      state = settingsReducers(state, SettingsActions.swapCaptionPanes());
      state = settingsReducers(state, SettingsActions.swapTranslationLanguages());
      expect(state.translation.paneOrder).toBe('translated-first');
    });

    it('sets the Picture-in-Picture content', () => {
      (['original', 'split', 'translated'] as const).forEach((content) => {
        expect(settingsReducers(defaultSettingsState, SettingsActions.setPipContent({ content })).translation.pipContent).toBe(content);
      });
    });

    it('sets the OBS feed', () => {
      (['translated', 'original'] as const).forEach((feed) => {
        expect(settingsReducers(defaultSettingsState, SettingsActions.setObsFeed({ feed })).translation.obsFeed).toBe(feed);
      });
    });

    it('saves the layout fields through saveTranslationSettings', () => {
      const state = settingsReducers(defaultSettingsState, SettingsActions.saveTranslationSettings({
        translation: { splitOrientation: 'horizontal', pipContent: 'split' }
      }));
      expect(state.translation.splitOrientation).toBe('horizontal');
      expect(state.translation.pipContent).toBe('split');
      expect(state.translation.targetLanguage).toBe('es');
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
