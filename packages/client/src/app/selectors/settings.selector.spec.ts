import { defaultAppState } from '../reducers/app.reducer';
import { AppState } from '../models/app.model';
import { TranslationSettings, UiLanguagePreference } from '../modules/settings/models/settings.model';
import { selectObsFeed, selectPaneOrder, selectPipContent, selectSplitOrientation, selectUiLanguage, selectUiLanguagePreference } from './settings.selector';

describe('settings selectors', () => {
  const withLanguages = (lang: AppState['settings']['lang'], uiLanguage?: UiLanguagePreference): AppState => ({
    ...defaultAppState,
    settings: { ...defaultAppState.settings, lang, uiLanguage: uiLanguage as UiLanguagePreference }
  });

  it('shows the interface in the spoken language by default', () => {
    expect(selectUiLanguage(withLanguages('fr', 'spoken'))).toBe('fr');
  });

  it('uses a separately chosen interface language', () => {
    expect(selectUiLanguage(withLanguages('fr', 'en'))).toBe('en');
  });

  it('follows the spoken language for settings saved before the preference existed', () => {
    expect(selectUiLanguage(withLanguages('es'))).toBe('es');
    expect(selectUiLanguagePreference(withLanguages('es'))).toBe('spoken');
  });

  describe('split layout', () => {
    const withTranslation = (translation: Partial<TranslationSettings>): AppState => ({
      ...defaultAppState,
      settings: { ...defaultAppState.settings, translation: { enabled: true, mode: 'split', targetLanguage: 'fr', ...translation } }
    });

    it('falls back to the defaults for settings stored before the layout fields existed', () => {
      const state = withTranslation({});
      expect(selectSplitOrientation(state)).toBe('vertical');
      expect(selectPaneOrder(state)).toBe('original-first');
      expect(selectPipContent(state)).toBe('translated');
      expect(selectObsFeed(state)).toBe('original');
    });

    it('returns the stored layout', () => {
      const state = withTranslation({ splitOrientation: 'horizontal', paneOrder: 'translated-first', pipContent: 'split' });
      expect(selectSplitOrientation(state)).toBe('horizontal');
      expect(selectPaneOrder(state)).toBe('translated-first');
      expect(selectPipContent(state)).toBe('split');
    });

    it('returns the stored OBS feed', () => {
      expect(selectObsFeed(withTranslation({ obsFeed: 'translated' }))).toBe('translated');
    });
  });
});
