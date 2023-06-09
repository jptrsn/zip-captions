import { createReducer, on } from "@ngrx/store";
import { AppTheme, Language, SettingsActions, SettingsState } from "../modules/settings/models/settings.model";

export const defaultSettingsState: SettingsState = {
  theme: AppTheme.ZipDark,
  lang: 'en',
}

export const settingsReducers = createReducer(
  defaultSettingsState,
  on(SettingsActions.setTheme, (state: SettingsState, action: { theme: AppTheme }) => ({...state, theme: action.theme })),
  on(SettingsActions.setLanguage, (state: SettingsState, action: { language: Language}) => ({...state, lang: action.language})),
  on(SettingsActions.initSettingsComplete, (state: SettingsState, action: { settings: SettingsState}) => ({...state, ...action.settings })),
)
