import { createReducer, on } from '@ngrx/store';
import { UserActions } from '../actions/user.actions';
import { SettingsState } from '../modules/settings/models/settings.model';

export const userFeatureKey = 'user';

export interface UserProfile {
  primaryEmail: string;
  createdAt: string;
  familyName?: string;
  givenName?: string;
  organizationName?: string;
  googleConnected?: boolean;
  azureConnected?: boolean;
}

export interface UserMetadata {
  roomId?: string;
  joinCode?: string;
  lastChanged?: Date;
}

export interface UserState {
  id?: string;
  profile?: UserProfile;
  uiSettings?: SettingsState;
  metadata?: UserMetadata;
}

export const defaultUserState: UserState = {
};

export const userReducer = createReducer(
  defaultUserState,
  on(UserActions.getProfile, (state: UserState, action: { id: string}) => ({...state,  id: action.id })),
  on(UserActions.getProfileSuccess, (state: UserState, action: { profile: UserProfile }) => ({...state, profile: action.profile})),
  on(UserActions.getProfileFailure, (state: UserState) => ({...state, profile: undefined})),
  on(UserActions.clearProfile, (state: UserState) => ({...state, profile: undefined }))
);

