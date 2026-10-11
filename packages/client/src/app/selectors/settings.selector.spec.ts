import { defaultAppState } from '../reducers/app.reducer';
import { AppState } from '../models/app.model';
import { UiLanguagePreference } from '../modules/settings/models/settings.model';
import { selectUiLanguage, selectUiLanguagePreference } from './settings.selector';

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
});
