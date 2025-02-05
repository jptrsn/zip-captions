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
  syncUiSettings?: boolean;
	creditBalance?: number;
}

export interface UserRoom {
  roomId: string;
  isStatic?: boolean;
  allowAnonymous?: boolean;
  createdAt: string;
  expires?: string;
}

export interface SupporterProfile {
  id: string;
  email: string;
  status: string;
  displayName?: string;
  amountCents?: number;
  totalContribution?: number;
  startDate?: Date;
  endDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreditAdd {
	id: string;
	createdAt: Date;
	provider: string;
	creditsAdded: number;
}

export interface CreditExpenditure {
	id: string;
	createdAt: Date;
	serviceName: string;
	durationMs?: number;
	creditsUsed: number;
}

export interface UserState {
  id?: string;
  profile?: UserProfile;
  supporter?: SupporterProfile;
  uiSettings?: SettingsState;
  rooms?: UserRoom[];
  error?: string;
	creditBalance?: number;
	creditAcquisitions?: CreditAdd[];
	creditExpenditures?: CreditExpenditure[];
}

export const defaultUserState: UserState = {
};

export const userReducer = createReducer(
  defaultUserState,
  on(UserActions.getProfile, (state: UserState, action: { id: string}) => ({...state,  id: action.id })),
  on(UserActions.getProfileSuccess, (state: UserState, action: { profile: UserProfile }) => ({...state, profile: action.profile})),
  on(UserActions.getProfileFailure, (state: UserState, action: { error: string }) => ({...state, profile: undefined, error: action.error })),

  on(UserActions.clearProfile, (state: UserState) => ({...state, profile: undefined })),
  on(UserActions.setUserID, (state: UserState, action: { id: string }) => ({...state, id: action.id })),

  on(UserActions.saveSettingsStateSuccess, (state: UserState, action: { settings: SettingsState }) => ({...state, uiSettings: action.settings})),
  on(UserActions.saveSettingsStateFailure, (state: UserState, action: { error: string }) => ({...state, profile: undefined, error: action.error })),

  on(UserActions.getSettingsSuccess, (state: UserState, action: { settings: SettingsState }) => ({...state, uiSettings: action.settings})),
  on(UserActions.getSettingsFailure, (state: UserState, action: { error: string }) => ({...state, profile: undefined, error: action.error })),

  on(UserActions.saveSyncPropertySuccess, (state: UserState, action: { sync: boolean }) => ({...state, profile: state.profile ? {...state.profile, syncUiSettings: action.sync} : undefined })),
  on(UserActions.saveSyncPropertyFailure, (state: UserState, action: { error: string }) => ({...state, profile: undefined, error: action.error })),

  on(UserActions.getRoomsSuccess, (state: UserState, action: { rooms: UserRoom[] }) => ({...state, rooms: action.rooms })),
  on(UserActions.getRoomsFailure, (state: UserState, action: { error: string }) => ({...state, rooms: [], error: action.error })),

  on(UserActions.saveRoomsSuccess, (state: UserState, action: { rooms: UserRoom[] }) => ({...state, rooms: action.rooms })),
  on(UserActions.saveRoomsFailure, (state: UserState, action: { error: string }) => ({...state, rooms: [], error: action.error })),

  on(UserActions.deleteAccountSuccess, (state: UserState) => ({...state, loading: false, profile: undefined })),
  on(UserActions.deleteAccountFailure, (state: UserState, action: { error: string }) => ({...state, error: action.error})),

  on(UserActions.getSupporterProfileSuccess, (state: UserState, action: { profile: SupporterProfile | null}) => ({...state, supporter: action.profile || undefined })),
  on(UserActions.getSupporterProfileFailure, (state: UserState, action: { error: string }) => ({...state, error: action.error})),

	on(UserActions.updateBalance, (state: UserState, action: { creditBalance: number }) => ({...state, profile: state.profile ? {...state.profile, creditBalance: action.creditBalance } : undefined }))
);

