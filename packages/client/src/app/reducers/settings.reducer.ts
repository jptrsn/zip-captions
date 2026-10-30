import { createReducer, on } from "@ngrx/store";
import { AppTheme, DefaultKeyboardShortcuts, FontFamily, InterfaceLanguage, KeyboardShortcutsMap, LineHeight, RecognitionDialect, SettingsActions, SettingsState, ShortcutActionId, TextFlow, TextSize, TranscriptionSettings } from "../modules/settings/models/settings.model";

export const defaultSettingsState: SettingsState = {
  theme: AppTheme.ZipDark,
  lang: 'en',
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
  shortcutsEnabled: true,
  shortcuts: { ...DefaultKeyboardShortcuts }
}

export const settingsReducers = createReducer(
  defaultSettingsState,
  on(SettingsActions.setTheme, (state: SettingsState, action: { theme: AppTheme }) => ({...state, theme: action.theme })),
  on(SettingsActions.setLanguage, (state: SettingsState, action: { language: InterfaceLanguage}) => ({...state, lang: action.language, dialect: state.lang === action.language ? state.dialect : 'unspecified'})),
	on(SettingsActions.setDialect, (state: SettingsState, action: { dialect: RecognitionDialect }) => ({...state, dialect: action.dialect})),
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
  on(SettingsActions.setShortcutsEnabled, (state: SettingsState, action: { enabled: boolean }) => ({ ...state, shortcutsEnabled: action.enabled })),
  on(SettingsActions.setShortcut, (state: SettingsState, action: { actionId: ShortcutActionId; key: string }) => ({
    ...state,
    shortcuts: { ...state.shortcuts, [action.actionId]: action.key }
  })),
  on(SettingsActions.setShortcuts, (state: SettingsState, action: { shortcuts: KeyboardShortcutsMap }) => ({
    ...state,
    shortcuts: { ...action.shortcuts }
  })),
  on(SettingsActions.resetShortcuts, (state: SettingsState) => ({
    ...state,
    shortcuts: { ...DefaultKeyboardShortcuts }
  })),
)
