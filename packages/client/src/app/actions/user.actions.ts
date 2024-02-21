import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserProfile } from '../reducers/user.reducer';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Get Profile': props<{id: string}>(),
    'Get Profile Success': props<{profile: UserProfile}>(),
    'Get Profile Failure': props<{error: string}>(),
    'Clear Profile': emptyProps()
  }
});
