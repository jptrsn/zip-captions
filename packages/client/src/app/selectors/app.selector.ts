import { createSelector } from "@ngrx/store";
import { AppAppearanceState, AppState, Connectivity } from "../models/app.model";

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

export const warningSelector = createSelector(
  selectAppAppearance,
  (state) => state.warning
)

export const platformSelector = createSelector(
  selectAppAppearance,
  (state) => state.platform
)

export const peerConnectionsAcceptedSelector = createSelector(
  selectAppAppearance,
  (state) => state.peerConnectionsAccepted
)

export const isOfflineSelector = createSelector(
  selectAppAppearance,
  (state) => state.connectivity === Connectivity.offline
)