import { createReducer, on } from "@ngrx/store";
import { AppTheme, FontFamily, InterfaceLanguage, LineHeight, RecognitionDialect, SettingsActions, SettingsState, TextFlow, TextSize, TranscriptionSettings, TranslationDisplayMode, TranslationSettings, UiLanguagePreference, swapLanguagePair, DefaultSplitOrientation, DefaultPaneOrder, DefaultPipContent, SplitOrientation, PipContent, ObsFeed } from "../modules/settings/models/settings.model";

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
    targetLanguage: 'es',
    splitOrientation: DefaultSplitOrientation,
    paneOrder: DefaultPaneOrder,
    pipContent: DefaultPipContent
  }
}

const dialectLanguage = (dialect: RecognitionDialect): string => dialect.split('-')[0].toLowerCase();

/** The language being spoken (base code): the dialect's when one is set, else the language's */
const spokenLanguage = (lang: string, dialect: string): string => (dialect && dialect !== 'unspecified' ? dialect : lang).split('-')[0].toLowerCase();

/**
 * Translation settings after the spoken language is set to `langCode`. The target can't be the spoken
 * language, so a colliding target moves. A different spoken language also turns translation off: the pair the
 * user chose no longer exists, and the app tells them (see the translation reset notice).
 */
const translationAfterSpokenChange = (state: SettingsState, langCode: string, changed: boolean): TranslationSettings => {
  let target = state.translation.targetLanguage;
  if (target === langCode) {
    target = langCode === 'es' ? 'en' : 'es';
  }
  const reset = changed && state.translation.enabled;
  return {
    ...state.translation,
    targetLanguage: target,
    ...(reset ? { enabled: false, mode: 'off' as TranslationDisplayMode } : {})
  };
};

export const settingsReducers = createReducer(
  defaultSettingsState,
  on(SettingsActions.setTheme, (state: SettingsState, action: { theme: AppTheme }) => ({...state, theme: action.theme })),
  on(SettingsActions.setLanguage, (state: SettingsState, action: { language: InterfaceLanguage}) => {
    const langCode = action.language.split('-')[0].toLowerCase();
    const dialect = state.lang === action.language ? state.dialect : 'unspecified';
    return {
      ...state,
      lang: action.language,
      dialect,
      translation: translationAfterSpokenChange(state, langCode, spokenLanguage(state.lang, state.dialect) !== langCode)
    };
  }),
	on(SettingsActions.setDialect, (state: SettingsState, action: { dialect: RecognitionDialect }) => {
    const langCode = spokenLanguage(state.lang, action.dialect);
    const dialectByLanguage = action.dialect !== 'unspecified'
      ? { ...state.translation.dialectByLanguage, [dialectLanguage(action.dialect)]: action.dialect }
      : state.translation.dialectByLanguage;
    return {
      ...state,
      dialect: action.dialect,
      translation: {
        ...translationAfterSpokenChange(state, langCode, spokenLanguage(state.lang, state.dialect) !== langCode),
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
  on(SettingsActions.setSplitOrientation, (state: SettingsState, action: { orientation: SplitOrientation }) => ({...state, translation: { ...state.translation, splitOrientation: action.orientation }})),
  on(SettingsActions.swapCaptionPanes, (state: SettingsState) => ({...state, translation: { ...state.translation, paneOrder: (state.translation.paneOrder ?? DefaultPaneOrder) === 'original-first' ? 'translated-first' : 'original-first' } as TranslationSettings})),
  on(SettingsActions.setPipContent, (state: SettingsState, action: { content: PipContent }) => ({...state, translation: { ...state.translation, pipContent: action.content }})),
  on(SettingsActions.setObsFeed, (state: SettingsState, action: { feed: ObsFeed }) => ({...state, translation: { ...state.translation, obsFeed: action.feed }})),
)

