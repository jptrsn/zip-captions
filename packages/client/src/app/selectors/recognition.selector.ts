import { createSelector } from "@ngrx/store";
import { AppState } from "../models/app.model";
import { RecognitionState, RecognitionStatus } from "../models/recognition.model";

export const selectRecognition = (state: AppState): RecognitionState => state.recognition;

export const recognitionIdSelector = createSelector(
  selectRecognition,
  (state) => state.id
)

export const recognitionErrorSelector = createSelector(
  selectRecognition,
  (state) => state.error
)

export const recognitionStatusSelector = createSelector(
  selectRecognition,
  (state) => state.status
)

export const recognitionConnectedSelector = createSelector(
  selectRecognition,
  (state) => state.status === RecognitionStatus.connected
)

export const recognitionActiveSelector = createSelector(
  selectRecognition,
  (state) => state.status === RecognitionStatus.connected || state.status === RecognitionStatus.paused
)

export const recognitionPausedSelector = createSelector(
  selectRecognition,
  (state) => state.status === RecognitionStatus.paused
)

export const selectTranscriptId = createSelector(
  selectRecognition,
  (state) => state.transcriptId
)