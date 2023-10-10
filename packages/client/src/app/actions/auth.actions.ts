import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LoginResponse } from '../reducers/auth.reducer';
import { SignInTokenResponse } from '../modules/auth/models/google-auth.model';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login': props<{email: string, password: string}>(),
    'Login Success': props<{ data: LoginResponse }>(),
    'Login Failure': props<{ error: string }>(),

    'Logout': emptyProps(),
    'Logout Success': emptyProps(),
    'Logout Failure': props<{ error: string }>(),

    'Login with Google': props<{token: SignInTokenResponse}>(),
    'Login with Google Success': props<{ data: LoginResponse }>(),
    'Login with Google Failure': props<{ error: string }>(),

    'Sign Up': props<{email: string, password: string}>(),
    'Sign Up Success': props<{ data: LoginResponse}>(),
    'Sign Up Failure': props<{error: string}>(),

    'Validate': props<{email: string, password: string}>(),
    'Validate Response': props<{data: any}>(),

    'Clear Error': emptyProps(),
  }
});
