import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserProfile, UserRoom } from '../reducers/user.reducer';
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

    'Get Rooms': emptyProps(),
    'Get Rooms Success': props<{rooms: UserRoom[]}>(),
    'Get Rooms Failure': props<{error: string}>(),

    'Save Rooms': props<{rooms: UserRoom[], upsert?: boolean}>(),
    'Save Rooms Success': props<{rooms: UserRoom[]}>(),
    'Save Rooms Failure': props<{error: string}>(),

    'Save Sync Property': props<{sync: boolean}>(),
    'Save Sync Property Success': props<{sync: boolean}>(),
    'Save Sync Property Failure': props<{error: string}>(),

    'Load and Apply Settings': emptyProps(),
    'Load and Apply Settings Success': emptyProps(),
    'Load and Apply Settings Failure': props<{error: string}>(),
    
    'Save Settings State': props<{ settings: SettingsState }>(),
    'Save Settings State Success': props<{ settings: SettingsState }>(),
    'Save Settings State Failure': props<{error: string}>(),
    'Clear Profile': emptyProps(),

    'Delete Account': props<{reason: string | null }>(),
    'Delete Account Success': emptyProps(),
    'Delete Account Failure': props<{ error: string }>(),
  }
});
