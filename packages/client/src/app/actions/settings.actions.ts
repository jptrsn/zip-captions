import { createAction, props } from "@ngrx/store";
import { AppTheme, Language, SettingsState } from "../modules/settings/models/settings.model";


export const initSettings = createAction('[Settings] Init');
export const initSettingsComplete = createAction('[Settings] Init Complete', props<{settings: SettingsState}>());

export const setTheme = createAction('[Settings] Set Theme', props<{theme: AppTheme}>());
export const setThemeComplete = createAction('[Settings] Set Theme Complete');

export const setLanguage = createAction('[Settings] Set Language', props<{language: Language}>());
export const setLanguageComplete = createAction('[Settings] Set Language Complete');

export const updateWakeLockEnabled = createAction('[Settings] Update WakeLock Enabled', props<{enabled: boolean}>());
export const updateWakeLockEnabledSuccess = createAction('[Settings] Update WakeLock Enabled Success');
export const updateWakeLockEnabledFailure = createAction('[Settings] Update WakeLock Enabled Failure', props<{error: string}>());