import { createAction, props } from "@ngrx/store";
import { AppTheme, FontFamily, InterfaceLanguage, LineHeight, RecognitionDialect, SettingsState, TextFlow, TextSize, TranscriptionSettings } from "../modules/settings/models/settings.model";


export const initSettings = createAction('[Settings] Init');
export const applySettings = createAction('[Settings] Apply Settings', props<{settings: SettingsState}>());
export const initSettingsComplete = createAction('[Settings] Init Complete', props<{settings: SettingsState}>());

export const setTheme = createAction('[Settings] Set Theme', props<{theme: AppTheme}>());
export const setThemeComplete = createAction('[Settings] Set Theme Complete');

export const setLanguage = createAction('[Settings] Set Language', props<{language: InterfaceLanguage}>());
export const setLanguageComplete = createAction('[Settings] Set Language Complete');

export const setDialect = createAction('[Settings] Set Dialect', props<{dialect: RecognitionDialect}>());
export const setDefaultDialect = createAction('[Settings] Set Dialect', props<{dialect: RecognitionDialect}>());
export const setDialectComplete = createAction('[Settings] Set Dialect Complete');

export const updateWakeLockEnabled = createAction('[Settings] Update WakeLock Enabled', props<{enabled: boolean}>());
export const updateWakeLockEnabledSuccess = createAction('[Settings] Update WakeLock Enabled Success');
export const updateWakeLockEnabledFailure = createAction('[Settings] Update WakeLock Enabled Failure', props<{error: string}>());

export const setTextSize = createAction('[Settings] Set Text Size', props<{size: TextSize}>());
export const setTextSizeSuccess = createAction('[Settings] Set Text Size Success');
export const setTextSizeFailure = createAction('[Settings] Set Text Size Failure', props<{error: string}>());

export const setLineHeight = createAction('[Settings] Set Line Height', props<{height: LineHeight}>());
export const setLineHeightSuccess = createAction('[Settings] Set Line Height Success');
export const setLineHeightFailure = createAction('[Settings] Set Line Height Failure', props<{error: string}>());

export const setTextFlow = createAction('[Settings] Set Text Flow', props<{flow: TextFlow}>());
export const setTextFlowSuccess = createAction('[Settings] Set Text Flow Success');
export const setTextFlowFailure = createAction('[Settings] Set Text Flow Failure', props<{error: string}>());

export const setRenderHistory = createAction('[Settings] Set Render History', props<{count: number}>());
export const setRenderHistorySuccess = createAction('[Settings] Set Render History Success');
export const setRenderHistoryFailure = createAction('[Settings] Set Render History Failure', props<{error: string}>());

export const setFontFamily = createAction('[Settings] Set Font Family', props<{ font: FontFamily }>())
export const setFontFamilySuccess = createAction('[Settings] Set Font Family Success');
export const setFontFamilyFailure = createAction('[Settings] Set Font Family Failure', props<{error: string}>());

export const saveTranscriptionSettings = createAction('[Settings] Save Transcription Settings', props<{ transcription: Partial<TranscriptionSettings> }>())
export const saveTranscriptionSettingsSuccess = createAction('[Settings] Save Transcription Settings Success');
export const saveTranscriptionSettingsFailure = createAction('[Settings] Save Transcription Settings Failure', props<{error: string}>());

export const saveEngineSuccess = createAction('[Settings] Save Engine Success');