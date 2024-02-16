import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { LoginResponse } from '../reducers/auth.reducer';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login': props<{token: string}>(),
    'Login Success': props<{ data: LoginResponse }>(),
    'Login Failure': props<{ error: string }>(),

    'Check Session': emptyProps(),
    'Valid Session': props<{ data: LoginResponse}>(),
    'Invalid Session': emptyProps(),

    'Logout': emptyProps(),
    'Logout Success': emptyProps(),
    'Logout Failure': props<{ error: string }>(),

    'Validate': props<{email: string, password: string}>(),
    'Validate Response': props<{data: any}>(),

    'Clear Error': emptyProps(),
  }
});
