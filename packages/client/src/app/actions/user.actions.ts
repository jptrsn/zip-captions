import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserProfile } from '../reducers/user.reducer';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Set Profile': props<{profile: UserProfile}>(),
    'Clear Profile': emptyProps()
  }
});
