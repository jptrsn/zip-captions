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
  uuid?: string;

}

export const defaultAuthState: AuthState = {
  loading: false,
  loggedIn: false,
};

export const authReducer = createReducer(
  defaultAuthState,
  on(AuthActions.login, (state: AuthState) => ({...state, loading: true})),
  on(AuthActions.loginSuccess, (state: AuthState, action: { data: LoginResponse }) => ({...state, loading: false, loggedIn: true, email: action.data.username, uuid: action.data.uuid })),
  on(AuthActions.logout, (state: AuthState) => ({...state, loading: true})),
  on(AuthActions.logoutSuccess, (state: AuthState) => ({...state, loading: false, loggedIn: false, email: undefined })),
);
