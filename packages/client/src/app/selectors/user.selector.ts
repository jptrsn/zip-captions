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

export const selectUserRooms = createSelector(
  selectUserState,
  (state) => state.rooms
)

export const selectUserSettingsSync = createSelector(
  selectUserProfile,
  (profile) => profile?.syncUiSettings || false
)

export const selectUserSupportProfile = createSelector(
  selectUserState,
  (state) => state.supporter
)

export const selectUserContributes = createSelector(
  selectUserState,
  (state) => !!(state.supporter?.amountCents)
)

export const selectUserBalance = createSelector(
	selectUserProfile,
	(state) => state?.creditBalance
)