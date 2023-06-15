import { createSelector } from "@ngrx/store";
import { AppAppearanceState, AppState } from "../models/app.model";

export const selectAppAppearance = (state: AppState): AppAppearanceState => state.appearance;

export const loadingSelector = createSelector(
  selectAppAppearance,
  (state) => state.loading
)

export const footerVisibleSelector = createSelector(
  selectAppAppearance,
  (state) => state.footerVisible
)

export const errorSelector = createSelector(
  selectAppAppearance,
  (state) => state.error
)