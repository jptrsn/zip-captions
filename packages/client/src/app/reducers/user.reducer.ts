import { createReducer, on } from '@ngrx/store';
import { UserActions } from '../actions/user.actions';

export const userFeatureKey = 'user';

export interface UserProfile {
  id: string;
  familyName: string;
  givenName: string;
}

export interface UserState {
  profile?: UserProfile;
}

export const defaultUserState: UserState = {

};

export const userReducer = createReducer(
  defaultUserState,
  on(UserActions.setProfile, (state: UserState, action: { profile: UserProfile }) => ({...state, profile: action.profile})),
  on(UserActions.clearProfile, (state: UserState) => ({...state, profile: undefined }))
);

