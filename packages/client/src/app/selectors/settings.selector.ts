import { createSelector } from "@ngrx/store";
import { AppState } from "../models/app.model";
import { SettingsState, SyncableSettings } from "../modules/settings/models/settings.model";

export const selectAppSettings = (state: AppState): SettingsState => state.settings;

export const selectSyncSettings = createSelector(
  selectAppSettings,
  (state) => {
    const clone: SyncableSettings = {...state}
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore cloning to delete transcription property is allowed, but typescript gets mad
    delete clone.transcription;
    return clone
  }
)

export const themeSelector = createSelector(
  selectAppSettings,
  (state) => state.theme
)

export const languageSelector = createSelector(
  selectAppSettings,
  (state) => state.lang
)

export const wakeLockEnabledSelector = createSelector(
  selectAppSettings,
  (state) => state.wakelock
)

export const selectTextSize = createSelector(
  selectAppSettings,
  (state) => state.textSize
)

export const selectLineHeight = createSelector(
  selectAppSettings,
  (state) => state.lineHeight
)

export const selectTextFlow = createSelector(
  selectAppSettings,
  (state) => state.textFlow
)

export const selectRenderHistoryLength = createSelector(
  selectAppSettings,
  (state) => state.renderHistory
)

export const selectFontFamily = createSelector(
  selectAppSettings,
  (state) => state.fontFamily
)

export const selectTranscriptionSettings = createSelector(
  selectAppSettings,
  (state) => state.transcription
)

export const selectTranscriptionEnabled = createSelector(
  selectAppSettings,
  (state) => state.transcription.enabled
)

export const selectTranscriptTitlePattern = createSelector(
  selectAppSettings,
  (state) => state.transcription.titlePattern
)

export const selectTranscriptSettingsLoading = createSelector(
  selectAppSettings,
  (state) => state.transcription.loading
)

export const selectTranscriptRecordAudio = createSelector(
  selectAppSettings,
  (state) => state.transcription.recordAudio
)