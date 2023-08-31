import { createReducer, on } from "@ngrx/store";
import { AppTheme, Language, LineHeight, SettingsActions, SettingsState, TextSize } from "../modules/settings/models/settings.model";

export const defaultSettingsState: SettingsState = {
  theme: AppTheme.ZipDark,
  lang: 'en',
  wakeLock: true,
  textSize: 'textSize-3xl',
  lineHeight: 'lineHeight-normal'
}

export const settingsReducers = createReducer(
  defaultSettingsState,
  on(SettingsActions.setTheme, (state: SettingsState, action: { theme: AppTheme }) => ({...state, theme: action.theme })),
  on(SettingsActions.setLanguage, (state: SettingsState, action: { language: Language}) => ({...state, lang: action.language})),
  on(SettingsActions.initSettingsComplete, (state: SettingsState, action: { settings: SettingsState}) => ({...state, ...action.settings })),
  on(SettingsActions.updateWakeLockEnabled, (state: SettingsState, action: { enabled: boolean}) => ({...state, wakeLock: action.enabled})),
  on(SettingsActions.setTextSize, (state: SettingsState, action: { size: TextSize}) => ({...state, textSize: action.size })),
  on(SettingsActions.setLineHeight, (state: SettingsState, action: { height: LineHeight}) => ({...state, lineHeight: action.height})),
)
