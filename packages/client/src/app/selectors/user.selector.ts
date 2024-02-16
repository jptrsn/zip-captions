import { createSelector } from "@ngrx/store";
import { AppState } from "../models/app.model";
import { UserState } from "../reducers/user.reducer";

const selectUserState = (state: AppState): UserState => state.user;

export const selectUserProfile = createSelector(
  selectUserState,
  (state) => state.profile
)

export const selectUserSavedSettings = createSelector(
  selectUserState,
  (state) => state.savedSettings
)