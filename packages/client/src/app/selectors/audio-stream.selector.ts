import { createSelector } from "@ngrx/store";
import { AppState } from "../models/app.model";
import { AudioStreamState } from "../models/audio-stream.model";

export const selectAudioStream = (state: AppState): AudioStreamState => state.audioStream;

export const statusSelector = createSelector(
  selectAudioStream,
  (state) => state.status
)

export const volumeSelector = createSelector(
  selectAudioStream,
  (state) => state.micLevel
)