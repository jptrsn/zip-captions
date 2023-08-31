import { createSelector } from "@ngrx/store";
import { AppState } from "../models/app.model";
import { SettingsState } from "../modules/settings/models/settings.model";

export const selectAppSettings = (state: AppState): SettingsState => state.settings;

export const themeSelector = createSelector(
  selectAppSettings,
  (state) => state.theme
)

export const languageSelector = createSelector(
  selectAppSettings,
  (state) => state.lang
)

export const wakeLockEnabledSelector = createSelector(
  selectAppSettings,
  (state) => state.wakeLock
)

export const selectTextSize = createSelector(
  selectAppSettings,
  (state) => state.textSize
)