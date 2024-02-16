import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '../actions/auth.actions';

export interface LoginResponse {
  uuid: string;
  username: string;
  access_token: string;
  expiry: number;
}

export interface AuthState {
  loading: boolean;
  loggedIn: boolean;
  email?: string;
  error?: string;
}

export const defaultAuthState: AuthState = {
  loading: false,
  loggedIn: false,
};

export const authReducer = createReducer(
  defaultAuthState,
  on(AuthActions.login, (state: AuthState) => ({...state, loading: true, error: undefined})),
  on(AuthActions.loginSuccess, (state: AuthState) => ({...state, loading: false, loggedIn: true })),
  on(AuthActions.loginFailure, (state: AuthState, action: { error: string}) => ({...state, error: action.error, loading: false, loggedIn: false, email: undefined, uuid: undefined})),
  
  on(AuthActions.clearError, (state: AuthState) => ({...state, error: undefined})),
  
  on(AuthActions.logout, (state: AuthState) => ({...state, loading: true})),
  on(AuthActions.logoutSuccess, (state: AuthState) => ({...state, loading: false, loggedIn: false, email: undefined })),
  
);

