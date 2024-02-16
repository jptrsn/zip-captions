import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login': props<{token: string}>(),
    'Login Success': emptyProps(),
    'Login Failure': props<{ error: string }>(),

    'Validate': emptyProps(),

    'Logout': emptyProps(),
    'Logout Success': emptyProps(),
    'Logout Failure': props<{ error: string }>(),

    'Clear Error': emptyProps(),
  }
});
