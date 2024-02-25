import { createSelector } from "@ngrx/store";
import { AppState } from "../models/app.model";
import { UserState } from "../reducers/user.reducer";

const selectUserState = (state: AppState): UserState => state.user;

export const selectUserProfile = createSelector(
  selectUserState,
  (state) => state.profile
)

export const selectUserId = createSelector(
  selectUserState,
  (state) => state.id
)

export const selectUserSavedSettings = createSelector(
  selectUserState,
  (state) => state.uiSettings
)

export const selectUserMetadata = createSelector(
  selectUserState,
  (state) => state.metadata
)

export const selectUserSettingsSync = createSelector(
  selectUserProfile,
  (profile) => profile?.syncUiSettings
)