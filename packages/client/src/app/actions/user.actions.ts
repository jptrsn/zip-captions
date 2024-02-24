import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserProfile } from '../reducers/user.reducer';
import { SettingsState } from '../modules/settings/models/settings.model';

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Get Profile': props<{id: string}>(),
    'Get Profile Success': props<{profile: UserProfile}>(),
    'Get Profile Failure': props<{error: string}>(),

    'Set User ID': props<{id: string}>(),

    'Get Settings': emptyProps(),
    'Get Settings Success': props<{ settings: SettingsState }>(), 
    'Get Settings Failure': props<{error: string}>(),
    
    'Save Settings State': props<{ settings: SettingsState }>(),
    'Save Settings State Success': props<{ settings: SettingsState }>(),
    'Save Settings State Failure': props<{error: string}>(),
    'Clear Profile': emptyProps()
  }
});
