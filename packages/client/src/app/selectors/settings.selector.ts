import { createSelector } from "@ngrx/store";
import { AppState } from "../models/app.model"
import { AppTheme, Language, SettingsState } from "../modules/settings/models/settings.model"

export const selectAppSettings = (state: AppState): SettingsState => state.settings;

export const themeSelector = createSelector(
  selectAppSettings,
  (state) => state.theme as AppTheme
)

export const languageSelector = createSelector(
  selectAppSettings,
  (state) => state.lang as Language
)