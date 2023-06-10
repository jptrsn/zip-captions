import { createSelector } from "@ngrx/store";
import { AppAppearanceState, AppState, AppTheme, Language } from "../models/app.model";

export const selectAppAppearance = (state: AppState): AppAppearanceState => state.appearance;

export const loadingSelector = createSelector(
  selectAppAppearance,
  (state) => state.loading
)

export const footerVisibleSelector = createSelector(
  selectAppAppearance,
  (state) => state.footerVisible
)

export const themeSelector = createSelector(
  selectAppAppearance,
  (state) => state.theme as AppTheme
)

export const languageSelector = createSelector(
  selectAppAppearance,
  (state) => state.lang as Language
)