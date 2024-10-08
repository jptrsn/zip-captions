import { createReducer, on } from "@ngrx/store";
import { AppTheme, FontFamily, Language, LineHeight, SettingsActions, SettingsState, TextFlow, TextSize, TranscriptionSettings } from "../modules/settings/models/settings.model";

export const defaultSettingsState: SettingsState = {
  theme: AppTheme.ZipDark,
  lang: 'en',
  wakelock: true,
  renderHistory: 15,
  textSize: 'textSize-3xl',
  lineHeight: 'lineHeight-normal',
  textFlow: 'bottom-up',
  fontFamily: FontFamily.sans,
  transcription: {
    enabled: false
  }
}

export const settingsReducers = createReducer(
  defaultSettingsState,
  on(SettingsActions.setTheme, (state: SettingsState, action: { theme: AppTheme }) => ({...state, theme: action.theme })),
  on(SettingsActions.setLanguage, (state: SettingsState, action: { language: Language}) => ({...state, lang: action.language})),
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
)
