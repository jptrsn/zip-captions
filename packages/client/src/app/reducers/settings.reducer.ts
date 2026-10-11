import { createReducer, on } from "@ngrx/store";
import { AppTheme, FontFamily, InterfaceLanguage, LineHeight, RecognitionDialect, SettingsActions, SettingsState, TextFlow, TextSize, TranscriptionSettings, TranslationDisplayMode, TranslationSettings, UiLanguagePreference, swapLanguagePair } from "../modules/settings/models/settings.model";

export const defaultSettingsState: SettingsState = {
  theme: AppTheme.ZipDark,
  lang: 'en',
  uiLanguage: 'spoken',
	dialect: 'unspecified',
  wakelock: true,
  renderHistory: 15,
  textSize: 'textSize-3xl',
  lineHeight: 'lineHeight-normal',
  textFlow: 'bottom-up',
  fontFamily: FontFamily.sans,
  transcription: {
    enabled: false
  },
  translation: {
    enabled: false,
    mode: 'off',
    targetLanguage: 'es'
  }
}

const dialectLanguage = (dialect: RecognitionDialect): string => dialect.split('-')[0].toLowerCase();

export const settingsReducers = createReducer(
  defaultSettingsState,
  on(SettingsActions.setTheme, (state: SettingsState, action: { theme: AppTheme }) => ({...state, theme: action.theme })),
  on(SettingsActions.setLanguage, (state: SettingsState, action: { language: InterfaceLanguage}) => {
    const langCode = action.language.split('-')[0].toLowerCase();
    let target = state.translation.targetLanguage;
    if (target === langCode) {
      target = langCode === 'es' ? 'en' : 'es';
    }
    return {
      ...state,
      lang: action.language,
      dialect: state.lang === action.language ? state.dialect : 'unspecified',
      translation: {
        ...state.translation,
        targetLanguage: target
      }
    };
  }),
	on(SettingsActions.setDialect, (state: SettingsState, action: { dialect: RecognitionDialect }) => {
    const langCode = (action.dialect !== 'unspecified' ? action.dialect : state.lang).split('-')[0].toLowerCase();
    let target = state.translation.targetLanguage;
    if (target === langCode) {
      target = langCode === 'es' ? 'en' : 'es';
    }
    const dialectByLanguage = action.dialect !== 'unspecified'
      ? { ...state.translation.dialectByLanguage, [dialectLanguage(action.dialect)]: action.dialect }
      : state.translation.dialectByLanguage;
    return {
      ...state,
      dialect: action.dialect,
      translation: {
        ...state.translation,
        targetLanguage: target,
        dialectByLanguage
      }
    };
  }),
  on(SettingsActions.setUiLanguage, (state: SettingsState, action: { uiLanguage: UiLanguagePreference }) => ({...state, uiLanguage: action.uiLanguage })),
  on(SettingsActions.swapTranslationLanguages, (state: SettingsState) => {
    const swapped = swapLanguagePair({ ...state.translation, lang: state.lang, dialect: state.dialect });
    if (!swapped) {
      return state;
    }
    const { lang, dialect, ...translation } = swapped;
    return {
      ...state,
      lang,
      dialect,
      translation: { ...state.translation, ...translation }
    };
  }),
	on(SettingsActions.setDefaultDialect, (state: SettingsState, action: { dialect: RecognitionDialect }) => ({...state, dialect: (state.dialect === 'unspecified' ? action.dialect : state.dialect) })),
  on(SettingsActions.initSettingsComplete, (state: SettingsState, action: { settings: SettingsState}) => ({...state, ...action.settings })),
  on(SettingsActions.updateWakeLockEnabled, (state: SettingsState, action: { enabled: boolean}) => ({...state, wakelock: action.enabled})),
  on(SettingsActions.setTextSize, (state: SettingsState, action: { size: TextSize}) => ({...state, textSize: action.size })),
  on(SettingsActions.setLineHeight, (state: SettingsState, action: { height: LineHeight}) => ({...state, lineHeight: action.height})),
  on(SettingsActions.setTextFlow, (state: SettingsState, action: { flow: TextFlow }) => ({...state, textFlow: action.flow})),
  on(SettingsActions.setRenderHistory, (state: SettingsState, action: { count: number }) => ({...state, renderHistory: action.count})),
  on(SettingsActions.setFontFamily, (state: SettingsState, action: { font: FontFamily }) => ({...state, fontFamily: action.font })),
  on(SettingsActions.saveTranscriptionSettings, (state: SettingsState, action: { transcription: Partial<TranscriptionSettings>}) => ({...state, transcription: { ...state.transcription, ...action.transcription, loading: true }})),
  on(SettingsActions.saveTranscriptionSettingsSuccess, (state: SettingsState) => ({...state, transcription: { ...state.transcription, loading: false }})),
  on(SettingsActions.saveTranscriptionSettingsFailure, (state: SettingsState, action: { error: string }) => ({...state, error: action.error, transcription: { ...state.transcription, loading: false }})),
  on(SettingsActions.setTranslationEnabled, (state: SettingsState, action: { enabled: boolean }) => ({...state, translation: { ...state.translation, enabled: action.enabled, mode: (action.enabled ? (state.translation.mode === 'off' ? 'split' : state.translation.mode) : 'off') as TranslationDisplayMode }})),
  on(SettingsActions.setTranslationMode, (state: SettingsState, action: { mode: TranslationDisplayMode }) => ({...state, translation: { ...state.translation, mode: action.mode, enabled: action.mode !== 'off' }})),

  on(SettingsActions.setTranslationTargetLanguage, (state: SettingsState, action: { targetLanguage: string }) => ({...state, translation: { ...state.translation, targetLanguage: action.targetLanguage }})),
  on(SettingsActions.saveTranslationSettings, (state: SettingsState, action: { translation: Partial<TranslationSettings> }) => ({...state, translation: { ...state.translation, ...action.translation }})),
)

