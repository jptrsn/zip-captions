import { AudioStreamState } from "./audio-stream.model";

export enum AppTheme {
  dark = 'dark',
  acid = 'acid'
}
export interface AppState {
  loading: boolean;
  theme: AppTheme;
  audioStream: AudioStreamState;
}

export * as AppActions from '../actions/app.actions';